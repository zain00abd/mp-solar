import React from 'react';
import Link from 'next/link';
import '../../globals.css';
import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { headers } from 'next/headers';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await fetchBattery(id);
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com';
  const title = product?.name ? `${product.name} | MB Solar Power` : 'Solar Battery | MB Solar Power';
  const description = product?.description ? String(product.description).slice(0, 160) : 'Advanced lithium battery for solar energy storage with long lifespan.';
  const url = `${base}/batteries/${id}`;
  const image = product?.image || '/batter.png';
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'MB Solar Power', type: 'product', images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    keywords: ['Solar Battery','MB Solar Power','بطاريات ليثيوم','طاقة شمسية']
  };
}

async function fetchBattery(id) {
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const base = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${base}/api/batteries/${id}`, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    const json = await res.json();
    console.log(json)
    return json?.data || null;
  } catch (e) {
    console.error('Failed to fetch battery', e);
    return null;
  }
}

const BatteryDetail = async ({ params }) => {
  const { id } = await params;
  const product = await fetchBattery(id);

  if (!product) {
    return (
      <div className="bg-[var(--dark-bg)] text-[var(--text-light)] min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Product not found</h2>
          <Link href="/batteries" className="inline-block mt-5 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
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
  const models = Array.isArray(product.models) ? product.models : [];

  const defaultFeatures = [
    'High efficiency in solar energy storage',
    'Long lifespan up to 10 years',
    'Safe design with multi-level protection',
    'Fast charging and deep discharge capability',
    'Compatible with most solar energy systems',
    'Smart monitoring via mobile applications',
    'Environmentally friendly and maintenance-free'
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (

    <>

        <Header />
      <div className="bg-[var(--dark-bg)] text-[var(--text-light)] min-h-screen">

        <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
          {/* Enhanced Grid Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden grid-pattern">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-surface)] via-[var(--dark-card)] to-[var(--dark-surface)] opacity-95"></div>
            <svg aria-hidden="true" className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-[var(--secondary)] stroke-opacity-30">
              <defs>
                <pattern id="enhanced-pattern" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
                  <path d="M40 80V.5M.5 .5H80" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <svg x="50%" y="-1" className="overflow-visible fill-[var(--secondary)] fill-opacity-20">
                <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
              </svg>
              <rect width="100%" height="100%" fill="url(#enhanced-pattern)" strokeWidth="0" />
            </svg>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-2xl">
                  <h1 className="text-center mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl" style={{color:`${product.company?.color1 || '#FFA500'}`}}>
                    {product.name || 'Advanced Solar Lithium Battery'}
                  </h1>
                  {models.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap justify-center gap-2">
                        {models.map((m, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-sm font-semibold border bg-gray-800/50"
                            style={{ borderColor: product.company?.color1 || '#FFA500', color: product.company?.color1 || '#FFA500' }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <h2 className="mt-6 text-lg font-semibold text-[var(--primary)]" style={{color:`white`}}>Description</h2>
                  <p className="mt-2 text-xl/8 text-gray-300">
                    {product.description || 'Our advanced solar lithium-ion battery provides an efficient solution for storing solar energy. Specifically designed for residential and commercial solar energy systems, this battery ensures maximum utilization of renewable energy, providing clean and sustainable power 24/7.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="order-first mb-6 flex justify-center lg:order-none lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden lg:-mt-12 lg:-ml-12 lg:p-12">
              <img
                src={product.image || '/batter.png'}
                alt={product.name || 'Solar Lithium Battery'}
                className="mx-auto w-full max-w-[320px] rounded-xl bg-gray-700 shadow-2xl ring-2 ring-[var(--primary)] ring-opacity-20 lg:max-w-none lg:w-auto"
              />
            </div>

            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-2xl text-base/7 text-gray-300 lg:max-w-2xl">
                  <h2 className="mt-8 text-lg font-semibold text-[var(--primary)]">Key Features</h2>
                  <ul role="list" className="mt-4 space-y-4 text-gray-300">
                    {displayFeatures.map((feature, index) => (
                      <li key={index} className="flex gap-x-3">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 flex-none text-[var(--accent)]" style={{color:`${product.company?.color1 || '#FFA500'}`}}>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-white">Technical Specifications</h2>
                  <div className="mt-6 overflow-hidden rounded-lg bg-gray-900/50 ring-1 ring-gray-700">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-800/50">
                          <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--primary)] uppercase">Parameter</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--primary)] uppercase">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {specs.length > 0 ? specs.map((spec, index) => (
                          <tr key={index} className="hover:bg-gray-800/30 transition">
                            <td className="px-6 py-4 text-sm text-gray-300">{spec.label || 'Specification'}</td>
                            <td className="px-6 py-4 text-sm font-medium text-white">{spec.value || '—'}</td>
                          </tr>
                        )) : (
                          <>
                            <tr className="hover:bg-gray-800/30 transition">
                              <td className="px-6 py-4 text-sm text-gray-300">Battery Type</td>
                              <td className="px-6 py-4 text-sm font-medium text-white">Lithium Iron Phosphate (LiFePO4)</td>
                            </tr>
                            <tr className="hover:bg-gray-800/30 transition">
                              <td className="px-6 py-4 text-sm text-gray-300">Nominal Capacity</td>
                              <td className="px-6 py-4 text-sm font-medium text-white">5 kWh (expandable)</td>
                            </tr>
                            <tr className="hover:bg-gray-800/30 transition">
                              <td className="px-6 py-4 text-sm text-gray-300">Nominal Voltage</td>
                              <td className="px-6 py-4 text-sm font-medium text-white">48V DC</td>
                            </tr>
                            <tr className="hover:bg-gray-800/30 transition">
                              <td className="px-6 py-4 text-sm text-gray-300">Cycle Life</td>
                              <td className="px-6 py-4 text-sm font-medium text-white">6000 cycles @ 80% DoD</td>
                            </tr>
                            <tr className="hover:bg-gray-800/30 transition">
                              <td className="px-6 py-4 text-sm text-gray-300">Weight</td>
                              <td className="px-6 py-4 text-sm font-medium text-white">45 kg</td>
                            </tr>
                            <tr className="hover:bg-gray-800/30 transition">
                              <td className="px-6 py-4 text-sm text-gray-300">Dimensions</td>
                              <td className="px-6 py-4 text-sm font-medium text-white">440 × 410 × 89 mm</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {product.pdfUrl && (
                    <div className="mt-10 flex justify-center">
                      <a
                        href={product.pdfUrl}
                        download
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-black ring-1 ring-[var(--accent)] shadow-[0_6px_24px_rgba(255,215,0,0.25)] hover:shadow-[0_8px_28px_rgba(255,215,0,0.35)] hover:brightness-105 transition"
                      >
                        Download
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
        <Footer />
    </>
  );
};

export default BatteryDetail;