'use client';

import React, { useState, useEffect } from 'react';
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

// Enhanced Product Card Component
const ProductCard = ({ product }) => {

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

        <Link href={`/products/${product._id}`} className="btn-enhanced">
          View Details
        </Link>
      </div>
    </div>
  );
};

// Brand Section Component
const BrandSection = ({ company, products }) => {
  return (
    <section className="brand-section">
      <div className="container">
        <div className="brand-header">
          <div className="brand-info">
            <div className="brand-details">
              <div className="brand-name-row">
                <div className="brand-logo-circle">
                  <img src={company.logo} alt={company.name} />
                </div>
                <h2>{company.name}</h2>
              </div>
              <p className="brand-country">📍 {company.country}</p>
              {company.description && <p className="brand-description">{company.description}</p>}
            </div>
          </div>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
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
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLocalData();
  }, []);

  const loadLocalData = () => {
    try {
      setLoading(true);
      
      // استخدام البيانات المحلية
      const allProducts = [];
      const allCompanies = [];
      
      productsData.forEach(company => {
        allCompanies.push({
          _id: company.name.toLowerCase().replace(/\s+/g, '-'),
          name: company.name,
          country: company.country,
          logo: company.logo
        });
        
        company.products.forEach(product => {
          allProducts.push({
            ...product,
            _id: `${company.name.toLowerCase().replace(/\s+/g, '-')}-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
            company: {
              _id: company.name.toLowerCase().replace(/\s+/g, '-'),
              name: company.name,
              country: company.country,
              logo: company.logo
            },
            availability: 'in-stock',
            category: 'products'
          });
        });
      });
      
      setProducts(allProducts);
      setCompanies(allCompanies);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // تجميع المنتجات حسب الشركة
  const groupedProducts = companies.map(company => ({
    company,
    products: products.filter(product => product.company?._id === company._id)
  })).filter(group => group.products.length > 0);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading solar panels...</p>
      </div>
    );
  }

  if (error) {
        return (
          <div className="error-container">
            <p>Error: {error}</p>
            <button onClick={loadLocalData}>Try Again</button>
          </div>
        );
      }

  return (
    <div className="solar-panels-page">
      <Header />
      <PageHeader />
      
      <main className="main-content">
        {groupedProducts.length > 0 ? (
          groupedProducts.map((group) => (
            <BrandSection 
              key={group.company._id} 
              company={group.company} 
              products={group.products} 
            />
          ))
        ) : (
          <div className="no-products">
            <p>No solar panels available at the moment.</p>
            <Link href="/admin/add-product" className="add-product-link">
              Add New Product
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SolarPanels;

