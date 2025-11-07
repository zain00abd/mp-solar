import React from 'react';
import Link from 'next/link';
import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { headers } from 'next/headers';

async function fetchProduct(id) {
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/products-panels/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (e) {
    console.error('Failed to load product', e);
    return null;
  }
}

const PanelDetail = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <Link href="/panels" className="btn" style={{ marginTop: '20px' }}>
            Back to Solar Panels
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const brand = {
    name: product.company?.name || 'Unknown',
    country: product.company?.country || '',
    logo: product.company?.logo || '/logo22.png',
  };

  const specs = Array.isArray(product.specs) ? product.specs : [];
  const features = Array.isArray(product.features) ? product.features : [];

  return (
    <div className="product-detail-page">
      <Header />
      
      <div className="detail-container">
        <div className="header">
          <h1>{product.name || 'Advanced Solar Panel'}</h1>
        </div>
        
        <div className="product-content">
          <div className="product-image">
            <div className="image-container">
              <img src={product.image || '/Solar Energy.jpg'} alt={product.name || 'Solar Panel'} />
            </div>
          </div>
          
          <div className="product-details">
            <div className="section">
              <h2>Description</h2>
              <p className="description">
                {product.description || 'Our advanced solar panel provides exceptional energy conversion efficiency and long-term reliability. Designed with cutting-edge photovoltaic technology, this panel delivers maximum power output while maintaining excellent performance in various weather conditions.'}
              </p>
            </div>
            
            <div className="section">
              <h2>Key Features</h2>
              <ul className="features">
                {features.length > 0 ? features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                )) : [
                  'High conversion efficiency up to 22%',
                  'Weather-resistant tempered glass',
                  'Easy installation and maintenance',
                  '25-year performance warranty',
                  'Compatible with all mounting systems',
                  'Low light performance optimization',
                  'Anti-reflective coating technology'
                ].map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="section">
              <h2>Technical Specifications</h2>
              <table className="specs-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec, index) => (
                    <tr key={index}>
                      <td>{spec.label || 'Specification'}</td>
                      <td>{spec.value || '—'}</td>
                    </tr>
                  ))}
                  {specs.length === 0 && (
                    <>
                      <tr>
                        <td>Panel Type</td>
                        <td>Monocrystalline Silicon</td>
                      </tr>
                      <tr>
                        <td>Rated Power</td>
                        <td>400W</td>
                      </tr>
                      <tr>
                        <td>Module Efficiency</td>
                        <td>22.0%</td>
                      </tr>
                      <tr>
                        <td>Maximum Voltage</td>
                        <td>41.2V</td>
                      </tr>
                      <tr>
                        <td>Maximum Current</td>
                        <td>9.71A</td>
                      </tr>
                      <tr>
                        <td>Dimensions</td>
                        <td>2108 × 1048 × 35 mm</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PanelDetail;