'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import '../style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Batteries Data (simplified - only one product per brand for demo)
const batteriesData = [
  {
    name: "Tesla",
    country: "USA",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsF5Z5ql0K3e8QmFJZZj3PJRgKQx5Yd5L5w&s",
    products: [
      {
        name: "Tesla Powerwall 3",
        brand: "Tesla",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsF5Z5ql0K3e8QmFJZZj3PJRgKQx5Yd5L5w&s",
        badge: "Premium",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Next-generation home battery with integrated solar inverter. Seamless backup power and energy independence with Tesla's advanced technology.",
        features: [
          "13.5 kWh Usable Capacity",
          "Integrated Solar Inverter",
          "IP67 Weatherproof Rating",
          "10-Year Warranty"
        ],
        specs: [
          { label: "Capacity", value: "13.5 kWh" },
          { label: "Power Output", value: "11.5 kW" },
          { label: "Type", value: "Lithium-Ion" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "9,500"
      }
    ]
  }
];

// Find product by ID
const findProduct = (id) => {
  for (const brand of batteriesData) {
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
          <Link href="/batteries" className="btn" style={{ marginTop: '20px' }}>
            Back to Batteries
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
            <Link href="/batteries" className="btn-back">
              ← Back to Batteries
            </Link>
          </div>

          <div className="product-card">
            <div className="product-image" style={{ backgroundImage: `url('${product.image}')`, height: '400px' }}>
            </div>
            <div className="product-content">
              <div className="product-header">
                <h3>{product.name}</h3>
                <div className="brand-name-row">
                  <div className="brand-logo-circle">
                    <img src={product.brandLogo} alt={product.brand} />
                  </div>
                  <div className="product-brand-name">{product.brand} • {brand.country}</div>
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
                <a href="#contact" className="btn-enhanced">Request Quote</a>
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

