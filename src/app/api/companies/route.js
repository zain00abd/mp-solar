import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Company from '@/models/Company';

// GET - جلب جميع الشركات
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const country = searchParams.get('country') || '';

    // بناء فلتر البحث
    let filter = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (country) {
      filter.country = { $regex: country, $options: 'i' };
    }

    // حساب التخطي
    const skip = (page - 1) * limit;

    // جلب الشركات مع التصفح
    const companies = await Company.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // حساب العدد الإجمالي
    const total = await Company.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: companies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}

// POST - إضافة شركة جديدة
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, country, logo, description, website, established } = body;

    // التحقق من البيانات المطلوبة
    if (!name || !country || !logo) {
      return NextResponse.json(
        { success: false, error: 'Name, country, and logo are required' },
        { status: 400 }
      );
    }

    // التحقق من عدم وجود شركة بنفس الاسم
    const existingCompany = await Company.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingCompany) {
      return NextResponse.json(
        { success: false, error: 'Company with this name already exists' },
        { status: 409 }
      );
    }

    // إنشاء الشركة الجديدة
    const company = new Company({
      name,
      country,
      logo,
      description,
      website,
      established
    });

    await company.save();

    return NextResponse.json({
      success: true,
      data: company,
      message: 'Company created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating company:', error);
    
    // التعامل مع أخطاء التحقق
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create company' },
      { status: 500 }
    );
  }
}