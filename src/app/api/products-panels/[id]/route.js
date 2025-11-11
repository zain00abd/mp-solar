import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Panel from '@/models/Panel';
import Company from '@/models/Company';
import mongoose from 'mongoose';

// GET - جلب لوح عبر المعرّف
export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid panel ID' }, { status: 400 });
    }

    await connectDB();

    const panel = await Panel.findById(id).populate('company', 'name country logo color1 color2 color3');
    if (!panel) {
      return NextResponse.json({ success: false, error: 'Panel not found' }, { status: 404 });
    }

    const related = await Panel.find({ company: panel.company?._id, _id: { $ne: panel._id }, isActive: true }).limit(6);

    return NextResponse.json({ success: true, data: panel, related });
  } catch (error) {
    console.error('Error fetching panel:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch panel' }, { status: 500 });
  }
}

// PUT - تحديث لوح
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid panel ID' }, { status: 400 });
    }

    if (body.company && !mongoose.Types.ObjectId.isValid(body.company)) {
      return NextResponse.json({ success: false, error: 'Invalid company ID' }, { status: 400 });
    }

    await connectDB();

    if (body.company) {
      const companyExists = await Company.findById(body.company);
      if (!companyExists) {
        return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
      }
    }

    if (body.name && body.company) {
      const duplicate = await Panel.findOne({ _id: { $ne: id }, name: { $regex: new RegExp(`^${body.name}$`, 'i') }, company: body.company });
      if (duplicate) {
        return NextResponse.json({ success: false, error: 'Panel with this name already exists for this company' }, { status: 409 });
      }
    }

    const updated = await Panel.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate('company', 'name country logo color1 color2 color3');
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Panel not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated, message: 'Panel updated successfully' });
  } catch (error) {
    console.error('Error updating panel:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ success: false, error: 'Validation failed', details: errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to update panel' }, { status: 500 });
  }
}

// DELETE - حذف أو تعطيل لوح
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid panel ID' }, { status: 400 });
    }

    await connectDB();

    if (permanent) {
      const deleted = await Panel.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json({ success: false, error: 'Panel not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'Panel deleted permanently' });
    }

    const disabled = await Panel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!disabled) {
      return NextResponse.json({ success: false, error: 'Panel not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Panel deactivated successfully', data: disabled });
  } catch (error) {
    console.error('Error deleting panel:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete panel' }, { status: 500 });
  }
}