import { getDb, COL, docWithId } from '@/lib/firestore';

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
    const db = getDb();
    const snap = await db.collection(COL.inverters).where('isActive', '==', true).get();
    return snap.docs.map((d) => {
      const item = docWithId(d.id, d.data());
      return {
        url: `${base}/inverters/${item._id}`,
        lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(item.createdAt || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    });
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
