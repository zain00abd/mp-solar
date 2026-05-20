'use client';

import React, { useState, useEffect, useContext, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import './shared.css';
import { LanguageContext } from '@/app/contexts/LanguageContext';

const HEADER_FALLBACK = {
  en: {
    home: 'Home',
    about: 'About',
    products: 'Products',
    projects: 'Projects',
    contact: 'Contact',
  },
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    products: 'المنتجات',
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

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeSection, setHomeSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || 'ar';
  const setLanguage = languageContext?.setLanguage;
  const translations = languageContext?.translations;
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
          if (isProductsPath(pathname)) return 'active';
          return isHome && homeSection === 'products' ? 'active' : '';
        case 'projects':
          return isHome && homeSection === 'projects' ? 'active' : '';
        case 'contact':
          return isHome && homeSection === 'contact' ? 'active' : '';
        default:
          return '';
      }
    },
    [isHome, homeSection, pathname]
  );

  useEffect(() => {
    setMenuOpen(false);
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
    const handleClickOutside = (event) => {
      const nav = document.querySelector('nav');
      const mobileMenu = document.querySelector('.mobile-menu');
      if (menuOpen && nav && !nav.contains(event.target) && !mobileMenu?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const nextLang = language === 'ar' ? 'en' : 'ar';

  return (
    <header className={`shared-header${scrolled ? ' scrolled' : ''}`} dir="ltr">
      <div className="shared-container header-container">
        <div className="logo">
          <Link href="/" dir="ltr">
            <img src="/mbsolarlogo.png" alt="MB Solar Power Logo" className="logo-image" />
            <span className="logo-company-name">MB Solar</span>
          </Link>
        </div>
        <nav className={menuOpen ? 'menu-open' : ''}>
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
        </nav>
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
        <button
          className="mobile-menu"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;
