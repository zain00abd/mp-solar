import React from 'react';
import Link from 'next/link';
import '../../globals.css';
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
  const { id } = await params;
  const product = await fetchInverter(id);

  if (!product) {
    return (
      <div className="bg-gray-800 min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Product not found</h2>
          <Link href="/inverters" className="inline-block mt-5 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
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

  const defaultFeatures = [
    'High conversion efficiency up to 98%',
    'MPPT technology for maximum power tracking',
    'Wi-Fi monitoring and control',
    'Weather-resistant design',
    'Easy installation and maintenance',
    'Compatible with all solar panel types',
    'Advanced safety protection systems'
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <div className="bg-gray-800 min-h-screen">
      <Header />
      
      <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        {/* Enhanced Grid Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden grid-pattern">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 opacity-95"></div>
          <svg aria-hidden="true" className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-blue-500/30">
            <defs>
              <pattern id="enhanced-pattern" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M40 80V.5M.5 .5H80" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <svg x="50%" y="-1" className="overflow-visible fill-blue-500/20">
              <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
            </svg>
            <rect width="100%" height="100%" fill="url(#enhanced-pattern)" strokeWidth="0" />
          </svg>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base/7 font-semibold text-blue-400">Inverter Technology</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                  {product.name || 'Advanced Solar Inverter'}
                </h1>
                <h2 className="mt-6 text-lg font-semibold text-blue-400">Description</h2>
                <p className="mt-2 text-xl/8 text-gray-300">
                  {product.description || 'Our advanced solar inverter provides efficient conversion of DC power from solar panels into usable AC power for your home or business. Designed with cutting-edge technology, this inverter ensures maximum energy harvest and reliable performance.'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img 
              src={product.image || '/inverter3.png'} 
              alt={product.name || 'Solar Inverter'} 
              className="w-3xl max-w-none rounded-xl bg-gray-700 shadow-2xl ring-2 ring-blue-500/20 sm:w-228" 
            />
          </div>
          
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base/7 text-gray-300 lg:max-w-lg">
                <h2 className="mt-8 text-lg font-semibold text-blue-400">Key Features</h2>
                <ul role="list" className="mt-4 space-y-4 text-gray-300">
                  {displayFeatures.map((feature, index) => (
                    <li key={index} className="flex gap-x-3">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 flex-none text-green-400">
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
                        <th className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase">Parameter</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase">Value</th>
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
                            <td className="px-6 py-4 text-sm text-gray-300">Inverter Type</td>
                            <td className="px-6 py-4 text-sm font-medium text-white">String Inverter</td>
                          </tr>
                          <tr className="hover:bg-gray-800/30 transition">
                            <td className="px-6 py-4 text-sm text-gray-300">Rated Power</td>
                            <td className="px-6 py-4 text-sm font-medium text-white">5 kW</td>
                          </tr>
                          <tr className="hover:bg-gray-800/30 transition">
                            <td className="px-6 py-4 text-sm text-gray-300">Max Efficiency</td>
                            <td className="px-6 py-4 text-sm font-medium text-white">98.5%</td>
                          </tr>
                          <tr className="hover:bg-gray-800/30 transition">
                            <td className="px-6 py-4 text-sm text-gray-300">Input Voltage Range</td>
                            <td className="px-6 py-4 text-sm font-medium text-white">90-500V DC</td>
                          </tr>
                          <tr className="hover:bg-gray-800/30 transition">
                            <td className="px-6 py-4 text-sm text-gray-300">Output Voltage</td>
                            <td className="px-6 py-4 text-sm font-medium text-white">230V AC</td>
                          </tr>
                          <tr className="hover:bg-gray-800/30 transition">
                            <td className="px-6 py-4 text-sm text-gray-300">Frequency</td>
                            <td className="px-6 py-4 text-sm font-medium text-white">50/60 Hz</td>
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
      </div>
      
      <Footer />
    </div>
  );
};

export default InverterDetail;