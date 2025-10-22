'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import '../style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Inverters Data (copied from parent page)
const invertersData = [
  {
    name: "Huawei",
    country: "China",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJX3X0fF0Qi8lTy2_YJqYQdNvVbFvhO7XRw&s",
    products: [
      {
        name: "Huawei SUN2000-8KTL-M1",
        brand: "Huawei",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJX3X0fF0Qi8lTy2_YJqYQdNvVbFvhO7XRw&s",
        badge: "Smart AI",
        image: "/inverter3.png",
        description: "Advanced AI-powered string inverter with smart optimization and monitoring. Perfect for residential and small commercial systems.",
        features: [
          "98.65% Maximum Efficiency",
          "AI-Powered AFCI Protection",
          "Smart String Monitoring",  
          "WiFi & 4G Connectivity Built-in"
        ],
        specs: [
          { label: "Power Output", value: "8 kW" },
          { label: "Efficiency", value: "98.65%" },
          { label: "Type", value: "String Inverter" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "1,850"
      }
    ]
  }
];

// Find product by ID
const findProduct = (id) => {
  for (const brand of invertersData) {
    const brandId = brand.name.toLowerCase().replace(/\s+/g, '-');
    for (const product of brand.products) {
      const productId = `${brandId}-${product.name.toLowerCase().replace(/\s+/g, '-')}`;
      if (productId === id) {
        return { product, brand };
      }
    }
  }
  return null;
};

// Product Detail Component
const ProductDetail = () => {
  const params = useParams();
  const productData = findProduct(params.id);

  if (!productData) {
    return (
      <div className="product-detail-page">
        <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <Link href="/inverters" className="btn" style={{ marginTop: '20px' }}>
            Back to Inverters
          </Link>
        </div>
      </div>
    );
  }

  const { product, brand } = productData;

  return (
    <div className="product-detail-page">
      <Header />

      {/* Product Detail */}
      <section className="product-detail-section">
        <div className="container">
          <div className="back-button">
            <Link href="/inverters" className="btn-back">
              ← Back to Inverters
            </Link>
          </div>

          <div className="product-card">
            <div className="product-image" style={{ backgroundImage: `url('${product.image}')`, height: '400px' }}>
            </div>
            <div className="product-content">
              <div className="product-header">
                <h3>{product.name}</h3>
                <div className="product-brand">
                  <img src={product.brandLogo} alt={product.brand} />
                  <span>{product.brand} • {brand.country}</span>
                </div>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-features">
                <h4>✓ Key Features</h4>
                <div className="feature-list">
                  {product.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span className="feature-icon">●</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-specs">
                {product.specs.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
              <div className="product-footer">
                <div className="product-price">
                  <span className="price-label">Starting from</span>
                  <span className="price-value">${product.price}</span>
                </div>
                <a href="#contact" className="btn">Request Quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;

