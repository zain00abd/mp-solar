"use client";
import React, { useState, useEffect } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Slider data
const slidesData = [
  {
    id: 1,
    title: 'Premium Solar Panels',
    description: 'High-efficiency solar panels that convert sunlight into electricity, reducing your energy bills and environmental impact.',
    buttonText: 'Learn More',
    buttonLink: '#products',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    className: 'slide-1'
  },
  {
    id: 2,
    title: 'Advanced Inverters',
    description: 'Smart inverters that convert DC power from solar panels into usable AC power for your home or business.',
    buttonText: 'Discover Inverters',
    buttonLink: '/inverters',
    image: '/inverter3.png',
    className: 'slide-2'
  },
  {
    id: 3,
    title: 'Solar Batteries',
    description: 'Energy storage solutions that allow you to store excess solar power for use during nighttime or power outages.',
    buttonText: 'Explore Batteries',
    buttonLink: '/batteries',
    image: '/batter.png',
    className: 'slide-3'
  }
];

// Categories data
const categoriesData = [
  {
    id: 'solar-panels',
    icon: '☀',
    iconClass: 'icon-solar',
    title: 'Solar Panels',
    description: 'High-efficiency solar panels with a 25-year warranty, perfect for residential and commercial use',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    link: '/products',
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
    title: 'Inverters',
    description: 'Smart hybrid inverters with MPPT technology for maximum efficiency and exceptional performance',
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
    title: 'Batteries',
    description: 'Lithium-ion batteries for energy storage with a lifespan of over 10 years',
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

// Projects data
const projectsData = [
  {
    id: 1,
    title: 'Residential Rooftop Installation',
    description: 'Complete solar panel installation with battery storage for a modern family home.',
    capacity: '12 kW',
    location: 'San Diego, CA',
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    title: 'Commercial Office Building',
    description: 'Large-scale commercial installation reducing operational energy costs by 65%.',
    capacity: '50 kW',
    location: 'Austin, TX',
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    title: 'Industrial Warehouse Complex',
    description: 'Massive solar array powering an entire warehouse facility with green energy.',
    capacity: '200 kW',
    location: 'Phoenix, AZ',
    date: 'January 2024',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

// Statistics data
const statsData = [
  { number: '100%', label: 'Satisfaction' },
  { number: '24/7', label: 'Support' },
  { number: '25yr', label: 'Warranty' },
  { number: 'A+', label: 'Rated' }
];

// Header Component
const Header = ({ mobileMenuOpen, setMobileMenuOpen, scrolled }) => {
  const handleMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container header-container">
        <div className="logo">
          <img src="/logo22.png" alt="MB Solar Power Logo" className="logo-image" />
        </div>
        <div 
          className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
          onClick={handleMenuClick}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </div>
        <nav>
          <ul className={mobileMenuOpen ? 'show' : ''}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Modern Hero Component
const ModernHero = () => {
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const products = [
    { icon: '☀️', name: 'Solar Panels', color: '#FFA500', link: '/products' },
    { icon: '⚡', name: 'Inverters', color: '#4A90E2', link: '/inverters' },
    { icon: '🔋', name: 'Batteries', color: '#10B981', link: '/batteries' }
  ];

  return (
    <section className="modern-hero" id="home">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">

          
          <h1 className="hero-title" style={{textAlign: 'center'}}>
            Power Your Future with
            <span className="gradient-text"> Clean Energy</span>
          </h1>
          
          <p className="hero-description">
            Transform your home or business with premium solar solutions. 
            Experience energy independence, reduce costs, and contribute to a sustainable future.
          </p>

          <div className="hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Solar Panels" 
              className="hero-image"
            />
            <div className="image-overlay"></div>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25 Years</div>
              <div className="stat-label">Warranty</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>


        </div>


        {/* <div className="hero-visual">
          <div className="product-showcase">
            {products.map((product, index) => (
              <div
                key={index}
                className={`product-card ${index === activeProduct ? 'active' : ''}`}
                style={{ '--product-color': product.color }}
              >
                <div className="product-icon">{product.icon}</div>
                <div className="product-name">{product.name}</div>
                <a href={product.link} className="product-link">
                  Discover →
                </a>
              </div>
            ))}
          </div>



        </div> */}

      </div>

      <div className="scroll-indicator">
        <div className="scroll-icon"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About MB<span className="gradient-text"> Solar Power</span></h2>
            <p>With over 10 years of experience in the renewable energy industry, MB Solar Power has established itself as a leading provider of solar energy solutions. Our commitment to quality, innovation, and customer satisfaction sets us apart.</p>
            <p>We specialize in designing and installing customized solar systems that maximize energy production and return on investment for our clients.</p>
            
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <h4>Expert Team</h4>
                  <p>Certified professionals with extensive solar industry experience</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">☀️</div>
                <div className="feature-text">
                  <h4>Quality Products</h4>
                  <p>We use only premium components from trusted manufacturers</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🔧</div>
                <div className="feature-text">
                  <h4>Full Service</h4>
                  <p>From consultation to installation and maintenance</p>
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
const CategoryCard = ({ category, index }) => {
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
          <span className="category-brands-label">Available from:</span>
          {category.brands.map((brand, idx) => (
            <div key={idx} className="brand-logo">
              <img src={brand} alt={`Brand ${idx + 1}`} />
            </div>
          ))}
        </div>
        
        <a href={category.link} className="category-btn">Browse Products</a>
      </div>
    </div>
  );
};

// Products Section Component
const ProductsSection = () => {
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
      
      <div className="container">
        <div className="section-title">
          <h2>
            Our
            <span className="gradient-text"> Products</span>
          </h2>
          <p>Discover a wide range of high-quality solar energy products</p>
        </div>
        
        <div className="categories-grid">
          {categoriesData.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => {
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
            <span>System Capacity: {project.capacity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-title">
          <h2>
            Completed
            <span className="gradient-text"> Projects</span>
          </h2>
          <p>Explore some of our successful solar installations for residential and commercial clients</p>
        </div>
        <div className="projects-grid">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section Component
const WhyChooseSection = () => {
  return (
    <section className="why-choose">
      <div className="container">
        <div className="why-choose-header">
          <h2>Why Choose <span className="gradient-text">MB Solar?</span></h2>
          <p>With decades of combined experience, industry-leading technology, and a commitment to customer satisfaction, we deliver solar solutions that exceed expectations. Our end-to-end service ensures a seamless transition to clean energy.</p>
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
const CTASection = () => {
  return (
    <section className="cta" id="contact">
      <div className="container">
        <h2>Ready to Go Solar?</h2>
        <p>Contact us today for a free consultation and quote. Our experts will help you design the perfect solar solution for your needs.</p>
        <a href="#" className="btn">Contact Us Now</a>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>MB Solar Power</h3>
            <p>Professional solar energy solutions for a sustainable future.</p>
          </div>
          <div className="footer-column">
            <h3>Our Products</h3>
            <ul>
              <li><a href="#solar-panels">Solar Panels</a></li>
              <li><a href="#inverters">Inverters</a></li>
              <li><a href="#batteries">Batteries</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@mbsolarpower.com</li>
              <li>Address: 123 Solar Street, Energy City</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 MB Solar Power. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Component
const MainPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <div className="main-page">
      <Header 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        scrolled={scrolled}
      />
      <ModernHero />
      <AboutSection />
      <ProductsSection />
      <ProjectsSection />
      <WhyChooseSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default MainPage;

