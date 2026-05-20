'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import {
  LanguageTranslationsProvider,
  useLanguage,
} from '@/app/contexts/LanguageContext';
import {
  Home, Building2, Tractor, PenTool, Wrench, Ship,
  Eye, Target, Trophy, Zap, ShieldCheck, Headphones, Globe,
  TrendingUp, Users, Star, CheckCircle, ArrowRight,
} from 'lucide-react';
import './style.css';

/* ─── Translations ─────────────────────────────────────────── */
const translations = {
  en: {
    header: {
      home: 'Home', about: 'About', products: 'Products',
      projects: 'Projects', contact: 'Contact',
    },
    hero: {
      label: 'ABOUT US',
      title: 'Pioneering Solar Energy',
      titleHighlight: 'with Professionalism',
      sub: 'Founded in 2014, MB Solar has become a trusted leader in solar and renewable energy — delivering innovative, reliable solutions from first inquiry through to long-term after-sales support.',
    },
    stats: [
      { num: '2014', label: 'Founded' },
      { num: '10+',  label: 'Years of Experience' },
      { num: '24/7', label: 'Customer Support' },
      { num: '5+',   label: 'Service Sectors' },
    ],
    overview: {
      label: 'OVERVIEW',
      title: 'Who We Are',
      sub: 'A trusted solar energy pioneer since 2014',
      p1: 'MB Solar was established in 2014 to become a leader in the solar and renewable energy sector — locally and internationally. We focus on delivering innovative and reliable solutions that combine the highest global quality standards with a complete commitment to an exceptional customer experience.',
      p2: 'MB Solar continues to consolidate its position in the local market while executing a gradual expansion toward global markets, staying committed to continuous innovation and the latest technologies to provide effective and sustainable energy solutions.',
      badge: 'Est. 2014',
    },
    vm: {
      label: 'VISION & MISSION',
      title: 'Our Direction',
      sub: 'Clarity of purpose driving every decision we make',
      vision: {
        title: 'Our Vision',
        body: 'To be a leader in the renewable energy sector locally and internationally — through innovation, high quality, and credibility — becoming the first choice for customers in every Syrian governorate, with gradual expansion toward global markets.',
      },
      mission: {
        title: 'Our Mission',
        body: 'Delivering advanced, reliable solar energy solutions to the highest global quality standards, while guaranteeing an exceptional customer experience — because customer satisfaction is not a goal; it is the foundation of our existence.',
      },
    },
    goals: {
      label: 'STRATEGIC GOALS',
      title: 'Our Strategic Objectives',
      sub: 'Six pillars guiding our growth and commitment to excellence',
      items: [
        { title: 'Market Leadership & Coverage',    body: 'Gradual expansion to cover all Syrian governorates — ensuring services and products reach every corner of the country.' },
        { title: 'Global Alignment & Development',  body: 'Tracking the latest global solar technologies and applying them locally to always deliver what is newest and most efficient.' },
        { title: 'Uncompromising Quality',          body: 'World-class products backed by clear, transparent warranties — because customer trust is built through actions.' },
        { title: 'After-Sales Commitment',          body: 'A comprehensive 24/7 support system ensuring every customer receives the follow-up and technical support they deserve.' },
        { title: 'Customer-Centric Culture',        body: 'An institutional culture placing the customer at the heart of every decision, making satisfaction the primary measure of success.' },
        { title: 'Regional & Global Expansion',     body: 'Building an international presence proving that Syrian expertise can compete in the world\'s finest markets.' },
      ],
    },
    services: {
      label: 'SERVICES',
      title: 'What We Offer',
      sub: 'Comprehensive solar energy solutions across every sector',
      items: [
        { title: 'Residential Projects',        body: 'Advanced solar systems for homes to reduce electricity bills and increase energy independence.' },
        { title: 'Commercial & Industrial',     body: 'Custom solutions for companies and factories — high-performance systems designed to cut operational costs.' },
        { title: 'Agricultural Projects',       body: 'Solar systems for irrigation pumps and wells, supporting stable agricultural production sustainably.' },
        { title: 'Engineering Design',          body: 'Comprehensive site assessment and advanced energy-system design using the latest engineering tools.' },
        { title: 'Installation & Maintenance',  body: 'Executing solar projects to the highest safety standards, with periodic maintenance and continuous support.' },
        { title: 'Import & Distribution',       body: 'Importing high-quality solar equipment and distributing solutions reliably and swiftly across all sectors.' },
      ],
    },
    coverage: {
      label: 'COVERAGE',
      title: 'Local & Regional Reach',
      sub: 'MB Solar\'s services span all Syrian governorates, with an ongoing expansion plan into regional and international markets.',
      map1: { tag: 'REGIONAL', title: 'Regional Expansion', body: 'Growing presence across the Arab world and Middle East region.' },
      map2: { tag: 'LOCAL',    title: 'Local Coverage — Syria', body: 'Active in every Syrian governorate, with teams ready to serve across the country.' },
    },
    why: {
      label: 'WHY MB SOLAR',
      title: 'Why Choose Us',
      sub: 'Five reasons our customers trust MB Solar above the rest',
      items: [
        { title: 'Leadership & Experience',  body: 'Years of continuous work have made MB Solar a trusted name in solar energy.' },
        { title: 'Integrated Solutions',     body: 'Complete solar systems for every sector — with full design-to-maintenance support.' },
        { title: 'Quality & Warranty',       body: 'World-standard products backed by clear and transparent warranties.' },
        { title: 'Continuous Support',       body: 'Our team is available 24/7 to ensure continuous performance and complete customer satisfaction.' },
        { title: 'Global Expansion',         body: 'Services covering all Syrian governorates, with expansion plans toward global markets.' },
      ],
    },
    cta: {
      title: 'Ready to Harness Solar Energy?',
      body: 'Our team is ready to design the perfect energy solution for your project — residential, commercial, or industrial.',
      btn1: 'Contact Us',
      btn2: 'View Products',
    },
  },

  ar: {
    header: {
      home: 'الرئيسية', about: 'من نحن', products: 'المنتجات',
      projects: 'المشاريع', contact: 'اتصل بنا',
    },
    hero: {
      label: 'من نحن',
      title: 'ريادة الطاقة الشمسية',
      titleHighlight: 'باحترافية لا تُضاهى',
      sub: 'تأسست شركة المحترف عام 2014 لتصبح علامة موثوقة في قطاع الطاقة الشمسية والمتجددة، تقدم حلولاً مبتكرة وموثوقة من أول استفسار وحتى ما بعد البيع.',
    },
    stats: [
      { num: '٢٠١٤', label: 'سنة التأسيس' },
      { num: '+١٠',  label: 'سنوات من الخبرة' },
      { num: '٢٤/٧', label: 'دعم مستمر' },
      { num: '+٥',   label: 'قطاعات خدمية' },
    ],
    overview: {
      label: 'نبذة',
      title: 'من نحن',
      sub: 'رائد موثوق في الطاقة الشمسية منذ عام 2014',
      p1: 'تأسست شركة المحترف في عام 2014، لتصبح رائدة في قطاع الطاقة الشمسية والطاقة المتجددة على المستوى المحلي والدولي. تركز الشركة على تقديم حلول مبتكرة وموثوقة، تجمع بين أعلى معايير الجودة العالمية والمصداقية، مع التزام كامل بتجربة عملاء استثنائية.',
      p2: 'تعمل شركة المحترف على ترسيخ مكانتها في السوق المحلي، مع خطط توسع تدريجي نحو الأسواق العالمية، مع الالتزام بالابتكار المستمر ومواكبة أحدث التقنيات لضمان تقديم حلول فعالة ومستدامة.',
      badge: 'منذ ٢٠١٤',
    },
    vm: {
      label: 'الرؤية والرسالة',
      title: 'توجهنا',
      sub: 'وضوح الهدف يقود كل قرار نتخذه',
      vision: {
        title: 'رؤيتنا',
        body: 'أن تكون المحترف للطاقة الشمسية رائدة في قطاع الطاقة المتجددة على المستوى المحلي والدولي، من خلال الابتكار، الجودة العالية، والمصداقية، لتصبح الخيار الأول للعملاء في كل محافظة سورية، مع التوسع التدريجي نحو الأسواق العالمية.',
      },
      mission: {
        title: 'رسالتنا',
        body: 'تقديم حلول طاقة شمسية متطورة وموثوقة بأعلى معايير الجودة العالمية، مع ضمان تجربة عملاء استثنائية، لأننا نؤمن إيماناً راسخاً أن رضا العميل ليس هدفاً، بل هو أساس وجودنا.',
      },
    },
    goals: {
      label: 'أهدافنا الاستراتيجية',
      title: 'أهدافنا الاستراتيجية',
      sub: 'ستة محاور تقود نمونا والتزامنا بالتميز',
      items: [
        { title: 'الريادة في السوق والتغطية',          body: 'التوسع التدريجي المدروس ليشمل جميع المحافظات السورية، وضمان وصول خدماتنا إلى كل زاوية في البلاد.' },
        { title: 'المواكبة العالمية والتطوير المستمر',  body: 'رصد أحدث التقنيات والابتكارات في قطاع الطاقة الشمسية عالمياً وتطبيقها محلياً.' },
        { title: 'الجودة والكفالة بلا تنازل',          body: 'توفير منتجات بمواصفات عالمية مدعومة بكفالات حقيقية وشفافة، لأن ثقة العميل تُبنى بالأفعال.' },
        { title: 'خدمة ما بعد البيع — التزام لا ينتهي',body: 'منظومة دعم متكاملة على مدار 24 ساعة، 7 أيام في الأسبوع، لضمان حصول كل عميل على الدعم الذي يستحقه.' },
        { title: 'تبني ثقافة مؤسسية راسخة',            body: 'وضع العميل في قلب كل قرار، وجعل رضاه المعيار الأول لقياس نجاحنا.' },
        { title: 'التوسع الإقليمي والعالمي',            body: 'بناء حضور دولي يُثبت أن الكفاءة السورية قادرة على المنافسة في أرقى الأسواق العالمية.' },
      ],
    },
    services: {
      label: 'خدماتنا',
      title: 'ماذا نقدم',
      sub: 'حلول طاقة شمسية متكاملة لكل القطاعات',
      items: [
        { title: 'المشاريع المنزلية',            body: 'أنظمة شمسية متطورة للمنازل لتقليل فاتورة الكهرباء وزيادة الاستقلالية الطاقية.' },
        { title: 'المشاريع التجارية والصناعية', body: 'حلول مخصصة للشركات والمصانع — أنظمة عالية الأداء لخفض التكاليف التشغيلية.' },
        { title: 'المشاريع الزراعية',           body: 'أنظمة طاقة شمسية لتشغيل مضخات الري والآبار وحلول مستدامة لاستقرار الإنتاج الزراعي.' },
        { title: 'الدراسات والتصميم الهندسي',  body: 'تقييم شامل لموقع العميل واحتياجاته، وتصميم أنظمة بأحدث الأدوات الهندسية.' },
        { title: 'التركيب والصيانة',            body: 'تنفيذ مشاريع الطاقة الشمسية وفق أعلى معايير السلامة والجودة، وصيانة دورية ودعم متواصل.' },
        { title: 'الاستيراد والتوزيع',          body: 'استيراد معدات طاقة شمسية عالية الجودة وتوزيعها لمختلف القطاعات بأسلوب موثوق وسريع.' },
      ],
    },
    coverage: {
      label: 'نطاق التغطية',
      title: 'التوسع المحلي والإقليمي',
      sub: 'تغطي خدمات المحترف جميع المحافظات السورية مع خطط توسع مستمرة نحو الأسواق الإقليمية والدولية.',
      map1: { tag: 'إقليمي', title: 'التوسع الإقليمي',      body: 'حضور متنامٍ في العالم العربي ومنطقة الشرق الأوسط.' },
      map2: { tag: 'محلي',   title: 'التغطية المحلية — سوريا', body: 'نشاط في جميع المحافظات السورية مع فرق جاهزة للخدمة.' },
    },
    why: {
      label: 'لماذا المحترف',
      title: 'لماذا تختارنا',
      sub: 'خمسة أسباب تجعل عملاءنا يثقون بالمحترف',
      items: [
        { title: 'ريادة وخبرة',           body: 'سنوات من العمل المتواصل جعلت من المحترف علامة موثوقة في قطاع الطاقة الشمسية.' },
        { title: 'حلول متكاملة',          body: 'أنظمة شمسية مبتكرة لكل القطاعات مع دعم شامل من التصميم حتى الصيانة.' },
        { title: 'جودة وكفالة بلا تنازل', body: 'منتجات بمعايير عالمية مدعومة بكفالات واضحة وشفافة.' },
        { title: 'دعم متواصل',            body: 'فريقنا متواجد 24/7 لضمان استمرارية الأداء ورضا العميل الكامل.' },
        { title: 'توسع محلي وعالمي',      body: 'خدماتنا تغطي كل المحافظات السورية مع خطط توسع نحو الأسواق العالمية.' },
      ],
    },
    cta: {
      title: 'مستعد لتسخير الطاقة الشمسية؟',
      body: 'فريقنا جاهز لتصميم حل الطاقة المثالي لمشروعك — سواء كان منزلياً أو تجارياً أو صناعياً.',
      btn1: 'اتصل بنا',
      btn2: 'عرض المنتجات',
    },
  },
};

/* ─── SVG Icon map ─────────────────────────────────────────── */
const SVC_ICONS = [Home, Building2, Tractor, PenTool, Wrench, Ship];
const WHY_ICONS = [Trophy, Zap, ShieldCheck, Headphones, Globe];
const GOAL_ICONS = [TrendingUp, Globe, ShieldCheck, Headphones, Users, Star];

/* ─── Section Heading — matches homepage style exactly ──────── */
const SectionHeading = ({ label, title, subtitle }) => (
  <div
    className="ab-sec-heading ab-sec-heading--outer ab-sec-heading--label-only"
    data-label={label ?? ''}
  >
    <h2 className="ab-sr-only">{title}</h2>
    {subtitle && <p className="ab-sec-sub">{subtitle}</p>}
  </div>
);

/* ─── Page ─────────────────────────────────────────────────── */
function AboutPageContent() {
  const { language: lang } = useLanguage();
  const t = translations[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
      <div className="about-page" dir={dir}>
        <Header />

        {/* ── HERO ─────────────────────────────── */}
        <section className="ab-hero">
          <div className="ab-hero-bg" />
          <div className="ab-hero-overlay" />
          <div className="ab-hero-content">
            <div className="ab-container">
              <span className="ab-hero-label">{t.hero.label}</span>
              <h1 className="ab-hero-title">
                {t.hero.title}<br />
                <span>{t.hero.titleHighlight}</span>
              </h1>
              <p className="ab-hero-sub">{t.hero.sub}</p>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────── */}
        <div className="ab-stats">
          <div className="ab-container">
            <div className="ab-stats-grid">
              {t.stats.map((s, i) => (
                <div key={i} className="ab-stat">
                  <div className="ab-stat-num">{s.num}</div>
                  <div className="ab-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── OVERVIEW ─────────────────────────── */}
        <section className="ab-section ab-section--dark2">
          <SectionHeading label={t.overview.label} title={t.overview.title} subtitle={t.overview.sub} />
          <div className="ab-container">
            <div className="ab-overview-layout">
              <div className="ab-overview-text">
                <p className="ab-body-text">{t.overview.p1}</p>
                <p className="ab-body-text">{t.overview.p2}</p>
              </div>
              <div className="ab-overview-img">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80"
                  alt="MB Solar installation"
                />
                <span className="ab-img-badge">{t.overview.badge}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── VISION & MISSION ─────────────────── */}
        <section className="ab-section ab-section--dark2" style={{ paddingTop: 0, paddingBottom: '110px' }}>
          <SectionHeading label={t.vm.label} title={t.vm.title} subtitle={t.vm.sub} />
          <div className="ab-container">
            <div className="ab-vm-grid">
              <div className="ab-vm-card">
                <div className="ab-vm-icon-wrap">
                  <Eye size={26} strokeWidth={1.6} />
                </div>
                <h3 className="ab-vm-title">{t.vm.vision.title}</h3>
                <p className="ab-vm-body">{t.vm.vision.body}</p>
              </div>
              <div className="ab-vm-card">
                <div className="ab-vm-icon-wrap">
                  <Target size={26} strokeWidth={1.6} />
                </div>
                <h3 className="ab-vm-title">{t.vm.mission.title}</h3>
                <p className="ab-vm-body">{t.vm.mission.body}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── GOALS ────────────────────────────── */}
        <section className="ab-section ab-section--dark3">
          <SectionHeading label={t.goals.label} title={t.goals.title} subtitle={t.goals.sub} />
          <div className="ab-container">
            <div className="ab-goals-grid">
              {t.goals.items.map((g, i) => {
                const Icon = GOAL_ICONS[i] || CheckCircle;
                return (
                  <div key={i} className="ab-goal-card">
                    <div className="ab-goal-icon">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <h4 className="ab-goal-title">{g.title}</h4>
                    <p className="ab-goal-body">{g.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────── */}
        <section className="ab-section ab-section--dark2">
          <SectionHeading label={t.services.label} title={t.services.title} subtitle={t.services.sub} />
          <div className="ab-container">
            <div className="ab-svc-grid">
              {t.services.items.map((s, i) => {
                const Icon = SVC_ICONS[i] || CheckCircle;
                return (
                  <div key={i} className="ab-svc-card">
                    <div className="ab-svc-icon">
                      <Icon size={24} strokeWidth={1.6} />
                    </div>
                    <h4 className="ab-svc-title">{s.title}</h4>
                    <p className="ab-svc-body">{s.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── COVERAGE MAPS ────────────────────── */}
        <section className="ab-section ab-section--dark">
          <SectionHeading label={t.coverage.label} title={t.coverage.title} subtitle={t.coverage.sub} />
          <div className="ab-container">
            <div className="ab-maps-grid">
              <div className="ab-map-card">
                <span className="ab-map-tag">{t.coverage.map1.tag}</span>
                <img
                  src="/WhatsApp Image 2026-04-21 at 1.48.30 PM.jpeg"
                  alt={t.coverage.map1.title}
                />
                <div className="ab-map-caption">
                  <h4>{t.coverage.map1.title}</h4>
                  <p>{t.coverage.map1.body}</p>
                </div>
              </div>
              <div className="ab-map-card">
                <span className="ab-map-tag">{t.coverage.map2.tag}</span>
                <img
                  src="/WhatsApp Image 2026-04-21 at 1.48.31 PM.jpeg"
                  alt={t.coverage.map2.title}
                />
                <div className="ab-map-caption">
                  <h4>{t.coverage.map2.title}</h4>
                  <p>{t.coverage.map2.body}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ────────────────────── */}
        <section className="ab-section ab-section--dark3">
          <SectionHeading label={t.why.label} title={t.why.title} subtitle={t.why.sub} />
          <div className="ab-container">
            <div className="ab-why-grid">
              {t.why.items.map((w, i) => {
                const Icon = WHY_ICONS[i] || CheckCircle;
                return (
                  <div key={i} className="ab-why-card">
                    <div className="ab-why-icon">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="ab-why-title">{w.title}</h4>
                    <p className="ab-why-body">{w.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className="ab-cta">
          <div className="ab-container">
            <div className="ab-cta-inner">
              <div className="ab-cta-text">
                <h2 className="ab-cta-title">{t.cta.title}</h2>
                <p className="ab-cta-body">{t.cta.body}</p>
              </div>
              <div className="ab-cta-btns">
                <Link href="/#contact" className="ab-btn-primary">
                  {t.cta.btn1}
                  <ArrowRight size={16} style={{ marginInlineStart: '8px' }} />
                </Link>
                <Link href="/panels" className="ab-btn-outline">{t.cta.btn2}</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
}

export default function AboutPage() {
  return (
    <LanguageTranslationsProvider
      translations={{ en: translations.en, ar: translations.ar }}
    >
      <AboutPageContent />
    </LanguageTranslationsProvider>
  );
}
