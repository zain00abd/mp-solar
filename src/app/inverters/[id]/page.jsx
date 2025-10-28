import React from 'react';
import Link from 'next/link';
import '../style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { headers } from 'next/headers';

async function fetchInverter(id) {
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/inverters/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (e) {
    console.error('Failed to fetch inverter', e);
    return null;
  }
}

const ProductDetail = async ({ params }) => {
  const product = await fetchInverter(params.id);

  if (!product) {
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

  const brand = {
    name: product.company?.name || 'Unknown',
    country: product.company?.country || '',
    logo: product.company?.logo || '',
  };

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
            <div className="product-image" style={{ backgroundImage: `url('${product.image || '/placeholder.png'}')`, height: '400px' }}>
            </div>
            <div className="product-content">
              <div className="product-header">
                <h3>{product.name}</h3>
                <div className="brand-name-row">
                  <div className="brand-logo-circle">
                    <img src={brand.logo} alt={brand.name} />
                  </div>
                  <div className="product-brand-name">{brand.name} • {brand.country}</div>
                </div>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-features">
                <h4>✓ Key Features</h4>
                <div className="feature-list">
                  {(product.features || []).map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span className="feature-icon">●</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-specs">
                {(product.specs || []).map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
              <div className="product-footer">
                <div className="product-price">
                  <span className="price-label">Starting from</span>
                  <span className="price-value">${product.price ?? '—'} {product.currency ?? ''}</span>
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

