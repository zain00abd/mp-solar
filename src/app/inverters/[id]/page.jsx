import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductDetailView from '@/app/components/ProductDetailView';
import { MOCK_INVERTERS } from '@/lib/mockInverters';

const DEFAULT_FEATURES = [
  'Wide MPPT voltage range for flexible system design',
  'Built-in monitoring and remote access',
  'IP65 / IP66 weatherproof enclosure',
  'Grid-tied and off-grid operation modes',
  '10-year manufacturer warranty (extendable)',
  'IEC / CE / UL certified',
];

async function getInverter(id) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/inverters/${id}`, {
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
  const product = await getInverter(id);
  if (!product) return { title: 'Inverter Not Found' };
  return {
    title: product.name,
    description: product.description?.slice(0, 155),
  };
}

export default async function InverterDetailPage({ params }) {
  const { id } = await params;

  let product = await getInverter(id);

  if (!product) {
    product = MOCK_INVERTERS.find((p) => p._id === id) ?? null;
  }

  if (!product) notFound();

  return (
    <>
      <Header />
      <ProductDetailView
        product={product}
        categoryHref="/products?cat=inverters"
        categoryLabel="Inverters"
        listHref="/products?cat=inverters"
        listLabel="All Inverters"
        fallbackImage="/inverter3.png"
        defaultFeatures={DEFAULT_FEATURES}
        ctaTitle="Get a personalised quote for this inverter"
      />
      <Footer />
    </>
  );
}
