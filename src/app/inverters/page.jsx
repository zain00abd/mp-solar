'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './style.css';

const Inverters = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Products');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/inverters?limit=100');
      if (response.ok) {
        const data = await response.json();
        setProducts(data?.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch inverters:', error);
    } finally {
      setLoading(false);
    }
  };

  const filters = ['All Products', 'Residential', 'Commercial', 'Industrial', 'High Power'];

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
            src={product?.image || '/inverter3.png'} 
            alt={product?.name || 'Inverter'} 
            className="product-image"
          />
          <div className="product-badge">High Efficiency</div>
        </div>
        
        <div className="product-content">
          <h3 className="product-title">{product?.name || 'Solar Inverter'}</h3>
          <p className="product-description">
            {(product?.description.slice(0,100) + " ......") || 'High-efficiency inverter for converting DC solar power to AC for your home.'}
            <Link href={`/inverters/${product?._id}`} className="" style={{color: "#2563EB", textDecoration: 'none', fontWeight:"600"}}> More</Link>
          </p>
          
          <div className="specs-container">
            <div className="spec-column">
              <div className="spec-item">
                <span className="spec-label">{s0?.label || 'Power Rating'}</span>
                <span className="spec-value">{s0?.value || '5 kW'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{s1?.label || 'Efficiency'}</span>
                <span className="spec-value">{s1?.value || '98%'}</span>
              </div>
            </div>
            <div className="spec-column">
              <div className="spec-item">
                <span className="spec-label">{s2?.label || 'Warranty'}</span>
                <span className="spec-value">{s2?.value || '10 Years'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{s3?.label || 'Type'}</span>
                <span className="spec-value">{s3?.value || 'String'}</span>
              </div>
            </div>
          </div>
          
          <div className="product-features">
            <h4 className="features-title">Key Features</h4>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>MPPT Technology</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Wi-Fi Monitoring</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Weather Resistant</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Easy Installation</span>
              </div>
            </div>
          </div>
          
          <div className="product-actions">
            <Link href={`/inverters/${product?._id}`} className="btn">
              View Product Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <>
      <div className="solar-inverters-page">
        <Header />
        <div className="container">
          <div className="loading-state">Loading inverters...</div>
        </div>
        <Footer />
      </div>
      </>
    );
  }

  return (

    <>
      <Header />
    <div className="solar-inverters-page">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-grid"></div>
        </div>
        <div className="hero-content">
          <div className="hero-icon">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <h1 className="hero-title">Solar Inverters</h1>
          <p className="hero-description">
            Discover our range of high-efficiency inverters for residential and commercial systems with advanced power conversion technology.
          </p>
          <div className="hero-breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Inverters</span>
          </div>
        </div>
      </section>
      
      <div className="container">

        

        
        <div className="products-grid">
          {products.length === 0 ? (
            <div className="empty-state">No inverters found.</div>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
      
      <Footer />
    </div>
    </>
  );
};

export default Inverters;

