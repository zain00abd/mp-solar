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
    const minPrice = parseFloat(searchParams.get('minPrice')) || 0;
    const maxPrice = parseFloat(searchParams.get('maxPrice')) || Infinity;
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
    
    if (minPrice > 0 || maxPrice < Infinity) {
      filter.price = {};
      if (minPrice > 0) filter.price.$gte = minPrice;
      if (maxPrice < Infinity) filter.price.$lte = maxPrice;
    }

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
      .populate('company', 'name country logo');

    // حساب العدد الإجمالي
    const total = await Product.countDocuments(filter);

    // إحصائيات إضافية
    const stats = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          totalProducts: { $sum: 1 }
        }
      }
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
      stats: stats[0] || { avgPrice: 0, minPrice: 0, maxPrice: 0, totalProducts: 0 }
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
      badge, 
      image, 
      description, 
      features, 
      specs, 
      price, 
      currency,
      availability,
      tags,
      warranty
    } = body;

    // التحقق من البيانات المطلوبة
    if (!name || !category || !company || !image || !description || !price) {
      return NextResponse.json(
        { success: false, error: 'Name, category, company, image, description, and price are required' },
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
      badge,
      image,
      description,
      features: features || [],
      specs: specs || [],
      price,
      currency: currency || 'USD',
      availability: availability || 'in-stock',
      tags: tags || [],
      warranty: warranty || {}
    });

    await product.save();

    // جلب المنتج مع بيانات الشركة
    const populatedProduct = await Product.findById(product._id).populate('company', 'name country logo');

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