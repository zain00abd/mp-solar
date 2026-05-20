/** الصورة الأساسية أولاً، ثم صور المعرض الإضافية (بدون تكرار) */
export function getProductGallery(product, fallback = '/Solar Energy.jpg') {
  const seen = new Set();
  const out = [];
  const add = (url) => {
    const u = typeof url === 'string' ? url.trim() : '';
    if (!u || seen.has(u)) return;
    seen.add(u);
    out.push(u);
  };

  if (product?.image) add(product.image);

  const extras = Array.isArray(product?.gallery)
    ? product.gallery
    : Array.isArray(product?.images)
      ? product.images
      : [];
  for (const url of extras) add(url);

  if (out.length > 0) return out;
  return [fallback];
}

export function getProductSubtitle(product) {
  if (product?.subtitle) return String(product.subtitle).trim();
  if (product?.shortDescription) return String(product.shortDescription).trim();
  if (product?.description) {
    const line = String(product.description).split(/\n/)[0].trim();
    if (line.length <= 160) return line;
    return `${line.slice(0, 157)}…`;
  }
  return '';
}

export function getProductDownloads(product) {
  const items = [];
  if (product?.pdfUrl) {
    items.push({ label: 'Download Datasheet', url: product.pdfUrl });
  }
  if (product?.manualUrl) {
    items.push({ label: 'Download Manual', url: product.manualUrl });
  }
  if (Array.isArray(product?.downloads)) {
    for (const d of product.downloads) {
      if (d?.url) {
        items.push({
          label: d.label || 'Download',
          url: d.url,
        });
      }
    }
  }
  return items;
}

export function getProductFeatures(product, defaults = []) {
  const features = Array.isArray(product?.features) ? product.features.filter(Boolean) : [];
  return features.length > 0 ? features : defaults;
}
