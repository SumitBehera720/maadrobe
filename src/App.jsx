import { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Heart, 
  Play, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Percent, 
  Scissors, 
  Plus, 
  Minus, 
  Smile,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';
import Lenis from 'lenis';

// Hero Carousel Data (Using generated premium assets)
const heroSlides = [
  {
    tag: "ROYAL LUXURY",
    title: "Chikankari Crafted\nto Perfection.",
    desc: "Hand-embroidered Lucknowi Kurtas made from pure fabrics, tailored for your grace.",
    image: "/images/maadrobe_chikankari.png",
    cta: "Shop Chikankari",
    view: "chikankari"
  },
  {
    tag: "FESTIVE EXCLUSIVES",
    title: "Celebrate in Timeless Elegance.",
    desc: "Rich Banarasi silks and flared Anarkalis designed to shine at every grand occasion.",
    image: "/images/maadrobe_festive.png",
    cta: "Shop Festive Wear",
    view: "festive"
  },
  {
    tag: "BESPOKE STITCHING",
    title: "Your Perfect Fit,\nDirectly from Artisans.",
    desc: "Customize your neckline, sleeves, and fit. Made-to-measure tailoring delivered to your doorstep.",
    image: "/images/maadrobe_casual.png",
    cta: "Bespoke Fitting",
    view: "tailoring"
  }
];

// Products Data (Using generated premium assets)
const products = [
  {
    id: 1,
    name: "Gulnar Blockprinted Silk Anarkali Set",
    price: 3499,
    originalPrice: 4999,
    tag: "BEST SELLER",
    category: "Anarkali Suits",
    subCategory: "festive",
    description: "Exquisite handblock printed pure silk Anarkali set featuring a voluminous flared silhouette, styled with a gold-bordered matching dupatta and pants. Perfect for traditional celebrations.",
    image: "/images/maadrobe_festive.png",
    rating: 4.9,
    reviewCount: 73,
    thumbnails: [
      "/images/maadrobe_festive.png",
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_casual.png"
    ]
  },
  {
    id: 2,
    name: "Zoya Hand-Embroidered Cotton Chikankari Kurta",
    price: 1899,
    originalPrice: 2499,
    tag: "NEW ARRIVAL",
    category: "Chikankari Kurtis",
    subCategory: "chikankari",
    description: "Beautiful pastel peach cotton Kurta hand-embroidered by Lucknowi artisans with traditional shadow work Chikankari. Light, breathable, and elegant for both daytime events and evening gatherings.",
    image: "/images/maadrobe_chikankari.png",
    rating: 4.8,
    reviewCount: 41,
    thumbnails: [
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_casual.png",
      "/images/maadrobe_festive.png"
    ]
  },
  {
    id: 3,
    name: "Nila Kashida Georgette Anarkali Gown",
    price: 3999,
    originalPrice: 5499,
    tag: "ROYAL LUXURY",
    category: "Anarkali Suits",
    subCategory: "festive",
    description: "Flowy georgette Anarkali gown in royal indigo blue, detailed with exquisite Kashida-style floral embroidery along the neckline and hem. Comes with premium silk lining and matching solid leggings.",
    image: "/images/maadrobe_festive.png",
    rating: 4.9,
    reviewCount: 28,
    thumbnails: [
      "/images/maadrobe_festive.png",
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png"
    ]
  },
  {
    id: 4,
    name: "Roop Banarasi Silk Straight Kurti",
    price: 2299,
    originalPrice: 2999,
    tag: "ROYAL DROP",
    category: "Festive Collection",
    subCategory: "festive",
    description: "Crafted from fine Banarasi silk, this straight-cut Kurta features classic gold brocade (zari) bootis and a rich golden-threaded border. Pairs beautifully with gold tissue palazzo pants.",
    image: "/images/maadrobe_festive.png",
    rating: 4.7,
    reviewCount: 19,
    thumbnails: [
      "/images/maadrobe_festive.png",
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_casual.png"
    ]
  },
  {
    id: 5,
    name: "Mehreen Lakhnavi Chikankari Georgette Kurta",
    price: 2199,
    originalPrice: 2799,
    tag: "POPULAR",
    category: "Chikankari Kurtis",
    subCategory: "chikankari",
    description: "Premium georgette Kurta in refreshing mint green, decorated with intricate Lakhnavi Chikankari embroidery. Styled with mirror-work highlights on the cuffs and neck for a festive touch.",
    image: "/images/maadrobe_chikankari.png",
    rating: 4.8,
    reviewCount: 33,
    thumbnails: [
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_casual.png",
      "/images/maadrobe_festive.png"
    ]
  },
  {
    id: 6,
    name: "Avani Handloom Cotton A-Line Kurta",
    price: 1299,
    originalPrice: 1799,
    tag: "DAILY COMFORT",
    category: "Daily Wear",
    subCategory: "daily",
    description: "Made from pure handloom cotton in deep mustard gold, this A-line everyday Kurta features blockprinted panels, wooden buttons, and a functional side pocket. Ideal for long office hours.",
    image: "/images/maadrobe_casual.png",
    rating: 4.6,
    reviewCount: 22,
    thumbnails: [
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_festive.png"
    ]
  },
  {
    id: 7,
    name: "Tara Indigo Printed Short Cotton Kurti",
    price: 999,
    originalPrice: 1399,
    tag: "BEST VALUE",
    category: "Daily Wear",
    subCategory: "daily",
    description: "Traditional Bagru block printed short cotton kurti in indigo blue. Designed with a clean Chinese collar and roll-up sleeves. Perfect to pair with jeans or palazzos.",
    image: "/images/maadrobe_casual.png",
    rating: 4.7,
    reviewCount: 54,
    thumbnails: [
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_festive.png"
    ]
  },
  {
    id: 8,
    name: "Meera Pastel Linen Straight Kurta",
    price: 1599,
    originalPrice: 2199,
    tag: "OFFICE ESSENTIAL",
    category: "Daily Wear",
    subCategory: "daily",
    description: "Sophisticated straight-cut Kurta crafted from breathable linen in lilac purple, featuring fine pintuck details and elegant mother-of-pearl buttons. Subtle, premium, and durable.",
    image: "/images/maadrobe_casual.png",
    rating: 4.5,
    reviewCount: 16,
    thumbnails: [
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_festive.png"
    ]
  },
  {
    id: 9,
    name: "Kiara Floral Handblock Short Kurti",
    price: 1199,
    originalPrice: 1699,
    tag: "NEW DROP",
    category: "Daily Wear",
    subCategory: "daily",
    description: "A cheerful pastel yellow short Kurti made of soft organic cotton, printed with vibrant handblock floral patterns. Features a relaxed fit with elegant bell sleeves.",
    image: "/images/maadrobe_casual.png",
    rating: 4.7,
    reviewCount: 25,
    thumbnails: [
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_festive.png"
    ]
  }
];

// Double clone padding array for infinite loop carousel
const paddedProducts = [
  products[6], products[7], products[8], // Clones of last 3 items
  ...products,                          // 9 real items
  products[0], products[1], products[2]  // Clones of first 3 items
];

export default function App() {
  // Loading & View States
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'chikankari' | 'festive' | 'daily' | 'tailoring' | 'product' | 'checkout'
  const [activeProductId, setActiveProductId] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Cart & Wishlist States
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Announcement Bar State
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Catalog Filter State
  const [catalogFilter, setCatalogFilter] = useState('ALL');

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Best Sellers Infinite Carousel State
  const [bsIndex, setBsIndex] = useState(3); // Start after first 3 cloned elements
  const [bsTransitionEnabled, setBsTransitionEnabled] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive items calculation for Best Sellers
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Smooth Scroll Initialization (Lenis)
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Scroll Reveal Observer
  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => observer.observe(el));

      return () => {
        elements.forEach(el => observer.unobserve(el));
      };
    }, 150);

    return () => clearTimeout(timer);
  }, [currentView, isLoading]);

  // Auto-play Announcement & Hero
  useEffect(() => {
    const annTimer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % 3);
    }, 4000);

    const heroTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => {
      clearInterval(annTimer);
      clearInterval(heroTimer);
    };
  }, []);

  // Infinite slider controls for Best Sellers
  const handleBsNext = () => {
    if (!bsTransitionEnabled) return;
    setBsIndex((prev) => prev + 1);
  };

  const handleBsPrev = () => {
    if (!bsTransitionEnabled) return;
    setBsIndex((prev) => prev - 1);
  };

  const handleBsTransitionEnd = () => {
    if (bsIndex >= products.length + 3) {
      setBsTransitionEnabled(false);
      setBsIndex(3);
    } else if (bsIndex <= 2) {
      setBsTransitionEnabled(false);
      setBsIndex(products.length + 2);
    }
  };

  // Resets transitions silently after warp-jump
  useEffect(() => {
    if (!bsTransitionEnabled) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBsTransitionEnabled(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [bsTransitionEnabled]);

  // Wishlist Handling
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Cart Handlers
  const addToCart = (product, size) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.size === size) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const buyNow = (product, size) => {
    addToCart(product, size);
    setIsCartOpen(true);
  };

  const updateQty = (id, size, delta) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === id && item.size === size) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const navigateToView = (viewName) => {
    setCurrentView(viewName);
    setIsMobileMenuOpen(false);
    scrollToTop();
  };

  const navigateToProduct = (id) => {
    setActiveProductId(id);
    setCurrentView('product');
    scrollToTop();
  };

  // Checkout form submissions
  const handleWhatsAppCheckout = (details) => {
    const itemsSummary = cart.map(item => `- ${item.quantity} x ${item.name} (Size: ${item.size}) - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`).join('\n');
    const totalAmount = getCartTotal().toLocaleString('en-IN');
    
    const message = `Namaste MaaDrobe Apparels! 🌸\n\nI would like to place a new boutique order:\n\n*Items Ordered:*\n${itemsSummary}\n\n*Total Amount:* ₹${totalAmount}\n\n*Delivery Address:*\nName: ${details.name}\nPhone: ${details.phone}\nAddress: ${details.address}, ${details.city} - ${details.pincode}\n\n*Payment Preference:* Direct Boutique Confirmation via WhatsApp\n\nKindly confirm stock availability and share payment/QR details. Thank you!`;
    
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    
    setCart([]);
    setIsCartOpen(false);
    navigateToView('home');
    window.open(whatsappUrl, '_blank');
  };

  const handleOnlineCheckout = (details) => {
    alert(`Thank you ${details.name}!\nYour order of ₹${getCartTotal().toLocaleString('en-IN')} has been submitted.\nRedirecting to Online Payment Gateway (Razorpay)...`);
    setCart([]);
    setIsCartOpen(false);
    navigateToView('home');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 4000);
    }
  };

  const activeProduct = products.find(p => p.id === activeProductId) || products[0];

  return (
    <>
      {/* 0. Page Loader */}
      <div className={`page-loader ${!isLoading ? 'fade-out' : ''}`}>
        <div className="loader-inner">
          <div className="loader-brand">
            {'MaaDrobe'.split('').map((letter, i) => (
              <span key={i} className="loader-letter" style={{ animationDelay: `${i * 0.08}s` }}>
                {letter}
              </span>
            ))}
          </div>
          <p className="loader-tagline">APPARELS</p>
          <div className="loader-bar">
            <div className="loader-bar-fill"></div>
          </div>
        </div>
      </div>

      {/* 1. Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-bar-content">
          <div className={`announcement-bar-item ${currentAnnouncement === 0 ? 'active' : ''}`}>
            <Percent /> 10% OFF ON YOUR FIRST BOUTIQUE ORDER
          </div>
          <div className="announcement-bar-divider"></div>
          <div className={`announcement-bar-item ${currentAnnouncement === 1 ? 'active' : ''}`}>
            <RotateCcw /> FREE EXCHANGES & CUSTOM FIT ADJUSTMENTS
          </div>
          <div className="announcement-bar-divider"></div>
          <div className={`announcement-bar-item ${currentAnnouncement === 2 ? 'active' : ''}`}>
            <Truck /> EXPRESS DELIVERY PAN INDIA
          </div>
        </div>
      </div>

      {/* 2. Header / Navbar */}
      <header className="header">
        <div className="container navbar">
          <button className="menu-toggle" aria-label="Open Menu" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu />
          </button>
          
          <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => navigateToView('home')}>
            <img src="/images/WhatsApp_Image_2026-07-28_at_2.47.24_PM-removebg-preview.png" alt="MaaDrobe Apparels Logo" className="brand-logo-img" />
            <div className="brand-text-wrapper">
              <h1 className="brand-title">MaaDrobe</h1>
              <span className="brand-tagline">Apparels</span>
            </div>
          </div>

          <nav className="nav-links">
            <button className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => navigateToView('home')}>Home</button>
            <button className={`nav-link ${currentView === 'chikankari' ? 'active' : ''}`} onClick={() => navigateToView('chikankari')}>Chikankari</button>
            <button className={`nav-link ${currentView === 'festive' ? 'active' : ''}`} onClick={() => navigateToView('festive')}>Festive Wear</button>
            <button className={`nav-link ${currentView === 'daily' ? 'active' : ''}`} onClick={() => navigateToView('daily')}>Daily Wear</button>
            <button className={`nav-link ${currentView === 'tailoring' ? 'active' : ''}`} onClick={() => navigateToView('tailoring')}>Bespoke Fitting</button>
          </nav>

          <div className="nav-actions">
            <button className="nav-action-btn" aria-label="Search">
              <Search />
            </button>
            <button className="nav-action-btn" aria-label="Wishlist" onClick={() => {
              if (wishlist.length > 0) {
                navigateToProduct(wishlist[0]);
              } else {
                alert("Your wishlist is empty! Add some Kurtis to save them.");
              }
            }}>
              <Heart />
              {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
            </button>
            <button className="nav-action-btn" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag />
              {cart.length > 0 && <span className="cart-badge">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Decorative Sub-Navbar Nav Tabs */}
      {['home', 'chikankari', 'festive', 'daily'].includes(currentView) && (
        <nav className="sub-navbar">
          <div className="container sub-navbar-container">
            <button className={`sub-navbar-tab ${currentView === 'home' ? 'active' : ''}`} onClick={() => navigateToView('home')}>Collections</button>
            <span className="sub-navbar-divider">|</span>
            <button className={`sub-navbar-tab ${currentView === 'chikankari' ? 'active' : ''}`} onClick={() => navigateToView('chikankari')}>Lucknowi Chikankari</button>
            <span className="sub-navbar-divider">|</span>
            <button className={`sub-navbar-tab ${currentView === 'festive' ? 'active' : ''}`} onClick={() => navigateToView('festive')}>Anarkali & Silks</button>
            <span className="sub-navbar-divider">|</span>
            <button className={`sub-navbar-tab ${currentView === 'daily' ? 'active' : ''}`} onClick={() => navigateToView('daily')}>Casual Cottons</button>
          </div>
        </nav>
      )}

      {/* 3. Render Views dynamically wrapped in key transitions */}
      <main key={currentView} className="page-transition-enter">
        {currentView === 'home' ? (
          <>
            {/* Split Hero Slider Banner (Solves model image crop issue) */}
            <section className="hero-section">
              {heroSlides.map((slide, idx) => (
                <div key={idx} className={`hero-slide-split ${currentSlide === idx ? 'active' : ''}`}>
                  <div className="hero-split-text">
                    <div className="hero-split-text-inner">
                      <span className="hero-tag">{slide.tag}</span>
                      <h2 className="hero-title">
                        {slide.title.split('\n').map((line, li) => (
                          <span key={li}>{line}<br /></span>
                        ))}
                      </h2>
                      <p className="hero-desc">{slide.desc}</p>
                      <button className="hero-cta-btn" onClick={() => navigateToView(slide.view)}>
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                  <div className="hero-split-img">
                    <img src={slide.image} alt={slide.title} className="hero-split-img-src" />
                  </div>
                </div>
              ))}
              <div className="hero-dots">
                {heroSlides.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`hero-dot ${currentSlide === idx ? 'active' : ''}`} 
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </section>

            {/* Trust Badges Bar */}
            <section className="trust-badges reveal-on-scroll">
              <div className="container trust-grid">
                <div className="trust-card">
                  <div className="trust-icon"><Truck /></div>
                  <div className="trust-info">
                    <h4 className="trust-title">Free Express Shipping</h4>
                    <span className="trust-desc">Pan India delivery in 3-5 days</span>
                  </div>
                </div>
                <div className="trust-card">
                  <div className="trust-icon"><Scissors /></div>
                  <div className="trust-info">
                    <h4 className="trust-title">Custom Adjustments</h4>
                    <span className="trust-desc">Tailoring adjustments on demand</span>
                  </div>
                </div>
                <div className="trust-card">
                  <div className="trust-icon"><ShieldCheck /></div>
                  <div className="trust-info">
                    <h4 className="trust-title">100% Handcrafted</h4>
                    <span className="trust-desc">Authentic Indian craftsmanship</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Shop by Silhouette - Now strictly 2:2 Columns on mobile */}
            <section className="categories-section container reveal-on-scroll">
              <div className="section-header">
                <h2 className="section-title">Shop by Silhouette</h2>
                <p className="section-subtitle">Exquisite Indian designs for every occasion</p>
              </div>
              <div className="categories-grid">
                <div className="category-card" onClick={() => navigateToView('chikankari')}>
                  <div className="category-img-wrapper">
                    <img src="/images/maadrobe_chikankari.png" alt="Chikankari" className="category-img" />
                  </div>
                  <h4 className="category-name">Chikankari Kurtis</h4>
                </div>
                <div className="category-card" onClick={() => navigateToView('festive')}>
                  <div className="category-img-wrapper">
                    <img src="/images/maadrobe_festive.png" alt="Anarkali" className="category-img" />
                  </div>
                  <h4 className="category-name">Anarkali Suits</h4>
                </div>
                <div className="category-card" onClick={() => navigateToView('festive')}>
                  <div className="category-img-wrapper">
                    <img src="/images/maadrobe_festive.png" alt="Banarasi Silk" className="category-img" />
                  </div>
                  <h4 className="category-name">Banarasi Silk</h4>
                </div>
                <div className="category-card" onClick={() => navigateToView('daily')}>
                  <div className="category-img-wrapper">
                    <img src="/images/maadrobe_casual.png" alt="Daily Wear" className="category-img" />
                  </div>
                  <h4 className="category-name">Casual Cottons</h4>
                </div>
              </div>
            </section>

            {/* Infinite Loop Best Sellers Carousel (2:2 Columns on mobile, touch scroll friendly) */}
            <section className="best-sellers-section reveal-on-scroll">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-title">Boutique Best Sellers</h2>
                  <p className="section-subtitle">Our most coveted traditional silhouettes</p>
                </div>
                
                <div className="best-sellers-carousel-outer">
                  <div className="best-sellers-carousel-viewport">
                    <div 
                      className="best-sellers-track"
                      style={{
                        transform: `translateX(-${bsIndex * (100 / itemsPerPage)}%)`,
                        transition: bsTransitionEnabled ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                      }}
                      onTransitionEnd={handleBsTransitionEnd}
                    >
                      {paddedProducts.map((p, idx) => (
                        <div key={idx} className="best-seller-slide-wrapper">
                          <div className="product-card" onClick={() => navigateToProduct(p.id)}>
                            <div className="product-card-img-wrapper">
                              <img src={p.image} alt={p.name} className="product-card-image" />
                              <button 
                                className={`product-card-wishlist ${wishlist.includes(p.id) ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleWishlist(p.id);
                                }}
                                aria-label="Add to wishlist"
                              >
                                <Heart fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} />
                              </button>
                              <span className="product-card-tag">{p.tag}</span>
                            </div>
                            <div className="product-card-info">
                              <span className="product-card-category">{p.category}</span>
                              <h4 className="product-card-title">{p.name}</h4>
                              <div className="product-price-layout">
                                <span className="price-sale">₹{p.price.toLocaleString('en-IN')}</span>
                                <span className="price-original">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="carousel-control-btn left" onClick={handleBsPrev}>&larr;</button>
                  <button className="carousel-control-btn right" onClick={handleBsNext}>&rarr;</button>
                </div>
              </div>
            </section>

            {/* Product Catalog */}
            <section className="catalog-section container reveal-on-scroll">
              <div className="section-header">
                <h2 className="section-title">The Boutique Collection</h2>
                <p className="section-subtitle">Exquisite silhouettes crafted with pure fabrics</p>
              </div>
              
              <div className="catalog-filter-pills">
                {['ALL', 'ANARKALI SUITS', 'CHIKANKARI KURTIS', 'DAILY WEAR'].map((cat) => (
                  <button 
                    key={cat} 
                    className={`catalog-filter-pill ${catalogFilter === cat ? 'active' : ''}`}
                    onClick={() => setCatalogFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="product-grid" key={catalogFilter}>
                {products
                  .filter(p => catalogFilter === 'ALL' || p.category.toUpperCase() === catalogFilter)
                  .map((product) => (
                    <div key={product.id} className="product-card" onClick={() => navigateToProduct(product.id)}>
                      <div className="product-card-img-wrapper">
                        <img src={product.image} alt={product.name} className="product-card-image" />
                        <button 
                          className={`product-card-wishlist ${wishlist.includes(product.id) ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          aria-label="Add to wishlist"
                        >
                          <Heart fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                        </button>
                        <span className="product-card-tag">{product.tag}</span>
                      </div>
                      <div className="product-card-info">
                        <span className="product-card-category">{product.category}</span>
                        <h4 className="product-card-title">{product.name}</h4>
                        <div className="product-price-layout">
                          <span className="price-sale">₹{product.price.toLocaleString('en-IN')}</span>
                          <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          <span className="price-discount">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Artisanal Story Section */}
            <section className="story-section reveal-on-scroll">
              <div className="container story-grid">
                <div className="story-content">
                  <h3 className="story-title">Crafting India's Heritage with Love</h3>
                  <p className="story-text">At <strong>MaaDrobe Apparels</strong>, we bridge the gap between traditional Indian weaver craftsmanship and modern boutique style. Each Kurti is cut from handpicked pure fabrics, including premium silk, handloom cotton, and delicate georgettes.</p>
                  <p className="story-text">Our hand-embroidery work is created by specialized clusters of artisans in Lucknow and Rajasthan, preserving traditional embroidery techniques like shadow-work Lakhnavi shadow-work Chikankari and royal gold brocade stitching.</p>
                  <div style={{ marginTop: '20px' }}>
                    <button className="btn-solid-gold" onClick={() => navigateToView('tailoring')}>Explore Our Tailoring Services</button>
                  </div>
                </div>
                <div className="story-img-wrapper">
                  <img src="/images/maadrobe_chikankari.png" alt="Traditional Weaving" className="story-img" />
                  <div className="story-badge">
                    <span className="story-badge-num">100%</span>
                    <span className="story-badge-txt">Pure Fabric</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Instagram Showcase */}
            <section className="polaroid-section container reveal-on-scroll">
              <div className="section-header">
                <h2 className="section-title">Follow @MaaDrobeApparels</h2>
                <p className="section-subtitle">Styling Inspiration & Happy Customers</p>
              </div>
              <div className="polaroid-grid">
                {[
                  { img: "/images/maadrobe_chikankari.png", caption: "#MaaDrobeChikankari" },
                  { img: "/images/maadrobe_festive.png", caption: "#FestiveAnarkali" },
                  { img: "/images/maadrobe_casual.png", caption: "#LinenOfficeComfort" },
                  { img: "/images/maadrobe_chikankari.png", caption: "#MaaDrobeVibes" }
                ].map((item, idx) => (
                  <div key={idx} className="polaroid-card">
                    <div className="polaroid-img-wrapper">
                      <img src={item.img} alt={item.caption} className="polaroid-img" />
                    </div>
                    <span className="polaroid-caption">{item.caption}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : currentView === 'chikankari' ? (
          <CollectionPage 
            title="Lucknowi Chikankari"
            tag="TRADITIONAL STITCHING"
            desc="Discover the charm of traditional Lakhnavi shadow shadow-work embroidery on premium fabrics."
            bannerImage="/images/maadrobe_chikankari.png"
            products={products.filter(p => p.subCategory === 'chikankari')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={() => navigateToView('home')}
          />
        ) : currentView === 'festive' ? (
          <CollectionPage 
            title="Anarkalis & Silks"
            tag="ROYAL FESTIVE SELECTION"
            desc="Make an entrance with premium Banarasi brocades and flared handblock printed Anarkali gowns."
            bannerImage="/images/maadrobe_festive.png"
            products={products.filter(p => p.subCategory === 'festive')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={() => navigateToView('home')}
          />
        ) : currentView === 'daily' ? (
          <CollectionPage 
            title="Casual Cottons & Linens"
            tag="DAILY ESSENTIALS"
            desc="Elegant, breathable handloom garments designed to keep you stylish and comfortable throughout the day."
            bannerImage="/images/maadrobe_casual.png"
            products={products.filter(p => p.subCategory === 'daily')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={() => navigateToView('home')}
          />
        ) : currentView === 'tailoring' ? (
          <BespokeTailoringPage onBack={() => navigateToView('home')} />
        ) : currentView === 'product' ? (
          <ProductDetailPage 
            product={activeProduct}
            products={products}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            buyNow={buyNow}
            onBack={() => navigateToView('home')}
            onNavigateProduct={navigateToProduct}
          />
        ) : (
          /* DEDICATED SEPARATE CHECKOUT VIEW */
          <CheckoutPage 
            cart={cart}
            getCartTotal={getCartTotal}
            onBack={() => navigateToView('home')}
            handleWhatsAppCheckout={handleWhatsAppCheckout}
            handleOnlineCheckout={handleOnlineCheckout}
          />
        )}
      </main>

      {/* 13. Newsletter Signup */}
      <section className="newsletter-section">
        <div className="container newsletter-content">
          <div className="newsletter-info">
            <h3 className="newsletter-title">Join the MaaDrobe Clan</h3>
            <p className="newsletter-subtitle">Get updates on new collections, private sales, and custom tailoring promotions.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="newsletter-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              {newsletterSubscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand-column footer-col">
            <div className="footer-logo-container" style={{ cursor: 'pointer' }} onClick={() => navigateToView('home')}>
              <img src="/images/WhatsApp_Image_2026-07-28_at_2.47.24_PM-removebg-preview.png" alt="MaaDrobe Logo" className="footer-logo-img" />
              <div className="brand-text-wrapper">
                <span className="brand-title" style={{ color: 'var(--primary-gold)' }}>MaaDrobe</span>
                <span className="brand-tagline">Apparels</span>
              </div>
            </div>
            <p className="footer-desc">Premium handcrafted Indian ethnic clothing. Tailored to perfection, made using 100% pure organic fabrics. Designed to suit every silhouette.</p>
            <div className="footer-socials">
              <a href="https://instagram.com" className="footer-social-link" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
              <a href="https://facebook.com" className="footer-social-link" aria-label="Facebook"><Smile /></a>
              <a href="https://youtube.com" className="footer-social-link" aria-label="Youtube"><Play /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Collections</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateToView('chikankari')}>Chikankari Kurtis</button></li>
              <li><button onClick={() => navigateToView('festive')}>Anarkali Suits</button></li>
              <li><button onClick={() => navigateToView('festive')}>Banarasi Silks</button></li>
              <li><button onClick={() => navigateToView('daily')}>Casual Cottons</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateToView('tailoring')}>Bespoke Fitting</button></li>
              <li><a href="#custom-sizing">Size Adaptation</a></li>
              <li><a href="#fabric-guide">Fabric Directory</a></li>
              <li><a href="#care-instructions">Wash Care Guide</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Help</h4>
            <ul className="footer-links">
              <li><a href="#track-orders">Track Order</a></li>
              <li><a href="#shipping-terms">Shipping & Delivery</a></li>
              <li><a href="#exchanges">Returns & Exchanges</a></li>
              <li><a href="#faqs">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">About Us</h4>
            <ul className="footer-links">
              <li><a href="#our-story">Artisanal Story</a></li>
              <li><a href="#weaver-welfare">Weaver Welfare</a></li>
              <li><a href="#contact">Contact Boutique</a></li>
              <li><a href="#store-locator">Boutique Locator</a></li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>&copy; {new Date().getFullYear()} MAADROBE APPARELS. All Rights Reserved.</span>
          <span>
            Boutique Platform by{' '}
            <a href="https://qubnixtechnology.com/" target="_blank" rel="noopener noreferrer" className="footer-dev-link">
              Qubnix Technology
            </a>
          </span>
          <div className="footer-bottom-links">
            <a href="#terms-and-conditions">Terms of Service</a>
            <a href="#privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* 15. Simplified Cart Drawer */}
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="cart-drawer-header">
            <h3 className="cart-drawer-title">Boutique Bag ({cart.reduce((a, b) => a + b.quantity, 0)})</h3>
            <button className="cart-close-btn" onClick={() => setIsCartOpen(false)} aria-label="Close Bag">
              <X />
            </button>
          </div>

          <div className="cart-drawer-body">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag />
                <p>Your boutique bag is empty.</p>
                <button className="btn-solid-gold" onClick={() => setIsCartOpen(false)}>Browse Collections</button>
              </div>
            ) : (
              <>
                {cart.map((item, idx) => (
                  <div className="cart-item" key={`${item.id}-${item.size}-${idx}`}>
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-details">
                      <h4 className="cart-item-title">{item.name}</h4>
                      <span className="cart-item-meta">Size: {item.size}</span>
                      <div className="cart-item-qty">
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.size, -1)}><Minus size={12} /></button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.size, 1)}><Plus size={12} /></button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item.id, item.size)}><X size={16} /></button>
                      <span className="cart-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-drawer-footer">
              <div className="cart-summary-line">
                <span>Subtotal</span>
                <span className="cart-summary-total">₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <button className="checkout-btn" onClick={() => { setIsCartOpen(false); navigateToView('checkout'); }}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 17. Slideout Mobile Drawer */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <div className="logo-container" onClick={() => navigateToView('home')}>
              <img src="/images/WhatsApp_Image_2026-07-28_at_2.47.24_PM-removebg-preview.png" alt="MaaDrobe Logo" className="brand-logo-img" />
              <div className="brand-text-wrapper">
                <span className="brand-title">MaaDrobe</span>
                <span className="brand-tagline">Apparels</span>
              </div>
            </div>
            <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X />
            </button>
          </div>
          <div className="mobile-menu-body">
            <nav className="mobile-nav-links">
              <button onClick={() => navigateToView('home')}>Home</button>
              <button onClick={() => navigateToView('chikankari')}>Lucknowi Chikankari</button>
              <button onClick={() => navigateToView('festive')}>Festive Wear</button>
              <button onClick={() => navigateToView('daily')}>Daily Wear</button>
              <button onClick={() => navigateToView('tailoring')}>Bespoke Stitching</button>
            </nav>
            <div className="mobile-menu-footer">
              <p>Premium handcrafted Indian ethnic wear. Crafted in organic fabrics, tailored to perfection.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   UNIFIED PREMIUM PAGE BANNER COMPONENT (SPLIT DESIGN)
   ========================================================================== */
function BoutiquePageBanner({ title, tag, desc, image, onBack }) {
  return (
    <section className="boutique-banner-split">
      <div className="banner-split-text-col">
        <div className="banner-split-text-content">
          {onBack && (
            <button className="banner-back-btn" onClick={onBack}>
              &larr; Back to Boutique
            </button>
          )}
          <span className="banner-tag">{tag}</span>
          <h1 className="banner-title">{title}</h1>
          <div className="banner-separator">♦</div>
          {desc && <p className="banner-desc">{desc}</p>}
        </div>
      </div>
      <div className="banner-split-img-col">
        <img src={image} alt={title} className="banner-split-img" />
      </div>
    </section>
  );
}

/* ==========================================================================
   LANDING COLLECTION PAGE COMPONENT
   ========================================================================== */
function CollectionPage({ 
  title, 
  tag, 
  desc, 
  bannerImage, 
  products, 
  wishlist, 
  toggleWishlist, 
  onNavigateProduct, 
  onBack 
}) {
  return (
    <div className="landing-page">
      <BoutiquePageBanner 
        title={title}
        tag={tag}
        desc={desc}
        image={bannerImage}
        onBack={onBack}
      />

      <section className="catalog-section container reveal-on-scroll">
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card" onClick={() => onNavigateProduct(product.id)}>
                <div className="product-card-img-wrapper">
                  <img src={product.image} alt={product.name} className="product-card-image" />
                  <button 
                    className={`product-card-wishlist ${wishlist.includes(product.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label="Add to wishlist"
                  >
                    <Heart fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <span className="product-card-tag">{product.tag}</span>
                </div>
                <div className="product-card-info">
                  <span className="product-card-category">{product.category}</span>
                  <h4 className="product-card-title">{product.name}</h4>
                  <div className="product-price-layout">
                    <span className="price-sale">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products-msg">No products found in this collection. Check back soon!</div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   PRODUCT DETAIL VIEW PAGE COMPONENT
   ========================================================================== */
function ProductDetailPage({ 
  product, 
  products, 
  wishlist, 
  toggleWishlist, 
  addToCart, 
  buyNow, 
  onBack, 
  onNavigateProduct 
}) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState('L');
  const [shareTooltip, setShareTooltip] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('fabric'); // 'fabric' | 'shipping' | 'returns' | null
  const [openQA, setOpenQA] = useState(0);

  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  const similarProducts = products.filter(p => p.id !== product.id && p.subCategory === product.subCategory).slice(0, 4);

  const mockReviews = [
    { name: "Priya R.", rating: 5, date: "July 24, 2026", verified: true, text: "The Chikankari shadow-work is incredibly detailed. The cotton fabric is soft and holds its shape beautifully after washing. Highly recommend!" },
    { name: "Kiran S.", rating: 5, date: "July 12, 2026", verified: true, text: "Stunning flared silhouette on the Anarkali set. The colors are exactly as shown in the picture, and the gold borders look extremely rich." },
    { name: "Meenakshi K.", rating: 4, date: "June 28, 2026", verified: false, text: "Very comfortable daily wear Kurti. It has an actual side pocket which is so practical! Fits perfectly." }
  ];

  const qnaList = [
    { q: "How should I wash this garment?", a: "For silk and heavy festive wear, dry clean is recommended to maintain the zari threads. For Chikankari and daily cotton/linen Kurtas, wash inside-out on a gentle cycle in cold water and hang dry in shade." },
    { q: "Do you offer custom tailoring sizing?", a: "Yes! If you fall between sizes or want custom sleeve length / neck design modifications, head to our Bespoke Fitting page or choose Direct WhatsApp Checkout to tell us your measurements." },
    { q: "Is the fabric transparent?", a: "All our Kurtas are made from high-density pure fibers. Georgette items come with a premium solid silk lining pre-stitched, and our cottons are opaque." }
  ];

  return (
    <div className="product-detail-page container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">
          &larr; Back to Boutique
        </button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current">{product.category}</span>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">{product.name}</span>
      </div>

      <div className="product-detail-grid">
        <div className="product-gallery-container">
          <div className="product-thumbnails-list">
            {product.thumbnails.map((thumb, idx) => (
              <button 
                key={idx} 
                className={`thumb-btn ${activeImage === thumb ? 'active' : ''}`}
                onClick={() => setActiveImage(thumb)}
              >
                <img src={thumb} alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
          <div className="product-main-preview">
            <img src={activeImage} alt={product.name} className="main-preview-img" />
          </div>
        </div>

        <div className="product-info-panel">
          <div className="info-header">
            <span className="product-info-tag">{product.tag}</span>
            <h2 className="product-info-title">{product.name}</h2>
            <div className="info-rating-row">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < 5 ? 'star-filled' : 'star-empty'} />
                ))}
              </div>
              <span className="rating-text">{product.rating} ({product.reviewCount} Verified Boutique Reviews)</span>
            </div>
            <div className="product-info-price">₹{product.price.toLocaleString('en-IN')}</div>
          </div>

          <p className="product-info-desc">{product.description}</p>

          <div className="size-selector-block">
            <div className="option-header-row">
              <span className="option-title">Select Boutique Size</span>
              <a href="#size-guide" className="size-guide-link" onClick={(e) => { e.preventDefault(); alert("Boutique Sizing Chart:\nXS: Bust 32\"\nS: Bust 34\"\nM: Bust 36\"\nL: Bust 38\"\nXL: Bust 40\"\nXXL: Bust 42\"\nWe also offer custom sizing via our Bespoke Fitting page!"); }}>Size Guide</a>
            </div>
            <div className="size-buttons-grid">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons-stack">
            <div className="primary-actions-row">
              <button className="btn-buy-now" onClick={() => buyNow(product, selectedSize)}>Buy Now</button>
              <button className="btn-add-cart" onClick={() => addToCart(product, selectedSize)}>Add To Bag</button>
            </div>
            
            <div className="secondary-actions-row">
              <button 
                className={`btn-wishlist-toggle ${wishlist.includes(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={16} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                {wishlist.includes(product.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button className="btn-share-link" onClick={handleShare}>
                <Share2 size={16} />
                Share
                {shareTooltip && <span className="share-tooltip">Link copied!</span>}
              </button>
            </div>
          </div>

          {/* Accordion Policies */}
          <div className="policies-accordion">
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => setOpenAccordion(openAccordion === 'fabric' ? null : 'fabric')}>
                <span className="header-text"><ShieldCheck size={16} /> Premium Fabric & Craftsmanship Details</span>
                {openAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <div className={`accordion-body ${openAccordion === 'fabric' ? 'open' : ''}`}>
                <p>100% pure organic cotton and premium georgette linings. Features artisanal handblock printing and authentic hand-embroidered details. Color bleeding tested and reinforced seams.</p>
              </div>
            </div>

            <div className="accordion-item">
              <button className="accordion-header" onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}>
                <span className="header-text"><Truck size={16} /> Free Shipping & WhatsApp Tracking</span>
                {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <div className={`accordion-body ${openAccordion === 'shipping' ? 'open' : ''}`}>
                <p>We offer free express shipping pan-India. Delivery takes 3 to 5 business days. Once shipped, live tracking details are sent automatically to your WhatsApp number.</p>
              </div>
            </div>

            <div className="accordion-item">
              <button className="accordion-header" onClick={() => setOpenAccordion(openAccordion === 'returns' ? null : 'returns')}>
                <span className="header-text"><RotateCcw size={16} /> Boutique Custom Exchanges</span>
                {openAccordion === 'returns' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <div className={`accordion-body ${openAccordion === 'returns' ? 'open' : ''}`}>
                <p>We want your Kurti to fit you perfectly. We provide free size exchanges and alteration assistance within 7 days of delivery. Drop us a text on WhatsApp to coordinate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="product-reviews-section">
        <h3 className="section-title">Boutique Customer Reviews</h3>
        
        <div className="reviews-layout-grid">
          <div className="reviews-summary-card">
            <span className="average-rating-num">{product.rating}</span>
            <div className="stars-row justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className={i < 5 ? 'star-filled' : 'star-empty'} />
              ))}
            </div>
            <span className="reviews-total-text">Based on {product.reviewCount} verified buyer reviews</span>
            
            <div className="progress-bars-stack">
              <div className="progress-bar-row">
                <span className="bar-label">5 Star</span>
                <div className="bar-container"><div className="bar-fill" style={{ width: '92%' }}></div></div>
                <span className="bar-percent">92%</span>
              </div>
              <div className="progress-bar-row">
                <span className="bar-label">4 Star</span>
                <div className="bar-container"><div className="bar-fill" style={{ width: '8%' }}></div></div>
                <span className="bar-percent">8%</span>
              </div>
              <div className="progress-bar-row">
                <span className="bar-label">3 Star</span>
                <div className="bar-container"><div className="bar-fill" style={{ width: '0%' }}></div></div>
                <span className="bar-percent">0%</span>
              </div>
            </div>
          </div>

          <div className="reviews-list-container">
            {mockReviews.map((rev, idx) => (
              <div className="review-item-card animate-slide-up" key={idx}>
                <div className="review-item-header">
                  <span className="reviewer-name">{rev.name}</span>
                  {rev.verified && <span className="verified-badge"><Check size={12} /> Verified Buyer</span>}
                  <span className="review-date">{rev.date}</span>
                </div>
                <div className="stars-row" style={{ margin: '8px 0' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < rev.rating ? 'star-filled' : 'star-empty'} />
                  ))}
                </div>
                <p className="review-text">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Q&A Section */}
      <section className="product-qna-section">
        <h3 className="section-title">Common Boutique Questions</h3>
        <div className="qna-stack">
          {qnaList.map((qna, idx) => (
            <div className="qna-item-card" key={idx}>
              <button className="qna-header-btn" onClick={() => setOpenQA(openQA === idx ? -1 : idx)}>
                <span className="qna-question-text">Q: {qna.q}</span>
                {openQA === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <div className={`qna-body-panel ${openQA === idx ? 'open' : ''}`}>
                <p className="qna-answer-text"><strong>A:</strong> {qna.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Products Section */}
      <section className="similar-products-section" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '60px' }}>
        <div className="section-header">
          <h3 className="section-title">Similar Styles</h3>
        </div>
        <div className="product-grid">
          {similarProducts.map((p) => (
            <div key={p.id} className="product-card" onClick={() => onNavigateProduct(p.id)}>
              <div className="product-card-img-wrapper">
                <img src={p.image} alt={p.name} className="product-card-image" />
                <button 
                  className={`product-card-wishlist ${wishlist.includes(p.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                  aria-label="Add to wishlist"
                >
                  <Heart fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} />
                </button>
                <span className="product-card-tag">{p.tag}</span>
              </div>
              <div className="product-card-info">
                <span className="product-card-category">{p.category}</span>
                <h4 className="product-card-title">{p.name}</h4>
                <span className="product-card-price">₹{p.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   BESPOKE TAILORING SERVICE PAGE COMPONENT
   ========================================================================== */
function BespokeTailoringPage({ onBack }) {
  // Form details for bespoke fitting
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fabric, setFabric] = useState('Premium Georgette');
  const [style, setStyle] = useState('Anarkali Gown');
  const [sleeves, setSleeves] = useState('Three-Quarter');
  const [neck, setNeck] = useState('Chinese Collar');
  const [bust, setBust] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [length, setLength] = useState('');
  const [notes, setNotes] = useState('');

  const handleTailoringSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !bust || !waist) {
      alert("Please fill out Name, Phone and core dimensions!");
      return;
    }

    const message = `Namaste MaaDrobe Apparels! 🌸\n\nI want to place a *Bespoke Tailoring Request*:\n\n*Customer Details:*\nName: ${name}\nPhone: ${phone}\n\n*Garment Custom Options:*\nFabric Selection: ${fabric}\nSilhouette Style: ${style}\nNeckline Design: ${neck}\nSleeve Length: ${sleeves}\n\n*Measurements (Inches):*\nBust Size: ${bust}"\nWaist Size: ${waist}"\nHip Size: ${hips || "N/A"}"\nDesired Kurti Length: ${length || "Standard"}"\n\n*Additional Stylist Notes:*\n${notes || "None"}\n\nPlease reach out to me to confirm my custom design order details!`;
    
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    
    // Clear Form
    setName('');
    setPhone('');
    setBust('');
    setWaist('');
    setHips('');
    setLength('');
    setNotes('');

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="tailoring-page-wrapper">
      <BoutiquePageBanner 
        title="Custom Tailored Fits"
        tag="BESPOKE BOUTIQUE SERVICE"
        desc="Declare your exact measurements and options. Our master craftsmen will sew a Kurti uniquely customized for your silhouette."
        image="/images/maadrobe_casual.png"
        onBack={onBack}
      />

      <div className="tailoring-page container reveal-on-scroll" style={{ paddingTop: '50px' }}>
        <div className="tailoring-grid">
          <div className="tailoring-content">
            <h2 className="tailoring-title">Custom Fit Tailoring</h2>
            <p className="tailoring-desc">Every woman's silhouette is unique. That's why at MaaDrobe, we don't believe in standard configurations. We invite you to create a garment made-to-measure, customized exactly as you wish.</p>
            <p className="tailoring-desc">Select your fabric base, select your preferred sleeve length, pick a signature neckline, and enter your measurements. Our master tailors will handcraft your custom Kurti to fit you like a dream.</p>
            
            <div className="tailoring-features">
              <div className="tailoring-feature-item">
                <Check size={18} />
                <span>Free stylistic adjustments (Sleeves, Neck, Pockets)</span>
              </div>
              <div className="tailoring-feature-item">
                <Check size={18} />
                <span>Premium master-tailor stitch quality</span>
              </div>
              <div className="tailoring-feature-item">
                <Check size={18} />
                <span>No extra cost for standard measurements</span>
              </div>
            </div>
          </div>

          <div className="tailoring-form-card">
            <h3 className="tailoring-form-title">Custom Stylist Form</h3>
            <form onSubmit={handleTailoringSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="tail-name">Your Full Name *</label>
                <input type="text" id="tail-name" className="form-input" placeholder="e.g. Shalini Roy" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="tail-phone">WhatsApp Contact *</label>
                <input type="tel" id="tail-phone" className="form-input" placeholder="e.g. 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Fabric</label>
                  <select className="form-select" value={fabric} onChange={(e) => setFabric(e.target.value)}>
                    <option>Premium Georgette</option>
                    <option>Pure Handloom Cotton</option>
                    <option>Lakhnavi Muslin Silk</option>
                    <option>Handwoven Linen</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Kurti Silhouette</label>
                  <select className="form-select" value={style} onChange={(e) => setStyle(e.target.value)}>
                    <option>Anarkali Flared Gown</option>
                    <option>Straight Fit Kurta</option>
                    <option>A-Line Elegant Kurti</option>
                    <option>Short Casual Kurti</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Neckline Design</label>
                  <select className="form-select" value={neck} onChange={(e) => setNeck(e.target.value)}>
                    <option>Chinese Collar</option>
                    <option>Elegent V-Neck</option>
                    <option>Classic Round Neck</option>
                    <option>Graceful Boat Neck</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Sleeve Option</label>
                  <select className="form-select" value={sleeves} onChange={(e) => setSleeves(e.target.value)}>
                    <option>Three-Quarter Sleeves</option>
                    <option>Full Length Sleeves</option>
                    <option>Short Sleeves</option>
                    <option>Sleeveless Design</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="tail-bust">Bust (Inches) *</label>
                  <input type="number" id="tail-bust" className="form-input" placeholder="e.g. 36" value={bust} onChange={(e) => setBust(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="tail-waist">Waist (Inches) *</label>
                  <input type="number" id="tail-waist" className="form-input" placeholder="e.g. 30" value={waist} onChange={(e) => setWaist(e.target.value)} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="tail-hips">Hips (Inches)</label>
                  <input type="number" id="tail-hips" className="form-input" placeholder="e.g. 38" value={hips} onChange={(e) => setHips(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="tail-len">Desired Length (Inches)</label>
                  <input type="number" id="tail-len" className="form-input" placeholder="e.g. 44" value={length} onChange={(e) => setLength(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="tail-notes">Additional Styling Notes</label>
                <textarea id="tail-notes" className="form-input" style={{ height: '80px', resize: 'none' }} placeholder="Detail any specifications (e.g. add lace borders, side slits, keyhole back details...)" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
              </div>

              <button type="submit" className="btn-tailoring-submit">
                Submit Custom Stitching Order via WhatsApp 🌸
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   DEDICATED SEPARATE CHECKOUT PAGE COMPONENT
   ========================================================================== */
function CheckoutPage({ cart, getCartTotal, onBack, handleWhatsAppCheckout, handleOnlineCheckout }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMode, setPaymentMode] = useState('whatsapp');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill out the required shipping details.");
      return;
    }
    const details = { name, phone, address, city, pincode };
    if (paymentMode === 'whatsapp') {
      handleWhatsAppCheckout(details);
    } else {
      handleOnlineCheckout(details);
    }
  };

  return (
    <div className="checkout-page container reveal-on-scroll" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">
          &larr; Back to Boutique
        </button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">Boutique Checkout</span>
      </div>

      <div className="checkout-page-grid">
        {/* Left Column: Delivery Form */}
        <div className="checkout-form-container">
          <h2 className="checkout-form-main-title">Shipping & Payment Details</h2>
          <form onSubmit={onSubmit} className="checkout-delivery-form">
            <div className="form-group">
              <label className="form-label" htmlFor="cust-name">Full Name *</label>
              <input type="text" id="cust-name" className="form-input" placeholder="e.g. Priyadarshini Sen" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cust-phone">WhatsApp Number *</label>
              <input type="tel" id="cust-phone" className="form-input" placeholder="e.g. 9876543210 (10 digit WhatsApp contact)" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cust-addr">Delivery Address *</label>
              <input type="text" id="cust-addr" className="form-input" placeholder="House No, Building, Street, Area" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="cust-city">City *</label>
                <input type="text" id="cust-city" className="form-input" placeholder="Jaipur" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cust-pin">Pincode *</label>
                <input type="text" id="cust-pin" className="form-input" placeholder="302001" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Payment Preference</label>
              <div className="payment-methods">
                <div className={`payment-method-card ${paymentMode === 'whatsapp' ? 'active' : ''}`} onClick={() => setPaymentMode('whatsapp')}>
                  <Smile />
                  <span className="payment-method-title">Direct WhatsApp</span>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>Confirm order & stock on chat</p>
                </div>
                <div className={`payment-method-card ${paymentMode === 'razorpay' ? 'active' : ''}`} onClick={() => setPaymentMode('razorpay')}>
                  <ShieldCheck />
                  <span className="payment-method-title">Online Payment</span>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>Credit Cards, UPI, Netbanking</p>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-buy-now" style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {paymentMode === 'whatsapp' ? 'Confirm and Order via WhatsApp 🌸' : 'Proceed to Pay Online (Razorpay) 💳'}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="checkout-summary-container">
          <h3 className="checkout-summary-title">Boutique Bag Summary</h3>
          
          {cart.length === 0 ? (
            <p className="text-center" style={{ padding: '30px 0', color: 'var(--text-muted)' }}>No items in bag.</p>
          ) : (
            <>
              <div className="checkout-summary-items">
                {cart.map((item, idx) => (
                  <div className="checkout-summary-item" key={`${item.id}-${item.size}-${idx}`}>
                    <div className="summary-item-details">
                      <span className="summary-item-name">{item.name} <strong style={{ color: 'var(--primary-ruby)' }}>x {item.quantity}</strong></span>
                      <span className="summary-item-size">Size: {item.size}</span>
                    </div>
                    <span className="summary-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="checkout-summary-totals">
                <div className="summary-total-row">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-total-row">
                  <span>Boutique Delivery</span>
                  <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>FREE</span>
                </div>
                <div className="summary-total-row grand-total">
                  <span>Grand Total</span>
                  <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div className="checkout-badge-guarantee">
                <ShieldCheck size={16} />
                <span>100% Authentic Fabric & Quality Guarantee</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
