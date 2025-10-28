import React from 'react';
import './style.css';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import { headers } from 'next/headers';

// Page Header Component
const PageHeader = () => {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
      <h1> <i className="fa-solid fa-battery-full" style={{}}></i> Solar Batteries</h1>
          <p>Discover our premium energy storage solutions designed for maximum capacity, reliability, and long-lasting performance.</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Batteries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Product Card Component
const ProductCard = ({ product }) => {
  const productId = product?._id;
  const brandName = product?.company?.name || product?.brand;
  const brandLogo = product?.company?.logo || product?.brandLogo;
  const imageUrl = product?.image || '/placeholder.png';
  const specs = Array.isArray(product?.specs) ? product.specs : [];
  const s0 = specs[0];
  const s1 = specs[1];
  const s2 = specs[2];
  const s3 = specs[3];
  const priceText = product?.price ? `${product.price}${product?.currency ? ' ' + product.currency : ''}` : '—';
  
  return (
    <div className="product-card-enhanced">
      <div className="product-image-container">
        <img className="product-image" src={imageUrl} alt={product?.name || 'Battery'} />
      </div>
      
      <div className="product-content-enhanced">
        <div className="product-header">
          <h3 className="product-title">{product?.name}</h3>
          <div className="brand-name-row">
            <div className="brand-logo-circle">
              <img src={brandLogo} alt={brandName} />
            </div>
            <div className="product-brand-name">{brandName}</div>
          </div>
        </div>
        
        <div className="product-specs-section">
          <h4 className="specs-title">Key Specifications</h4>
          <div className="product-specs-grid">
            <div className="spec-item">
              <span className="spec-value">{s0?.value ?? '—'}</span>
              <span className="spec-label">{s0?.label ?? '—'}</span>
            </div>
            <div className="spec-divider-vertical"></div>
            <div className="spec-item">
              <span className="spec-value">{s1?.value ?? '—'}</span>
              <span className="spec-label">{s1?.label ?? '—'}</span>
            </div>
          </div>
          <div className="product-specs-grid">
            <div className="spec-item">
              <span className="spec-value">{s2?.value ?? '—'}</span>
              <span className="spec-label">{s2?.label ?? '—'}</span>
            </div>
            <div className="spec-divider-vertical"></div>
            <div className="spec-item">
              <span className="spec-value">{s3?.value ?? '—'}</span>
              <span className="spec-label">{s3?.label ?? '—'}</span>
            </div>
          </div>
        </div>
        
        <div className="product-pricing-section">
          <h4 className="pricing-title">Price</h4>
          <div className="product-price-enhanced">
            <span className="price-label">Starting from</span>
            <span className="price-value">${priceText}</span>
          </div>
        </div>
        
        <Link href={`/batteries/${productId}`} className="btn-enhanced">
          View Details
        </Link>
      </div>
    </div>
  );
};

// Brand Section Component
const BrandSection = ({ brand }) => {
  return (
    <div className="brand-section">
      <div className="brand-header">
        <div className="brand-logo-section">
          <img src={brand.logo} alt={brand.name} />
        </div>
        <div className="brand-info">
          <h2>{brand.name}</h2>
          <div className="brand-country">
            <span>🌍</span>
            <span>{brand.country}</span>
          </div>
        </div>
      </div>
      <div className="products-grid">
        {brand.products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

async function fetchBatteries() {
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/batteries?limit=100`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch (e) {
    console.error('Failed to fetch batteries', e);
    return [];
  }
}

const groupByCompany = (items) => {
  const groups = {};
  for (const item of items) {
    const company = item.company || {};
    const key = company._id || 'unknown';
    if (!groups[key]) {
      groups[key] = {
        name: company.name || 'Unknown Brand',
        country: company.country || '',
        logo: company.logo || '',
        products: [],
      };
    }
    groups[key].products.push(item);
  }
  return Object.values(groups);
};

// Main Component
const Batteries = async () => {
  const products = await fetchBatteries();
  const brands = groupByCompany(products);
  return (
    <div className="solar-batteries-page">
      <Header />
      <PageHeader />
      <section className="products-section">
        <div className="container">
          {brands.length === 0 ? (
            <div className="empty-state">No batteries found.</div>
          ) : (
            brands.map((brand, index) => <BrandSection key={index} brand={brand} />)
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Batteries;

