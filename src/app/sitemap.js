export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com';

  const routes = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/panels`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/inverters`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/batteries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 }
  ];

  const fetchList = async (path) => {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 600 } });
      if (!res.ok) return [];
      const json = await res.json();
      const data = Array.isArray(json?.data) ? json.data : [];
      return data;
    } catch {
      return [];
    }
  };

  const panels = await fetchList('/api/products-panels?limit=100&isActive=true');
  const inverters = await fetchList('/api/inverters?limit=100');
  const batteries = await fetchList('/api/batteries?limit=100');

  const mapItems = (items, prefix) => items.map((item) => ({
    url: `${base}${prefix}/${item._id}`,
    lastModified: item.updatedAt ? new Date(item.updatedAt) : (item.createdAt ? new Date(item.createdAt) : new Date()),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [
    ...routes,
    ...mapItems(panels, '/panels'),
    ...mapItems(inverters, '/inverters'),
    ...mapItems(batteries, '/batteries')
  ];
}