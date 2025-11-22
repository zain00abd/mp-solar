'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../components/shared.css';
import './style.css';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  
  const [productData, setProductData] = useState({
    name: '',
    category: 'products', // default to solar panels
    company: '',
    image: '',
    pdfUrl: '',
    description: '',
    features: [''],
    models: [''],
    specs: [{ label: '', value: '' }],
    tags: [''],
    warranty: ''
  });

  const [imagePreview, setImagePreview] = useState('');
  const [imageUploadMethod, setImageUploadMethod] = useState('file'); // 'file' or 'url'
  const [logoPreview, setLogoPreview] = useState('');
  const [logoUploadMethod, setLogoUploadMethod] = useState('file'); // 'file' or 'url'
  const [compressingImage, setCompressingImage] = useState(false);
  const [uploadingToImgbb, setUploadingToImgbb] = useState(false);

  // مفتاح API من ImgBB - احصل عليه من https://api.imgbb.com/
  // ضع المفتاح في ملف .env.local بهذا الشكل: NEXT_PUBLIC_IMGBB_API_KEY=your_key_here
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || '';

  const [companyData, setCompanyData] = useState({
    name: '',
    country: '',
    logo: '',
    description: '',
    website: '',
    established: '',
    color1: '#1e40af',
    color2: '#3b82f6',
    color3: '#60a5fa',
    opacity1: 100,
    opacity2: 100,
    opacity3: 100
  });

  const categories = [
    { value: 'products', label: 'الألواح الشمسية' },
    { value: 'inverters', label: 'العاكسات' },
    { value: 'batteries', label: 'البطاريات' }
  ];

  const [orderCategory, setOrderCategory] = useState('products');
  const [orderItems, setOrderItems] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);


  // جلب الشركات عند تحميل الصفحة
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      const result = await response.json();
      if (result.success) {
        setCompanies(result.data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (index, value, field) => {
    setProductData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setProductData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setProductData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSpecChange = (index, field, value) => {
    setProductData(prev => ({
      ...prev,
      specs: prev.specs.map((s, i) => i === index ? { ...s, [field]: value } : s)
    }));
  };

  const addSpec = () => {
    setProductData(prev => ({
      ...prev,
      specs: [...prev.specs, { label: '', value: '' }]
    }));
  };

  const removeSpec = (index) => {
    setProductData(prev => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const endpointMap = {
    products: '/api/products-panels',
    inverters: '/api/inverters',
    batteries: '/api/batteries'
  };

  const loadOrderItems = async () => {
    setOrderLoading(true);
    try {
      const endpoint = endpointMap[orderCategory];
      const res = await fetch(`${endpoint}?limit=100&sortBy=sortOrder&sortOrder=asc`);
      if (res.ok) {
        const json = await res.json();
        setOrderItems(Array.isArray(json?.data) ? json.data : []);
      }
    } catch (e) {
      console.error('Error loading items for ordering', e);
    } finally {
      setOrderLoading(false);
    }
  };

  const moveItem = (index, dir) => {
    setOrderItems(prev => {
      const arr = [...prev];
      const ni = index + dir;
      if (ni < 0 || ni >= arr.length) return prev;
      const tmp = arr[index];
      arr[index] = arr[ni];
      arr[ni] = tmp;
      return arr;
    });
  };

  const saveOrder = async () => {
    try {
      const endpoint = endpointMap[orderCategory];
      for (let i = 0; i < orderItems.length; i++) {
        const item = orderItems[i];
        await fetch(`${endpoint}/${item._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: i + 1 })
        });
      }
      alert('تم حفظ ترتيب المنتجات بنجاح');
    } catch (e) {
      console.error('Error saving order', e);
      alert('حدث خطأ أثناء حفظ الترتيب');
    }
  };

  // دالة لضغط الصورة قبل التحميل باستخدام WebP
  const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.85) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // حساب الأبعاد الجديدة مع الحفاظ على نسبة العرض إلى الارتفاع
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          // تحسين جودة الرسم
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // تحويل إلى WebP بدلاً من JPEG - حجم أصغر بنسبة 25-35%
          const compressedBase64 = canvas.toDataURL('image/webp', quality);
          resolve(compressedBase64);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // دالة لرفع الصورة إلى ImgBB
  const uploadToImgBB = async (base64Image) => {
    // التحقق من وجود مفتاح API
    if (!IMGBB_API_KEY || IMGBB_API_KEY === '') {
      console.warn('⚠️ مفتاح ImgBB API غير موجود. سيتم حفظ الصورة محلياً كـ base64');
      return base64Image; // إرجاع base64 كبديل
    }

    try {
      // إزالة بادئة data:image
      const base64Data = base64Image.split(',')[1];
      
      const formData = new FormData();
      formData.append('image', base64Data);
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        return result.data.url; // رابط الصورة
      } else {
        throw new Error(result.error?.message || 'فشل رفع الصورة');
      }
    } catch (error) {
      console.error('Error uploading to ImgBB:', error);
      throw error;
    }
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        alert('الرجاء اختيار ملف صورة فقط');
        return;
      }

      // التحقق من حجم الملف (أقل من 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً. الرجاء اختيار صورة أقل من 5MB');
        return;
      }

      try {
        setCompressingImage(true);
        // ضغط الصورة قبل الرفع باستخدام WebP
        const compressedImage = await compressImage(file, 800, 800, 0.85);
        setImagePreview(compressedImage);
        
        setCompressingImage(false);
        setUploadingToImgbb(true);
        
        // رفع الصورة إلى ImgBB
        const imageUrl = await uploadToImgBB(compressedImage);
        
        setProductData(prev => ({
          ...prev,
          image: imageUrl
        }));
      } catch (error) {
        console.error('Error processing image:', error);
        alert('حدث خطأ أثناء معالجة الصورة: ' + error.message);
        // في حالة الفشل، استخدم base64 كبديل
        setProductData(prev => ({
          ...prev,
          image: imagePreview || ''
        }));
      } finally {
        setCompressingImage(false);
        setUploadingToImgbb(false);
      }
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setProductData(prev => ({
      ...prev,
      image: url
    }));
    setImagePreview(url);
  };

  const clearImage = () => {
    setProductData(prev => ({
      ...prev,
      image: ''
    }));
    setImagePreview('');
    // إعادة تعيين input file
    const fileInput = document.getElementById('image-file');
    if (fileInput) fileInput.value = '';
  };

  const handleLogoFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        alert('الرجاء اختيار ملف صورة فقط');
        return;
      }

      // التحقق من حجم الملف (أقل من 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً. الرجاء اختيار صورة أقل من 5MB');
        return;
      }

      try {
        setCompressingImage(true);
        // ضغط الشعار باستخدام WebP
        const compressedImage = await compressImage(file, 400, 400, 0.9);
        setLogoPreview(compressedImage);
        
        setCompressingImage(false);
        setUploadingToImgbb(true);
        
        // رفع الشعار إلى ImgBB
        const logoUrl = await uploadToImgBB(compressedImage);
        
        setCompanyData(prev => ({
          ...prev,
          logo: logoUrl
        }));
      } catch (error) {
        console.error('Error processing logo:', error);
        alert('حدث خطأ أثناء معالجة الشعار: ' + error.message);
        // في حالة الفشل، استخدم base64 كبديل
        setCompanyData(prev => ({
          ...prev,
          logo: logoPreview || ''
        }));
      } finally {
        setCompressingImage(false);
        setUploadingToImgbb(false);
      }
    }
  };

  const handleLogoUrlChange = (e) => {
    const url = e.target.value;
    setCompanyData(prev => ({
      ...prev,
      logo: url
    }));
    setLogoPreview(url);
  };

  const clearLogo = () => {
    setCompanyData(prev => ({
      ...prev,
      logo: ''
    }));
    setLogoPreview('');
    // إعادة تعيين input file
    const fileInput = document.getElementById('logo-file');
    if (fileInput) fileInput.value = '';
  };

  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // دالة لتحويل HEX + Opacity إلى RGBA
  const hexToRgba = (hex, opacity) => {
    // إزالة # من البداية
    hex = hex.replace('#', '');
    
    // تحويل HEX إلى RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const alpha = opacity / 100;
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // دالة للحصول على اللون مع الشفافية
  const getColorWithOpacity = (colorName) => {
    const colorValue = companyData[colorName];
    const opacityName = colorName.replace('color', 'opacity');
    const opacityValue = companyData[opacityName];
    
    return hexToRgba(colorValue, opacityValue);
  };

  const handleSubmitCompany = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // تحويل الألوان إلى RGBA قبل الإرسال
      const dataToSend = {
        ...companyData,
        color1: getColorWithOpacity('color1'),
        color2: getColorWithOpacity('color2'),
        color3: getColorWithOpacity('color3')
      };
      
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (result.success) {
        alert('تم إضافة الشركة بنجاح!');
        setCompanyData({
          name: '',
          country: '',
          logo: '',
          description: '',
          website: '',
          established: '',
          color1: '#1e40af',
          color2: '#3b82f6',
          color3: '#60a5fa',
          opacity1: 100,
          opacity2: 100,
          opacity3: 100
        });
        setLogoPreview('');
        setShowCompanyForm(false);
        fetchCompanies(); // إعادة جلب الشركات
        setProductData(prev => ({ ...prev, company: result.data._id }));
      } else {
        alert('خطأ في إضافة الشركة: ' + result.error);
      }
    } catch (error) {
      console.error('Error adding company:', error);
      alert('حدث خطأ أثناء إضافة الشركة');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const specsArray = productData.specs
        .filter(s => (s.label || '').trim() !== '' && (s.value || '').trim() !== '')
        .map(s => ({ label: s.label.trim(), value: s.value.trim() }));

      // تنظيف البيانات
      const cleanedData = {
        ...productData,
        specs: specsArray,
        features: productData.features.filter(f => f.trim() !== ''),
        models: productData.models.filter(m => m.trim() !== ''),
        tags: productData.tags.filter(t => t.trim() !== ''),
        pdfUrl: (productData.pdfUrl || '').trim()
      };

      // تحديد المسار الصحيح حسب القسم
      const endpointMap = {
        products: '/api/products-panels',
        inverters: '/api/inverters',
        batteries: '/api/batteries',
      };
      const endpoint = endpointMap[productData.category] || '/api/products';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();

      if (result.success) {
        alert('تم إضافة المنتج بنجاح!');
        router.push(`/${productData.category}`);
      } else {
        alert('خطأ في إضافة المنتج: ' + result.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('حدث خطأ أثناء إضافة المنتج');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="add-product-page">
      <div className="container">
        <div className="page-header">
          <h1>إضافة منتج جديد</h1>
          <p>أضف منتجاً جديداً إلى متجر الطاقة الشمسية</p>
        </div>

        <div className="forms-container">
          {/* نموذج إضافة المنتج */}
          <div className="product-form-section">
            <form onSubmit={handleSubmitProduct} className="product-form">
              <div className="form-group">
                <label htmlFor="name">اسم المنتج *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل اسم المنتج"
                />
              </div>

              {/* الموديلات */}
              <div className="form-group">
                <label>الموديلات</label>
                {productData.models.map((model, index) => (
                  <div key={index} className="array-input">
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'models')}
                      placeholder="أدخل موديل"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'models')}
                      className="remove-btn"
                    >
                      حذف
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('models')}
                  className="add-btn"
                >
                  إضافة موديل
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">الفئة *</label>
                  <select
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="company">الشركة المصنعة *</label>
                  <div className="company-select-container">
                    <select
                      id="company"
                      name="company"
                      value={productData.company}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">اختر الشركة</option>
                      {companies.map(company => (
                        <option key={company._id} value={company._id}>
                          {company.name} - {company.country}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="add-company-btn"
                      onClick={() => setShowCompanyForm(!showCompanyForm)}
                    >
                      إضافة شركة جديدة
                    </button>
                  </div>
                </div>
              </div>

              

              <div className="form-group image-upload-section">
                <label>صورة المنتج *</label>
                
                {/* خيارات رفع الصورة */}
                <div className="image-upload-methods">
                  <button
                    type="button"
                    className={`method-btn ${imageUploadMethod === 'file' ? 'active' : ''}`}
                    onClick={() => setImageUploadMethod('file')}
                  >
                    رفع من الجهاز
                  </button>
                  <button
                    type="button"
                    className={`method-btn ${imageUploadMethod === 'url' ? 'active' : ''}`}
                    onClick={() => setImageUploadMethod('url')}
                  >
                    إدخال رابط
                  </button>
                </div>

                {/* رفع صورة من الجهاز */}
                {imageUploadMethod === 'file' && (
                  <div className="file-upload-container">
                    <input
                      type="file"
                      id="image-file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="file-input"
                    />
                      <label htmlFor="image-file" className="file-input-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>اضغط لاختيار صورة أو اسحب الملف هنا</span>
                        <span className="file-hint">سيتم تحويل الصورة تلقائياً إلى WebP (أقل من 5MB)</span>
                      </label>
                  </div>
                )}

                {/* إدخال رابط URL */}
                {imageUploadMethod === 'url' && (
                  <input
                    type="url"
                    id="image-url"
                    name="image"
                    value={productData.image.startsWith('data:') ? '' : productData.image}
                    onChange={handleImageUrlChange}
                    placeholder="https://example.com/image.jpg"
                    className="url-input"
                  />
                )}

                {/* رسالة الضغط */}
                {compressingImage && (
                  <div className="compressing-message">
                    <div className="spinner"></div>
                    <span>جاري ضغط الصورة وتحسين الجودة...</span>
                  </div>
                )}

                {/* رسالة الرفع إلى ImgBB */}
                {uploadingToImgbb && (
                  <div className="compressing-message uploading">
                    <div className="spinner"></div>
                    <span>جاري رفع الصورة إلى السحابة...</span>
                  </div>
                )}

              {/* معاينة الصورة */}
              {imagePreview && !compressingImage && !uploadingToImgbb && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="معاينة الصورة" className="image-preview" />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="clear-image-btn"
                    title="حذف الصورة"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* رابط ملف PDF للمنتج */}
            <div className="form-group">
              <label htmlFor="pdfUrl">رابط ملف PDF للمنتج *</label>
              <input
                type="url"
                id="pdfUrl"
                name="pdfUrl"
                value={productData.pdfUrl}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/datasheet.pdf"
              />
            </div>

              <div className="form-group">
                <label htmlFor="description">الوصف *</label>
                <textarea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="وصف تفصيلي للمنتج"
                />
              </div>

              {/* المميزات */}
              <div className="form-group">
                <label>المميزات</label>
                {productData.features.map((feature, index) => (
                  <div key={index} className="array-input">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                      placeholder="أدخل ميزة"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'features')}
                      className="remove-btn"
                    >
                      حذف
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('features')}
                  className="add-btn"
                >
                  إضافة ميزة
                </button>
              </div>

              <div className="specs-section">
                <h3>المواصفات التقنية</h3>
                {productData.specs.map((spec, index) => (
                  <div key={index} className="form-row">
                    <div className="form-group">
                      <label>اسم البارامتر</label>
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                        placeholder="اسم البارامتر (مثل: القدرة)"
                      />
                    </div>
                    <div className="form-group">
                      <label>القيمة</label>
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                        placeholder="القيمة (مثل: 400W)"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpec(index)}
                      className="remove-btn"
                    >
                      حذف
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSpec}
                  className="add-btn"
                >
                  إضافة مواصفة
                </button>
              </div>

              

              {/* الكلمات المفتاحية */}
              <div className="form-group">
                <label>الكلمات المفتاحية</label>
                {productData.tags.map((tag, index) => (
                  <div key={index} className="array-input">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'tags')}
                      placeholder="أدخل كلمة مفتاحية"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'tags')}
                      className="remove-btn"
                    >
                      حذف
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('tags')}
                  className="add-btn"
                >
                  إضافة كلمة مفتاحية
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="warranty">فترة الضمان</label>
                <input
                  type="text"
                  id="warranty"
                  name="warranty"
                  value={productData.warranty}
                  onChange={handleInputChange}
                  placeholder="مثل: 25 سنة ضمان على الأداء"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'جاري الإضافة...' : 'إضافة المنتج'}
              </button>
            </form>
          </div>

          {/* ترتيب المنتجات */}
          <div className="product-form-section">
            <h3>ترتيب المنتجات</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="orderCategory">القسم</label>
                <select id="orderCategory" value={orderCategory} onChange={(e) => setOrderCategory(e.target.value)}>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <button type="button" className="add-btn" onClick={loadOrderItems}>تحميل القائمة</button>
              </div>
            </div>

            {orderLoading ? (
              <div style={{padding:'8px', color:'var(--text-muted)'}}>جاري التحميل...</div>
            ) : (
              <div className="form-group">
                {orderItems.length === 0 ? (
                  <div style={{padding:'8px', color:'var(--text-muted)'}}>لا توجد منتجات لعرضها</div>
                ) : (
                  orderItems.map((item, index) => (
                    <div key={item._id} className="array-input" style={{alignItems:'center'}}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:600}}>{item.name}</div>
                        <div style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>{item.company?.name || '—'}</div>
                      </div>
                      <div style={{display:'flex', gap:'8px'}}>
                        <button type="button" className="add-btn" onClick={() => moveItem(index, -1)}>↑</button>
                        <button type="button" className="add-btn" onClick={() => moveItem(index, 1)}>↓</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            <button type="button" className="submit-btn" onClick={saveOrder}>حفظ الترتيب</button>
          </div>

          {/* نموذج إضافة شركة جديدة */}
          {showCompanyForm && (
            <div className="company-form-section">
              <form onSubmit={handleSubmitCompany} className="company-form">
                <h3>إضافة شركة جديدة</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company-name">اسم الشركة *</label>
                    <input
                      type="text"
                      id="company-name"
                      name="name"
                      value={companyData.name}
                      onChange={handleCompanyInputChange}
                      required
                      placeholder="أدخل اسم الشركة"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company-country">البلد *</label>
                    <input
                      type="text"
                      id="company-country"
                      name="country"
                      value={companyData.country}
                      onChange={handleCompanyInputChange}
                      required
                      placeholder="أدخل بلد الشركة"
                    />
                  </div>
                </div>

                <div className="form-group image-upload-section">
                  <label>شعار الشركة *</label>
                  
                  {/* خيارات رفع الشعار */}
                  <div className="image-upload-methods">
                    <button
                      type="button"
                      className={`method-btn ${logoUploadMethod === 'file' ? 'active' : ''}`}
                      onClick={() => setLogoUploadMethod('file')}
                    >
                      رفع من الجهاز
                    </button>
                    <button
                      type="button"
                      className={`method-btn ${logoUploadMethod === 'url' ? 'active' : ''}`}
                      onClick={() => setLogoUploadMethod('url')}
                    >
                      إدخال رابط
                    </button>
                  </div>

                  {/* رفع صورة من الجهاز */}
                  {logoUploadMethod === 'file' && (
                    <div className="file-upload-container">
                      <input
                        type="file"
                        id="logo-file"
                        accept="image/*"
                        onChange={handleLogoFileChange}
                        className="file-input"
                      />
                      <label htmlFor="logo-file" className="file-input-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>اضغط لاختيار شعار أو اسحب الملف هنا</span>
                        <span className="file-hint">سيتم تحويل الشعار تلقائياً إلى WebP (أقل من 5MB)</span>
                      </label>
                    </div>
                  )}

                  {/* إدخال رابط URL */}
                  {logoUploadMethod === 'url' && (
                    <input
                      type="url"
                      id="logo-url"
                      name="logo"
                      value={companyData.logo.startsWith('data:') ? '' : companyData.logo}
                      onChange={handleLogoUrlChange}
                      placeholder="https://example.com/logo.png"
                      className="url-input"
                    />
                  )}

                  {/* رسالة الضغط */}
                  {compressingImage && (
                    <div className="compressing-message">
                      <div className="spinner"></div>
                      <span>جاري ضغط الشعار وتحسين الجودة...</span>
                    </div>
                  )}

                  {/* رسالة الرفع إلى ImgBB */}
                  {uploadingToImgbb && (
                    <div className="compressing-message uploading">
                      <div className="spinner"></div>
                      <span>جاري رفع الشعار إلى السحابة...</span>
                    </div>
                  )}

                  {/* معاينة الشعار */}
                  {logoPreview && !compressingImage && !uploadingToImgbb && (
                    <div className="image-preview-container">
                      <img src={logoPreview} alt="معاينة الشعار" className="image-preview" />
                      <button
                        type="button"
                        onClick={clearLogo}
                        className="clear-image-btn"
                        title="حذف الشعار"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="company-description">وصف الشركة</label>
                  <textarea
                    id="company-description"
                    name="description"
                    value={companyData.description}
                    onChange={handleCompanyInputChange}
                    rows="3"
                    placeholder="وصف مختصر عن الشركة"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company-website">الموقع الإلكتروني</label>
                    <input
                      type="url"
                      id="company-website"
                      name="website"
                      value={companyData.website}
                      onChange={handleCompanyInputChange}
                      placeholder="https://company-website.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company-established">سنة التأسيس</label>
                    <input
                      type="number"
                      id="company-established"
                      name="established"
                      value={companyData.established}
                      onChange={handleCompanyInputChange}
                      min="1800"
                      max={new Date().getFullYear()}
                      placeholder="2000"
                    />
                  </div>
                </div>

                {/* ألوان الشركة */}
                <div className="colors-section">
                  <h4>ألوان الشركة (للعرض والتصميم)</h4>
                  <div className="form-row colors-row">
                    <div className="form-group color-input-group">
                      <label htmlFor="company-color1">اللون الأساسي</label>
                      <div className="color-input-wrapper">
                        <input
                          type="color"
                          id="company-color1"
                          name="color1"
                          value={companyData.color1}
                          onChange={handleCompanyInputChange}
                          className="color-picker"
                        />
                        <input
                          type="text"
                          value={companyData.color1}
                          onChange={(e) => handleCompanyInputChange({
                            target: { name: 'color1', value: e.target.value }
                          })}
                          placeholder="#1e40af"
                          className="color-text-input"
                          pattern="^#[0-9A-Fa-f]{6}$"
                        />
                      </div>
                      <div className="opacity-control">
                        <label htmlFor="opacity1" className="opacity-label">
                          <span>الشفافية</span>
                          <span className="opacity-value">{companyData.opacity1}%</span>
                        </label>
                        <input
                          type="range"
                          id="opacity1"
                          name="opacity1"
                          min="0"
                          max="100"
                          value={companyData.opacity1}
                          onChange={handleCompanyInputChange}
                          className="opacity-slider"
                        />
                      </div>
                    </div>

                    <div className="form-group color-input-group">
                      <label htmlFor="company-color2">اللون الثانوي</label>
                      <div className="color-input-wrapper">
                        <input
                          type="color"
                          id="company-color2"
                          name="color2"
                          value={companyData.color2}
                          onChange={handleCompanyInputChange}
                          className="color-picker"
                        />
                        <input
                          type="text"
                          value={companyData.color2}
                          onChange={(e) => handleCompanyInputChange({
                            target: { name: 'color2', value: e.target.value }
                          })}
                          placeholder="#3b82f6"
                          className="color-text-input"
                          pattern="^#[0-9A-Fa-f]{6}$"
                        />
                      </div>
                      <div className="opacity-control">
                        <label htmlFor="opacity2" className="opacity-label">
                          <span>الشفافية</span>
                          <span className="opacity-value">{companyData.opacity2}%</span>
                        </label>
                        <input
                          type="range"
                          id="opacity2"
                          name="opacity2"
                          min="0"
                          max="100"
                          value={companyData.opacity2}
                          onChange={handleCompanyInputChange}
                          className="opacity-slider"
                        />
                      </div>
                    </div>

                    <div className="form-group color-input-group">
                      <label htmlFor="company-color3">اللون المساعد</label>
                      <div className="color-input-wrapper">
                        <input
                          type="color"
                          id="company-color3"
                          name="color3"
                          value={companyData.color3}
                          onChange={handleCompanyInputChange}
                          className="color-picker"
                        />
                        <input
                          type="text"
                          value={companyData.color3}
                          onChange={(e) => handleCompanyInputChange({
                            target: { name: 'color3', value: e.target.value }
                          })}
                          placeholder="#60a5fa"
                          className="color-text-input"
                          pattern="^#[0-9A-Fa-f]{6}$"
                        />
                      </div>
                      <div className="opacity-control">
                        <label htmlFor="opacity3" className="opacity-label">
                          <span>الشفافية</span>
                          <span className="opacity-value">{companyData.opacity3}%</span>
                        </label>
                        <input
                          type="range"
                          id="opacity3"
                          name="opacity3"
                          min="0"
                          max="100"
                          value={companyData.opacity3}
                          onChange={handleCompanyInputChange}
                          className="opacity-slider"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* معاينة الألوان */}
                  <div className="colors-preview">
                    <span>معاينة الألوان مع الشفافية:</span>
                    <div className="preview-boxes">
                      <div className="preview-item">
                        <div 
                          className="preview-box" 
                          style={{ backgroundColor: getColorWithOpacity('color1') }}
                          title={`${companyData.color1} - ${companyData.opacity1}%`}
                        ></div>
                        <span className="preview-label">
                          {getColorWithOpacity('color1')}
                        </span>
                      </div>
                      <div className="preview-item">
                        <div 
                          className="preview-box" 
                          style={{ backgroundColor: getColorWithOpacity('color2') }}
                          title={`${companyData.color2} - ${companyData.opacity2}%`}
                        ></div>
                        <span className="preview-label">
                          {getColorWithOpacity('color2')}
                        </span>
                      </div>
                      <div className="preview-item">
                        <div 
                          className="preview-box" 
                          style={{ backgroundColor: getColorWithOpacity('color3') }}
                          title={`${companyData.color3} - ${companyData.opacity3}%`}
                        ></div>
                        <span className="preview-label">
                          {getColorWithOpacity('color3')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="company-form-buttons">
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'جاري الإضافة...' : 'إضافة الشركة'}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowCompanyForm(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}