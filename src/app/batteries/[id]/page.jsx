import React from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMockBatteryById } from '@/lib/mockBatteries';
import './style.css';

/* ─── Data ───────────────────────────────────────── */
async function fetchBattery(id) {
  if (id.startsWith('mock-')) return getMockBatteryById(id);
  try {
    const h = await headers();
    const host  = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base  = host
      ? `${proto}://${host}`
      : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/batteries/${id}`, { next: { revalidate: 600 } });
    if (!res.ok) return getMockBatteryById(id);
    const json = await res.json();
    return json?.data || getMockBatteryById(id);
  } catch { return getMockBatteryById(id); }
}

/* ─── Metadata ───────────────────────────────────── */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await fetchBattery(id);
  const base  = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com';
  const title = p?.name ? `${p.name} | MB Solar Power` : 'Solar Battery | MB Solar Power';
  const desc  = p?.description ? String(p.description).slice(0, 160) : 'Advanced lithium battery for solar storage.';
  return {
    title, description: desc,
    alternates: { canonical: `${base}/batteries/${id}` },
    openGraph: { title, description: desc, images: [p?.image || '/Solar Energy.jpg'] },
  };
}

/* ─── Page ───────────────────────────────────────── */
const BatteryDetail = async ({ params }) => {
  const { id } = await params;
  const product = await fetchBattery(id);

  if (!product) {
    return (
      <>
        <Header />
        <div className="pd-not-found">
          <h2>Product not found</h2>
          <Link href="/batteries" className="pd-back-link">← Back to Batteries</Link>
        </div>
        <Footer />
      </>
    );
  }

  const color1   = product.company?.color1 || '#fbbf32';
  const color2   = product.company?.color2 || '#1e3a5f';
  const specs    = Array.isArray(product.specs)    ? product.specs    : [];
  const features = Array.isArray(product.features) ? product.features : [];
  const models   = Array.isArray(product.models)   ? product.models   : [];

  const defaultFeatures = [
    'High-capacity lithium iron phosphate cells',
    'Built-in battery management system (BMS)',
    'Stackable modular design',
    'Compatible with most hybrid inverters',
    'Remote monitoring via mobile app',
    '6000+ charge/discharge cycles',
    'Safe and maintenance-free operation',
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <>
      <Header />
      <div className="pd-page">

        {/* ── Breadcrumb ── */}
        <div className="pd-breadcrumb-wrap">
          <nav className="pd-breadcrumb pd-container" aria-label="breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/batteries">Batteries</Link>
            <span aria-hidden="true">›</span>
            <span>{product.name}</span>
          </nav>
        </div>

        {/* ── Hero ── */}
        <section className="pd-hero pd-container">
          <div className="pd-hero-media">
            <div className="pd-hero-img-frame" style={{ borderColor: `${color1}33` }}>
              <img
                src={product.image || '/Solar Energy.jpg'}
                alt={product.name}
                className="pd-hero-img"
                loading="eager"
                decoding="async"
              />
            </div>
            {product.company && (
              <div className="pd-company-badge">
                {product.company.logo && (
                  <img src={product.company.logo} alt={product.company.name || ''} className="pd-company-logo" />
                )}
                {product.company.name && (
                  <span className="pd-company-name">{product.company.name}</span>
                )}
                {product.company.country && (
                  <span className="pd-company-country">{product.company.country}</span>
                )}
              </div>
            )}
          </div>

          <div className="pd-hero-info">
            <h1 className="pd-product-name" style={{ color: color1 }}>{product.name}</h1>
            <div className="pd-divider" style={{ background: color1, boxShadow: `0 0 18px 3px ${color2}` }} />

            {models.length > 0 && (
              <div className="pd-models">
                {models.map((m, i) => (
                  <span key={i} className="pd-model-chip" style={{ borderColor: color1, color: color1 }}>{m}</span>
                ))}
              </div>
            )}

            {product.description && (
              <p className="pd-description">{product.description}</p>
            )}

            {specs.length > 0 && (
              <div className="pd-spec-chips">
                {specs.map((spec, i) => (
                  <div key={i} className="pd-spec-chip" style={{ background: color2 }}>
                    <span className="pd-spec-label">{spec.label}</span>
                    <span className="pd-spec-value" style={{ color: color1 }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pd-actions">
              <Link href="/#contact" className="pd-btn pd-btn--gold" style={{ background: color1 }}>
                Request Quote
              </Link>
              {product.pdfUrl && (
                <a href={product.pdfUrl} download className="pd-btn pd-btn--ghost">
                  Download Datasheet
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="pd-features-section">
          <div className="pd-container">
            <h2 className="pd-section-title" style={{ '--accent': color1 }}>Key Features</h2>
            <ul className="pd-features-grid">
              {displayFeatures.map((feat, i) => (
                <li key={i} className="pd-feature-item">
                  <svg className="pd-check" style={{ color: color1 }} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pd-cta">
          <div className="pd-container pd-cta-inner">
            <div>
              <p className="pd-cta-label">INTERESTED?</p>
              <h2>Get a personalised quote for this battery</h2>
            </div>
            <div className="pd-cta-btns">
              <Link href="/#contact" className="pd-btn pd-btn--gold" style={{ background: color1 }}>Contact Us</Link>
              <Link href="/batteries" className="pd-btn pd-btn--ghost">← All Batteries</Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default BatteryDetail;
