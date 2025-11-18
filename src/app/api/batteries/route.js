import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Battery from '@/models/Battery';
import Company from '@/models/Company';
import mongoose from 'mongoose';

// GET - جلب جميع بطاريات القسم
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const company = searchParams.get('company') || '';
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    let filter = { isActive: true };
    if (company && mongoose.Types.ObjectId.isValid(company)) {
      filter.company = company;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    // لم يعد هناك فلترة حسب السعر

    const skip = (page - 1) * limit;
    const sort = {}; sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const batteries = await Battery.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('company', 'name country logo color1 color2 color3');

    const total = await Battery.countDocuments(filter);

    const stats = await Battery.aggregate([
      { $match: filter },
      { $group: { _id: null, totalProducts: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      success: true,
      data: batteries,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      stats: stats[0] || { totalProducts: 0 }
    });
  } catch (error) {
    console.error('Error fetching batteries:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch batteries' }, { status: 500 });
  }
}

// POST - إضافة بطارية جديدة
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, company, image, pdfUrl, description, features, models, specs, tags, warranty } = body;

    if (!name || !company || !image || !pdfUrl || !description) {
      return NextResponse.json({ success: false, error: 'Name, company, image, pdfUrl, and description are required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(company)) {
      return NextResponse.json({ success: false, error: 'Invalid company ID' }, { status: 400 });
    }

    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
    }

    const duplicate = await Battery.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, company });
    if (duplicate) {
      return NextResponse.json({ success: false, error: 'Battery with this name already exists for this company' }, { status: 409 });
    }

    const battery = new Battery({ name, company, image, pdfUrl, description, features: features || [], models: models || [], specs: specs || [], tags: tags || [], warranty: warranty || {}, category: 'batteries' });
    await battery.save();

    const populatedBattery = await Battery.findById(battery._id).populate('company', 'name country logo color1 color2 color3');
    return NextResponse.json({ success: true, data: populatedBattery, message: 'Battery created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating battery:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ success: false, error: 'Validation failed', details: errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create battery' }, { status: 500 });
  }
}