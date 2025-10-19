import React from 'react';
import './style.css';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Page Header Component
const PageHeader = () => {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>☀ Solar Panels</h1>
          <p>Discover our range of premium solar panels designed for maximum efficiency, durability, and long-term performance.</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Solar Panels</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple Product Card Component
const ProductCard = ({ product, brandId }) => {
  const productId = `${brandId}-${product.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="product-card-simple">
      <div className="product-image" style={{ backgroundImage: `url('${product.image}')` }}>
        <div className="product-badge">{product.badge}</div>
      </div>
      <div className="product-content-simple">
        <div className="product-brand-logo">
          <img src={product.brandLogo} alt={product.brand} />
        </div>
        <h3>{product.name}</h3>
        <div className="product-quick-specs">
          <span className="spec-highlight">{product.specs[0].value}</span>
          <span className="spec-divider">•</span>
          <span className="spec-highlight">{product.specs[1].value}</span>
        </div>
        <div className="product-price-simple">
          <span className="price-label">Starting from</span>
          <span className="price-value">${product.price}</span>
        </div>
        <Link href={`/products/${productId}`} className="btn-simple">
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

// Products Data
const productsData = [
  {
    name: "Longi Solar",
    country: "China",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHIuMM-NiQzORXQ3pOkqkhsPIv_KYaTQo0w&s",
    products: [
      {
        name: "Longi Hi-MO 5m 430W",
        brand: "Longi Solar",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHIuMM-NiQzORXQ3pOkqkhsPIv_KYaTQo0w&s",
        badge: "Premium",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "High-efficiency monocrystalline solar panel with excellent performance in low-light conditions. Features advanced PERC technology and bifacial design.",
        features: [
          "22.8% Module Efficiency",
          "Bifacial Technology (+10% Yield)",
          "30-Year Linear Power Warranty",
          "Excellent Low-Light Performance"
        ],
        specs: [
          { label: "Power Output", value: "430W" },
          { label: "Efficiency", value: "22.8%" },
          { label: "Type", value: "Mono PERC" },
          { label: "Warranty", value: "30 Years" }
        ],
        price: "285"
      },
      {
        name: "Longi Hi-MO X6 580W",
        brand: "Longi Solar",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHIuMM-NiQzORXQ3pOkqkhsPIv_KYaTQo0w&s",
        badge: "Commercial",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Ultra-high power module for commercial and utility-scale projects. Features cutting-edge technology for maximum energy yield.",
        features: [
          "23.2% Module Efficiency",
          "N-Type TOPCon Technology",
          "30-Year Linear Power Warranty",
          "Lower Degradation Rate (0.4%/year)"
        ],
        specs: [
          { label: "Power Output", value: "580W" },
          { label: "Efficiency", value: "23.2%" },
          { label: "Type", value: "N-Type TOPCon" },
          { label: "Warranty", value: "30 Years" }
        ],
        price: "340"
      }
    ]
  },
  {
    name: "Canadian Solar",
    country: "Canada",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSnUnztmtcobBAqB-wMTbL6A8L8igM6VQoA&s",
    products: [
      {
        name: "Canadian Solar HiKu6 405W",
        brand: "Canadian Solar",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSnUnztmtcobBAqB-wMTbL6A8L8igM6VQoA&s",
        badge: "Best Value",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Reliable and efficient solar panel with proven track record. Ideal for residential and commercial installations with excellent value for money.",
        features: [
          "21.2% Module Efficiency",
          "Multi-Busbar (MBB) Technology",
          "25-Year Product Warranty",
          "High Wind & Snow Load Resistance"
        ],
        specs: [
          { label: "Power Output", value: "405W" },
          { label: "Efficiency", value: "21.2%" },
          { label: "Type", value: "Mono PERC" },
          { label: "Warranty", value: "25 Years" }
        ],
        price: "245"
      },
      {
        name: "Canadian Solar HiKu 380W",
        brand: "Canadian Solar",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSnUnztmtcobBAqB-wMTbL6A8L8igM6VQoA&s",
        badge: "Budget-Friendly",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Cost-effective solution without compromising on quality. Perfect for budget-conscious projects with reliable performance.",
        features: [
          "20.5% Module Efficiency",
          "PERC Half-Cell Design",
          "25-Year Power Warranty",
          "Excellent Value for Money"
        ],
        specs: [
          { label: "Power Output", value: "380W" },
          { label: "Efficiency", value: "20.5%" },
          { label: "Type", value: "Mono PERC" },
          { label: "Warranty", value: "25 Years" }
        ],
        price: "220"
      }
    ]
  },
  {
    name: "JA Solar",
    country: "China",
    logo: "https://lirp.cdn-website.com/46830114/dms3rep/multi/opt/favicon4-1920w.png",
    products: [
      {
        name: "JA Solar JAM72S30 550W",
        brand: "JA Solar",
        brandLogo: "https://lirp.cdn-website.com/46830114/dms3rep/multi/opt/favicon4-1920w.png",
        badge: "High Performance",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Ultra-high power output panel perfect for large-scale installations. Featuring advanced half-cell technology and superior shade tolerance.",
        features: [
          "21.8% Module Efficiency",
          "Half-Cell Design (144 Cells)",
          "25-Year Linear Power Warranty",
          "Superior Shade Tolerance"
        ],
        specs: [
          { label: "Power Output", value: "550W" },
          { label: "Efficiency", value: "21.8%" },
          { label: "Type", value: "Mono PERC" },
          { label: "Warranty", value: "25 Years" }
        ],
        price: "325"
      }
    ]
  },
  {
    name: "Trina Solar",
    country: "China",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBU_5kHbqGvQQJVVZ9K5v0LXKCVqhLZPqKkQ&s",
    products: [
      {
        name: "Trina Solar Vertex S 400W",
        brand: "Trina Solar",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBU_5kHbqGvQQJVVZ9K5v0LXKCVqhLZPqKkQ&s",
        badge: "Residential",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Compact and powerful panel designed for residential rooftops. Features excellent temperature coefficient and reliable performance.",
        features: [
          "21.0% Module Efficiency",
          "Vertex Technology",
          "25-Year Product Warranty",
          "Low Temperature Coefficient"
        ],
        specs: [
          { label: "Power Output", value: "400W" },
          { label: "Efficiency", value: "21.0%" },
          { label: "Type", value: "Mono PERC" },
          { label: "Warranty", value: "25 Years" }
        ],
        price: "240"
      }
    ]
  }
];

// Main Component
const SolarPanels = () => {
  return (
    <div className="solar-panels-page">
      <Header />
      <PageHeader />
      <section className="products-section">
        <div className="container">
          {productsData.map((brand, index) => (
            <BrandSection key={index} brand={brand} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SolarPanels;

