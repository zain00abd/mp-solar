import connectDB from '@/lib/mongodb';
import Inverter from '@/models/Inverter';
import Company from '@/models/Company';

export const dynamic = 'force-dynamic';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com';

const staticRoutes = [
  { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  { url: `${base}/panels`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${base}/inverters`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${base}/batteries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
];

async function fetchInverterUrls() {
  try {
    await connectDB();
    const items = await Inverter.find({ isActive: true }, '_id updatedAt createdAt').lean().limit(500);
    return items.map((item) => ({
      url: `${base}/inverters/${item._id}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(item.createdAt || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  try {
    const inverterUrls = await fetchInverterUrls();
    return [...staticRoutes, ...inverterUrls];
  } catch {
    return staticRoutes;
  }
}
