import React from 'react';
import './style.css';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

// Page Header Component
const PageHeader = () => {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
      <h1> <i className="fa-solid fa-battery-full" style={{}}></i> Solar Batteries</h1>
          <p>Discover our premium energy storage solutions designed for maximum capacity, reliability, and long-lasting performance.</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Batteries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Product Card Component
const ProductCard = ({ product, brandId }) => {
  const productId = `${brandId}-${product.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="product-card-enhanced">
      <div className="product-image-container">
        <img className="product-image" src={product.image} alt={product.name} />
      </div>
      
      <div className="product-content-enhanced">
        <div className="product-header">
          <h3 className="product-title">{product.name}</h3>
          <div className="brand-name-row">
            <div className="brand-logo-circle">
              <img src={product.brandLogo} alt={product.brand} />
            </div>
            <div className="product-brand-name">{product.brand}</div>
          </div>
        </div>
        
        <div className="product-specs-section">
          <h4 className="specs-title">Key Specifications</h4>
          <div className="product-specs-grid">
            <div className="spec-item">
              <span className="spec-value">{product.specs[0].value}</span>
              <span className="spec-label">{product.specs[0].label}</span>
            </div>
            <div className="spec-divider-vertical"></div>
            <div className="spec-item">
              <span className="spec-value">{product.specs[1].value}</span>
              <span className="spec-label">{product.specs[1].label}</span>
            </div>
          </div>
          <div className="product-specs-grid">
            <div className="spec-item">
              <span className="spec-value">{product.specs[2].value}</span>
              <span className="spec-label">{product.specs[2].label}</span>
            </div>
            <div className="spec-divider-vertical"></div>
            <div className="spec-item">
              <span className="spec-value">{product.specs[3].value}</span>
              <span className="spec-label">{product.specs[3].label}</span>
            </div>
          </div>
        </div>
        
        <div className="product-pricing-section">
          <h4 className="pricing-title">Price</h4>
          <div className="product-price-enhanced">
            <span className="price-label">Starting from</span>
            <span className="price-value">${product.price}</span>
          </div>
        </div>
        
        <Link href={`/batteries/${productId}`} className="btn-enhanced">
          View Details
        </Link>
      </div>
    </div>
  );
};

// Brand Section Component
const BrandSection = ({ brand }) => {
  const brandId = brand.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="brand-section">
      <div className="brand-header">
        <div className="brand-logo-section">
          <img src={brand.logo} alt={brand.name} />
        </div>
        <div className="brand-info">
          <h2>{brand.name}</h2>
          <div className="brand-country">
            <span>🌍</span>
            <span>{brand.country}</span>
          </div>
        </div>
      </div>
      <div className="products-grid">
        {brand.products.map((product, index) => (
          <ProductCard key={index} product={product} brandId={brandId} />
        ))}
      </div>
    </div>
  );
};

// Batteries Data
const batteriesData = [
  {
    name: "Tesla",
    country: "USA",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsF5Z5ql0K3e8QmFJZZj3PJRgKQx5Yd5L5w&s",
    products: [
      {
        name: "Tesla Powerwall 3",
        brand: "Tesla",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsF5Z5ql0K3e8QmFJZZj3PJRgKQx5Yd5L5w&s",
        badge: "Premium",
        image: "batter.png",
        description: "Next-generation home battery with integrated solar inverter. Seamless backup power and energy independence with Tesla's advanced technology.",
        features: [
          "13.5 kWh Usable Capacity",
          "Integrated Solar Inverter",
          "IP67 Weatherproof Rating",
          "10-Year Warranty"
        ],
        specs: [
          { label: "Capacity", value: "13.5 kWh" },
          { label: "Power Output", value: "11.5 kW" },
          { label: "Type", value: "Lithium-Ion" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "9,500"
      },
      {
        name: "Tesla Powerwall 2",
        brand: "Tesla",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsF5Z5ql0K3e8QmFJZZj3PJRgKQx5Yd5L5w&s",
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Proven and reliable home battery system. Perfect for residential solar installations with excellent performance and longevity.",
        features: [
          "13.5 kWh Usable Capacity",
          "Scalable System Design",
          "Time-Based Control",
          "Mobile App Monitoring"
        ],
        specs: [
          { label: "Capacity", value: "13.5 kWh" },
          { label: "Power Output", value: "7 kW" },
          { label: "Type", value: "Lithium-Ion" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "8,500"
      }
    ]
  },
  {
    name: "LG Energy Solution",
    country: "South Korea",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVmYxQJ9kYQvKf_6qXZ5mHJf5xRJ3YxY5Ybw&s",
    products: [
      {
        name: "LG RESU Prime 16H",
        brand: "LG Energy Solution",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVmYxQJ9kYQvKf_6qXZ5mHJf5xRJ3YxY5Ybw&s",
        badge: "High Capacity",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Premium residential energy storage with high capacity and exceptional cycle life. Industry-leading Korean technology.",
        features: [
          "16 kWh Usable Capacity",
          "7000+ Cycle Life",
          "Advanced BMS System",
          "Compact Design"
        ],
        specs: [
          { label: "Capacity", value: "16 kWh" },
          { label: "Power Output", value: "7 kW" },
          { label: "Type", value: "Lithium NMC" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "8,900"
      },
      {
        name: "LG RESU10H",
        brand: "LG Energy Solution",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVmYxQJ9kYQvKf_6qXZ5mHJf5xRJ3YxY5Ybw&s",
        badge: "Popular Choice",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Reliable and cost-effective home battery. Perfect balance of capacity and affordability for most residential needs.",
        features: [
          "9.8 kWh Usable Capacity",
          "6000+ Cycles @ 90% DoD",
          "IP55 Protection Rating",
          "Wall or Floor Mountable"
        ],
        specs: [
          { label: "Capacity", value: "9.8 kWh" },
          { label: "Power Output", value: "5 kW" },
          { label: "Type", value: "Lithium NMC" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "6,200"
      }
    ]
  },
  {
    name: "BYD",
    country: "China",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWYxQZ5mHJf5xRJ3YxY5Ybw_6qXZ5mHJf5xRJ3YxY5Ybw&s",
    products: [
      {
        name: "BYD Battery-Box Premium HVS 10.2",
        brand: "BYD",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWYxQZ5mHJf5xRJ3YxY5Ybw_6qXZ5mHJf5xRJ3YxY5Ybw&s",
        badge: "Modular",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Modular high-voltage battery system with exceptional safety. Expandable design for growing energy needs.",
        features: [
          "10.24 kWh Base Capacity",
          "Cobalt-Free LFP Technology",
          "Modular & Expandable",
          "Tower Design (Stackable)"
        ],
        specs: [
          { label: "Capacity", value: "10.24 kWh" },
          { label: "Voltage", value: "512V" },
          { label: "Type", value: "LiFePO4" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "6,800"
      },
      {
        name: "BYD Battery-Box Premium LVL 15.4",
        brand: "BYD",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWYxQZ5mHJf5xRJ3YxY5Ybw_6qXZ5mHJf5xRJ3YxY5Ybw&s",
        badge: "Safe & Reliable",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Low-voltage battery system with maximum safety. LiFePO4 chemistry for enhanced stability and long life.",
        features: [
          "15.36 kWh Capacity",
          "Safe LFP Chemistry",
          "6000+ Cycle Life",
          "IP55 Protection"
        ],
        specs: [
          { label: "Capacity", value: "15.36 kWh" },
          { label: "Voltage", value: "51.2V" },
          { label: "Type", value: "LiFePO4" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "7,500"
      }
    ]
  },
  {
    name: "Pylontech",
    country: "China",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHJf5xRJ3YxY5Ybw_6qXZ5mHJf5xRJ3YxY5Ybw&s",
    products: [
      {
        name: "Pylontech Force H2 14.21",
        brand: "Pylontech",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHJf5xRJ3YxY5Ybw_6qXZ5mHJf5xRJ3YxY5Ybw&s",
        badge: "Budget-Friendly",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Cost-effective high-voltage battery with excellent compatibility. Great value for money without compromising quality.",
        features: [
          "14.21 kWh Capacity",
          "LFP Technology",
          "Wide Compatibility",
          "Easy Installation"
        ],
        specs: [
          { label: "Capacity", value: "14.21 kWh" },
          { label: "Voltage", value: "384V" },
          { label: "Type", value: "LiFePO4" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "5,500"
      }
    ]
  },
  {
    name: "Huawei",
    country: "China",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJX3X0fF0Qi8lTy2_YJqYQdNvVbFvhO7XRw&s",
    products: [
      {
        name: "Huawei LUNA2000-15-S0",
        brand: "Huawei",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJX3X0fF0Qi8lTy2_YJqYQdNvVbFvhO7XRw&s",
        badge: "Smart AI",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "AI-powered battery storage system with intelligent optimization. Perfect integration with Huawei solar ecosystem.",
        features: [
          "15 kWh Capacity",
          "AI-Powered Optimization",
          "Active Safety Protection",
          "Smart Energy Management"
        ],
        specs: [
          { label: "Capacity", value: "15 kWh" },
          { label: "Power Output", value: "5 kW" },
          { label: "Type", value: "Lithium-Ion" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "7,200"
      }
    ]
  },
  {
    name: "Sonnen",
    country: "Germany",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5xRJ3YxY5Ybw_6qXZ5mHJf5xRJ3YxY5Ybw&s",
    products: [
      {
        name: "sonnenBatterie 10",
        brand: "Sonnen",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5xRJ3YxY5Ybw_6qXZ5mHJf5xRJ3YxY5Ybw&s",
        badge: "Premium German",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Premium German-engineered battery with elegant design. Superior quality and performance for discerning homeowners.",
        features: [
          "11 kWh Capacity",
          "LiFePO4 Safe Chemistry",
          "Elegant Design",
          "VDE-AR-E 2510-50 Certified"
        ],
        specs: [
          { label: "Capacity", value: "11 kWh" },
          { label: "Power Output", value: "4.6 kW" },
          { label: "Type", value: "LiFePO4" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "9,800"
      }
    ]
  }
];

// Main Component
const Batteries = () => {
  return (
    <div className="solar-batteries-page">
      <Header />
      <PageHeader />
      <section className="products-section">
        <div className="container">
          {batteriesData.map((brand, index) => (
            <BrandSection key={index} brand={brand} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Batteries;

