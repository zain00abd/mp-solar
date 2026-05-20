import React from 'react';
import Link from 'next/link';
import ProductGallery from './ProductGallery';
import {
  getProductGallery,
  getProductSubtitle,
  getProductDownloads,
  getProductFeatures,
} from '@/lib/productDetailUtils';
import './product-detail.css';

export default function ProductDetailView({
  product,
  categoryHref,
  categoryLabel,
  listHref,
  listLabel,
  fallbackImage = '/Solar Energy.jpg',
  defaultFeatures = [],
  ctaTitle = 'Get a personalised quote for this product',
}) {
  const name = product.name || '—';
  const models = Array.isArray(product.models) ? product.models : [];
  const subtitle = getProductSubtitle(product);
  const gallery = getProductGallery(product, fallbackImage);
  const features = getProductFeatures(product, defaultFeatures);
  const downloads = getProductDownloads(product);

  return (
    <div className="pd-page">
      <div className="pd-page-head" aria-hidden="true">
        <div className="pd-container">
          <div className="pd-head-rule" />
        </div>
      </div>

      {/* prodet-1 */}
      <section className="prodet-1">
        <div className="pd-container prodet-1-grid">
          <div className="prodet-1-copy">
            <h2 className="prodet-1-title">{name}</h2>
            {subtitle ? (
              <h6 className="prodet-1-sub">
                <p>{subtitle}</p>
              </h6>
            ) : null}
            {models.length > 0 ? (
              <div className="pd-models">
                {models.map((m, i) => (
                  <h4 key={i} className="prodet-1-desc">
                    {m}
                  </h4>
                ))}
              </div>
            ) : null}
          </div>
          <div className="prodet-1-media">
            <img
              src={product.image || fallbackImage}
              alt={name}
              className="prodet-1-img"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* prodet-3 */}
      <section className="prodet-3">
        <div className="pd-container prodet-3-grid">
          <div className="prodet-3-gallery">
            <ProductGallery images={gallery} alt={name} />
          </div>
          <div className="prodet-3-side">
            <ul className="prodet-3-features">
              {features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
            {downloads.length > 0 ? (
              <div className="prodet-3-downloads">
                <h6>Download area</h6>
                {downloads.map((d, i) => (
                  <a
                    key={i}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &gt;&gt; {d.label} &lt;&lt;
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="pd-cta">
        <div className="pd-container pd-cta-inner">
          <div>
            <p className="pd-cta-label">Interested?</p>
            <h2>{ctaTitle}</h2>
          </div>
          <div className="pd-cta-btns">
            <Link href="/#contact" className="pd-btn pd-btn--gold">
              Contact Us
            </Link>
            <Link href={listHref || categoryHref || '/products'} className="pd-btn pd-btn--ghost">
              ← {listLabel || categoryLabel || 'All Products'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
