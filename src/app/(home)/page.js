"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './style.css';
import Header from '@/app/components/Header';
import { LanguageContext } from '@/app/contexts/LanguageContext';

const translations = {
  en: {
    header: {
      home: "Home",
      about: "About",
      products: "Products",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      discoverMore: "Discover More",
      slides: [
        { title: "Pioneering Solar Energy Solutions", subtitle: "For a Resilient and Prosperous World" },
        { title: "Advanced Energy Storage Systems", subtitle: "Power Independence for Home and Business" },
        { title: "Smart Solar Technology", subtitle: "Maximize Efficiency, Minimize Costs" }
      ]
    },
    news: {
      label: "NEWS",
      heading: "Advancing Clean Energy",
      subheading: "Get to know our latest initiatives and updates",
      viewAll: "All Updates +",
      items: [
        { category: "Product News", date: "15 Apr 2026", title: "MB Solar Launches New 600W High-Efficiency Solar Panel Series" },
        { category: "Company News", date: "01 Apr 2026", title: "MB Solar Completes Major 500kW Commercial Installation in Riyadh" },
        { category: "Product News", date: "20 Mar 2026", title: "New Hybrid Inverter Series Now Available with 10-Year Warranty" },
        { category: "Company News", date: "05 Mar 2026", title: "MB Solar Partners with Leading Manufacturers for Enhanced Storage Solutions" },
        { category: "Technical", date: "20 Feb 2026", title: "Advanced MPPT Technology Improves Energy Yield by Up to 30%" }
      ]
    },
    solutions: {
      label: "PRODUCTS",
      heading: "Our Products",
      subheading: "Premium solar equipment for residential and commercial installations",
      browse: "Browse Products",
      items: [
        { title: "Solar Panels", description: "High-efficiency monocrystalline panels with 25-year performance warranty, ideal for any installation" },
        { title: "Inverters", description: "Smart hybrid inverters with MPPT technology for maximum energy conversion and grid independence" },
        { title: "Batteries", description: "Lithium-ion storage systems delivering reliable backup power and round-the-clock energy independence" },
      ]
    },
    featured: {
      badge: "New Hybrid Inverter",
      category: "Three Phase Hybrid Inverter",
      name: "MB-H3-25K-SG",
      specs: [
        "25kW output power with 100% unbalanced load support",
        "Compatible with lithium-ion and lead-acid batteries",
        "Max. 6 units parallel for on-grid and off-grid operation",
        "Built-in WiFi and 4G real-time monitoring",
        "Maximum MPPT efficiency of 99.9%",
        "10-year product warranty included"
      ]
    },
    platform: {
      label: "PLATFORM",
      heading: "MB Solar Platform",
      description: "With MB Solar products you get real-time monitoring and intelligent control. Protecting your investment and maximizing your system's lifetime performance.",
      cta1: "Learn More",
      cta2: "Get Started"
    },
    tech: {
      label: "TECHNOLOGY",
      badge: "Smart Technology",
      heading: "Improving Business Benefits",
      subheading: "Intelligent energy management for commercial and industrial solar systems",
      description: "MB Solar's intelligent energy management system optimizes solar generation, storage, and consumption in real-time. With smart grid compatibility and demand response capabilities, our systems reduce energy costs and improve reliability for commercial and industrial customers."
    },
    contact: {
      label: "CONTACT",
      heading: "Global Online Service",
      emailLabel: "Email (Sales):",
      email: "info@mbsolarpower.com",
      phoneLabel: "Phone (Sales):",
      phone: "+966-XX-XXX-XXXX",
      address: "Riyadh, Saudi Arabia",
      form: {
        name: "Name *",
        phone: "Telephone *",
        company: "Company *",
        address: "Address *",
        email: "Email *",
        message: "Message *",
        send: "SEND"
      }
    },
    footer: {
      tagline: "Professional solar energy solutions for a sustainable future.",
      products: "Products",
      productLinks: [
        { label: "Solar Panels", href: "/panels" },
        { label: "Inverters", href: "/inverters" },
        { label: "Batteries", href: "/batteries" },
        { label: "Accessories", href: "#" }
      ],
      solutions: "Solutions",
      solutionLinks: [
        { label: "Commercial Solar", href: "#" },
        { label: "Commercial Storage", href: "#" },
        { label: "Residential Solar", href: "#" },
        { label: "Residential Storage", href: "#" }
      ],
      support: "Support",
      supportLinks: [
        { label: "Downloads", href: "#" },
        { label: "Service", href: "#" },
        { label: "FAQ", href: "#" }
      ],
      about: "About Us",
      aboutLinks: [
        { label: "About MB Solar", href: "#" },
        { label: "Contact Us", href: "#contact" },
        { label: "Join Us", href: "#" }
      ],
      copyright: "© 2026 MB Solar Power. All rights reserved."
    }
  },
  ar: {
    header: {
      home: "الرئيسية",
      about: "من نحن",
      products: "المنتجات",
      projects: "المشاريع",
      contact: "اتصل بنا"
    },
    hero: {
      discoverMore: "اكتشف المزيد",
      slides: [
        { title: "حلول الطاقة الشمسية الرائدة", subtitle: "لعالم مستدام ومزدهر" },
        { title: "أنظمة تخزين الطاقة المتقدمة", subtitle: "استقلالية الطاقة للمنازل والأعمال" },
        { title: "تقنية الطاقة الشمسية الذكية", subtitle: "أقصى كفاءة وأقل تكاليف" }
      ]
    },
    news: {
      label: "أخبار",
      heading: "دفع التحول للطاقة النظيفة",
      subheading: "تعرف على آخر مبادراتنا ومستجداتنا",
      viewAll: "جميع الأخبار +",
      items: [
        { category: "أخبار المنتجات", date: "١٥ أبريل ٢٠٢٦", title: "MB Solar تطلق سلسلة جديدة من الألواح الشمسية عالية الكفاءة 600W" },
        { category: "أخبار الشركة", date: "١ أبريل ٢٠٢٦", title: "MB Solar تُكمل تركيب منظومة تجارية كبرى بقدرة 500 كيلوواط في الرياض" },
        { category: "أخبار المنتجات", date: "٢٠ مارس ٢٠٢٦", title: "سلسلة المحولات الهجينة الجديدة متوفرة الآن بضمان 10 سنوات" },
        { category: "أخبار الشركة", date: "٥ مارس ٢٠٢٦", title: "MB Solar تتعاون مع كبار المصنعين لتطوير حلول التخزين المتكاملة" },
        { category: "تقني", date: "٢٠ فبراير ٢٠٢٦", title: "تقنية MPPT المتقدمة تحسن إنتاج الطاقة بنسبة تصل إلى 30%" }
      ]
    },
    solutions: {
      label: "منتجات",
      heading: "منتجاتنا",
      subheading: "معدات طاقة شمسية متميزة للتركيبات السكنية والتجارية",
      browse: "تصفح المنتجات",
      items: [
        { title: "الألواح الشمسية", description: "ألواح أحادية البلورة عالية الكفاءة بضمان أداء 25 عاماً، مثالية لأي تركيب" },
        { title: "المحولات", description: "محولات هجينة ذكية بتقنية MPPT لأقصى تحويل للطاقة والاستقلالية عن الشبكة" },
        { title: "البطاريات", description: "أنظمة تخزين ليثيوم أيون توفر طاقة احتياطية موثوقة واستقلالية طاقة على مدار الساعة" },
      ]
    },
    featured: {
      badge: "محول هجين جديد",
      category: "محول هجين ثلاثي الطور",
      name: "MB-H3-25K-SG",
      specs: [
        "طاقة إخراج 25 كيلوواط مع دعم 100% للأحمال غير المتوازنة",
        "متوافق مع بطاريات الليثيوم أيون والرصاص الحمضي",
        "توصيل حتى 6 وحدات للعمل المتزامن على الشبكة وخارجها",
        "واي فاي و4G مدمج للمراقبة الفورية",
        "أقصى كفاءة MPPT بنسبة 99.9%",
        "ضمان المنتج لمدة 10 سنوات كاملة"
      ]
    },
    platform: {
      label: "منصة",
      heading: "منصة MB Solar",
      description: "مع منتجات MB Solar تحصل على مراقبة وتحكم فوري وذكي. حماية استثمارك وتعظيم أداء نظامك على مدى الحياة.",
      cta1: "تعرف أكثر",
      cta2: "ابدأ الآن"
    },
    tech: {
      label: "تقنية",
      badge: "تقنية ذكية",
      heading: "تحسين الفوائد التجارية",
      subheading: "إدارة طاقة ذكية لأنظمة الطاقة الشمسية التجارية والصناعية",
      description: "يقوم نظام إدارة الطاقة الذكي من MB Solar بتحسين توليد الطاقة الشمسية والتخزين والاستهلاك في الوقت الفعلي. مع توافق الشبكة الذكية وقدرات الاستجابة للطلب، تقلل أنظمتنا تكاليف الطاقة وتحسن موثوقية العملاء التجاريين والصناعيين."
    },
    contact: {
      label: "تواصل",
      heading: "خدمة عالمية",
      emailLabel: "البريد الإلكتروني (المبيعات):",
      email: "info@mbsolarpower.com",
      phoneLabel: "هاتف (المبيعات):",
      phone: "+966-XX-XXX-XXXX",
      address: "الرياض، المملكة العربية السعودية",
      form: {
        name: "الاسم *",
        phone: "الهاتف *",
        company: "الشركة *",
        address: "العنوان *",
        email: "البريد الإلكتروني *",
        message: "الرسالة *",
        send: "إرسال"
      }
    },
    footer: {
      tagline: "حلول الطاقة الشمسية المهنية لمستقبل مستدام.",
      products: "المنتجات",
      productLinks: [
        { label: "الألواح الشمسية", href: "/panels" },
        { label: "المحولات", href: "/inverters" },
        { label: "البطاريات", href: "/batteries" },
        { label: "الملحقات", href: "#" }
      ],
      solutions: "الحلول",
      solutionLinks: [
        { label: "الطاقة الشمسية التجارية", href: "#" },
        { label: "التخزين التجاري", href: "#" },
        { label: "الطاقة الشمسية السكنية", href: "#" },
        { label: "التخزين السكني", href: "#" }
      ],
      support: "الدعم",
      supportLinks: [
        { label: "التنزيلات", href: "#" },
        { label: "الخدمة", href: "#" },
        { label: "الأسئلة الشائعة", href: "#" }
      ],
      about: "من نحن",
      aboutLinks: [
        { label: "حول MB Solar", href: "#" },
        { label: "اتصل بنا", href: "#contact" },
        { label: "انضم إلينا", href: "#" }
      ],
      copyright: "© ٢٠٢٦ MB Solar Power. جميع الحقوق محفوظة."
    }
  }
};

/* ─── Section Heading: watermark (data-label) + subtitle; title visible only if hideTitle=false ─ */
const SectionHeading = ({ label, title, subtitle, hideTitle = true }) => {
  const dupA11y = Boolean(
    hideTitle && title && subtitle != null && String(subtitle) === String(title)
  );
  return (
    <div
      className={`mb-sec-heading mb-sec-heading--outer${hideTitle ? ' mb-sec-heading--label-only' : ''}`}
      data-label={label ?? ''}
    >
      {hideTitle && (title || label) && (
        <h2 className="mb-sr-only">{title || label}</h2>
      )}
      {!hideTitle && title != null && title !== '' && (
        <h2 className="mb-sec-title">{title}</h2>
      )}
      {subtitle != null && subtitle !== '' && (
        <p className="mb-sec-sub" aria-hidden={dupA11y || undefined}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

/* ─── Hero Slider ─────────────────────────────────── */
const HeroSlider = ({ t }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = t.hero.slides;
  const bgImages = [
    'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?auto=format&fit=crop&w=1920&q=90',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=90',
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=90'
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="mb-hero" id="home">
      {bgImages.map((src, i) => (
        <div
          key={i}
          className={`mb-hero-bg${i === activeSlide ? ' active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="mb-hero-overlay" />
      <div className="mb-hero-content">
        <h1 key={`t-${activeSlide}`} className="mb-hero-title">{slides[activeSlide].title}</h1>
        <p key={`s-${activeSlide}`} className="mb-hero-subtitle">{slides[activeSlide].subtitle}</p>
        <a href="#contact" className="mb-hero-cta">{t.hero.discoverMore}</a>
      </div>
      <div className="mb-hero-nav">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`mb-hero-dot${i === activeSlide ? ' active' : ''}`}
            onClick={() => setActiveSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

/* ─── News Section ────────────────────────────────── */
const NewsSection = ({ t }) => (
  <section className="mb-news" id="about">
    <SectionHeading label={t.news.label} title={t.news.heading} subtitle={t.news.subheading} />
    <div className="mb-container">
      <div className="mb-news-layout">
        <div className="mb-news-header">
          <a href="#" className="mb-news-all">{t.news.viewAll}</a>
        </div>
        <div className="mb-news-list">
          {t.news.items.map((item, i) => (
            <article key={i} className="mb-news-card">
              <div className="mb-news-meta">
                <span className="mb-news-cat">{item.category}</span>
                <span className="mb-news-date">{item.date}</span>
              </div>
              <h3>{item.title}</h3>
              <span className="mb-news-more">READ MORE +</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── Solutions Section ───────────────────────────── */
const SolutionsSection = ({ t }) => {
  const categories = [
    {
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85',
      href: '/panels',
      title: t.solutions.items[0].title,
      description: t.solutions.items[0].description,
    },
    {
      img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=85',
      href: '/inverters',
      title: t.solutions.items[1].title,
      description: t.solutions.items[1].description,
    },
    {
      img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=85',
      href: '/batteries',
      title: t.solutions.items[2].title,
      description: t.solutions.items[2].description,
    },
  ];

  return (
    <section className="mb-solutions" id="products">
      <SectionHeading
        label={t.solutions.label}
        title={t.solutions.heading}
        subtitle={t.solutions.subheading}
      />
      <div className="mb-sol-grid">
        {categories.map((cat, i) => (
          <a key={i} href={cat.href} className="mb-sol-card">
            {/* Background image */}
            <div
              className="mb-sol-bg"
              style={{ backgroundImage: `url(${cat.img})` }}
            />
            {/* Gradient overlay */}
            <div className="mb-sol-overlay" />
            {/* Text content */}
            <div className="mb-sol-content">
              <h3 className="mb-sol-title">
                {cat.title}
                <span className="mb-sol-arrow">›</span>
              </h3>
              <p className="mb-sol-desc">{cat.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

/* ─── Featured Product ────────────────────────────── */
const FeaturedSection = ({ t }) => (
  <section className="mb-featured" id="projects">
    <div className="mb-container">
      <div className="mb-featured-layout">
        <div className="mb-featured-text">
          <span className="mb-feat-badge">{t.featured.badge}</span>
          <span className="mb-feat-category">{t.featured.category}</span>
          <h2 className="mb-feat-name">{t.featured.name}</h2>
          <ul className="mb-feat-specs">
            {t.featured.specs.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="mb-featured-img">
          <Image src="/inverter3.png" alt="Featured Inverter" width={500} height={400} style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }} />
        </div>
      </div>
    </div>
  </section>
);

/* ─── Platform Section ────────────────────────────── */
const PlatformSection = ({ t }) => (
  <section className="mb-platform">
    <SectionHeading label={t.platform.label} title={t.platform.heading} subtitle={t.platform.description} />
    <div className="mb-platform-inner">
      <div className="mb-platform-btns">
        <a href="#contact" className="mb-plat-btn-primary">{t.platform.cta2}</a>
        <a href="#about" className="mb-plat-btn-outline">{t.platform.cta1}</a>
      </div>
    </div>
  </section>
);

/* ─── Tech Section ────────────────────────────────── */
const TechSection = ({ t }) => (
  <section className="mb-tech">
    <SectionHeading label={t.tech.label} title={t.tech.heading} subtitle={t.tech.subheading} />
    <div className="mb-container">
      <div className="mb-tech-layout">
        <div className="mb-tech-visual">
          <Image src="/Solar Energy.jpg" alt="Smart Solar Technology" width={600} height={450} style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto' }} />
        </div>
        <div className="mb-tech-copy">
          <span className="mb-tech-badge">{t.tech.badge}</span>
          <p className="mb-tech-desc">{t.tech.description}</p>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Contact Section ─────────────────────────────── */
const ContactSection = ({ t }) => {
  const [form, setForm] = useState({
    name: '', phone: '', company: '', address: '', email: '', message: ''
  });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className="mb-contact" id="contact">
      <SectionHeading label={t.contact.label} title={t.contact.heading} subtitle={t.contact.heading} />
      <div className="mb-container">
        <div className="mb-contact-layout">
          <div className="mb-contact-info">
            <div className="mb-contact-item">
              <span className="mb-ci-icon">✉</span>
              <div>
                <p className="mb-ci-label">{t.contact.emailLabel}</p>
                <p className="mb-ci-value">{t.contact.email}</p>
              </div>
            </div>
            <div className="mb-contact-item">
              <span className="mb-ci-icon">☎</span>
              <div>
                <p className="mb-ci-label">{t.contact.phoneLabel}</p>
                <p className="mb-ci-value">{t.contact.phone}</p>
              </div>
            </div>
            <div className="mb-contact-item">
              <span className="mb-ci-icon">◉</span>
              <div>
                <p className="mb-ci-value">{t.contact.address}</p>
              </div>
            </div>
          </div>
          <form className="mb-contact-form" onSubmit={e => e.preventDefault()}>
            <div className="mb-form-row">
              <input name="name" value={form.name} onChange={handleChange} placeholder={t.contact.form.name} required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder={t.contact.form.phone} required />
            </div>
            <input name="company" value={form.company} onChange={handleChange} placeholder={t.contact.form.company} />
            <input name="address" value={form.address} onChange={handleChange} placeholder={t.contact.form.address} />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t.contact.form.email} required />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder={t.contact.form.message} rows={5} />
            <button type="submit">{t.contact.form.send}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ─── Footer ──────────────────────────────────────── */
const FooterSection = ({ t }) => (
  <footer className="mb-footer">
    <div className="mb-container">
      <div className="mb-footer-grid">
        <div className="mb-footer-brand">
          <Image src="/logo22.png" alt="MB Solar" className="mb-footer-logo" width={150} height={60} style={{ objectFit: 'contain' }} />
          <p>{t.footer.tagline}</p>
        </div>
        {[
          { title: t.footer.products, links: t.footer.productLinks },
          { title: t.footer.solutions, links: t.footer.solutionLinks },
          { title: t.footer.support, links: t.footer.supportLinks },
          { title: t.footer.about, links: t.footer.aboutLinks }
        ].map((col, i) => (
          <div key={i} className="mb-footer-col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link, j) => (
                <li key={j}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mb-footer-bottom">
        <p>{t.footer.copyright}</p>
      </div>
    </div>
  </footer>
);

/* ─── Main Page ───────────────────────────────────── */
const MainPage = () => {
  const [language, setLanguage] = useState('en');
  const t = translations[language];
  const langCtx = { language, setLanguage, translations };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={langCtx}>
      <div className="mb-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <HeroSlider t={t} />
        <NewsSection t={t} />
        <SolutionsSection t={t} />
        <FeaturedSection t={t} />
        <PlatformSection t={t} />
        <TechSection t={t} />
        <ContactSection t={t} />
        <FooterSection t={t} />
      </div>
    </LanguageContext.Provider>
  );
};

export default MainPage;
