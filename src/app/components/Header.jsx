import React from 'react';
import Link from 'next/link';
import './shared.css';

const Header = () => {
  return (
    <header className="shared-header">
      <div className="container header-container">
        <div className="logo">
          <Link href="/">
            <img src="/logo22.png" alt="MB Solar Power Logo" className="logo-image" />
          </Link>
        </div>
        <div className="mobile-menu">☰</div>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#products">Products</Link></li>
            <li><Link href="/#projects">Projects</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;


