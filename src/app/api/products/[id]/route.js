import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Company from '@/models/Company';
import mongoose from 'mongoose';

// GET - جلب منتج واحد
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    // التحقق من صحة معرف المنتج
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).populate('company', 'name country logo website');

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // جلب منتجات مشابهة من نفس الشركة أو الفئة
    const relatedProducts = await Product.find({
      $and: [
        { _id: { $ne: id } },
        { isActive: true },
        {
          $or: [
            { company: product.company._id },
            { category: product.category }
          ]
        }
      ]
    })
    .limit(4)
    .populate('company', 'name logo');

    return NextResponse.json({
      success: true,
      data: {
        ...product.toObject(),
        relatedProducts
      }
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - تحديث منتج
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();

    // التحقق من صحة معرف المنتج
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // التحقق من وجود المنتج
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // التحقق من صحة معرف الشركة (إذا تم تغييرها)
    if (body.company && !mongoose.Types.ObjectId.isValid(body.company)) {
      return NextResponse.json(
        { success: false, error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    // التحقق من وجود الشركة (إذا تم تغييرها)
    if (body.company && body.company !== existingProduct.company.toString()) {
      const companyExists = await Company.findById(body.company);
      if (!companyExists) {
        return NextResponse.json(
          { success: false, error: 'Company not found' },
          { status: 404 }
        );
      }
    }

    // التحقق من عدم تكرار الاسم (إذا تم تغييره)
    if (body.name && body.name !== existingProduct.name) {
      const duplicateProduct = await Product.findOne({ 
        name: { $regex: new RegExp(`^${body.name}$`, 'i') },
        category: body.category || existingProduct.category,
        _id: { $ne: id }
      });
      
      if (duplicateProduct) {
        return NextResponse.json(
          { success: false, error: 'Product with this name already exists in this category' },
          { status: 409 }
        );
      }
    }

    // تحديث المنتج
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).populate('company', 'name country logo');

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - حذف منتج
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    // التحقق من صحة معرف المنتج
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // التحقق من وجود المنتج
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // حذف المنتج (أو تعطيله بدلاً من الحذف الفعلي)
    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';

    if (permanent) {
      // حذف نهائي
      await Product.findByIdAndDelete(id);
      return NextResponse.json({
        success: true,
        message: 'Product permanently deleted'
      });
    } else {
      // تعطيل المنتج فقط
      await Product.findByIdAndUpdate(id, { isActive: false });
      return NextResponse.json({
        success: true,
        message: 'Product deactivated successfully'
      });
    }

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}