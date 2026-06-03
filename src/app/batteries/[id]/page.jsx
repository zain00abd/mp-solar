import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductDetailView from '@/app/components/ProductDetailView';
import { MOCK_BATTERIES } from '@/lib/mockBatteries';

const DEFAULT_FEATURES = [
  'LiFePO4 lithium chemistry — safe, long-cycle',
  'Built-in BMS with over-charge/discharge protection',
  'Stackable modular design for scalable capacity',
  'Compatible with major hybrid inverter brands',
  '6 000+ charge cycle lifespan',
  '10-year warranty standard',
];

async function getBattery(id) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/batteries/${id}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getBattery(id);
  if (!product) return { title: 'Battery Not Found' };
  return {
    title: product.name,
    description: product.description?.slice(0, 155),
  };
}

export default async function BatteryDetailPage({ params }) {
  const { id } = await params;

  let product = await getBattery(id);

  if (!product) {
    product = MOCK_BATTERIES.find((p) => p._id === id) ?? null;
  }

  if (!product) notFound();

  return (
    <>
      <Header />
      <ProductDetailView
        product={product}
        categoryHref="/products?cat=batteries"
        categoryLabel="Batteries"
        listHref="/products?cat=batteries"
        listLabel="All Batteries"
        fallbackImage="/batter.png"
        defaultFeatures={DEFAULT_FEATURES}
        ctaTitle="Get a personalised quote for this battery system"
      />
      <Footer />
    </>
  );
}
