'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    badge: '',
    image: '',
    description: '',
    features: [''],
    specs: {
      power: '',
      voltage: '',
      efficiency: '',
      warranty: '',
      dimensions: '',
      weight: ''
    },
    price: '',
    currency: 'USD',
    availability: 'in-stock',
    tags: [''],
    warranty: ''
  });

  const [companyData, setCompanyData] = useState({
    name: '',
    country: '',
    logo: '',
    description: '',
    website: '',
    established: ''
  });

  const categories = [
    { value: 'products', label: 'الألواح الشمسية' },
    { value: 'inverters', label: 'العاكسات' },
    { value: 'batteries', label: 'البطاريات' }
  ];

  const currencies = [
    { value: 'USD', label: 'دولار أمريكي' },
    { value: 'EUR', label: 'يورو' },
    { value: 'SAR', label: 'ريال سعودي' },
    { value: 'AED', label: 'درهم إماراتي' }
  ];

  const availabilityOptions = [
    { value: 'in-stock', label: 'متوفر' },
    { value: 'out-of-stock', label: 'غير متوفر' },
    { value: 'pre-order', label: 'طلب مسبق' }
  ];

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
    
    if (name.startsWith('specs.')) {
      const specKey = name.split('.')[1];
      setProductData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specKey]: value
        }
      }));
    } else {
      setProductData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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

  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitCompany = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
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
          established: ''
        });
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
      // تحويل المواصفات من كائن إلى مصفوفة
      const specsArray = Object.entries(productData.specs)
        .filter(([key, value]) => value && value.trim() !== '')
        .map(([key, value]) => ({
          label: getSpecLabel(key),
          value: value.trim()
        }));

      // تنظيف البيانات
      const cleanedData = {
        ...productData,
        specs: specsArray,
        features: productData.features.filter(f => f.trim() !== ''),
        tags: productData.tags.filter(t => t.trim() !== ''),
        price: parseFloat(productData.price) || 0
      };

      const response = await fetch('/api/products', {
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

  // دالة مساعدة لتحويل مفاتيح المواصفات إلى تسميات عربية
  const getSpecLabel = (key) => {
    const labels = {
      power: 'القدرة',
      voltage: 'الجهد',
      efficiency: 'الكفاءة',
      warranty: 'الضمان',
      dimensions: 'الأبعاد',
      weight: 'الوزن'
    };
    return labels[key] || key;
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

              <div className="form-group">
                <label htmlFor="badge">الشارة</label>
                <input
                  type="text"
                  id="badge"
                  name="badge"
                  value={productData.badge}
                  onChange={handleInputChange}
                  placeholder="مثل: جديد، الأكثر مبيعاً، عرض خاص"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">رابط الصورة *</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={productData.image}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com/image.jpg"
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

              {/* المواصفات التقنية */}
              <div className="specs-section">
                <h3>المواصفات التقنية</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="specs.power">القدرة</label>
                    <input
                      type="text"
                      id="specs.power"
                      name="specs.power"
                      value={productData.specs.power}
                      onChange={handleInputChange}
                      placeholder="مثل: 400W"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="specs.voltage">الجهد</label>
                    <input
                      type="text"
                      id="specs.voltage"
                      name="specs.voltage"
                      value={productData.specs.voltage}
                      onChange={handleInputChange}
                      placeholder="مثل: 24V"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="specs.efficiency">الكفاءة</label>
                    <input
                      type="text"
                      id="specs.efficiency"
                      name="specs.efficiency"
                      value={productData.specs.efficiency}
                      onChange={handleInputChange}
                      placeholder="مثل: 22%"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="specs.warranty">الضمان</label>
                    <input
                      type="text"
                      id="specs.warranty"
                      name="specs.warranty"
                      value={productData.specs.warranty}
                      onChange={handleInputChange}
                      placeholder="مثل: 25 سنة"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="specs.dimensions">الأبعاد</label>
                    <input
                      type="text"
                      id="specs.dimensions"
                      name="specs.dimensions"
                      value={productData.specs.dimensions}
                      onChange={handleInputChange}
                      placeholder="مثل: 2000x1000x40mm"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="specs.weight">الوزن</label>
                    <input
                      type="text"
                      id="specs.weight"
                      name="specs.weight"
                      value={productData.specs.weight}
                      onChange={handleInputChange}
                      placeholder="مثل: 22kg"
                    />
                  </div>
                </div>
              </div>

              {/* السعر والتوفر */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">السعر *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currency">العملة</label>
                  <select
                    id="currency"
                    name="currency"
                    value={productData.currency}
                    onChange={handleInputChange}
                  >
                    {currencies.map(curr => (
                      <option key={curr.value} value={curr.value}>
                        {curr.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="availability">حالة التوفر</label>
                <select
                  id="availability"
                  name="availability"
                  value={productData.availability}
                  onChange={handleInputChange}
                >
                  {availabilityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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

          {/* نموذج إضافة شركة جديدة */}
          {showCompanyForm && (
            <div className="company-form-section">
              <form onSubmit={handleSubmitCompany} className="company-form">
                <h3>إضافة شركة جديدة</h3>
                
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

                <div className="form-group">
                  <label htmlFor="company-logo">رابط الشعار *</label>
                  <input
                    type="url"
                    id="company-logo"
                    name="logo"
                    value={companyData.logo}
                    onChange={handleCompanyInputChange}
                    required
                    placeholder="https://example.com/logo.png"
                  />
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