'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import './shared.css';
import { LanguageContext } from '@/app/contexts/LanguageContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Get language context (only on home page)
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || 'en';
  const setLanguage = languageContext?.setLanguage || (() => {});
  const translations = languageContext?.translations || { en: {}, ar: {} };
  const t = translations[language] || {};
  const headerT = t.header || {};

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Track scroll position for transparent → solid header transition
  useEffect(() => {
    const handleScrolled = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScrolled);
    handleScrolled();
    return () => window.removeEventListener('scroll', handleScrolled);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        const sections = ['home', 'about', 'products', 'projects', 'contact'];
        const scrollPosition = window.scrollY + 120;
        let currentSection = 'home';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element && scrollPosition >= element.offsetTop) {
            currentSection = section;
          }
        }
        setActiveSection(currentSection);
      }
    };

    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Smooth scroll on homepage, navigate otherwise
  const handleNavClick = (e) => {
    const href = e.currentTarget.getAttribute('href');

    if (!href) return;

    // Handle anchor links like /#about
    if (href.startsWith('/#')) {
      const isHome = pathname === '/';
      const hash = href.split('#')[1];

      if (isHome) {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) {
          window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
          setMenuOpen(false);
          setActiveSection(hash);
        }
      } else {
        // Navigate to homepage with hash
        setMenuOpen(false);
        router.push(href);
      }
    } else {
      // Non-anchor links: just close menu
      setMenuOpen(false);
      if (href === '/') {
        setActiveSection('home');
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('nav');
      const mobileMenu = document.querySelector('.mobile-menu');
      if (menuOpen && nav && !nav.contains(event.target) && !mobileMenu.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const getNavItemClass = (section) => {
    return activeSection === section ? 'active' : '';
  };

  return (
    <header className={`shared-header${scrolled ? ' scrolled' : ''}`}>
      <div className="shared-container header-container">
        <div className="logo">
          <Link href="/">
            <img src="/mbsolarlogo.png" alt="MB Solar Power Logo" className="logo-image" />
            <span className="logo-company-name">MB Solar</span>
          </Link>
        </div>
        <nav className={menuOpen ? 'menu-open' : ''}>
          <ul>
            <li><Link href="/" onClick={handleNavClick} className={getNavItemClass('home')}>{headerT.home || 'Home'}</Link></li>
            <li><Link href="/about" onClick={handleNavClick} className={pathname === '/about' ? 'active' : getNavItemClass('about')}>{headerT.about || 'About'}</Link></li>
            <li><Link href="/#products" onClick={handleNavClick} className={getNavItemClass('products')}>{headerT.products || 'Products'}</Link></li>
            <li><Link href="/#projects" onClick={handleNavClick} className={getNavItemClass('projects')}>{headerT.projects || 'Projects'}</Link></li>
            <li><Link href="/#contact" onClick={handleNavClick} className={getNavItemClass('contact')}>{headerT.contact || 'Contact'}</Link></li>
          </ul>
        </nav>
        {languageContext && (
          <div className="language-switcher-header">
            <button
              onClick={() => setLanguage('en')}
              style={{
                background: language === 'en' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                fontWeight: language === 'en' ? 'bold' : 'normal'
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ar')}
              style={{
                background: language === 'ar' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                fontWeight: language === 'ar' ? 'bold' : 'normal'
              }}
            >
              AR
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









