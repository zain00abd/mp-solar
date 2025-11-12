'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
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
        console.log(data)
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
          <h3 className="product-title" style={{color:`${product.company.color1}`}}>{product?.name || 'Solar Inverter'}</h3>
          <hr style={{backgroundColor:`${product.company.color1}`, width:"100%", height:"1px" , border:"none", boxShadow:`${product.company.color2} 0px 0px 18px 3px`, marginBottom:"15px"}} />
          
          {product?.company && (
            <div className="product-company" style={{display:'flex', alignItems:'center', gap:'10px', marginTop:'6px'}}>
              {product?.company?.logo && (
                <img src={product.company.logo} alt={product?.company?.name || 'Company'} />
              )}
              <span style={{fontSize:'0.95rem', color:'#6b7280', fontWeight:600}}>
                {product?.company?.name || '—'}
              </span>
            </div>
          )}
          <p className="product-description">
            {(product?.description.slice(0,100) + " ......") || 'High-efficiency inverter for converting DC solar power to AC for your home.'}
            <Link href={`/inverters/${product?._id}`} className="" style={{color: `${product.company.color1}`, textDecoration: 'none', fontWeight:"600"}}> More</Link>
          </p>
          
          <div className="specs-container">
            <div className="spec-column">
              <div className="spec-item" style={{backgroundColor:`${product.company.color2}`}}>
                <span className="spec-label">{s0?.label || 'Power Rating'}</span>
                <span className="spec-value" style={{color:`${product.company.color1}`}}>{s0?.value || '5 kW'}</span>
              </div>
              <div className="spec-item" style={{backgroundColor:`${product.company.color2}`}}>
                <span className="spec-label">{s1?.label || 'Efficiency'}</span>
                <span className="spec-value" style={{color:`${product.company.color1}`}}>{s1?.value || '98%'}</span>
              </div>
            </div>
            <div className="spec-column">
              <div className="spec-item" style={{backgroundColor:`${product.company.color2}`}}>
                <span className="spec-label">{s2?.label || 'Warranty'}</span>
                <span className="spec-value" style={{color:`${product.company.color1}`}}>{s2?.value || '10 Years'}</span>
              </div>
              <div className="spec-item" style={{backgroundColor:`${product.company.color2}`}}>
                <span className="spec-label">{s3?.label || 'Type'}</span>
                <span className="spec-value" style={{color:`${product.company.color1}`}}>{s3?.value || 'String'}</span>
              </div>
            </div>
          </div>
          
          {/* <div className="product-features">
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
          </div> */}
          
          <div className="product-actions" >
            <Link href={`/inverters/${product?._id}`} className="btn" style={{backgroundColor:`${product.company.color2}`, color:`${product.company.color1}`}}>
              View Product Details
            </Link>
          </div>
        </div>
        
      </div>
    );
  };

  if (loading) {
    return <Loader full label=" Loading..." />;
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
        {products.length === 0 ? (
          <div className="empty-state">No inverters found.</div>
        ) : (
          (() => {
            const groups = products.reduce((acc, p) => {
              const id = p?.company?._id || 'other';
              if (!acc[id]) acc[id] = { company: p?.company, items: [] };
              acc[id].items.push(p);
              return acc;
            }, {});
            return Object.values(groups).map((group, idx) => (
              <section key={group?.company?._id || `other-${idx}`} className="company-section" style={{marginBottom:'32px'}}>
                <div className="company-header" style={{display:'flex', alignItems:'center', gap:'12px', margin:'8px 0 16px'}}>
                  {group?.company?.logo && (
                    <img src={group.company.logo} alt={group?.company?.name || 'Company'} />
                  )}
                  <div className="company-text">
                    <h2 className="company-name">{group?.company?.name || 'Other'}</h2>
                    {group?.company?.country && (
                      <div className="company-country">{group.company.country}</div>
                    )}
                  </div>
                  <span className="company-count">({group.items.length})</span>
                </div>
                <div className="products-grid">
                  {group.items.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </section>
            ));
          })()
        )}
      </div>
      
      <Footer />
    </div>
    </>
  );
};

export default Inverters;

