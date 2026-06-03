import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductDetailView from '@/app/components/ProductDetailView';
import { MOCK_PANELS } from '@/lib/mockPanels';

const DEFAULT_FEATURES = [
  'High-efficiency monocrystalline cells',
  'Weather-resistant aluminium alloy frame',
  'Anti-reflective tempered glass (3.2 mm)',
  '25-year linear performance warranty',
  'IP68-rated junction box',
  'Salt/ammonia corrosion resistance certified',
];

async function getPanel(id) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/products-panels/${id}`, {
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
  const product = await getPanel(id);
  if (!product) return { title: 'Panel Not Found' };
  return {
    title: product.name,
    description: product.description?.slice(0, 155),
  };
}

export default async function PanelDetailPage({ params }) {
  const { id } = await params;

  let product = await getPanel(id);

  if (!product) {
    product = MOCK_PANELS.find((p) => p._id === id) ?? null;
  }

  if (!product) notFound();

  return (
    <>
      <Header />
      <ProductDetailView
        product={product}
        categoryHref="/products?cat=panels"
        categoryLabel="Solar Panels"
        listHref="/products?cat=panels"
        listLabel="All Solar Panels"
        fallbackImage="/Solar Energy.jpg"
        defaultFeatures={DEFAULT_FEATURES}
        ctaTitle="Get a personalised quote for this solar panel"
      />
      <Footer />
    </>
  );
}
