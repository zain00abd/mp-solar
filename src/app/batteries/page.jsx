'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './style.css';

const Batteries = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Products');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/batteries?limit=100');
      if (response.ok) {
        const data = await response.json();
        setProducts(data?.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch batteries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filters = ['All Products', 'Residential', 'Commercial', 'Industrial', 'High Capacity'];

  const ProductCard = ({ product }) => {
    const specs = Array.isArray(product?.specs) ? product.specs : [];
    const s0 = specs[0];
    const s1 = specs[1];
    const s2 = specs[2];
    const s3 = specs[3];
    const priceText = product?.price ? `${product.price}${product?.currency ? ' ' + product.currency : ''}` : '—';

    return (
      <div className="product-card">
        <div className="product-image-container">
          <img 
            src={product?.image || '/batter.png'} 
            alt={product?.name || 'Battery'} 
            className="product-image"
          />
          <div className="product-badge">Best Seller</div>
        </div>
        
        <div className="product-content">
          <h3 className="product-title">{product?.name || 'Solar Battery'}</h3>
          <p className="product-description">
            {product?.description || 'High-efficiency lithium-ion battery for solar energy storage.'}
          </p>
          
          <div className="specs-container">
            <div className="spec-column">
              <div className="spec-item">
                <span className="spec-label">{s0?.label || 'Capacity'}</span>
                <span className="spec-value">{s0?.value || '5 kWh'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{s1?.label || 'Voltage'}</span>
                <span className="spec-value">{s1?.value || '48V'}</span>
              </div>
            </div>
            <div className="spec-column">
              <div className="spec-item">
                <span className="spec-label">{s2?.label || 'Lifespan'}</span>
                <span className="spec-value">{s2?.value || '10 Years'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{s3?.label || 'Efficiency'}</span>
                <span className="spec-value">{s3?.value || '98%'}</span>
              </div>
            </div>
          </div>
          
          <div className="product-features">
            <h4 className="features-title">Key Features</h4>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Smart BMS</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Wi-Fi Monitoring</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Wall Mountable</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Silent Operation</span>
              </div>
            </div>
          </div>
          
          <div className="product-actions">
            <Link href={`/batteries/${product?._id}`} className="btn">
              View Product Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="solar-batteries-page">
        <Header />
        <div className="container">
          <div className="loading-state">Loading batteries...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="solar-batteries-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-grid"></div>
        </div>
        <div className="hero-content">
          <div className="hero-icon">
            <i className="fa-solid fa-battery-full"></i>
          </div>
          <h1 className="hero-title">Solar Batteries</h1>
          <p className="hero-description">
            Discover our premium energy storage solutions designed for maximum capacity, reliability, and long-lasting performance.
          </p>
          <div className="hero-breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Batteries</span>
          </div>
        </div>
      </section>
      
      <div className="container">
        <div className="header">
          <h1>Solar Lithium Batteries</h1>
          <p>Discover our range of high-quality lithium solar batteries for all your energy needs</p>
        </div>
        
        <div className="filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="products-grid">
          {products.length === 0 ? (
            <div className="empty-state">No batteries found.</div>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Batteries;

