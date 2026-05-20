"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    about: {
      label: "ABOUT",
      title: "Who We Are",
      sub: "A trusted solar energy pioneer since 2014",
      p1: "MB Solar was established in 2014 to become a leader in the solar and renewable energy sector — locally and internationally. We focus on delivering innovative and reliable solutions that combine the highest global quality standards with a complete commitment to an exceptional customer experience.",
      p2: "MB Solar continues to consolidate its position in the local market while executing a gradual expansion toward global markets, staying committed to continuous innovation and the latest technologies to provide effective and sustainable energy solutions.",
      more: "More +"
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
    hybridInverter: {
      title: "New Hybrid Inverter",
      category: "Three Phase Hybrid Inverter",
      model: "SUN-100/125K-SG02HP3-EU-GM10",
      badge: "hv",
      specs: [
        "100% unbalanced output",
        "AC couple to retrofit existing solar system",
        "Max. 10 pcs parallel for on-grid and off-grid operation; Support multiple batteries parallel",
        "Max. charging/discharging current of 200A",
        "High voltage battery, higher efficiency",
        "6 time periods for battery charging/discharging",
        "Support storing energy from diesel generator",
      ],
      imageAlt: "Three phase hybrid inverter",
    },
    tech: {
      label: "TECHNOLOGY",
      badge: "Smart Technology",
      heading: "Improving Business Benefits",
      subheading: "Intelligent energy management for commercial and industrial solar systems",
      description: "MB Solar's intelligent energy management system optimizes solar generation, storage, and consumption in real-time. With smart grid compatibility and demand response capabilities, our systems reduce energy costs and improve reliability for commercial and industrial customers."
    },
    productShowcase: {
      title: "VSG",
      heading: "Improving Business Benefits",
      description:
        "Deye full series string inverter supports VSG application. When grid failure, the string inverter is able to work with diesel generator directly without any additional EMS device. With this frequency droop feature, Deye string inverter is capable of using in poor grid area.",
      imageAlt: "Hybrid inverter",
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
      contactTitle: "Contact Us",
      locationTitle: "Location",
      support: "Support",
      supportLinks: [
        { label: "Downloads", href: "#" },
        { label: "Service", href: "#" },
        { label: "FAQ", href: "#" }
      ],
      contactLink: "Send a message",
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
    about: {
      label: "من نحن",
      title: "من نحن",
      sub: "رائد موثوق في الطاقة الشمسية منذ عام 2014",
      p1: "تأسست شركة المحترف في عام 2014، لتصبح رائدة في قطاع الطاقة الشمسية والطاقة المتجددة على المستوى المحلي والدولي. تركز الشركة على تقديم حلول مبتكرة وموثوقة، تجمع بين أعلى معايير الجودة العالمية والمصداقية، مع التزام كامل بتجربة عملاء استثنائية.",
      p2: "تعمل شركة المحترف على ترسيخ مكانتها في السوق المحلي، مع خطط توسع تدريجي نحو الأسواق العالمية، مع الالتزام بالابتكار المستمر ومواكبة أحدث التقنيات لضمان تقديم حلول فعالة ومستدامة.",
      more: "المزيد +"
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
    hybridInverter: {
      title: "محول هجين جديد",
      category: "محول هجين ثلاثي الطور",
      model: "SUN-100/125K-SG02HP3-EU-GM10",
      badge: "hv",
      specs: [
        "إخراج 100% للأحمال غير المتوازنة",
        "ربط تيار متردد لتحديث أنظمة الطاقة الشمسية القائمة",
        "حتى 10 وحدات متوازية للعمل على الشبكة وخارجها؛ دعم توصيل عدة بطاريات",
        "أقصى تيار شحن/تفريغ 200 أمبير",
        "بطارية جهد عالي، كفاءة أعلى",
        "6 فترات زمنية لشحن/تفريغ البطارية",
        "دعم تخزين الطاقة من مولد الديزل",
      ],
      imageAlt: "محول هجين ثلاثي الطور",
    },
    tech: {
      label: "تقنية",
      badge: "تقنية ذكية",
      heading: "تحسين الفوائد التجارية",
      subheading: "إدارة طاقة ذكية لأنظمة الطاقة الشمسية التجارية والصناعية",
      description: "يقوم نظام إدارة الطاقة الذكي من MB Solar بتحسين توليد الطاقة الشمسية والتخزين والاستهلاك في الوقت الفعلي. مع توافق الشبكة الذكية وقدرات الاستجابة للطلب، تقلل أنظمتنا تكاليف الطاقة وتحسن موثوقية العملاء التجاريين والصناعيين."
    },
    productShowcase: {
      title: "VSG",
      heading: "تحسين الفوائد التجارية",
      description:
        "تدعم سلسلة محولات Deye لتطبيق VSG. عند انقطاع الشبكة، يمكن للمحول العمل مع مولد الديزل مباشرة دون أي جهاز EMS إضافي. بفضل ميزة انخفاض التردد، يمكن استخدام محول Dye في مناطق الشبكة الضعيفة.",
      imageAlt: "محول هجين",
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
      contactTitle: "تواصل معنا",
      locationTitle: "الموقع",
      support: "الدعم",
      supportLinks: [
        { label: "التنزيلات", href: "#" },
        { label: "الخدمة", href: "#" },
        { label: "الأسئلة الشائعة", href: "#" }
      ],
      contactLink: "أرسل رسالة",
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

/* ─── About Preview Section ───────────────────────── */
const AboutSection = ({ t }) => (
  <section className="mb-about" id="about">
    <SectionHeading label={t.about.label} title={t.about.title} subtitle={t.about.sub} />
    <div className="mb-container">
      <div className="mb-about-layout">
        <div className="mb-about-text">
          <p className="mb-about-p">{t.about.p1}</p>
          <p className="mb-about-p">{t.about.p2}</p>
          <Link href="/about" className="mb-about-more">{t.about.more}</Link>
        </div>
        <div className="mb-about-visual">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80"
            alt="MB Solar installation"
          />
        </div>
      </div>
    </div>
  </section>
);

/* ─── News Section ────────────────────────────────── */
const NewsSection = ({ t }) => (
  <section className="mb-news" id="news">
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

const HYBRID_INVERTER_IMG =
  'https://www.deyeinverter.com/deyeinverter/2026/01/16/init-4-2.png';

/* ─── Hybrid Inverter (Deye init-4 style) ───────── */
const HybridInverterSection = ({ t }) => {
  const hi = t.hybridInverter;

  return (
    <section className="mb-init4" id="projects">
      <div className="mb-container">
        <div className="mb-init4-grid">
          <div className="mb-init4-media">
            <Image
              src={HYBRID_INVERTER_IMG}
              alt={hi.imageAlt}
              width={222}
              height={341}
              className="mb-init4-img"
              sizes="(max-width: 768px) 60vw, 222px"
            />
          </div>
          <div className="mb-init4-copy">
            <h2 className="mb-init4-title">{hi.title}</h2>
            <div className="mb-init4-inner">
              <div className="mb-init4-list">
                <h6 className="mb-init4-category">{hi.category}</h6>
                <h5 className="mb-init4-model">
                  <em>{hi.model}</em>
                </h5>
                <ul>
                  {hi.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-init4-badge">
                <h2 className="mb-init4-badge-title">{hi.badge}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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

const PRODUCT_SHOWCASE_IMG =
  'https://www.deyeinverter.com/template/en/images/init-6-12.png';

/* ─── Product Showcase (Deye-style) ─────────────── */
const ProductShowcaseSection = ({ t }) => {
  const ps = t.productShowcase;

  return (
    <section className="mb-init6">
      <div className="mb-container">
        <div className="mb-init6-grid">
          <div className="mb-init6-left">
            <h2 className="mb-init6-title">{ps.title}</h2>
          </div>
          <div className="mb-init6-right">
            <div className="mb-init6-inner">
              <div className="mb-init6-text">
                <h5 className="mb-init6-heading">{ps.heading}</h5>
                <p className="mb-init6-desc">{ps.description}</p>
              </div>
              <div className="mb-init6-imgbox">
                <div className="mb-init6-img">
                  <Image
                    src={PRODUCT_SHOWCASE_IMG}
                    alt={ps.imageAlt}
                    width={205}
                    height={353}
                    className="mb-init6-img-el"
                    sizes="(max-width: 768px) 55vw, 205px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
      <div className="mb-footer-main">
        <div className="mb-footer-brand">
          <Link href="/" className="mb-footer-logo-link" aria-label="MB Solar — Home">
            <Image
              src="/mbsolarlogo.png"
              alt="MB Solar Power"
              className="mb-footer-logo"
              width={200}
              height={88}
              style={{ objectFit: 'contain', width: 'auto', height: '72px', maxWidth: '100%' }}
            />
          </Link>
          <p className="mb-footer-tagline">{t.footer.tagline}</p>
          <a href="#contact" className="mb-footer-cta">{t.footer.contactLink}</a>
        </div>

        <div className="mb-footer-col mb-footer-contact">
          <h4>{t.footer.contactTitle}</h4>
          <ul className="mb-footer-contact-list">
            <li>
              <span className="mb-footer-contact-label">{t.contact.emailLabel}</span>
              <a href={`mailto:${t.contact.email}`} className="mb-footer-contact-value">
                {t.contact.email}
              </a>
            </li>
            <li>
              <span className="mb-footer-contact-label">{t.contact.phoneLabel}</span>
              <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="mb-footer-contact-value">
                {t.contact.phone}
              </a>
            </li>
            <li>
              <span className="mb-footer-contact-label">{t.footer.locationTitle}</span>
              <span className="mb-footer-contact-value">{t.contact.address}</span>
            </li>
          </ul>
        </div>

        <nav className="mb-footer-col mb-footer-support" aria-label={t.footer.support}>
          <h4>{t.footer.support}</h4>
          <ul>
            {t.footer.supportLinks.map((link, j) => (
              <li key={j}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
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
        <AboutSection t={t} />
        <NewsSection t={t} />
        <SolutionsSection t={t} />
        <HybridInverterSection t={t} />
        <TechSection t={t} />
        <ProductShowcaseSection t={t} />
        <ContactSection t={t} />
        <FooterSection t={t} />
      </div>
    </LanguageContext.Provider>
  );
};

export default MainPage;
