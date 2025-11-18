import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Company from '@/models/Company';
import mongoose from 'mongoose';

// GET - جلب جميع المنتجات
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const category = searchParams.get('category') || '';
    const company = searchParams.get('company') || '';
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // بناء فلتر البحث
    let filter = { isActive: true };
    
    if (category) {
      filter.category = category;
    }
    
    if (company) {
      if (mongoose.Types.ObjectId.isValid(company)) {
        filter.company = company;
      }
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // لم يعد هناك فلترة حسب السعر

    // حساب التخطي
    const skip = (page - 1) * limit;

    // بناء ترتيب النتائج
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // جلب المنتجات مع التصفح
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('company', 'name country logo color1 color2 color3');

    // حساب العدد الإجمالي
    const total = await Product.countDocuments(filter);

    // إحصائيات إضافية
    const stats = await Product.aggregate([
      { $match: filter },
      { $group: { _id: null, totalProducts: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: stats[0] || { totalProducts: 0 }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - إضافة منتج جديد
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { 
      name, 
      category, 
      company, 
      image,
      pdfUrl, 
      description, 
      features, 
      models,
      specs, 
      tags,
      warranty
    } = body;

    // التحقق من البيانات المطلوبة
    if (!name || !category || !company || !image || !pdfUrl || !description) {
      return NextResponse.json(
        { success: false, error: 'Name, category, company, image, pdfUrl, and description are required' },
        { status: 400 }
      );
    }

    // التحقق من صحة معرف الشركة
    if (!mongoose.Types.ObjectId.isValid(company)) {
      return NextResponse.json(
        { success: false, error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    // التحقق من وجود الشركة
    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      );
    }

    // التحقق من عدم وجود منتج بنفس الاسم في نفس الفئة
    const existingProduct = await Product.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      category: category
    });
    
    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product with this name already exists in this category' },
        { status: 409 }
      );
    }

    // إنشاء المنتج الجديد
    const product = new Product({
      name,
      category,
      company,
      image,
      pdfUrl,
      description,
      features: features || [],
      models: models || [],
      specs: specs || [],
      tags: tags || [],
      warranty: warranty || {}
    });

    await product.save();

    // جلب المنتج مع بيانات الشركة
    const populatedProduct = await Product.findById(product._id).populate('company', 'name country logo color1 color2 color3');

    return NextResponse.json({
      success: true,
      data: populatedProduct,
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    
    // التعامل مع أخطاء التحقق
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}