import React from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductDetailView from '../../components/ProductDetailView';
import '../../components/product-detail.css';
import { getMockBatteryById } from '@/lib/mockBatteries';

async function fetchBattery(id) {
  if (id.startsWith('mock-')) return getMockBatteryById(id);
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host
      ? `${proto}://${host}`
      : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/batteries/${id}`, { next: { revalidate: 600 } });
    if (!res.ok) return getMockBatteryById(id);
    const json = await res.json();
    return json?.data || getMockBatteryById(id);
  } catch {
    return getMockBatteryById(id);
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await fetchBattery(id);
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com';
  const title = p?.name ? `${p.name} | MB Solar Power` : 'Solar Battery | MB Solar Power';
  const desc = p?.description ? String(p.description).slice(0, 160) : 'Advanced lithium battery for solar storage.';
  return {
    title,
    description: desc,
    alternates: { canonical: `${base}/batteries/${id}` },
    openGraph: { title, description: desc, images: [p?.image || '/Solar Energy.jpg'] },
  };
}

const DEFAULT_FEATURES = [
  'High-capacity lithium iron phosphate cells',
  'Built-in battery management system (BMS)',
  'Stackable modular design',
  'Compatible with most hybrid inverters',
  'Remote monitoring via mobile app',
  '6000+ charge/discharge cycles',
  'Safe and maintenance-free operation',
];

const BatteryDetail = async ({ params }) => {
  const { id } = await params;
  const product = await fetchBattery(id);

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
        ctaTitle="Get a personalised quote for this battery"
      />
      <Footer />
    </>
  );
};

export default BatteryDetail;
