import { NextResponse } from 'next/server';
import { getDb, COL, findDuplicateCompanyName, findDuplicateNameForCompany, serverTimestampsNew, docWithId } from '@/lib/firestore';

const companiesSeed = [
  {
    name: 'Huawei Solar',
    country: 'China',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Huawei_Standard_logo.svg/320px-Huawei_Standard_logo.svg.png',
    description:
      'Huawei is a global leader in smart photovoltaic and energy storage solutions, delivering reliable and efficient solar inverters worldwide.',
    website: 'https://solar.huawei.com',
    established: 2000,
    color1: 'rgba(220, 38, 38, 1)',
    color2: 'rgba(254, 226, 226, 1)',
    color3: 'rgba(252, 165, 165, 1)',
  },
  {
    name: 'SMA Solar Technology',
    country: 'Germany',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SMA_Solar_Technology_AG_Logo.svg/320px-SMA_Solar_Technology_AG_Logo.svg.png',
    description:
      "SMA Solar Technology AG is one of the world's largest manufacturers of solar inverters, known for quality, performance and reliability.",
    website: 'https://www.sma.de',
    established: 1981,
    color1: 'rgba(22, 163, 74, 1)',
    color2: 'rgba(220, 252, 231, 1)',
    color3: 'rgba(134, 239, 172, 1)',
  },
];

const invertersSeed = [
  {
    companyIndex: 0,
    name: 'Huawei SUN2000-5KTL-M3',
    image: '/inverter3.png',
    pdfUrl:
      'https://solar.huawei.com/en-GB/download?p=/dam/jcr:c9e62e6b-7e47-4a29-a2e1-abcde12345678/SUN2000-5KTL-M3-Datasheet.pdf',
    description:
      'The SUN2000-5KTL-M3 is a high-efficiency residential string inverter from Huawei featuring advanced MPPT tracking, built-in arc fault detection, and seamless integration with the FusionSolar monitoring platform.',
    features: [
      'Dual MPPT for flexible system design',
      'Built-in DC switch and arc fault detection',
      'FusionSolar app monitoring',
      'Smart dongle for cloud connectivity',
      'Wide input voltage range 200–1000 V DC',
    ],
    models: ['SUN2000-5KTL-M3', 'SUN2000-6KTL-M3', 'SUN2000-8KTL-M3'],
    specs: [
      { label: 'Power Rating', value: '5 kW' },
      { label: 'Efficiency', value: '98.6%' },
      { label: 'Warranty', value: '10 Years' },
      { label: 'Type', value: 'String' },
    ],
    tags: ['residential', 'string', 'mppt', 'huawei'],
    warranty: { years: 10, type: 'product' },
    sortOrder: 1,
  },
  {
    companyIndex: 0,
    name: 'Huawei SUN2000-100KTL-M2',
    image: '/inverter3.png',
    pdfUrl:
      'https://solar.huawei.com/en-GB/download?p=/dam/jcr:c9e62e6b-7e47-4a29-a2e1-abcde87654321/SUN2000-100KTL-M2-Datasheet.pdf',
    description:
      'The SUN2000-100KTL-M2 is a commercial-grade three-phase string inverter designed for large-scale solar power plants, offering high power density and intelligent IV curve diagnostics to maximize energy yield.',
    features: [
      '12 MPPTs for complex rooftops',
      'Smart IV curve diagnostics',
      'Active power control and reactive power compensation',
      'IP65 protection rating',
      'Natural cooling with no moving parts',
    ],
    models: ['SUN2000-100KTL-M2', 'SUN2000-110KTL-M2', 'SUN2000-125KTL-M2'],
    specs: [
      { label: 'Power Rating', value: '100 kW' },
      { label: 'Efficiency', value: '99.0%' },
      { label: 'Warranty', value: '10 Years' },
      { label: 'Type', value: 'Three-Phase String' },
    ],
    tags: ['commercial', 'three-phase', 'high-power', 'huawei'],
    warranty: { years: 10, type: 'product' },
    sortOrder: 2,
  },
  {
    companyIndex: 1,
    name: 'SMA Sunny Boy 5.0',
    image: '/inverter3.png',
    pdfUrl: 'https://files.sma.de/downloads/SB5.0-1AV-41-DS-en-24W.pdf',
    description:
      'The Sunny Boy 5.0 is a compact, lightweight single-phase inverter from SMA, perfect for residential rooftop solar systems. It features OptiTracks® global peak tracking and Secure Power Supply for off-grid emergency operation.',
    features: [
      'OptiTracks® global peak MPPT',
      'Secure Power Supply during grid outage',
      'SMA Energy Meter integration',
      'Integrated DC load-break switch',
      'Lightweight design — only 13 kg',
    ],
    models: ['SB 3.0-1AV-41', 'SB 4.0-1AV-41', 'SB 5.0-1AV-41', 'SB 6.0-1AV-41'],
    specs: [
      { label: 'Power Rating', value: '5 kW' },
      { label: 'Efficiency', value: '97.3%' },
      { label: 'Warranty', value: '5 Years' },
      { label: 'Type', value: 'Single-Phase' },
    ],
    tags: ['residential', 'single-phase', 'sma', 'compact'],
    warranty: { years: 5, type: 'product' },
    sortOrder: 1,
  },
  {
    companyIndex: 1,
    name: 'SMA Sunny Tripower 25000TL',
    image: '/inverter3.png',
    pdfUrl: 'https://files.sma.de/downloads/STP25000TL-30-DS-en-25.pdf',
    description:
      'The Sunny Tripower 25000TL is a three-phase commercial string inverter from SMA featuring six MPP trackers, OptiTracks® technology, and an integrated DC switch for commercial and industrial rooftop installations.',
    features: [
      'Six MPP trackers for shade tolerance',
      'OptiTracks® global peak detection',
      'Integrated DC load-break switch',
      'Reactive power supply 24/7',
      'Galvanically isolated transformerless design',
    ],
    models: ['STP 15000TL-30', 'STP 20000TL-30', 'STP 25000TL-30'],
    specs: [
      { label: 'Power Rating', value: '25 kW' },
      { label: 'Efficiency', value: '98.4%' },
      { label: 'Warranty', value: '5 Years' },
      { label: 'Type', value: 'Three-Phase String' },
    ],
    tags: ['commercial', 'three-phase', 'sma', 'industrial'],
    warranty: { years: 5, type: 'product' },
    sortOrder: 2,
  },
];

export async function POST() {
  try {
    const db = getDb();
    const results = { companies: [], inverters: [], skipped: [] };
    const companyDocs = [];

    for (const c of companiesSeed) {
      const existing = await findDuplicateCompanyName(db, c.name, null);
      let id;
      if (existing) {
        results.skipped.push(`Company already exists: ${c.name}`);
        id = existing._id;
      } else {
        const ref = db.collection(COL.companies).doc();
        await ref.set({ ...c, ...serverTimestampsNew() });
        const created = docWithId(ref.id, (await ref.get()).data());
        id = created._id;
        results.companies.push(`Created: ${c.name}`);
      }
      companyDocs.push({ _id: id });
    }

    for (const inv of invertersSeed) {
      const company = companyDocs[inv.companyIndex];
      if (!company) continue;
      const { companyIndex, ...inverterData } = inv;

      const exists = await findDuplicateNameForCompany(db, COL.inverters, company._id, inverterData.name, null);
      if (exists) {
        results.skipped.push(`Inverter already exists: ${inverterData.name}`);
        continue;
      }

      const ref = db.collection(COL.inverters).doc();
      await ref.set({
        ...inverterData,
        company: company._id,
        category: 'inverters',
        isActive: true,
        ...serverTimestampsNew(),
      });
      results.inverters.push(`Created: ${inverterData.name}`);
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
