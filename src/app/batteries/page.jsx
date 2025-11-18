'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
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
      const CACHE_KEY = 'cache:batteries:list';
      const CACHE_TTL = 600000;
      const raw = typeof window !== 'undefined' ? localStorage.getItem(CACHE_KEY) : null;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.exp && Date.now() < parsed.exp && Array.isArray(parsed.data)) {
            setProducts(parsed.data);
            return;
          }
        } catch {}
      }

      const response = await fetch('/api/batteries?limit=100');
      if (response.ok) {
        const data = await response.json();
        const list = data?.data || [];
        setProducts(list);
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ exp: Date.now() + CACHE_TTL, data: list }));
          } catch {}
        }
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
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src = '/batter.png';
              e.target.alt = 'Image not available';
            }}
          />
          <div className="product-badge">Best Seller</div>
        </div>
        
        <div className="product-content">
          <h3 className="product-title" style={{color:`${product?.company?.color1 || '#FFA500'}`}}>{product?.name || 'Solar Battery'}</h3>
          <hr style={{backgroundColor:`${product?.company?.color1 || '#FFA500'}`, width:"100%", height:"1px" , border:"none", boxShadow:`${product?.company?.color2 || '#4A90E2'} 0px 0px 18px 3px`, marginBottom:"15px"}} />
          
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
            {(product?.description.slice(0,75) + " ......." )|| 'High-efficiency lithium-ion battery for solar energy storage.'}
            <Link href={`/batteries/${product?._id}`} className="" style={{color: `${product?.company?.color1 || '#FFA500'}`, textDecoration: 'none', fontWeight:"600"}}> More</Link>
          </p>
          
          <div className="specs-container">
            <div className="spec-column">
              <div className="spec-item" style={{backgroundColor:`${product?.company?.color2 || '#4A90E2'}`}}>
                <span className="spec-label">{s0?.label || 'Capacity'}</span>
                <span className="spec-value" style={{color:`${product?.company?.color1 || '#FFA500'}`}}>{s0?.value || '5 kWh'}</span>
              </div>
              <div className="spec-item" style={{backgroundColor:`${product?.company?.color2 || '#4A90E2'}`}}>
                <span className="spec-label">{s1?.label || 'Voltage'}</span>
                <span className="spec-value" style={{color:`${product?.company?.color1 || '#FFA500'}`}}>{s1?.value || '48V'}</span>
              </div>
            </div>
            <div className="spec-column">
              <div className="spec-item" style={{backgroundColor:`${product?.company?.color2 || '#4A90E2'}`}}>
                <span className="spec-label">{s2?.label || 'Lifespan'}</span>
                <span className="spec-value" style={{color:`${product?.company?.color1 || '#FFA500'}`}}>{s2?.value || '10 Years'}</span>
              </div>
              <div className="spec-item" style={{backgroundColor:`${product?.company?.color2 || '#4A90E2'}`}}>
                <span className="spec-label">{s3?.label || 'Efficiency'}</span>
                <span className="spec-value" style={{color:`${product?.company?.color1 || '#FFA500'}`}}>{s3?.value || '98%'}</span>
              </div>
            </div>
          </div>
          

          
          <div className="product-actions">
            <Link href={`/batteries/${product?._id}`} className="btn" style={{backgroundColor:`${product?.company?.color2 || '#4A90E2'}`, color:`${product?.company?.color1 || '#FFA500'}`}}>
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
        <div className="solar-batteries-page">
      
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
        {products.length === 0 ? (
          <div className="empty-state">No batteries found.</div>
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
      
    </div>
      <Footer />
    </>

  );
};

export default Batteries;

