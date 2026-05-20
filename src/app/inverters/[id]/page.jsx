import React from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductDetailView from '../../components/ProductDetailView';
import '../../components/product-detail.css';
import { getMockInverterById } from '@/lib/mockInverters';

async function fetchInverter(id) {
  if (id.startsWith('mock-')) return getMockInverterById(id);
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host
      ? `${proto}://${host}`
      : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/inverters/${id}`, { next: { revalidate: 600 } });
    if (!res.ok) return getMockInverterById(id);
    const json = await res.json();
    return json?.data || getMockInverterById(id);
  } catch {
    return getMockInverterById(id);
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await fetchInverter(id);
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com';
  const title = p?.name ? `${p.name} | MB Solar Power` : 'Solar Inverter | MB Solar Power';
  const desc = p?.description ? String(p.description).slice(0, 160) : 'High-efficiency solar inverter.';
  return {
    title,
    description: desc,
    alternates: { canonical: `${base}/inverters/${id}` },
    openGraph: { title, description: desc, images: [p?.image || '/inverter3.png'] },
  };
}

const DEFAULT_FEATURES = [
  'High conversion efficiency up to 98%',
  'MPPT technology for maximum power tracking',
  'Wi-Fi monitoring and cloud control',
  'Weather-resistant IP65 rating',
  'Easy installation and maintenance',
  'Compatible with all solar panel types',
  'Advanced protection systems',
];

const InverterDetail = async ({ params }) => {
  const { id } = await params;
  const product = await fetchInverter(id);

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
        fallbackImage="/inverter3.png"
        defaultFeatures={DEFAULT_FEATURES}
        ctaTitle="Get a personalised quote for this inverter"
      />
      <Footer />
    </>
  );
};

export default InverterDetail;
