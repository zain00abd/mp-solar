"use client";
import React, { useState, useEffect } from 'react';
import './style.css';
import Header from '@/app/components/Header';
import { LanguageContext } from '@/app/contexts/LanguageContext';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Translations
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
      title: "Power Your Future with",
      titleHighlight: "Clean Energy",
      description: "Transform your home or business with premium solar solutions. Experience energy independence, reduce costs, and contribute to a sustainable future.",
      getStarted: "Get started",
      exploreMore: "Explore more"
    },
    about: {
      title: "About MB",
      titleHighlight: "Solar Power",
      description1: "With over 14 years of experience in the renewable energy industry, MB Solar Power has established itself as a leading provider of solar energy solutions. Our commitment to quality, innovation, and customer satisfaction sets us apart.",
      description2: "We specialize in designing and installing customized solar systems that maximize energy production and return on investment for our clients.",
      features: {
        expert: {
          title: "Expert Team",
          description: "Certified professionals with extensive solar industry experience"
        },
        quality: {
          title: "Quality Products",
          description: "We use only premium components from trusted manufacturers"
        },
        service: {
          title: "Full Service",
          description: "From consultation to installation and maintenance"
        }
      }
    },
    products: {
      title: "Our",
      titleHighlight: "Products",
      subtitle: "Discover a wide range of high-quality solar energy products",
      browseProducts: "Browse Products",
      availableFrom: "Available from",
      categories: {
        solarPanels: {
          title: "Solar Panels",
          description: "High-efficiency solar panels with a 25-year warranty, perfect for residential and commercial use"
        },
        inverters: {
          title: "Inverters",
          description: "Smart hybrid inverters with MPPT technology for maximum efficiency and exceptional performance"
        },
        batteries: {
          title: "Batteries",
          description: "Lithium-ion batteries for energy storage with a lifespan of over 10 years"
        }
      }
    },
    projects: {
      title: "Completed",
      titleHighlight: "Projects",
      subtitle: "Explore some of our successful solar installations for residential and commercial clients",
      systemCapacity: "System Capacity:"
    },
    whyChoose: {
      title: "Why Choose",
      titleHighlight: "MB Solar?",
      description: "With decades of combined experience, industry-leading technology, and a commitment to customer satisfaction, we deliver solar solutions that exceed expectations. Our end-to-end service ensures a seamless transition to clean energy.",
      stats: {
        satisfaction: "Satisfaction",
        support: "Support",
        warranty: "Warranty",
        rated: "Rated"
      }
    },
    cta: {
      title: "Ready to Go Solar?",
      description: "Contact us today for a free consultation and quote. Our experts will help you design the perfect solar solution for your needs.",
      button: "Contact Us Now"
    },
    footer: {
      tagline: "Professional solar energy solutions for a sustainable future.",
      ourProducts: "Our Products",
      contactUs: "Contact Us",
      copyright: "© 2023 MB Solar Power. All rights reserved."
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
      title: "شغّل مستقبلك بـ",
      titleHighlight: "الطاقة النظيفة",
      description: "حوّل منزلك أو عملك بحلول الطاقة الشمسية المميزة. استمتع بالاستقلال في الطاقة، قلل التكاليف، وساهم في مستقبل مستدام.",
      getStarted: "ابدأ الآن",
      exploreMore: "استكشف المزيد"
    },
    about: {
      title: "حول",
      titleHighlight: "MB Solar Power",
      description1: "مع أكثر من 14 سنوات من الخبرة في صناعة الطاقة المتجددة، أصبحت MB Solar Power مزودًا رائدًا لحلول الطاقة الشمسية. التزامنا بالجودة والابتكار ورضا العملاء يميزنا عن الآخرين.",
      description2: "نتخصص في تصميم وتركيب أنظمة الطاقة الشمسية المخصصة التي تعظم إنتاج الطاقة والعائد على الاستثمار لعملائنا.",
      features: {
        expert: {
          title: "فريق خبير",
          description: "محترفون معتمدون بخبرة واسعة في صناعة الطاقة الشمسية"
        },
        quality: {
          title: "منتجات عالية الجودة",
          description: "نستخدم فقط مكونات مميزة من مصنعين موثوقين"
        },
        service: {
          title: "خدمة كاملة",
          description: "من الاستشارة إلى التركيب والصيانة"
        }
      }
    },
    products: {
      title: "منتجاتنا",
      titleHighlight: "",
      subtitle: "اكتشف مجموعة واسعة من منتجات الطاقة الشمسية عالية الجودة",
      browseProducts: "تصفح المنتجات",
      availableFrom: "متوفر من",
      categories: {
        solarPanels: {
          title: "الألواح الشمسية",
          description: "ألواح شمسية عالية الكفاءة بضمان 25 عامًا، مثالية للاستخدام السكني والتجاري"
        },
        inverters: {
          title: "العاكسات",
          description: "عاكسات هجينة ذكية بتقنية MPPT لأقصى كفاءة وأداء استثنائي"
        },
        batteries: {
          title: "البطاريات",
          description: "بطاريات ليثيوم أيون لتخزين الطاقة بعمر افتراضي يزيد عن 10 سنوات"
        }
      }
    },
    projects: {
      title: "المشاريع",
      titleHighlight: "المكتملة",
      subtitle: "استكشف بعض منشآتنا الشمسية الناجحة للعملاء السكنيين والتجاريين",
      systemCapacity: "سعة النظام:"
    },
    whyChoose: {
      title: "لماذا تختار",
      titleHighlight: "MB Solar؟",
      description: "مع عقود من الخبرة المشتركة، والتكنولوجيا الرائدة في الصناعة، والالتزام برضا العملاء، نقدم حلول الطاقة الشمسية التي تتجاوز التوقعات. خدمتنا الشاملة تضمن انتقالًا سلسًا إلى الطاقة النظيفة.",
      stats: {
        satisfaction: "رضا",
        support: "دعم",
        warranty: "ضمان",
        rated: "تقييم"
      }
    },
    cta: {
      title: "هل أنت مستعد للتحول للطاقة الشمسية؟",
      description: "اتصل بنا اليوم للحصول على استشارة مجانية وعرض أسعار. سيساعدك خبراؤنا في تصميم الحل الشمسي المثالي لاحتياجاتك.",
      button: "اتصل بنا الآن"
    },
    footer: {
      tagline: "حلول الطاقة الشمسية المهنية لمستقبل مستدام.",
      ourProducts: "منتجاتنا",
      contactUs: "اتصل بنا",
      copyright: "© 2023 MB Solar Power. جميع الحقوق محفوظة."
    }
  }
};

// Header Component
// const Header = ({ mobileMenuOpen, setMobileMenuOpen, scrolled }) => {
//   const handleMenuClick = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//     document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
//   };

//   return (
// <Header />
//   );
// };

// Language Switcher Component
const LanguageSwitcher = ({ language, setLanguage }) => {
  return (
    <div className="language-switcher" style={{
      position: 'fixed',
      top: '100px',
      right: language === 'ar' ? 'auto' : '20px',
      left: language === 'ar' ? '20px' : 'auto',
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '25px',
      padding: '8px',
      display: 'flex',
      gap: '5px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: '8px 16px',
          borderRadius: '20px',
          border: 'none',
          background: language === 'en' ? 'rgba(59, 130, 246, 0.8)' : 'transparent',
          color: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: language === 'en' ? 'bold' : 'normal',
          transition: 'all 0.3s ease'
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        style={{
          padding: '8px 16px',
          borderRadius: '20px',
          border: 'none',
          background: language === 'ar' ? 'rgba(59, 130, 246, 0.8)' : 'transparent',
          color: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: language === 'ar' ? 'bold' : 'normal',
          transition: 'all 0.3s ease'
        }}
      >
        AR
      </button>
    </div>
  );
};

// Modern Hero Component with Grid Animation
const ModernHero = ({ t }) => {
  return (
    <section className="modern-hero-new" id="home">
      {/* Animated Grid Background */}
      <div className="hero-grid-background">
        <svg aria-hidden="true" className="hero-grid-svg">
          <defs>
            <pattern id="grid-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none"></path>
            </pattern>
          </defs>
          <svg x="50%" y="-1" className="grid-overflow">
            <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth="0"></path>
          </svg>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" strokeWidth="0"></rect>
        </svg>
        
        {/* Gradient Blob */}
        <div className="gradient-blob"></div>
      </div>

      {/* Main Content */}
      <div className="hero-main-container">
        <div className="hero-content-grid">
          {/* Left Content */}
          <div className="hero-text-content">
            <h1 className="hero-main-title">
              {t.hero.title}
              <span className="gradient-text"> {t.hero.titleHighlight}</span>
            </h1>
            <p className="hero-main-description">
              {t.hero.description}
            </p>
            <div className="hero-action-buttons">
              <a href="#products" className="btn-get-started">{t.hero.getStarted}</a>
              <a href="#about" className="btn-live-demo">
                {t.hero.exploreMore} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Images Grid - Random Layout */}
          <div className="hero-images-grid">
            <div className="image-column column-1">
              <div className="hero-img-wrapper img-size-2">
                <img 
                  src="batter.png" 
                  alt="Solar Installation 1" 
                  className="hero-grid-img"
                />
                <div className="img-ring"></div>
              </div>
            </div>
            <div className="image-column column-2">
              <div className="hero-img-wrapper img-size-1">
                <img 
                  src="panelsf.jpg" 
                  alt="Solar Installation 2" 
                  className="hero-grid-img"
                />
                <div className="img-ring"></div>
              </div>
              <div className="hero-img-wrapper img-size-3">
                <img 
                  src="inverter3.png" 
                  alt="Solar Installation 3" 
                  className="hero-grid-img"
                />
                <div className="img-ring"></div>
              </div>
            </div>
            <div className="image-column column-3">
              <div className="hero-img-wrapper img-size-3">
                <img 
                  src="https://attaqa.net/wp-content/uploads/2022/11/90e8deaf21bf5c11130f56a2dadf17da.jpg" 
                  alt="Solar Installation 4" 
                  className="hero-grid-img"
                />
                <div className="img-ring"></div>
              </div>
              <div className="hero-img-wrapper img-size-2">
                <img 
                  src="https://cdn.salla.sa/ZYRdwl/fba59b50-2826-4382-8453-db3106c26575-1000x566.92913385827-TODMv3mK2bsf8dNHvAo0lLS4oX8ZFrASx4vxiuFu.jpg" 
                  alt="Solar Installation 5" 
                  className="hero-grid-img"
                />
                <div className="img-ring"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = ({ t }) => {
  return (
    <section className="about" id="about">
      <div className="home-container">
        <div className="about-content">
          <div className="about-text">
            <h2>{t.about.title}<span className="gradient-text"> {t.about.titleHighlight}</span></h2>
            <p>{t.about.description1}</p>
            <p>{t.about.description2}</p>
            
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <h4>{t.about.features.expert.title}</h4>
                  <p>{t.about.features.expert.description}</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">☀️</div>
                <div className="feature-text">
                  <h4>{t.about.features.quality.title}</h4>
                  <p>{t.about.features.quality.description}</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🔧</div>
                <div className="feature-text">
                  <h4>{t.about.features.service.title}</h4>
                  <p>{t.about.features.service.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="Solar Energy.jpg" alt="Solar Installation" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Category Card Component
const CategoryCard = ({ category, index, t }) => {
  return (
    <div className="category-card" id={category.id}>
      <div 
        className="category-image" 
        style={{ backgroundImage: `url('${category.image}')` }}
      />
      <div className="category-content">
        <h3>
          <span className={`category-icon ${category.iconClass}`}>{category.icon}</span>
          <span>{category.title}</span>
        </h3>
        <p>{category.description}</p>
        
        <div className="category-brands">
          <span className="category-brands-label">{t.products.availableFrom}</span>
          {category.brands.map((brand, idx) => (
            <div key={idx} className="brand-logo">
              <img src={brand} alt={`Brand ${idx + 1}`} />
            </div>
          ))}
        </div>
        
        <a href={category.link} className="category-btn">{t.products.browseProducts}</a>
      </div>
    </div>
  );
};

// Products Section Component
const ProductsSection = ({ t, categoriesData }) => {
  // Generate particles
  const floatingParticles = [
    { duration: '15s', delay: '0s', drift: '20px', left: '10%' },
    { duration: '18s', delay: '2s', drift: '-15px', left: '25%' },
    { duration: '20s', delay: '4s', drift: '25px', left: '40%' },
    { duration: '16s', delay: '1s', drift: '-20px', left: '55%' },
    { duration: '19s', delay: '3s', drift: '15px', left: '70%' },
    { duration: '17s', delay: '5s', drift: '-25px', left: '85%' },
    { duration: '21s', delay: '2.5s', drift: '18px', left: '15%' },
    { duration: '16s', delay: '4.5s', drift: '-18px', left: '50%' },
    { duration: '18s', delay: '1.5s', drift: '22px', left: '75%' },
    { duration: '20s', delay: '3.5s', drift: '-22px', left: '35%' },
    { duration: '19s', delay: '0.5s', drift: '12px', left: '60%' },
    { duration: '17s', delay: '5.5s', drift: '-12px', left: '90%' }
  ];

  const fallingParticles = [
    { duration: '14s', delay: '0s', drift: '-18px', left: '12%' },
    { duration: '17s', delay: '1.5s', drift: '22px', left: '28%' },
    { duration: '19s', delay: '3s', drift: '-15px', left: '45%' },
    { duration: '15s', delay: '2s', drift: '20px', left: '58%' },
    { duration: '18s', delay: '4s', drift: '-25px', left: '72%' },
    { duration: '16s', delay: '0.5s', drift: '16px', left: '88%' },
    { duration: '20s', delay: '3.5s', drift: '-20px', left: '20%' },
    { duration: '15s', delay: '5s', drift: '18px', left: '38%' },
    { duration: '17s', delay: '1s', drift: '-22px', left: '65%' },
    { duration: '19s', delay: '2.5s', drift: '14px', left: '80%' }
  ];

  return (
    <section className="products" id="products">
      {/* Floating Particles */}
      {floatingParticles.map((particle, idx) => (
        <div
          key={`float-${idx}`}
          className="floating-particle"
          style={{
            '--duration': particle.duration,
            '--delay': particle.delay,
            '--drift': particle.drift,
            left: particle.left,
            bottom: 0
          }}
        />
      ))}
      
      {/* Falling Particles */}
      {fallingParticles.map((particle, idx) => (
        <div
          key={`fall-${idx}`}
          className="falling-particle"
          style={{
            '--duration': particle.duration,
            '--delay': particle.delay,
            '--drift': particle.drift,
            left: particle.left,
            top: 0
          }}
        />
      ))}
      
      <div className="home-container">
        <div className="section-title">
          <h2>
            {t.products.title}
            {t.products.titleHighlight && <span className="gradient-text"> {t.products.titleHighlight}</span>}
          </h2>
          <p>{t.products.subtitle}</p>
        </div>
        
        <div className="categories-grid">
          {categoriesData.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ project, t }) => {
  return (
    <div className="project-card">
      <div 
        className="project-image" 
        style={{ backgroundImage: `url('${project.image}')` }}
      >
        <div className="project-badge">{project.capacity}</div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-details">
          <div className="project-detail-item">
            <span className="project-icon location">◉</span>
            <span>{project.location}</span>
          </div>
          <div className="project-detail-item">
            <span className="project-icon date">◷</span>
            <span>{project.date}</span>
          </div>
          <div className="project-detail-item">
            <span className="project-icon capacity">⚡︎</span>
            <span>{t.projects.systemCapacity} {project.capacity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Section Component
const ProjectsSection = ({ t, projectsData }) => {
  return (
    <section className="projects" id="projects">
      <div className="home-container">
        <div className="section-title">
          <h2>
            {t.projects.title}
            {t.projects.titleHighlight && <span className="gradient-text"> {t.projects.titleHighlight}</span>}
          </h2>
          <p>{t.projects.subtitle}</p>
        </div>
        <div className="projects-grid">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section Component
const WhyChooseSection = ({ t, statsData }) => {
  return (
    <section className="why-choose">
      <div className="home-container">
        <div className="why-choose-header">
          <h2>{t.whyChoose.title} <span className="gradient-text">{t.whyChoose.titleHighlight}</span></h2>
          <p>{t.whyChoose.description}</p>
        </div>
        
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = ({ t }) => {
  return (
    <section className="cta" id="contact">
      <div className="home-container">
        <h2>{t.cta.title}</h2>
        <p>{t.cta.description}</p>
        <a href="#" className="btn">{t.cta.button}</a>
      </div>
    </section>
  );
};

// Footer Component
const Footer = ({ t }) => {
  return (
    <footer>
      <div className="home-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>MB Solar Power</h3>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-column">
            <h3>{t.footer.ourProducts}</h3>
            <ul>
              <li><a href="#solar-panels">{t.products.categories.solarPanels.title}</a></li>
              <li><a href="#inverters">{t.products.categories.inverters.title}</a></li>
              <li><a href="#batteries">{t.products.categories.batteries.title}</a></li>
              <li><a href="#projects">{t.projects.title}</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>{t.footer.contactUs}</h3>
            <ul>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@mbsolarpower.com</li>
              <li>Address: 123 Solar Street, Energy City</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

// Main Component
const MainPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('en');

  const t = translations[language];

  // Language context value
  const languageContextValue = {
    language,
    setLanguage,
    translations: translations
  };

  // Dynamic categories data based on language
  const categoriesData = [
    {
      id: 'solar-panels',
      icon: '☀',
      iconClass: 'icon-solar',
      title: t.products.categories.solarPanels.title,
      description: t.products.categories.solarPanels.description,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '/panels',
      brands: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSnUnztmtcobBAqB-wMTbL6A8L8igM6VQoA&s',
        'https://lirp.cdn-website.com/46830114/dms3rep/multi/opt/favicon4-1920w.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHIuMM-NiQzORXQ3pOkqkhsPIv_KYaTQo0w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBU_5kHbqGvQQJVVZ9K5v0LXKCVqhLZPqKkQ&s'
      ]
    },
    {
      id: 'inverters',
      icon: '⚡︎',
      iconClass: 'icon-inverter',
      title: t.products.categories.inverters.title,
      description: t.products.categories.inverters.description,
      image: 'inverter3.png',
      link: '/inverters',
      brands: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSnUnztmtcobBAqB-wMTbL6A8L8igM6VQoA&s',
        'https://lirp.cdn-website.com/46830114/dms3rep/multi/opt/favicon4-1920w.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHIuMM-NiQzORXQ3pOkqkhsPIv_KYaTQo0w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBU_5kHbqGvQQJVVZ9K5v0LXKCVqhLZPqKkQ&s'
      ]
    },
    {
      id: 'batteries',
      icon: '🔋︎',
      iconClass: 'icon-battery',
      title: t.products.categories.batteries.title,
      description: t.products.categories.batteries.description,
      image: 'batter.png',
      link: '/batteries',
      brands: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSnUnztmtcobBAqB-wMTbL6A8L8igM6VQoA&s',
        'https://lirp.cdn-website.com/46830114/dms3rep/multi/opt/favicon4-1920w.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHIuMM-NiQzORXQ3pOkqkhsPIv_KYaTQo0w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBU_5kHbqGvQQJVVZ9K5v0LXKCVqhLZPqKkQ&s'
      ]
    }
  ];

  // Projects data (keeping static data but can be translated if needed)
  const projectsData = [
    {
      id: 1,
      title: language === 'ar' ? 'تركيب سقف سكني' : 'Residential Rooftop Installation',
      description: language === 'ar' ? 'تركيب كامل للألواح الشمسية مع تخزين البطاريات لمنزل عائلي حديث.' : 'Complete solar panel installation with battery storage for a modern family home.',
      capacity: '12 kW',
      location: language === 'ar' ? 'سان دييغو، كاليفورنيا' : 'San Diego, CA',
      date: language === 'ar' ? 'مارس 2024' : 'March 2024',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: language === 'ar' ? 'مبنى مكتبي تجاري' : 'Commercial Office Building',
      description: language === 'ar' ? 'تركيب تجاري واسع النطاق يقلل تكاليف الطاقة التشغيلية بنسبة 65%.' : 'Large-scale commercial installation reducing operational energy costs by 65%.',
      capacity: '50 kW',
      location: language === 'ar' ? 'أوستن، تكساس' : 'Austin, TX',
      date: language === 'ar' ? 'فبراير 2024' : 'February 2024',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: language === 'ar' ? 'مجمع مستودعات صناعي' : 'Industrial Warehouse Complex',
      description: language === 'ar' ? 'مجموعة شمسية ضخمة تغذي منشأة مستودع كاملة بالطاقة الخضراء.' : 'Massive solar array powering an entire warehouse facility with green energy.',
      capacity: '200 kW',
      location: language === 'ar' ? 'فينيكس، أريزونا' : 'Phoenix, AZ',
      date: language === 'ar' ? 'يناير 2024' : 'January 2024',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  // Statistics data
  const statsData = [
    { number: '100%', label: t.whyChoose.stats.satisfaction },
    { number: '24/7', label: t.whyChoose.stats.support },
    { number: '25yr', label: t.whyChoose.stats.warranty },
    { number: 'A+', label: t.whyChoose.stats.rated }
  ];

  // Apply RTL direction when Arabic is selected
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-slider');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        setScrolled(window.scrollY > heroHeight - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 120,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (mobileMenuOpen) {
            setMobileMenuOpen(false);
            document.body.style.overflow = '';
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [mobileMenuOpen]);

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <div className="main-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <ModernHero t={t} />
        <AboutSection t={t} />
        <ProductsSection t={t} categoriesData={categoriesData} />
        <ProjectsSection t={t} projectsData={projectsData} />
        <WhyChooseSection t={t} statsData={statsData} />
        <CTASection t={t} />
        <Footer t={t} />
      </div>
    </LanguageContext.Provider>
  );
};

export default MainPage;

