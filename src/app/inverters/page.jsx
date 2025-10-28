import React from 'react';
import './style.css';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import { headers } from 'next/headers';

const PageHeader = () => {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>⚡ Solar Inverters</h1>
          <p>Discover our range of high-efficiency inverters for residential and commercial systems.</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Inverters</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Product Card Component
const ProductCard = ({ product }) => {
  const productId = product?._id;
  const brandName = product?.company?.name || product?.brand || '';
  const brandLogo = product?.company?.logo || product?.brandLogo || '';
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
        <img className="product-image" src={imageUrl} alt={product?.name || 'Inverter'} />
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

        <Link href={`/inverters/${productId}`} className="btn-enhanced">
          View Details
        </Link>
      </div>
    </div>
  );
};

// Brand Section Component
const BrandSection = ({ company, products }) => {
  return (
    <section className="brand-section">
      <div className="container">
        <div className="brand-header">
          <div className="brand-info">
            <div className="brand-details">
              <div className="brand-name-row">
                <div className="brand-logo-circle">
                  <img src={company.logo} alt={company.name} />
                </div>
                <h2>{company.name}</h2>
              </div>
              <p className="brand-country">📍 {company.country}</p>
              {company.description && <p className="brand-description">{company.description}</p>}
            </div>
          </div>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper to group products by company
const groupByCompany = (items) => {
  const map = new Map();
  for (const p of items) {
    const comp = p.company || {};
    const key = comp._id || comp.name || JSON.stringify(comp);
    if (!map.has(key)) {
      map.set(key, { company: comp, products: [] });
    }
    map.get(key).products.push(p);
  }
  return Array.from(map.values());
};

const Inverters = async () => {
  let products = [];
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/inverters?limit=100`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      products = json.data || [];
    }
  } catch (e) {
    console.error('Failed to load inverters', e);
  }

  const grouped = groupByCompany(products);

  return (
    <div className="solar-inverters-page">
      <Header />
      <PageHeader />
      <section className="products-section">
        <div className="container">
          {grouped.length === 0 ? (
            <div className="empty-state">No inverters found.</div>
          ) : (
            grouped.map((g, idx) => (
              <BrandSection key={(g.company?._id || idx)} company={g.company} products={g.products} />
            ))
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Inverters;

