/** البراندات المعتمدة في الهيدر وصفحة المنتجات */
export const BRANDS = [
  {
    slug: 'deye',
    name: { en: 'Deye', ar: 'Deye' },
    match: ['deye'],
  },
  {
    slug: 'felicity',
    name: { en: 'Felicity', ar: 'Felicity' },
    match: ['felicity'],
  },
  {
    slug: 'jenko',
    name: { en: 'Jenko', ar: 'Jenko' },
    match: ['jenko'],
  },
];

export const BRAND_SLUGS = new Set(BRANDS.map((b) => b.slug));

export function getBrandBySlug(slug) {
  if (!slug) return null;
  return BRANDS.find((b) => b.slug === slug) || null;
}

export function brandLabel(brand, lang = 'en') {
  return brand?.name?.[lang] || brand?.name?.en || '';
}

export function companyNameFromProduct(product) {
  const c = product?.company;
  if (c && typeof c === 'object' && c.name) return String(c.name).trim();
  return '';
}

export function productMatchesBrand(product, brandSlug) {
  const brand = getBrandBySlug(brandSlug);
  if (!brand) return true;
  const name = companyNameFromProduct(product).toLowerCase();
  if (!name) return false;
  return brand.match.some((m) => name.includes(String(m).toLowerCase()));
}

export function brandProductsHref(slug, cat) {
  const params = new URLSearchParams({ brand: slug });
  if (cat && cat !== 'all') params.set('cat', cat);
  return `/products?${params.toString()}`;
}
