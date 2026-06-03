"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './style.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import {
  LanguageTranslationsProvider,
  useLanguage,
} from '@/app/contexts/LanguageContext';

const translations = {
  en: {
    header: {
      home: "Home",
      about: "About",
      products: "Products",
      brands: "Brands",
      allProducts: "All Products",
      panels: "Solar Panels",
      inverters: "Inverters",
      batteries: "Batteries",
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
      email: "almuhtarifsolar@gmail.com",
      phoneLabel: "Phone (Sales):",
      phone: "+963 949 338 788",
      whatsapp: "Chat on WhatsApp",
      whatsappAria: "Contact us on WhatsApp",
      address: "Damascus, Syria",
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
      brands: "البراندات",
      allProducts: "كل المنتجات",
      panels: "الألواح الشمسية",
      inverters: "المحولات",
      batteries: "البطاريات",
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
      email: "almuhtarifsolar@gmail.com",
      phoneLabel: "هاتف (المبيعات):",
      phone: "+963 949 338 788",
      whatsapp: "تواصل عبر واتساب",
      whatsappAria: "تواصل معنا عبر واتساب",
      address: "دمشق، سوريا",
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
  <section className="mb-about mb-snap-intro" id="about">
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
  <section className="mb-news mb-snap-free" id="news">
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
      id: 'panels',
      href: '/products?cat=panels',
      title: t.solutions.items[0].title,
      description: t.solutions.items[0].description,
    },
    {
      id: 'inverters',
      href: '/products?cat=inverters',
      title: t.solutions.items[1].title,
      description: t.solutions.items[1].description,
    },
    {
      id: 'batteries',
      href: '/products?cat=batteries',
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
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className={`mb-sol-card mb-sol-card--${cat.id}`}
          >
            <div className="mb-sol-overlay" aria-hidden="true" />
            <div className="mb-sol-content">
              <h3 className="mb-sol-title">
                {cat.title}
                <span className="mb-sol-arrow">›</span>
              </h3>
              <p className="mb-sol-desc">{cat.description}</p>
            </div>
          </Link>
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
            <div className="mb-init4-body">
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

const toWhatsAppUrl = (phone) => {
  const digits = phone.replace(/\D/g, '');
  return digits ? `https://wa.me/${digits}` : '#';
};

/* ─── Contact Section ─────────────────────────────── */
const ContactSection = ({ t }) => {
  const [form, setForm] = useState({
    name: '', phone: '', company: '', address: '', email: '', message: ''
  });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const whatsappHref = toWhatsAppUrl(t.contact.phone);

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
                <p className="mb-ci-value mb-bidi-ltr" dir="ltr">{t.contact.email}</p>
              </div>
            </div>
            <div className="mb-contact-item">
              <span className="mb-ci-icon">☎</span>
              <div>
                <p className="mb-ci-label">{t.contact.phoneLabel}</p>
                <p className="mb-ci-value mb-bidi-ltr" dir="ltr">{t.contact.phone}</p>
                <a
                  href={whatsappHref}
                  className="mb-whatsapp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.contact.whatsappAria}
                >
                  <svg className="mb-whatsapp-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    />
                  </svg>
                  {t.contact.whatsapp}
                </a>
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

/* ─── Main Page ───────────────────────────────────── */
const MainPageContent = () => {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    document.documentElement.classList.add('mb-home-snap');
    return () => document.documentElement.classList.remove('mb-home-snap');
  }, []);

  return (
    <div className="mb-page mb-page--intro-snap" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <HeroSlider t={t} />
      <AboutSection t={t} />
      <NewsSection t={t} />
      <SolutionsSection t={t} />
      <HybridInverterSection t={t} />
      <ProductShowcaseSection t={t} />
      <ContactSection t={t} />
        <Footer />
    </div>
  );
};

const MainPage = () => (
  <LanguageTranslationsProvider translations={translations}>
    <MainPageContent />
  </LanguageTranslationsProvider>
);

export default MainPage;
