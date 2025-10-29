import React from 'react';
import Link from 'next/link';
import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { headers } from 'next/headers';

async function fetchBattery(id) {
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/batteries/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (e) {
    console.error('Failed to fetch battery', e);
    return null;
  }
}

const BatteryDetail = async ({ params }) => {
  const product = await fetchBattery(params.id);

  if (!product) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <Link href="/batteries" className="btn" style={{ marginTop: '20px' }}>
            Back to Batteries
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const brand = {
    name: product.company?.name || 'Unknown',
    country: product.company?.country || '',
    logo: product.company?.logo || '',
  };

  const specs = Array.isArray(product.specs) ? product.specs : [];
  const features = Array.isArray(product.features) ? product.features : [];

  return (
    <div className="product-detail-page">
      <Header />
      
      <div className="detail-container">
        <div className="header">
          <h1>{product.name || 'Advanced Solar Lithium Battery'}</h1>
        </div>
        
        <div className="product-content">
          <div className="product-image">
            <div className="image-container">
              <img src={product.image || '/batter.png'} alt={product.name || 'Solar Lithium Battery'} />
            </div>
          </div>
          
          <div className="product-details">
            <div className="section">
              <h2>Description</h2>
              <p className="description">
                {product.description || 'Our advanced solar lithium-ion battery provides an efficient solution for storing solar energy. Specifically designed for residential and commercial solar energy systems, this battery ensures maximum utilization of renewable energy, providing clean and sustainable power 24/7.'}
              </p>
            </div>
            
            <div className="section">
              <h2>Key Features</h2>
              <ul className="features">
                {features.length > 0 ? features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                )) : [
                  'High efficiency in solar energy storage',
                  'Long lifespan up to 10 years',
                  'Safe design with multi-level protection',
                  'Fast charging and deep discharge capability',
                  'Compatible with most solar energy systems',
                  'Smart monitoring via mobile applications',
                  'Environmentally friendly and maintenance-free'
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
                        <td>Battery Type</td>
                        <td>Lithium Iron Phosphate (LiFePO4)</td>
                      </tr>
                      <tr>
                        <td>Nominal Capacity</td>
                        <td>5 kWh (expandable)</td>
                      </tr>
                      <tr>
                        <td>Nominal Voltage</td>
                        <td>48V DC</td>
                      </tr>
                      <tr>
                        <td>Cycle Life</td>
                        <td>6000 cycles @ 80% DoD</td>
                      </tr>
                      <tr>
                        <td>Weight</td>
                        <td>45 kg</td>
                      </tr>
                      <tr>
                        <td>Dimensions</td>
                        <td>440 × 410 × 89 mm</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="detail-footer">
          <p>All Rights Reserved © 2023 | Renewable Energy Solutions</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BatteryDetail;