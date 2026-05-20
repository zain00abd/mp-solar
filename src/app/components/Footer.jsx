'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageContext } from '@/app/contexts/LanguageContext';
import './site-footer.css';

const FOOTER_T = {
  en: {
    tagline: 'Professional solar energy solutions for a sustainable future.',
    contactTitle: 'Contact Us',
    locationTitle: 'Location',
    support: 'Support',
    supportLinks: [
      { label: 'Downloads', href: '#' },
      { label: 'Service', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
    contactLink: 'Send a message',
    copyright: '© 2026 MB Solar Power. All rights reserved.',
    emailLabel: 'Email (Sales):',
    email: 'info@mbsolarpower.com',
    phoneLabel: 'Phone (Sales):',
    phone: '+966-XX-XXX-XXXX',
    address: 'Riyadh, Saudi Arabia',
    homeAria: 'MB Solar — Home',
  },
  ar: {
    tagline: 'حلول الطاقة الشمسية المهنية لمستقبل مستدام.',
    contactTitle: 'تواصل معنا',
    locationTitle: 'الموقع',
    support: 'الدعم',
    supportLinks: [
      { label: 'التنزيلات', href: '#' },
      { label: 'الخدمة', href: '#' },
      { label: 'الأسئلة الشائعة', href: '#' },
    ],
    contactLink: 'أرسل رسالة',
    copyright: '© 2026 MB Solar Power. جميع الحقوق محفوظة.',
    emailLabel: 'البريد الإلكتروني (المبيعات):',
    email: 'info@mbsolarpower.com',
    phoneLabel: 'هاتف (المبيعات):',
    phone: '+966-XX-XXX-XXXX',
    address: 'الرياض، المملكة العربية السعودية',
    homeAria: 'MB Solar — الرئيسية',
  },
};

export default function Footer() {
  const ctx = useContext(LanguageContext);
  const lang = ctx?.language === 'ar' ? 'ar' : 'en';
  const t = FOOTER_T[lang];
  const phoneHref = `tel:${t.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="mb-footer">
      <div className="mb-container">
        <div className="mb-footer-main">
          <div className="mb-footer-brand">
            <Link href="/" className="mb-footer-logo-link" aria-label={t.homeAria}>
              <Image
                src="/mbsolarlogo.png"
                alt="MB Solar Power"
                className="mb-footer-logo"
                width={200}
                height={88}
                style={{ objectFit: 'contain', width: 'auto', height: '72px', maxWidth: '100%' }}
              />
            </Link>
            <p className="mb-footer-tagline">{t.tagline}</p>
            <Link href="/#contact" className="mb-footer-cta">
              {t.contactLink}
            </Link>
          </div>

          <div className="mb-footer-col mb-footer-contact">
            <h4>{t.contactTitle}</h4>
            <ul className="mb-footer-contact-list">
              <li>
                <span className="mb-footer-contact-label">{t.emailLabel}</span>
                <a href={`mailto:${t.email}`} className="mb-footer-contact-value">
                  {t.email}
                </a>
              </li>
              <li>
                <span className="mb-footer-contact-label">{t.phoneLabel}</span>
                <a href={phoneHref} className="mb-footer-contact-value">
                  {t.phone}
                </a>
              </li>
              <li>
                <span className="mb-footer-contact-label">{t.locationTitle}</span>
                <span className="mb-footer-contact-value">{t.address}</span>
              </li>
            </ul>
          </div>

          <nav className="mb-footer-col mb-footer-support" aria-label={t.support}>
            <h4>{t.support}</h4>
            <ul>
              {t.supportLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mb-footer-bottom">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
