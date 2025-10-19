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
          <h1>⚡ Solar Inverters</h1>
          <p>Explore our advanced solar inverters designed for optimal energy conversion, reliability, and smart monitoring capabilities.</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Inverters</span>
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
        <Link href={`/inverters/${productId}`} className="btn-simple">
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

// Inverters Data
const invertersData = [
  {
    name: "Huawei",
    country: "China",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJX3X0fF0Qi8lTy2_YJqYQdNvVbFvhO7XRw&s",
    products: [
      {
        name: "Huawei SUN2000-8KTL-M1",
        brand: "Huawei",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJX3X0fF0Qi8lTy2_YJqYQdNvVbFvhO7XRw&s",
        badge: "Smart AI",
        image: "/inverter3.png",
        description: "Advanced AI-powered string inverter with smart optimization and monitoring. Perfect for residential and small commercial systems.",
        features: [
          "98.65% Maximum Efficiency",
          "AI-Powered AFCI Protection",
          "Smart String Monitoring",
          "WiFi & 4G Connectivity Built-in"
        ],
        specs: [
          { label: "Power Output", value: "8 kW" },
          { label: "Efficiency", value: "98.65%" },
          { label: "Type", value: "String Inverter" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "1,850"
      },
      {
        name: "Huawei SUN2000-100KTL-M1",
        brand: "Huawei",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJX3X0fF0Qi8lTy2_YJqYQdNvVbFvhO7XRw&s",
        badge: "Commercial",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "High-power string inverter for commercial and utility-scale projects. Features advanced cooling and maximum efficiency.",
        features: [
          "98.8% Peak Efficiency",
          "Smart I-V Curve Diagnosis",
          "IP66 Protection Rating",
          "Natural Cooling Technology"
        ],
        specs: [
          { label: "Power Output", value: "100 kW" },
          { label: "Efficiency", value: "98.8%" },
          { label: "Type", value: "String Inverter" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "12,500"
      }
    ]
  },
  {
    name: "SMA Solar",
    country: "Germany",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3nGQy8B0YC0LVH_zKZmOeK5QdPrN5xZmH3w&s",
    products: [
      {
        name: "SMA Sunny Tripower 10.0",
        brand: "SMA Solar",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3nGQy8B0YC0LVH_zKZmOeK5QdPrN5xZmH3w&s",
        badge: "Premium",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "German-engineered three-phase inverter with exceptional reliability. Ideal for residential and commercial installations.",
        features: [
          "98.4% Maximum Efficiency",
          "Integrated ShadeFix Technology",
          "OptiTrac Global Peak Tracking",
          "SMA Grid Guard Protection"
        ],
        specs: [
          { label: "Power Output", value: "10 kW" },
          { label: "Efficiency", value: "98.4%" },
          { label: "Type", value: "3-Phase String" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "2,200"
      },
      {
        name: "SMA Sunny Boy 7.7",
        brand: "SMA Solar",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3nGQy8B0YC0LVH_zKZmOeK5QdPrN5xZmH3w&s",
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Reliable single-phase inverter for residential applications. Features integrated smart monitoring and excellent performance.",
        features: [
          "97.7% Peak Efficiency",
          "Integrated DC Disconnect",
          "SMA Smart Connected",
          "TS4-R Rapid Shutdown Compatible"
        ],
        specs: [
          { label: "Power Output", value: "7.7 kW" },
          { label: "Efficiency", value: "97.7%" },
          { label: "Type", value: "Single-Phase" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "1,650"
      }
    ]
  },
  {
    name: "Fronius",
    country: "Austria",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ9YxPQK3m_u-3HhPdGBE9KGnJC6Bm8vGD5A&s",
    products: [
      {
        name: "Fronius Primo 8.2",
        brand: "Fronius",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ9YxPQK3m_u-3HhPdGBE9KGnJC6Bm8vGD5A&s",
        badge: "High Quality",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Austrian precision-engineered inverter with SnapINverter technology. Easy installation and exceptional performance.",
        features: [
          "98.1% Maximum Efficiency",
          "Dynamic Peak Manager",
          "SuperFlex Design (2 MPPTs)",
          "Integrated WiFi & Web Server"
        ],
        specs: [
          { label: "Power Output", value: "8.2 kW" },
          { label: "Efficiency", value: "98.1%" },
          { label: "Type", value: "String Inverter" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "2,100"
      }
    ]
  },
  {
    name: "SolarEdge",
    country: "Israel",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjVR6Y5zBzKVx5mLxN8QvKxKx_GJQYhN_N5Q&s",
    products: [
      {
        name: "SolarEdge SE7600H-US",
        brand: "SolarEdge",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjVR6Y5zBzKVx5mLxN8QvKxKx_GJQYhN_N5Q&s",
        badge: "Optimizer System",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Revolutionary inverter with power optimizer technology. Maximizes energy harvest at the module level with advanced monitoring.",
        features: [
          "99% Weighted Efficiency",
          "Module-Level Monitoring & Control",
          "SafeDC™ Built-in Safety",
          "HD-Wave Technology"
        ],
        specs: [
          { label: "Power Output", value: "7.6 kW" },
          { label: "Efficiency", value: "99%" },
          { label: "Type", value: "DC Optimized" },
          { label: "Warranty", value: "12 Years" }
        ],
        price: "1,950"
      },
      {
        name: "SolarEdge SE10K-RWS",
        brand: "SolarEdge",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjVR6Y5zBzKVx5mLxN8QvKxKx_GJQYhN_N5Q&s",
        badge: "StorEdge Ready",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Three-phase inverter with integrated backup power and battery storage capability. Perfect for residential energy independence.",
        features: [
          "97.6% European Efficiency",
          "StorEdge Battery Compatible",
          "Backup Power Interface",
          "Smart Energy Management"
        ],
        specs: [
          { label: "Power Output", value: "10 kW" },
          { label: "Efficiency", value: "97.6%" },
          { label: "Type", value: "Hybrid 3-Phase" },
          { label: "Warranty", value: "12 Years" }
        ],
        price: "3,200"
      }
    ]
  },
  {
    name: "GoodWe",
    country: "China",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zF5LqTMBKPp3QmLVhFqZ_7bQJ-YCY5xKZg&s",
    products: [
      {
        name: "GoodWe GW10K-MS",
        brand: "GoodWe",
        brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zF5LqTMBKPp3QmLVhFqZ_7bQJ-YCY5xKZg&s",
        badge: "Budget-Friendly",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Cost-effective three-phase inverter with excellent reliability. Great value for money without compromising on quality.",
        features: [
          "98.3% Maximum Efficiency",
          "Dual MPPT Design",
          "IP65 Weather Protection",
          "Smart Grid Support"
        ],
        specs: [
          { label: "Power Output", value: "10 kW" },
          { label: "Efficiency", value: "98.3%" },
          { label: "Type", value: "3-Phase String" },
          { label: "Warranty", value: "10 Years" }
        ],
        price: "1,550"
      }
    ]
  }
];

// Main Component
const Inverters = () => {
  return (
    <div className="solar-inverters-page">
      <Header />
      <PageHeader />
      <section className="products-section">
        <div className="container">
          {invertersData.map((brand, index) => (
            <BrandSection key={index} brand={brand} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Inverters;

