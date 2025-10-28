import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Company from '@/models/Company';
import Battery from '@/models/Battery';
import Inverter from '@/models/Inverter';
import Panel from '@/models/Panel';
import mongoose from 'mongoose';

// GET - جلب شركة واحدة
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    // التحقق من صحة معرف الشركة
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    const company = await Company.findById(id);

    if (!company) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      );
    }

    // جلب منتجات الشركة من جميع المجموعات
    const batteries = await Battery.find({ company: id }).select('name price image isActive');
    const inverters = await Inverter.find({ company: id }).select('name price image isActive');
    const panels = await Panel.find({ company: id }).select('name price image isActive');

    return NextResponse.json({
      success: true,
      data: {
        ...company.toObject(),
        products: { batteries, inverters, panels },
        counts: {
          batteries: batteries.length,
          inverters: inverters.length,
          panels: panels.length,
          total: batteries.length + inverters.length + panels.length
        }
      }
    });

  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch company' },
      { status: 500 }
    );
  }
}

// PUT - تحديث شركة
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();

    // التحقق من صحة معرف الشركة
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    // التحقق من وجود الشركة
    const existingCompany = await Company.findById(id);
    if (!existingCompany) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      );
    }

    // التحقق من عدم تكرار الاسم (إذا تم تغييره)
    if (body.name && body.name !== existingCompany.name) {
      const duplicateCompany = await Company.findOne({ 
        name: { $regex: new RegExp(`^${body.name}$`, 'i') },
        _id: { $ne: id }
      });
      
      if (duplicateCompany) {
        return NextResponse.json(
          { success: false, error: 'Company with this name already exists' },
          { status: 409 }
        );
      }
    }

    // تحديث الشركة
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedCompany,
      message: 'Company updated successfully'
    });

  } catch (error) {
    console.error('Error updating company:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update company' },
      { status: 500 }
    );
  }
}

// DELETE - حذف شركة
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    // التحقق من صحة معرف الشركة
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    // التحقق من وجود الشركة
    const company = await Company.findById(id);
    if (!company) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      );
    }

    // التحقق من وجود منتجات مرتبطة بالشركة عبر جميع المجموعات
    const batteriesCount = await Battery.countDocuments({ company: id });
    const invertersCount = await Inverter.countDocuments({ company: id });
    const panelsCount = await Panel.countDocuments({ company: id });
    const totalCount = batteriesCount + invertersCount + panelsCount;

    if (totalCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot delete company. ${totalCount} products are associated with this company (batteries: ${batteriesCount}, inverters: ${invertersCount}, panels: ${panelsCount}). Please delete or reassign the products first.` 
        },
        { status: 409 }
      );
    }

    // حذف الشركة
    await Company.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Company deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete company' },
      { status: 500 }
    );
  }
}