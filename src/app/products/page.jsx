import React from 'react';
import Link from 'next/link';
import './style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { headers } from 'next/headers';

const PageHeader = () => (
  <section className="page-header">
    <div className="container">
      <div className="page-header-content">
        <h1>☀ Solar Panels</h1>
        <p>Discover our range of premium solar panels designed for maximum efficiency, durability, and long-term performance.</p>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Solar Panels</span>
        </div>
      </div>
    </div>
  </section>
);

const ProductCard = ({ product }) => {
  const brandName = product?.company?.name || 'Unknown';
  const brandLogo = product?.company?.logo || '/logo22.png';
  const imageUrl = product?.image || '/Solar Energy.jpg';
  const specs = Array.isArray(product?.specs) ? product.specs.slice(0, 4) : [];
  const price = product?.price ?? '—';
  const currency = product?.currency ? ` ${product.currency}` : '';

  return (
    <div className="product-card-enhanced">
      <div className="product-image-container">
        <img className="product-image" src={imageUrl} alt={product?.name || 'Panel'} />
      </div>

      <div className="product-content-enhanced">
        <div className="product-header">
          <h3 className="product-title">{product?.name || 'Unnamed Panel'}</h3>
          <div className="brand-name-row">
            <div className="brand-logo-circle">
              <img src={brandLogo} alt={brandName} />
            </div>
            <div className="product-brand-name">{brandName}</div>
          </div>
        </div>

        {specs.length > 0 && (
          <div className="product-specs-section">
            <h4 className="specs-title">Key Specifications</h4>
            <div className="product-specs-grid">
              <div className="spec-item">
                <span className="spec-value">{specs[0]?.value || '—'}</span>
                <span className="spec-label">{specs[0]?.label || ''}</span>
              </div>
              <div className="spec-divider-vertical"></div>
              <div className="spec-item">
                <span className="spec-value">{specs[1]?.value || '—'}</span>
                <span className="spec-label">{specs[1]?.label || ''}</span>
              </div>
            </div>
            <div className="product-specs-grid">
              <div className="spec-item">
                <span className="spec-value">{specs[2]?.value || '—'}</span>
                <span className="spec-label">{specs[2]?.label || ''}</span>
              </div>
              <div className="spec-divider-vertical"></div>
              <div className="spec-item">
                <span className="spec-value">{specs[3]?.value || '—'}</span>
                <span className="spec-label">{specs[3]?.label || ''}</span>
              </div>
            </div>
          </div>
        )}

        <div className="product-pricing-section">
          <h4 className="pricing-title">Price</h4>
          <div className="product-price-enhanced">
            <span className="price-label">Starting from</span>
            <span className="price-value">${price}{currency}</span>
          </div>
        </div>

        <Link href={`/products/${product?._id}`} className="btn-enhanced">
          View Details
        </Link>
      </div>
    </div>
  );
};

const BrandSection = ({ company, products }) => (
  <section className="brand-section">
    <div className="container">
      <div className="brand-header">
        <div className="brand-info">
          <div className="brand-details">
            <div className="brand-name-row">
              <div className="brand-logo-circle">
                <img src={company.logo || '/logo22.png'} alt={company.name} />
              </div>
              <h2>{company.name}</h2>
            </div>
            <p className="brand-country">📍 {company.country || ''}</p>
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

async function fetchProducts() {
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/products-panels?isActive=true`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch (e) {
    console.error('Failed to fetch products', e);
    return [];
  }
}

function groupByCompany(items) {
  const map = new Map();
  for (const item of items) {
    const company = item.company || {};
    const key = company._id || company.name || 'unknown';
    if (!map.has(key)) {
      map.set(key, { company: { _id: key, name: company.name || 'Unknown', country: company.country || '', logo: company.logo || '' }, products: [] });
    }
    map.get(key).products.push(item);
  }
  return Array.from(map.values()).filter((g) => g.products.length > 0);
}

export default async function SolarPanels() {
  const products = await fetchProducts();
  const grouped = groupByCompany(products);

  return (
    <div className="solar-panels-page">
      <Header />
      <PageHeader />

      <main className="main-content">
        {grouped.length > 0 ? (
          grouped.map((group) => (
            <BrandSection key={group.company._id} company={group.company} products={group.products} />
          ))
        ) : (
          <div className="no-products">
            <p>No solar panels available at the moment.</p>
            <Link href="/admin/add-product" className="add-product-link">
              Add New Product
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

