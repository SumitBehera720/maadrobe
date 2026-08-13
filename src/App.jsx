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
    image: "/images/maadrobe_hero_chikankari.png",
    cta: "Shop Chikankari",
    view: "chikankari"
  },
  {
    tag: "FESTIVE EXCLUSIVES",
    title: "Celebrate in Timeless Elegance.",
    desc: "Rich Banarasi silks and flared Anarkalis designed to shine at every grand occasion.",
    image: "/images/maadrobe_hero_festive.png",
    cta: "Shop Festive Wear",
    view: "festive"
  },
  {
    tag: "BESPOKE STITCHING",
    title: "Your Perfect Fit,\nDirectly from Artisans.",
    desc: "Customize your neckline, sleeves, and fit. Made-to-measure tailoring delivered to your doorstep.",
    image: "/images/maadrobe_hero_casual.png",
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
  },
  {
    id: 10,
    name: "Rania Royal Silk 3-Piece Kurta Set",
    price: 4599,
    originalPrice: 5999,
    tag: "BOUTIQUE SPECIAL",
    category: "3-Piece Kurti",
    subCategory: "kurti",
    description: "Stunning silk 3-piece set comprising a rich straight Kurti with detailed zari neckline, matching solid pants, and an organza dupatta with gold laces. Exudes pure royal charm.",
    image: "/images/maadrobe_festive.png",
    rating: 4.9,
    reviewCount: 12,
    thumbnails: [
      "/images/maadrobe_festive.png",
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png"
    ]
  },
  {
    id: 11,
    name: "Aarya Embroidered Chanderi 3-Piece Set",
    price: 4299,
    originalPrice: 5499,
    tag: "ROYAL ELEGANCE",
    category: "3-Piece Kurti",
    subCategory: "kurti",
    description: "Crafted in breathable Chanderi silk, this set features delicate hand-done katha work and sequin details, paired with straight pants and a designer scalloped dupatta.",
    image: "/images/maadrobe_festive.png",
    rating: 4.8,
    reviewCount: 8,
    thumbnails: [
      "/images/maadrobe_festive.png",
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png"
    ]
  },
  {
    id: 12,
    name: "Miraan Cotton Floral Co-ord Set",
    price: 1999,
    originalPrice: 2799,
    tag: "TRENDING",
    category: "Co-ord Sets",
    subCategory: "coords",
    description: "Stylishly tailored matching tunic and trouser co-ord set in pure premium cotton. Features vibrant floral prints, a sophisticated collar, and comfortable utility side pockets.",
    image: "/images/maadrobe_casual.png",
    rating: 4.8,
    reviewCount: 37,
    thumbnails: [
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_festive.png"
    ]
  },
  {
    id: 13,
    name: "Sia Linen Comfort Casual Co-ord Set",
    price: 2199,
    originalPrice: 2999,
    tag: "DAILY WEAR",
    category: "Co-ord Sets",
    subCategory: "coords",
    description: "Ultra-comfortable solid co-ord set made in pure handwoven linen. Styled with button-down front tunic and tapered trousers. Breathable, minimalist, and smart.",
    image: "/images/maadrobe_casual.png",
    rating: 4.7,
    reviewCount: 22,
    thumbnails: [
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_festive.png"
    ]
  },
  {
    id: 14,
    name: "Dhara Handblock Flared Tiered Dress",
    price: 2499,
    originalPrice: 3499,
    tag: "NEW LAUNCH",
    category: "Dresses",
    subCategory: "dresses",
    description: "Flowy, tiered silhouette midi dress featuring authentic handblock Indigo block printing. Crafted in premium high-density cotton with adjustable waist ties.",
    image: "/images/maadrobe_chikankari.png",
    rating: 4.9,
    reviewCount: 19,
    thumbnails: [
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_casual.png",
      "/images/maadrobe_festive.png"
    ]
  },
  {
    id: 15,
    name: "Nia Indigo Cotton Indo-Western Dress",
    price: 1899,
    originalPrice: 2499,
    tag: "EASY CHIC",
    category: "Dresses",
    subCategory: "dresses",
    description: "Fusion dress with keyhole neck details and tiered asymmetric hemline. Perfect blend of Indian handblock motifs and modern western style.",
    image: "/images/maadrobe_casual.png",
    rating: 4.7,
    reviewCount: 15,
    thumbnails: [
      "/images/maadrobe_casual.png",
      "/images/maadrobe_chikankari.png",
      "/images/maadrobe_festive.png"
    ]
  }
];

// Double clone padding array for infinite loop carousel (5 clones on each end for N=15 products)
const paddedProducts = [
  ...products.slice(-5), // Clones of last 5 items
  ...products,          // 15 real items
  ...products.slice(0, 5) // Clones of first 5 items
];

// Testimonials Data
const testimonialsData = [
  {
    name: "Aditi Sharma",
    location: "Delhi",
    rating: 5,
    text: "The custom fitting on my Chanderi 3-piece set was absolutely flawless! It feels like it was custom molded for my shape.",
    avatar: "/images/maadrobe_festive.png"
  },
  {
    name: "Sneha Reddy",
    location: "Bangalore",
    rating: 5,
    text: "MAA Drobe's Lucknowi Chikankari is the real deal. The hand embroidery is incredibly clean, and the pastel shades are so elegant.",
    avatar: "/images/maadrobe_chikankari.png"
  },
  {
    name: "Priya Sen",
    location: "Kolkata",
    rating: 5,
    text: "The WhatsApp direct ordering process is so seamless, and tracking is updated instantly. The express delivery reached me in just 3 days!",
    avatar: "/images/maadrobe_casual.png"
  },
  {
    name: "Ritu Verma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely love the Co-ord sets! High density cotton, opaque, and extremely comfortable for long office hours.",
    avatar: "/images/maadrobe_casual.png"
  },
  {
    name: "Karan Johar",
    location: "Jaipur",
    rating: 5,
    text: "Bought a tiered indigo dress for my daughter. Outstanding block print quality. Colors did not bleed at all during washing.",
    avatar: "/images/maadrobe_chikankari.png"
  },
  {
    name: "Meenakshi Iyer",
    location: "Chennai",
    rating: 5,
    text: "Bespoke tailoring service is excellent. They confirmed my measurements on WhatsApp and adjusted the sleeve length exactly as requested.",
    avatar: "/images/maadrobe_festive.png"
  },
  {
    name: "Shalini Roy",
    location: "Pune",
    rating: 5,
    text: "Superb packaging and customer support. The silk straight kurti looks very rich, perfect for festive events.",
    avatar: "/images/maadrobe_festive.png"
  },
  {
    name: "Komal Gupta",
    location: "Lucknow",
    rating: 5,
    text: "As someone from Lucknow, I'm picky about Chikankari. MAA Drobe's craftsmanship is authentic and beautiful. Fully satisfied!",
    avatar: "/images/maadrobe_chikankari.png"
  },
  {
    name: "Divya Nair",
    location: "Kochi",
    rating: 5,
    text: "Excellent linen fabric quality. Breathable, durable, and holds its structure. I've ordered 3 more sets for my colleagues.",
    avatar: "/images/maadrobe_casual.png"
  }
];

export default function App() {
  // Loading & View States
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'chikankari' | 'festive' | 'daily' | 'tailoring' | 'product' | 'checkout'
  const [activeProductId, setActiveProductId] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Header Scroll and Hover States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Cart & Wishlist States
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Announcement Bar State
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Watch to Cart Stage Carousel State
  const WTC_VIDEOS = [
    { id: 1, productId: 12, title: "Floral Cotton Co-ord",            cta: "Shop Co-ords",     videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d8c30fe3a3dbde24eb79802&profile_id=139&oauth2_token_id=57447761" },
    { id: 2, productId: 2,  title: "Chikankari Shadow-work Kurta",    cta: "Shop Chikankari",  videoUrl: "https://player.vimeo.com/external/435674703.sd.mp4?s=7f5bde4e4983226a27e7f67be6858e379b32bf52&profile_id=139&oauth2_token_id=57447761" },
    { id: 3, productId: 14, title: "Indigo Flared Tiered Dress",       cta: "Shop Dresses",     videoUrl: "https://player.vimeo.com/external/403847253.sd.mp4?s=d00e84b726cb493c0bc5c30fb8a54d5885c3c0ef&profile_id=139&oauth2_token_id=57447761" },
    { id: 4, productId: 10, title: "Royal Silk 3-Piece Set",           cta: "Shop 3-Piece",     videoUrl: "https://player.vimeo.com/external/435674681.sd.mp4?s=2a2ed1e95fa50e68d0d97034c56e297801df5e8c&profile_id=139&oauth2_token_id=57447761" },
    { id: 5, productId: 1,  title: "Gulnar Blockprinted Anarkali Set", cta: "Shop Festive",     videoUrl: "https://player.vimeo.com/external/403847224.sd.mp4?s=12d1840ef410f924df0a996c56c2057ef8c40ff2&profile_id=139&oauth2_token_id=57447761" },
  ];
  const [wtcActive, setWtcActive] = useState(0);
  const [wtcPrev, setWtcPrev] = useState(null);   // index leaving center
  const [wtcEntering, setWtcEntering] = useState(false); // triggers fade-in animation


  // Catalog Filter State
  const [catalogFilter, setCatalogFilter] = useState('ALL');

  // Promo Popup State
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [popupEmail, setPopupEmail] = useState('');
  const [popupSubscribed, setPopupSubscribed] = useState(false);

  // Best Sellers Infinite Carousel State
  const [bsIndex, setBsIndex] = useState(5); // Start after first 5 cloned elements
  const [bsTransitionEnabled, setBsTransitionEnabled] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Responsive items calculation for Best Sellers
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(2);
      } else if (window.innerWidth <= 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(5);
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

  // Watch to Cart advance helper
  const changeWtc = (nextIdx) => {
    setWtcPrev(wtcActive);
    setWtcActive(nextIdx);
    setWtcEntering(true);
    setTimeout(() => setWtcEntering(false), 700);
  };

  // Watch to Cart auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setWtcActive(prev => {
        const next = (prev + 1) % WTC_VIDEOS.length;
        setWtcPrev(prev);
        setWtcEntering(true);
        setTimeout(() => setWtcEntering(false), 700);
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
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
    if (bsIndex >= products.length + 5) {
      setBsTransitionEnabled(false);
      setBsIndex(5);
    } else if (bsIndex <= 4) {
      setBsTransitionEnabled(false);
      setBsIndex(products.length + 4);
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
    
    const message = `Namaste MAA Drobe! 🌸\n\nI would like to place a new boutique order:\n\n*Items Ordered:*\n${itemsSummary}\n\n*Total Amount:* ₹${totalAmount}\n\n*Delivery Address:*\nName: ${details.name}\nPhone: ${details.phone}\nAddress: ${details.address}, ${details.city} - ${details.pincode}\n\n*Payment Preference:* Direct Boutique Confirmation via WhatsApp\n\nKindly confirm stock availability and share payment/QR details. Thank you!`;
    
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

  // Promo Popup trigger effect
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPromoPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPromoPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPromoPopup(false);
    sessionStorage.setItem('hasSeenPromoPopup', 'true');
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    if (popupEmail.trim() && popupEmail.includes('@')) {
      setPopupSubscribed(true);
      setTimeout(() => {
        setPopupSubscribed(false);
        setShowPromoPopup(false);
        sessionStorage.setItem('hasSeenPromoPopup', 'true');
      }, 2500);
    }
  };

  const activeProduct = products.find(p => p.id === activeProductId) || products[0];

  return (
    <>
      {/* 0. Page Loader */}
      <div className={`page-loader ${!isLoading ? 'fade-out' : ''}`}>
        <div className="loader-inner">
          <div className="loader-brand">
            {'MAA Drobe'.split('').map((letter, i) => (
              <span key={i} className="loader-letter" style={{ animationDelay: `${i * 0.08}s` }}>
                {letter}
              </span>
            ))}
          </div>
          <p className="loader-tagline">BOUTIQUE</p>
          <div className="loader-bar">
            <div className="loader-bar-fill"></div>
          </div>
        </div>
      </div>



      {/* 2. Header / Navbar */}
      <header className={`header ${(isScrolled || isHeaderHovered) ? 'scrolled' : ''} ${currentView === 'home' ? 'transparent-header' : 'solid-header'}`} onMouseEnter={() => setIsHeaderHovered(true)} onMouseLeave={() => setIsHeaderHovered(false)}>
        <div className="container navbar">
          <button className="menu-toggle" aria-label="Open Menu" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu />
          </button>
          
          <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => navigateToView('home')}>
            <div className="brand-logo-wrapper">
              <img src="/images/WhatsApp_Image_2026-07-28_at_2.47.24_PM-removebg-preview.png" alt="MAA Drobe Logo" className="brand-logo-img" />
            </div>
            <div className="brand-text-wrapper">
              <span className="brand-title">MAA Drobe</span>
            </div>
          </div>

          <nav className="nav-links">
            <button className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => navigateToView('home')}>Home</button>
            <div className="nav-dropdown-wrapper">
              <button className={`nav-link dropdown-toggle ${['kurti', 'coords', 'dresses'].includes(currentView) ? 'active' : ''}`}>
                Women Fashion <ChevronDown size={14} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />
              </button>
              <div className="nav-dropdown-menu">
                <button className="dropdown-item" onClick={() => navigateToView('kurti')}>Kurti</button>
                <button className="dropdown-item" onClick={() => navigateToView('coords')}>Co-ord Sets</button>
                <button className="dropdown-item" onClick={() => navigateToView('dresses')}>Dresses</button>
              </div>
            </div>
            <button className={`nav-link ${currentView === 'tracking' ? 'active' : ''}`} onClick={() => navigateToView('tracking')}>Order Tracking</button>
            <button className={`nav-link ${currentView === 'about' ? 'active' : ''}`} onClick={() => navigateToView('about')}>About Us</button>
          </nav>

          <div className="header-search-bar">
            <input type="text" placeholder="Search ethnic wear, kurtas..." className="header-search-input" />
            <Search size={16} className="header-search-icon" />
          </div>

          <div className="nav-actions">
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



      {/* 3. Render Views dynamically wrapped in key transitions */}
      <main key={currentView} className="page-transition-enter">
        {currentView === 'home' ? (
          <>
            {/* Premium Full Bleed Hero Slider Banner with Blending Text Overlay */}
            <section className="hero-section-fullbleed">
              {heroSlides.map((slide, idx) => (
                <div key={idx} className={`hero-slide-fullbleed ${currentSlide === idx ? 'active' : ''}`}>
                  <div className="hero-fullbleed-bg" style={{ backgroundImage: `url(${slide.image})` }}></div>
                  <div className="hero-fullbleed-overlay"></div>
                  <div className="hero-fullbleed-content">
                    <span className="hero-tag" style={{ color: 'var(--primary-gold)', transform: 'translateY(0)', opacity: 1 }}>{slide.tag}</span>
                    <h2 className="hero-blending-title">
                      {slide.title.split('\n').map((line, li) => (
                        <span key={li}>{line}<br /></span>
                      ))}
                    </h2>
                    <p className="hero-desc" style={{ transform: 'translateY(0)', opacity: 1, color: 'rgba(255, 255, 255, 0.9)' }}>{slide.desc}</p>
                    <button className="hero-cta-btn" style={{ transform: 'translateY(0)', opacity: 1 }} onClick={() => navigateToView(slide.view)}>
                      {slide.cta}
                    </button>
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

            {/* Shop by Silhouette - 3 Large Categories */}
            <section className="categories-section container reveal-on-scroll" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
              <div className="section-header">
                <h2 className="section-title">Shop by Category</h2>
                <p className="section-subtitle">Exquisite silhouettes designed for every occasion</p>
              </div>
              <div className="categories-grid">
                <div className="category-card" onClick={() => navigateToView('coords')}>
                  <div className="category-img-wrapper">
                    <img src="/images/maadrobe_casual.png" alt="Co-ord Sets" className="category-img" />
                  </div>
                  <h4 className="category-name">Co-ord Sets</h4>
                </div>
                <div className="category-card" onClick={() => navigateToView('kurti')}>
                  <div className="category-img-wrapper">
                    <img src="/images/maadrobe_festive.png" alt="3-Piece Sets" className="category-img" />
                  </div>
                  <h4 className="category-name">3-Piece Sets</h4>
                </div>
                <div className="category-card" onClick={() => navigateToView('dresses')}>
                  <div className="category-img-wrapper">
                    <img src="/images/maadrobe_chikankari.png" alt="Dresses" className="category-img" />
                  </div>
                  <h4 className="category-name">Dresses</h4>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <button className="btn-outline-dark" onClick={() => navigateToView('shop')}>View All Categories</button>
              </div>
            </section>

            {/* Most Loved — 2×2 Grid */}
            <section className="best-sellers-section reveal-on-scroll">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-title">Most Loved</h2>
                  <p className="section-subtitle">Our most coveted traditional silhouettes</p>
                </div>

                <div className="most-loved-grid">
                  {products.slice(0, 4).map((p) => (
                    <div key={p.id} className="product-card" onClick={() => navigateToProduct(p.id)}>
                      <div className="product-card-img-wrapper">
                        <img src={p.image} alt={p.name} className="product-card-image" />
                        <button
                          className={`product-card-wishlist ${wishlist.includes(p.id) ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
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
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                  <button className="btn-outline-dark" onClick={() => navigateToView('shop')}>View All Products</button>
                </div>
              </div>
            </section>

            {/* Watch to Cart — Stage Carousel */}
            <section className="watch-to-cart-section reveal-on-scroll">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-title">Watch to Cart</h2>
                  <p className="section-subtitle">Experience our designs in motion</p>
                </div>
              </div>

              <div className="wtc-stage-wrapper">
                {WTC_VIDEOS.map((item, i) => {
                  const total = WTC_VIDEOS.length;
                  let rel = ((i - wtcActive) % total + total) % total;
                  if (rel > total / 2) rel -= total;

                  let posClass = '';
                  if (rel === 0)  posClass = 'wtc-center';
                  else if (rel === 1 || rel === -(total-1))  posClass = 'wtc-right';
                  else if (rel === -1 || rel === (total-1))  posClass = 'wtc-left';
                  else if (rel > 1)  posClass = 'wtc-far-right';
                  else              posClass = 'wtc-far-left';

                  // Extra animation classes
                  const isEntering = wtcEntering && i === wtcActive;
                  const isLeaving  = wtcEntering && i === wtcPrev;

                  return (
                    <div
                      key={item.id}
                      className={`wtc-stage-card ${posClass}${isEntering ? ' wtc-entering' : ''}${isLeaving ? ' wtc-leaving' : ''}`}
                      onClick={() => {
                        if (posClass === 'wtc-center') navigateToProduct(item.productId);
                        else changeWtc(i);
                      }}
                    >
                      <video src={item.videoUrl} muted loop playsInline autoPlay />
                      <div className="wtc-stage-overlay">
                        <span className="wtc-stage-title">{item.title}</span>
                        <span className="wtc-stage-cta">{item.cta} →</span>
                      </div>
                    </div>
                  );
                })}

                {/* Dot indicators */}
                <div className="wtc-dots">
                  {WTC_VIDEOS.map((_, i) => (
                    <button
                      key={i}
                      className={`wtc-dot ${i === wtcActive ? 'active' : ''}`}
                      onClick={() => changeWtc(i)}
                      aria-label={`Go to video ${i + 1}`}
                    />
                  ))}
                </div>

              </div>
            </section>


                       {/* Redesigned Artisanal Story Section */}
            <section className="story-section reveal-on-scroll">
              <div className="container story-grid">
                <div className="story-content">
                  <span className="story-tagline">OUR HERITAGE</span>
                  <h3 className="story-title">Crafting India's <span className="highlight-ruby">Heritage</span></h3>
                  <p className="story-intro">At <strong>MAA Drobe</strong>, we bridge the gap between traditional Indian weaver craftsmanship and modern boutique style.</p>
                  
                  <div className="heritage-pillars">
                    <div className="pillar-item">
                      <div className="pillar-dot"></div>
                      <div className="pillar-body">
                        <h4 className="pillar-name">100% Pure Organic Fabrics</h4>
                        <p className="pillar-desc">Each piece is cut from handpicked pure fabrics, including premium silk, handloom cotton, and georgettes.</p>
                      </div>
                    </div>
                    
                    <div className="pillar-item">
                      <div className="pillar-dot"></div>
                      <div className="pillar-body">
                        <h4 className="pillar-name">Authentic Chikankari Shadow-work</h4>
                        <p className="pillar-desc">Hand-embroidery created by specialized clusters of artisans in Lucknow and Rajasthan.</p>
                      </div>
                    </div>

                    <div className="pillar-item">
                      <div className="pillar-dot"></div>
                      <div className="pillar-body">
                        <h4 className="pillar-name">WhatsApp Bespoke Tailoring</h4>
                        <p className="pillar-desc">Silhouettes custom adjusted to your height and measurements for the perfect tailored fit.</p>
                      </div>
                    </div>
                  </div>

                  <div className="story-action">
                    <button className="btn-solid-gold" onClick={() => navigateToView('tailoring')}>Explore Bespoke Services</button>
                  </div>
                </div>

                <div className="story-collage">
                  <div className="collage-main-img-wrapper">
                    <img src="/images/maadrobe_festive.png" alt="Traditional Silhouettes" className="collage-main-img" />
                  </div>
                  <div className="collage-sub-img-wrapper">
                    <img src="/images/maadrobe_chikankari.png" alt="Embroidery Detail" className="collage-sub-img" />
                  </div>
                  <div className="story-badge-premium">
                    <span className="badge-value">100%</span>
                    <span className="badge-label">Handcrafted</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section reveal-on-scroll">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-title">Client Diaries</h2>
                  <p className="section-subtitle">Real experiences from our lovely community</p>
                </div>
              </div>
              <div className="testimonials-carousel-wrapper">
                <div className="testimonials-track">
                  {[...testimonialsData, ...testimonialsData].map((item, idx) => (
                    <div className="testimonial-card" key={idx}>
                      <div className="testimonial-stars" style={{ display: 'flex', gap: '4px', color: 'var(--primary-gold)' }}>
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <p className="testimonial-quote">"{item.text}"</p>
                      <div className="testimonial-author" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '15px' }}>
                        <img src={item.avatar} alt={item.name} className="testimonial-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div className="author-info" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                          <span className="author-name" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-espresso)' }}>{item.name}</span>
                          <span className="author-role" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Verified Buyer, {item.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Instagram Showcase */}
            <section className="polaroid-section container reveal-on-scroll">
              <div className="section-header">
                <h2 className="section-title">Follow @MAADrobe</h2>
                <p className="section-subtitle">Styling Inspiration & Happy Customers</p>
              </div>
              <div className="polaroid-grid">
                {[
                  { img: "/images/maadrobe_casual.png", caption: "#MAADrobeCoords" },
                  { img: "/images/maadrobe_festive.png", caption: "#MAADrobe3Piece" },
                  { img: "/images/maadrobe_chikankari.png", caption: "#MAADrobeDresses" },
                  { img: "/images/maadrobe_hero_chikankari.png", caption: "#MAADrobeStyle" }
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
        ) : currentView === 'kurti' ? (
          <CollectionPage 
            title="Kurti Collection"
            tag="PREMIUM WOMAN ETHNIC"
            desc="Explore our range of traditional Chikankari, elegant Anarkalis, and premium 3-Piece Kurta sets."
            bannerImage="/images/maadrobe_chikankari.png"
            products={products.filter(p => p.subCategory === 'kurti' || p.category.includes('Kurti') || p.category.includes('Suits'))}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={() => navigateToView('home')}
          />
        ) : currentView === 'coords' ? (
          <CollectionPage 
            title="Co-ord Sets"
            tag="MODERN FUSION COMFORT"
            desc="Matching tunic and trouser sets tailored in organic cottons and pure linens for smart, easy styling."
            bannerImage="/images/maadrobe_casual.png"
            products={products.filter(p => p.subCategory === 'coords')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={() => navigateToView('home')}
          />
        ) : currentView === 'dresses' ? (
          <CollectionPage 
            title="Dresses"
            tag="ELEGANT INDO-WESTERN"
            desc="Flowy tiered midi dresses and keyhole-neck silhouettes showcasing authentic traditional prints."
            bannerImage="/images/maadrobe_festive.png"
            products={products.filter(p => p.subCategory === 'dresses')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={() => navigateToView('home')}
          />
        ) : currentView === 'tracking' ? (
          <OrderTrackingPage onBack={() => navigateToView('home')} />
        ) : currentView === 'about' ? (
          <AboutUsPage onBack={() => navigateToView('home')} />
        ) : currentView === 'tailoring' ? (
          <BespokeTailoringPage onBack={() => navigateToView('home')} />
        ) : currentView === 'shop' ? (
          <CollectionPage 
            title="The Complete Boutique"
            tag="ALL SILHOUETTES"
            desc="Explore our entire curation of handcrafted premium women ethnic wear."
            bannerImage="/images/maadrobe_hero_chikankari.png"
            products={products}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={() => navigateToView('home')}
          />
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



      {/* 14. Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand-column footer-col">
            <div className="footer-logo-container" style={{ cursor: 'pointer' }} onClick={() => navigateToView('home')}>
              <div className="brand-logo-wrapper">
                <img src="/images/WhatsApp_Image_2026-07-28_at_2.47.24_PM-removebg-preview.png" alt="MAA Drobe Logo" className="footer-logo-img" />
              </div>
              <div className="brand-text-wrapper">
                <span className="brand-title" style={{ color: 'var(--primary-gold)' }}>MAA Drobe</span>
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
            <h4 className="footer-title">Women Collection</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateToView('kurti')}>Kurti</button></li>
              <li><button onClick={() => navigateToView('coords')}>Co-ord Sets</button></li>
              <li><button onClick={() => navigateToView('dresses')}>Dresses</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Help</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateToView('tracking')}>Track Order</button></li>
              <li><a href="#shipping-terms">Shipping & Delivery</a></li>
              <li><a href="#exchanges">Returns & Exchanges</a></li>
              <li><a href="#faqs">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>&copy; {new Date().getFullYear()} MAA DROBE. All Rights Reserved.</span>
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
              <div className="brand-logo-wrapper">
                <img src="/images/WhatsApp_Image_2026-07-28_at_2.47.24_PM-removebg-preview.png" alt="MAA Drobe Logo" className="brand-logo-img" />
              </div>
              <div className="brand-text-wrapper">
                <span className="brand-title">MAA Drobe</span>
              </div>
            </div>
            <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X />
            </button>
          </div>
          <div className="mobile-menu-body">
            <nav className="mobile-nav-links">
              <button onClick={() => navigateToView('home')}>Home</button>
              <div className="mobile-dropdown-header">Women Fashion</div>
              <div className="mobile-dropdown-items" style={{ paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                <button onClick={() => navigateToView('kurti')} style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Kurti</button>
                <button onClick={() => navigateToView('coords')} style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Co-ord Sets</button>
                <button onClick={() => navigateToView('dresses')} style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Dresses</button>
              </div>
              <button onClick={() => navigateToView('tracking')}>Order Tracking</button>
              <button onClick={() => navigateToView('about')}>About Us</button>
            </nav>
            <div className="mobile-menu-footer">
              <p>Premium handcrafted Indian ethnic wear. Crafted in organic fabrics, tailored to perfection.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 18. Promo Subscription Popup Modal */}
      <div className={`popup-overlay ${showPromoPopup ? 'open' : ''}`} onClick={closePopup}>
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close-btn" onClick={closePopup} aria-label="Close Popup">
            <X size={20} />
          </button>
          <div className="popup-image-banner">
            <span className="popup-banner-text">MAA Drobe</span>
          </div>
          <div className="popup-content">
            <h3 className="popup-title">Unlock 10% Off</h3>
            <p className="popup-desc">Join the MaaDrobe Clan today. Subscribe to our newsletter to receive updates on new collections, private sales, and custom tailoring promotions.</p>
            {popupSubscribed ? (
              <p className="popup-success-msg">🌸 Thank you! Check your inbox for your coupon code.</p>
            ) : (
              <form onSubmit={handlePopupSubmit} className="popup-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="popup-input" 
                  value={popupEmail}
                  onChange={(e) => setPopupEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="popup-submit-btn">Subscribe & Claim 10% Off</button>
              </form>
            )}
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

    const message = `Namaste MAA Drobe! 🌸\n\nI want to place a *Bespoke Tailoring Request*:\n\n*Customer Details:*\nName: ${name}\nPhone: ${phone}\n\n*Garment Custom Options:*\nFabric Selection: ${fabric}\nSilhouette Style: ${style}\nNeckline Design: ${neck}\nSleeve Length: ${sleeves}\n\n*Measurements (Inches):*\nBust Size: ${bust}"\nWaist Size: ${waist}"\nHip Size: ${hips || "N/A"}"\nDesired Kurti Length: ${length || "Standard"}"\n\n*Additional Stylist Notes:*\n${notes || "None"}\n\nPlease reach out to me to confirm my custom design order details!`;
    
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

/* ==========================================================================
   ORDER TRACKING PAGE COMPONENT
   ========================================================================== */
function OrderTrackingPage({ onBack }) {
  const [orderIdInput, setOrderIdInput] = useState('MD-7890-IN');
  const [searchedId, setSearchedId] = useState('MD-7890-IN');
  
  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      setSearchedId(orderIdInput.trim().toUpperCase());
    }
  };

  return (
    <div className="tracking-page-container container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">
          &larr; Back to Boutique
        </button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">Order Tracking</span>
      </div>

      <h1 className="section-title" style={{ display: 'block', margin: '20px auto 40px auto', textAlign: 'center' }}>Track Your Order</h1>

      <form onSubmit={handleTrackSubmit} className="tracking-search-bar">
        <input 
          type="text" 
          placeholder="Enter Order ID (e.g. MD-7890-IN)" 
          className="tracking-input"
          value={orderIdInput}
          onChange={(e) => setOrderIdInput(e.target.value)}
          required 
        />
        <button type="submit" className="tracking-btn">Track</button>
      </form>

      <div className="tracking-card">
        <div className="tracking-details-header">
          <div>
            <span className="tracking-id-label">Order: {searchedId}</span>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Carrier: BlueDart Express Express</div>
          </div>
          <span className="tracking-status-badge">In Transit</span>
        </div>

        <div className="timeline-container">
          <div className="timeline-step completed">
            <div className="timeline-bullet"><Check size={16} /></div>
            <div className="timeline-info">
              <span className="timeline-title">Order Confirmed</span>
              <span className="timeline-desc">Your order has been verified by the boutique and is sent for stitching adjustments.</span>
              <span className="timeline-time">Aug 04, 2026 - 10:15 AM</span>
            </div>
          </div>

          <div className="timeline-step completed">
            <div className="timeline-bullet"><Check size={16} /></div>
            <div className="timeline-info">
              <span className="timeline-title">Packed & Ready</span>
              <span className="timeline-desc">Artisans finished final adjustments and ironed the garments. Sealed in premium boutique packaging.</span>
              <span className="timeline-time">Aug 05, 2026 - 02:30 PM</span>
            </div>
          </div>

          <div className="timeline-step active">
            <div className="timeline-bullet"><Truck size={16} /></div>
            <div className="timeline-info">
              <span className="timeline-title">Shipped & In Transit</span>
              <span className="timeline-desc">Package handed over to BlueDart. Departed from Jaipur sorting facility.</span>
              <span className="timeline-time">Aug 06, 2026 - 08:45 AM</span>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-bullet"><Smile size={16} /></div>
            <div className="timeline-info">
              <span className="timeline-title">Out for Delivery</span>
              <span className="timeline-desc">Order is reaching your nearest delivery hub. Courier will contact you on WhatsApp.</span>
              <span className="timeline-time">Expected: Aug 08, 2026</span>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-bullet"><ShoppingBag size={16} /></div>
            <div className="timeline-info">
              <span className="timeline-title">Delivered</span>
              <span className="timeline-desc">Delivered to your doorstep. Share your fit on Instagram @MAADrobe!</span>
              <span className="timeline-time">Expected: Aug 08, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   ABOUT US PAGE COMPONENT
   ========================================================================== */
function AboutUsPage({ onBack }) {
  return (
    <div className="about-page-container reveal-on-scroll">
      <div className="container">
        <div className="breadcrumb-nav">
          <button onClick={onBack} className="back-btn">
            &larr; Back to Boutique
          </button>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-current font-bold">About Us</span>
        </div>

        <h1 className="section-title" style={{ display: 'block', margin: '20px auto 40px auto', textAlign: 'center' }}>Our Legacy</h1>
        
        <div className="about-intro-grid">
          <div>
            <h3 className="about-subtitle-premium">Preserving the Essence of Indian Handloom</h3>
            <p className="about-para"><strong>MAA Drobe</strong> was founded with a singular, passionate vision: to celebrate the timeless elegance of traditional Indian weaves while tailoring each piece to match the unique silhouette of the modern woman.</p>
            <p className="about-para">We believe that ethnic garments should be a second skin. Every kurta, coordinate set, and fusion dress in our catalog is handpicked and woven using 100% pure organic fabrics. We work directly with family-run weaver cooperatives across India to source authentic Lucknow georgettes, royal Banarasi brocades, and breezy Jaipur cottons, bypass-cutting intermediaries to ensure ethical wages for artisans.</p>
          </div>
          <div>
            <img src="/images/maadrobe_about_banner.png" alt="Our Premium Handcrafted Collection" className="about-intro-img" />
          </div>
        </div>

        <div className="about-pillars-grid">
          <div className="pillar-card">
            <h4 className="pillar-title">100% Pure Fabric Promise</h4>
            <p className="pillar-text">We never compromise on fabric integrity. Every piece is crafted from organic linens, breathable handloom cottons, and rich natural silks. Free from toxic dyes and synthetics, they offer unmatched comfort in all seasons.</p>
          </div>
          <div className="pillar-card">
            <h4 className="pillar-title">Empowering Artisan Clusters</h4>
            <p className="pillar-text">Our hand-embroidery work is done by rural women self-help groups in Uttar Pradesh and Rajasthan. By ordering a MaaDrobe design, you help preserve heritage crafts like Lakhnavi Chikankari and shadow-work detailing.</p>
          </div>
          <div className="pillar-card">
            <h4 className="pillar-title">Made-to-Order Sizing</h4>
            <p className="pillar-text">To prevent wastage and promote sustainable fashion, we offer a complimentary online custom adjustment service. Our boutique masters verify your measurements to deliver a perfect, tailor-made drape.</p>
          </div>
        </div>

        <div className="about-philosophy">
          <h3 className="philosophy-title">Our Sustainable Philosophy</h3>
          <p className="philosophy-para">
            In a world dominated by fast fashion, MaaDrobe stands as a beacon of slow, intentional couture. We believe in creating garments that last generations. By combining ancient needlecraft with contemporary silhouettes, we design apparel that tells a story of heritage, pride, and ultimate comfort.
          </p>
        </div>
      </div>
    </div>
  );
}
