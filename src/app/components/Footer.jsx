import React from 'react';
import Link from 'next/link';
import './shared.css';

const Footer = () => {
  return (
    <footer className="shared-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>MB Solar Power</h3>
            <p>Leading provider of solar energy solutions with over 10 years of experience in renewable energy.</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <Link href="/">Home</Link>
            <Link href="/#about">About Us</Link>
            <Link href="/#products">Products</Link>
            <Link href="/#projects">Projects</Link>
          </div>
          <div className="footer-column">
            <h3>Products</h3>
            <Link href="/products">Solar Panels</Link>
            <Link href="/inverters">Inverters</Link>
            <Link href="/batteries">Batteries</Link>
            <a href="#">Accessories</a>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <p>Email: info@mbsolarpower.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Solar Street, Energy City</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 MB Solar Power. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


