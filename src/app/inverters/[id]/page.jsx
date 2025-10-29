import React from 'react';
import Link from 'next/link';
import './style.css';
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

const InverterDetail = async ({ params }) => {
  const product = await fetchInverter(params.id);

  if (!product) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <Link href="/inverters" className="btn" style={{ marginTop: '20px' }}>
            Back to Inverters
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
    <>
      <Header />
    <div className="product-detail-page">
      
      <div className="">
        <div className="header" style={{marginTop: '50px'}}>
          <h1>{product.name || 'Advanced Solar Inverter'}</h1>
        </div>
        
        <div className="product-content">
          <div className="product-image">
            <div className="image-container">
              <img src={product.image || '/inverter3.png'} alt={product.name || 'Solar Inverter'} />
            </div>
          </div>
          
          <div className="product-details">
            <div className="section">
              <h2>Description</h2>
              <p className="description">
                {product.description || 'Our advanced solar inverter provides efficient conversion of DC power from solar panels into usable AC power for your home or business. Designed with cutting-edge technology, this inverter ensures maximum energy harvest and reliable performance.'}
              </p>
            </div>
            
            <div className="section">
              <h2>Key Features</h2>
              <ul className="features">
                {features.length > 0 ? features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                )) : [
                  'High conversion efficiency up to 98%',
                  'MPPT technology for maximum power tracking',
                  'Wi-Fi monitoring and control',
                  'Weather-resistant design',
                  'Easy installation and maintenance',
                  'Compatible with all solar panel types',
                  'Advanced safety protection systems'
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
                        <td>Inverter Type</td>
                        <td>String Inverter</td>
                      </tr>
                      <tr>
                        <td>Rated Power</td>
                        <td>5 kW</td>
                      </tr>
                      <tr>
                        <td>Max Efficiency</td>
                        <td>98.5%</td>
                      </tr>
                      <tr>
                        <td>Input Voltage Range</td>
                        <td>90-500V DC</td>
                      </tr>
                      <tr>
                        <td>Output Voltage</td>
                        <td>230V AC</td>
                      </tr>
                      <tr>
                        <td>Frequency</td>
                        <td>50/60 Hz</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        

      </div>
      
    </div>
      <Footer />
    </>
  );
};

export default InverterDetail;