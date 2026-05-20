import React from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductDetailView from '../../components/ProductDetailView';
import '../../components/product-detail.css';
import { getMockPanelById } from '@/lib/mockPanels';

async function fetchProduct(id) {
  if (id.startsWith('mock-')) return getMockPanelById(id);
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host
      ? `${proto}://${host}`
      : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/products-panels/${id}`, { next: { revalidate: 600 } });
    if (!res.ok) return getMockPanelById(id);
    const json = await res.json();
    return json?.data || getMockPanelById(id);
  } catch {
    return getMockPanelById(id);
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await fetchProduct(id);
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com';
  const title = p?.name ? `${p.name} | MB Solar Power` : 'Solar Panel | MB Solar Power';
  const desc = p?.description ? String(p.description).slice(0, 160) : 'Premium solar panel.';
  return {
    title,
    description: desc,
    alternates: { canonical: `${base}/panels/${id}` },
    openGraph: { title, description: desc, images: [p?.image || '/Solar Energy.jpg'] },
  };
}

const DEFAULT_FEATURES = [
  'High conversion efficiency',
  'Weather-resistant tempered glass',
  'Easy installation and maintenance',
  '25-year performance warranty',
  'Compatible with all mounting systems',
  'Low-light performance optimisation',
  'Anti-reflective coating technology',
];

export default async function PanelDetail({ params }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return (
      <>
        <Header />
        <div className="pd-page">
          <div className="pd-not-found">
            <h2>Product not found</h2>
            <Link href="/products" className="pd-back-link">
              ← Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ProductDetailView
        product={product}
        categoryHref="/products"
        categoryLabel="Products"
        listHref="/products"
        listLabel="All Products"
        fallbackImage="/Solar Energy.jpg"
        defaultFeatures={DEFAULT_FEATURES}
        ctaTitle="Get a personalised quote for this panel"
      />
      <Footer />
    </>
  );
}
