'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Loader from '@/app/components/Loader';
import { LanguageContext } from '@/app/contexts/LanguageContext';
import { MOCK_INVERTERS } from '@/lib/mockInverters';
import { MOCK_PANELS }    from '@/lib/mockPanels';
import { MOCK_BATTERIES } from '@/lib/mockBatteries';
import './style.css';

/* ─── Translations ─────────────────────────────────────────── */
const T = {
  en: {
    header: { home:'Home', about:'About Us', products:'Products', projects:'Projects', contact:'Contact' },
    title: 'Our Products',
    subtitle: 'Explore our full range of solar energy solutions — panels, inverters, and battery storage systems from leading manufacturers.',
    cats: [
      { id:'all',       label:'All Products' },
      { id:'panels',    label:'Solar Panels' },
      { id:'inverters', label:'Inverters' },
      { id:'batteries', label:'Batteries' },
    ],
    detail: 'View Details',
    quote:  'Request Quote',
    empty:  'No products found.',
    loading:'Loading products…',
    cta: { label:'Have a project?', title:'We\'ll build the right system for you.', btn:'Contact Us' },
    back: 'Back',
    unknownCompany: 'Other manufacturers',
  },
  ar: {
    header: { home:'الرئيسية', about:'من نحن', products:'المنتجات', projects:'المشاريع', contact:'اتصل بنا' },
    title: 'منتجاتنا',
    subtitle: 'تصفح مجموعتنا الكاملة من حلول الطاقة الشمسية — الألواح والمحولات وأنظمة تخزين البطاريات من كبار المصنعين.',
    cats: [
      { id:'all',       label:'كل المنتجات' },
      { id:'panels',    label:'الألواح الشمسية' },
      { id:'inverters', label:'المحولات' },
      { id:'batteries', label:'البطاريات' },
    ],
    detail: 'عرض التفاصيل',
    quote:  'طلب عرض سعر',
    empty:  'لا توجد منتجات.',
    loading:'جاري التحميل…',
    cta: { label:'لديك مشروع؟', title:'سنبني لك النظام المناسب.', btn:'اتصل بنا' },
    back: 'رجوع',
    unknownCompany: 'شركات أخرى',
  },
};

/* ─── Fetch helpers ──────────────────────────────────────────── */
const CACHE_TTL = 600_000;

async function loadCached(key, url) {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.exp > Date.now() && Array.isArray(parsed.data)) return parsed.data;
    }
  } catch {}
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return [];
    const json = await res.json();
    const list = json?.data || [];
    try { localStorage.setItem(key, JSON.stringify({ exp: Date.now() + CACHE_TTL, data: list })); } catch {}
    return list;
  } catch { return []; }
}

const CAT_ORDER = ['panels', 'inverters', 'batteries'];

function companyIdFromProduct(p) {
  const c = p.company;
  if (c && typeof c === 'object' && c._id) return String(c._id);
  if (typeof c === 'string' && c.trim()) return c.trim();
  return '__orphan__';
}

function companyLabelFromProduct(p, unknownLabel) {
  const c = p.company;
  if (c && typeof c === 'object' && c.name) return String(c.name).trim();
  return unknownLabel;
}

/** تجميع المنتجات حسب الشركة ثم الفئة، مع احترام تبويب الفلترة النشط */
function buildCompanyGroups(panels, inverters, batteries, activeCat, unknownLabel, lang) {
  const sources = [];
  if (activeCat === 'all' || activeCat === 'panels') sources.push(['panels', panels]);
  if (activeCat === 'all' || activeCat === 'inverters') sources.push(['inverters', inverters]);
  if (activeCat === 'all' || activeCat === 'batteries') sources.push(['batteries', batteries]);

  const map = new Map();
  for (const [catKey, arr] of sources) {
    for (const raw of arr) {
      const p = { ...raw, _cat: catKey };
      const cid = companyIdFromProduct(p);
      if (!map.has(cid)) {
        map.set(cid, {
          id: cid,
          label: companyLabelFromProduct(p, unknownLabel),
          panels: [],
          inverters: [],
          batteries: [],
        });
      }
      const g = map.get(cid);
      const nm = companyLabelFromProduct(p, unknownLabel);
      if (nm !== unknownLabel) g.label = nm;
      g[catKey].push(p);
    }
  }

  const locale = lang === 'ar' ? 'ar' : 'en';
  return [...map.values()]
    .filter((g) => g.panels.length + g.inverters.length + g.batteries.length > 0)
    .sort((a, b) => a.label.localeCompare(b.label, locale, { sensitivity: 'base' }));
}

/* ─── Product Card ───────────────────────────────────────────── */
function ProductCard({ product, href }) {
  const imgSrc = product?.image || '/Solar Energy.jpg';
  const name   = product?.name  || '—';

  return (
    <Link href={href} className="phub-card">
      <div className="phub-card-img-wrap">
        <img
          src={imgSrc}
          alt={name}
          className="phub-card-img"
          loading="lazy"
          decoding="async"
          onError={(e) => { e.target.src = '/Solar Energy.jpg'; }}
        />
      </div>
      <h3 className="phub-card-name">{name}</h3>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function ProductsHub() {
  const [lang, setLang] = useState('ar');
  const [activeCat, setActiveCat] = useState('all');
  const [panels,    setPanels]    = useState([]);
  const [inverters, setInverters] = useState([]);
  const [batteries, setBatteries] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const tabsRef = useRef(null);

  const t   = T[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  /* fetch all three product types in parallel, fall back to mock data */
  useEffect(() => {
    setLoading(true);
    Promise.all([
      loadCached('cache:panels:list',    '/api/products-panels?isActive=true'),
      loadCached('cache:inverters:list', '/api/inverters?limit=100'),
      loadCached('cache:batteries:list', '/api/batteries?limit=100'),
    ]).then(([p, inv, bat]) => {
      setPanels(p.length    ? p   : MOCK_PANELS);
      setInverters(inv.length ? inv : MOCK_INVERTERS);
      setBatteries(bat.length ? bat : MOCK_BATTERIES);
    }).catch(() => {
      setPanels(MOCK_PANELS);
      setInverters(MOCK_INVERTERS);
      setBatteries(MOCK_BATTERIES);
    }).finally(() => setLoading(false));
  }, []);

  /* products to display based on active category */
  const { items, catLabel } = useMemo(() => {
    let list = [];
    if (activeCat === 'all' || activeCat === 'panels') list = [...list, ...panels.map((p) => ({ ...p, _cat: 'panels' }))];
    if (activeCat === 'all' || activeCat === 'inverters') list = [...list, ...inverters.map((p) => ({ ...p, _cat: 'inverters' }))];
    if (activeCat === 'all' || activeCat === 'batteries') list = [...list, ...batteries.map((p) => ({ ...p, _cat: 'batteries' }))];
    const label = t.cats.find((c) => c.id === activeCat)?.label || '';
    return { items: list, catLabel: label };
  }, [activeCat, panels, inverters, batteries, t]);

  const companyGroups = useMemo(
    () => buildCompanyGroups(panels, inverters, batteries, activeCat, t.unknownCompany, lang),
    [panels, inverters, batteries, activeCat, t.unknownCompany, lang]
  );

  const subCatLabel = (catId) => t.cats.find((c) => c.id === catId)?.label || catId;

  const hrefFor = (p) => {
    if (p._cat === 'panels') return `/panels/${p._id}`;
    if (p._cat === 'inverters') return `/inverters/${p._id}`;
    if (p._cat === 'batteries') return `/batteries/${p._id}`;
    return '#';
  };

  const langCtx = { language: lang, setLanguage: setLang, translations: { en: { header: T.en.header }, ar: { header: T.ar.header } } };

  if (loading) return <Loader full label={t.loading} />;

  return (
    <LanguageContext.Provider value={langCtx}>
      <div className="phub-page" dir={dir}>
        <Header />

        {/* ── Hero / Page Title ── */}
        <section className="phub-hero">
          <div className="phub-hero-bg" aria-hidden="true" />
          <div className="phub-hero-inner phub-container">
            <nav className="phub-breadcrumb" aria-label="breadcrumb">
              <Link href="/">{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link>
              <span aria-hidden="true">›</span>
              <span>{t.title}</span>
            </nav>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
        </section>

        {/* ── Category Tabs ── */}
        <div className="phub-cats-wrap">
          <div className="phub-cats-inner phub-container" ref={tabsRef} role="tablist" aria-label={lang === 'ar' ? 'التصنيفات' : 'Categories'}>
            {t.cats.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCat === cat.id}
                className={`phub-cat${activeCat === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCat(cat.id)}
              >
                {cat.label}
                <span className="phub-cat-count">
                  {cat.id === 'all'       ? panels.length + inverters.length + batteries.length
                   : cat.id === 'panels'    ? panels.length
                   : cat.id === 'inverters' ? inverters.length
                   : batteries.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Products Grid ── */}
        <main className="phub-main phub-container">
          <div className="phub-section-header">
            <h2 className="phub-section-title">{catLabel}</h2>
            <span className="phub-count">{items.length}</span>
          </div>

          {items.length === 0 ? (
            <p className="phub-empty">{t.empty}</p>
          ) : (
            <div className="phub-company-layout">
              {companyGroups.map((group) => (
                <section key={group.id} className="phub-company-block" aria-labelledby={`phub-co-${group.id}`}>
                  <header className="phub-company-head">
                    <h2 id={`phub-co-${group.id}`} className="phub-company-title">
                      {group.label}
                    </h2>
                  </header>
                  {CAT_ORDER.map((ck) => {
                    const list = group[ck];
                    if (!list?.length) return null;
                    return (
                      <div key={`${group.id}-${ck}`} className="phub-subsec">
                        <h3 className="phub-subsec-title">{subCatLabel(ck)}</h3>
                        <div className="phub-grid">
                          {list.map((product) => (
                            <ProductCard
                              key={`${product._cat}-${product._id}`}
                              product={product}
                              href={hrefFor(product)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </section>
              ))}
            </div>
          )}
        </main>

        {/* ── CTA ── */}
        <section className="phub-cta">
          <div className="phub-container phub-cta-inner">
            <div>
              <span className="phub-cta-label">{t.cta.label}</span>
              <h2>{t.cta.title}</h2>
            </div>
            <Link href="/#contact" className="phub-btn phub-btn--gold phub-btn--lg">{t.cta.btn}</Link>
          </div>
        </section>

        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}
