'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import './shared.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
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
        }
      } else {
        // Navigate to homepage with hash
        setMenuOpen(false);
        router.push(href);
      }
    } else {
      // Non-anchor links: just close menu
      setMenuOpen(false);
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

  return (
    <header className="shared-header">
      <div className="container header-container">
        <div className="logo">
          <Link href="/">
            <img src="/logo22.png" alt="MB Solar Power Logo" className="logo-image" />
          </Link>
        </div>
        <nav className={menuOpen ? 'menu-open' : ''}>
          <ul>
            <li><Link href="/" onClick={handleNavClick}>Home</Link></li>
            <li><Link href="/#about" onClick={handleNavClick}>About</Link></li>
            <li><Link href="/#products" onClick={handleNavClick}>Products</Link></li>
            <li><Link href="/#projects" onClick={handleNavClick}>Projects</Link></li>
            <li><Link href="/#contact" onClick={handleNavClick}>Contact</Link></li>
          </ul>
        </nav>
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


