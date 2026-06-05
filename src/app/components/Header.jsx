'use client';

import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import './shared.css';
import { LanguageContext } from '@/app/contexts/LanguageContext';
import { ThemeContext } from '@/app/contexts/ThemeContext';
import { BRANDS, brandLabel, brandProductsHref } from '@/lib/brands';

const ThemeToggleButton = ({ theme, toggleTheme, language, className = '' }) => {
  const isDark = theme !== 'light';
  const label =
    language === 'ar'
      ? isDark
        ? 'التبديل إلى الوضع الفاتح'
        : 'التبديل إلى الوضع الداكن'
      : isDark
        ? 'Switch to light mode'
        : 'Switch to dark mode';

  return (
    <button
      type="button"
      className={`theme-toggle-btn${className ? ` ${className}` : ''}`}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb">
          <svg className="theme-icon theme-icon--sun" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M12 2.4v2.6" />
              <path d="M12 19v2.6" />
              <path d="M2.4 12h2.6" />
              <path d="M19 12h2.6" />
              <path d="M4.9 4.9l1.8 1.8" />
              <path d="M17.3 17.3l1.8 1.8" />
              <path d="M19.1 4.9l-1.8 1.8" />
              <path d="M6.7 17.3l-1.8 1.8" />
            </g>
          </svg>
          <svg className="theme-icon theme-icon--moon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 14.2A8 8 0 1 1 9.8 4 6.4 6.4 0 0 0 20 14.2Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </span>
    </button>
  );
};

const HEADER_FALLBACK = {
  en: {
    home: 'Home',
    about: 'About',
    products: 'Products',
    brands: 'Brands',
    allProducts: 'All Products',
    panels: 'Solar Panels',
    inverters: 'Inverters',
    batteries: 'Batteries',
    projects: 'Projects',
    contact: 'Contact',
  },
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    products: 'المنتجات',
    brands: 'البراندات',
    allProducts: 'كل المنتجات',
    panels: 'الألواح الشمسية',
    inverters: 'المحولات',
    batteries: 'البطاريات',
    projects: 'المشاريع',
    contact: 'اتصل بنا',
  },
};

/** أقسام الصفحة الرئيسية للتمرير (بما فيها معاينة «من نحن») */
const HOME_SCROLL_SECTIONS = ['home', 'about', 'products', 'projects', 'contact'];

const isProductsPath = (path) =>
  path === '/products' ||
  path?.startsWith('/panels') ||
  path?.startsWith('/inverters') ||
  path?.startsWith('/batteries');

const BRAND_CATS = [
  { id: 'all', key: 'allProducts' },
  { id: 'panels', key: 'panels' },
  { id: 'inverters', key: 'inverters' },
  { id: 'batteries', key: 'batteries' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [homeSection, setHomeSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [activeBrand, setActiveBrand] = useState('');
  const brandsRef = useRef(null);
  const [flyoutBrand, setFlyoutBrand] = useState('');
  const closeTimerRef = useRef(null);

  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || 'en';
  const setLanguage = languageContext?.setLanguage;
  const translations = languageContext?.translations;

  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || 'dark';
  const toggleTheme = themeContext?.toggleTheme;
  const headerT =
    translations?.[language]?.header ||
    HEADER_FALLBACK[language] ||
    HEADER_FALLBACK.ar;

  const isHome = pathname === '/';

  const navClass = useCallback(
    (item) => {
      switch (item) {
        case 'home':
          return isHome && homeSection === 'home' ? 'active' : '';
        case 'about':
          if (pathname === '/about') return 'active';
          return isHome && homeSection === 'about' ? 'active' : '';
        case 'products':
          if (pathname === '/products' && activeBrand) return '';
          if (isProductsPath(pathname)) return 'active';
          return isHome && homeSection === 'products' ? 'active' : '';
        case 'brands':
          return pathname === '/products' && activeBrand ? 'active' : '';
        case 'projects':
          return isHome && homeSection === 'projects' ? 'active' : '';
        case 'contact':
          return isHome && homeSection === 'contact' ? 'active' : '';
        default:
          return '';
      }
    },
    [isHome, homeSection, pathname, activeBrand]
  );

  useEffect(() => {
    setActiveBrand(new URLSearchParams(window.location.search).get('brand') || '');
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
    setBrandsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScrolled = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScrolled, { passive: true });
    handleScrolled();
    return () => window.removeEventListener('scroll', handleScrolled);
  }, []);

  const updateHomeSectionFromScroll = useCallback(() => {
    const offset = window.scrollY + 120;
    let current = 'home';
    for (const id of HOME_SCROLL_SECTIONS) {
      const el = document.getElementById(id);
      if (el && offset >= el.offsetTop) {
        current = id;
      }
    }
    setHomeSection(current);
  }, []);

  const applyHashSection = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && HOME_SCROLL_SECTIONS.includes(hash)) {
      setHomeSection(hash);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setHomeSection('home');
    }
  }, []);

  useEffect(() => {
    if (!isHome) return undefined;

    setHomeSection('home');
    applyHashSection();

    const onScroll = () => updateHomeSectionFromScroll();
    const onHashChange = () => applyHashSection();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [isHome, applyHashSection, updateHomeSectionFromScroll]);

  const handleNavClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    setMenuOpen(false);
    setBrandsOpen(false);

    if (href.startsWith('/#')) {
      const hash = href.split('#')[1];
      if (isHome) {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (HOME_SCROLL_SECTIONS.includes(hash)) {
            setHomeSection(hash);
          }
          window.history.replaceState(null, '', `/#${hash}`);
        }
      } else {
        router.push(href);
      }
    } else if (href === '/' && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setHomeSection('home');
      window.history.replaceState(null, '', '/');
    }
  };

  useEffect(() => {
    if (!menuOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!brandsOpen) {
      setFlyoutBrand('');
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (brandsRef.current && !brandsRef.current.contains(event.target)) {
        setBrandsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [brandsOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setBrandsOpen(false);
  };

  const isDesktopNav = () =>
    window.matchMedia('(hover: hover) and (min-width: 993px)').matches;

  const openBrandsOnHover = () => {
    if (!isDesktopNav()) return;
    clearTimeout(closeTimerRef.current);
    setBrandsOpen(true);
    setFlyoutBrand((v) => v || BRANDS[0]?.slug || '');
  };

  const closeBrandsDelayed = () => {
    if (!isDesktopNav()) return;
    closeTimerRef.current = setTimeout(() => setBrandsOpen(false), 130);
  };

  const cancelBrandsClose = () => {
    clearTimeout(closeTimerRef.current);
  };

  const toggleBrands = (e) => {
    e.stopPropagation();
    if (isDesktopNav()) {
      clearTimeout(closeTimerRef.current);
      setBrandsOpen(true);
      setFlyoutBrand((v) => v || BRANDS[0]?.slug || '');
      return;
    }
    setBrandsOpen((v) => !v);
  };

  const toggleMobileBrand = (slug) => {
    setFlyoutBrand((v) => (v === slug ? '' : slug));
  };

  const nextLang = language === 'ar' ? 'en' : 'ar';

  return (
    <>
    <header className={`shared-header${scrolled ? ' scrolled' : ''}`} dir="ltr">
      <div className="shared-container header-container">
        <div className="logo">
          <Link href="/" dir="ltr">
            <img src="/mbsolarlogo.png" alt="MB Solar Power Logo" className="logo-image" />
            <span className="logo-company-name">MB Solar</span>
          </Link>
        </div>
        <nav
          className={menuOpen ? 'menu-open' : ''}
          id="mobile-nav-drawer"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          aria-hidden={!menuOpen}
        >
          <div className="mobile-nav-drawer-head">
            <span className="mobile-nav-drawer-title">
              {language === 'ar' ? 'القائمة' : 'Menu'}
            </span>
            <button
              type="button"
              className="mobile-nav-close"
              aria-label={language === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
              onClick={closeMenu}
            >
              ✕
            </button>
          </div>
          <ul>
            <li>
              <Link href="/" onClick={handleNavClick} className={navClass('home')}>
                {headerT.home || 'Home'}
              </Link>
            </li>
            <li>
              <Link href="/about" className={navClass('about')}>
                {headerT.about || 'About'}
              </Link>
            </li>
            <li>
              <Link href="/products" className={navClass('products')}>
                {headerT.products || 'Products'}
              </Link>
            </li>
            <li
              ref={brandsRef}
              className={`nav-brands-dropdown${brandsOpen ? ' is-open' : ''}`}
              onMouseEnter={openBrandsOnHover}
              onMouseLeave={closeBrandsDelayed}
            >
              <button
                type="button"
                className={`nav-brands-trigger${navClass('brands') ? ' active' : ''}`}
                aria-expanded={brandsOpen}
                aria-haspopup="true"
                onClick={toggleBrands}
              >
                {headerT.brands || 'Brands'}
                <span className="nav-brands-chevron" aria-hidden="true">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <div
                className="nav-brands-panel"
                role="menu"
                onMouseEnter={cancelBrandsClose}
                onMouseLeave={closeBrandsDelayed}
              >
                {/* Left: brand list */}
                <ul className="nav-brands-list" role="none">
                  {BRANDS.map((brand) => (
                    <li
                      key={brand.slug}
                      className={`nav-brands-list-row${flyoutBrand === brand.slug ? ' is-active' : ''}`}
                      onMouseEnter={() => setFlyoutBrand(brand.slug)}
                    >
                      <Link
                        href={brandProductsHref(brand.slug, 'all')}
                        className="nav-brands-list-name"
                        role="menuitem"
                        onClick={() => { setBrandsOpen(false); closeMenu(); }}
                      >
                        {brandLabel(brand, language)}
                      </Link>
                      <button
                        type="button"
                        className="nav-brands-list-toggle"
                        aria-label={brandLabel(brand, language)}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleMobileBrand(brand.slug); }}
                      >
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
                          <path d="M1.5 1.5L5.5 6L1.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <ul className="nav-brands-list-sub" role="none">
                        {BRAND_CATS.map(({ id, key }) => (
                          <li key={`${brand.slug}-${id}`}>
                            <Link
                              href={brandProductsHref(brand.slug, id)}
                              role="menuitem"
                              onClick={() => { setBrandsOpen(false); closeMenu(); }}
                            >
                              {headerT[key] || key}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                {/* Right: categories per brand (desktop only) */}
                <div className="nav-brands-cats" role="none">
                  {BRANDS.map((brand) => (
                    <div
                      key={brand.slug}
                      className={`nav-brands-cats-panel${flyoutBrand === brand.slug ? ' is-active' : ''}`}
                    >
                      <p className="nav-brands-cats-heading">{brandLabel(brand, language)}</p>
                      <ul className="nav-brands-cats-list">
                        {BRAND_CATS.map(({ id, key }) => (
                          <li key={`${brand.slug}-${id}`}>
                            <Link
                              href={brandProductsHref(brand.slug, id)}
                              role="menuitem"
                              onClick={() => { setBrandsOpen(false); closeMenu(); }}
                            >
                              {headerT[key] || key}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link href="/#projects" onClick={handleNavClick} className={navClass('projects')}>
                {headerT.projects || 'Projects'}
              </Link>
            </li>
            <li>
              <Link href="/#contact" onClick={handleNavClick} className={navClass('contact')}>
                {headerT.contact || 'Contact'}
              </Link>
            </li>
          </ul>
          {(setLanguage || toggleTheme) && (
            <div className="mobile-nav-lang">
              {toggleTheme && (
                <ThemeToggleButton
                  theme={theme}
                  toggleTheme={toggleTheme}
                  language={language}
                />
              )}
              {setLanguage && (
                <button
                  type="button"
                  className="lang-switch-btn lang-switch-btn--solo"
                  onClick={() => setLanguage(nextLang)}
                >
                  {nextLang.toUpperCase()}
                </button>
              )}
            </div>
          )}
        </nav>
        <div className="header-actions">
          {toggleTheme && (
            <ThemeToggleButton
              theme={theme}
              toggleTheme={toggleTheme}
              language={language}
              className="theme-toggle-btn--header"
            />
          )}
          {setLanguage && (
            <div className="language-switcher-header">
              <button
                type="button"
                className="lang-switch-btn lang-switch-btn--solo"
                onClick={() => setLanguage(nextLang)}
                aria-label={
                  nextLang === 'en'
                    ? language === 'ar'
                      ? 'التبديل إلى الإنجليزية'
                      : 'Switch to English'
                    : language === 'ar'
                      ? 'التبديل إلى العربية'
                      : 'Switch to Arabic'
                }
              >
                {nextLang.toUpperCase()}
              </button>
            </div>
          )}
        </div>
        <button
          className="mobile-menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={language === 'ar' ? 'فتح القائمة' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
    <button
      type="button"
      className={`mobile-nav-backdrop${menuOpen ? ' is-visible' : ''}`}
      aria-hidden={!menuOpen}
      tabIndex={menuOpen ? 0 : -1}
      aria-label={language === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
      onClick={closeMenu}
    />
    </>
  );
};

export default Header;
