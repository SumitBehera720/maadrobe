import { useState, useEffect, useRef, useMemo } from 'react';
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
  Star,
  User,
  Mail,
  ArrowRight,
  Phone,
  Clock,
  MessageCircle,
  Package,
  RefreshCw,
  Tag
} from 'lucide-react';
import Lenis from 'lenis';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const formatImgUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/images/')) return path;
  if (path.startsWith('storage/')) return `${API_BASE_URL.replace('/api/v1', '')}/${path}`;
  return path;
};

// Hero Carousel Data (Matching WhatsApp Mockup Banner + Collections)
const heroSlides = [
  {
    id: 0,
    lines: ["A wardrobe", "that feels like"],
    accent: "it belongs to you.",
    desc: "Timeless styles for your everyday moments.",
    image: "/images/maadrobe_hero_editorial.jpg",
    cta: "SHOP NEW ARRIVALS →",
    view: "kurti",
    scriptNote: ["Every", "Outfit", "A Happier", "You ♡"]
  },
  {
    id: 1,
    lines: ["Breeze through", "every moment in"],
    accent: "effortless dresses.",
    desc: "Flowy silhouettes and artisanal prints crafted for timeless grace.",
    image: "/images/maadrobe_hero_dresses.jpg",
    cta: "EXPLORE DRESSES →",
    view: "dresses",
    scriptNote: ["Pure", "Grace", "In Every", "Twirl ♡"]
  },
  {
    id: 2,
    lines: ["Celebrate life's", "grandest moments in"],
    accent: "royal kurta sets.",
    desc: "Intricate Chikankari embroidery, festive silks, and regal ensembles.",
    image: "/images/maadrobe_hero_kurtasets.jpg",
    cta: "SHOP KURTA SETS →",
    view: "kurtasets",
    scriptNote: ["Crafted", "With Love", "For You ♡"]
  },
  {
    id: 3,
    lines: ["Smart comfort", "designed for your"],
    accent: "daily rhythm.",
    desc: "Breathable pure cotton matching sets tailored for modern ease.",
    image: "/images/maadrobe_hero_coords.jpg",
    cta: "SHOP CO-ORD SETS →",
    view: "coords",
    scriptNote: ["Style", "Made", "Effortless ♡"]
  }
];


// Reference Categories Data (Matching WhatsApp Image Mockup)
const referenceCategories = [
  { id: 1, name: 'KURTIS', slug: 'kurti', image: '/images/ref_cat_kurtis.jpg' },
  { id: 2, name: 'DRESSES', slug: 'dresses', image: '/images/ref_cat_dresses.jpg' },
  { id: 3, name: 'KURTA SETS', slug: 'kurtasets', image: '/images/ref_cat_kurtasets.jpg' },
  { id: 4, name: 'CO-ORDS', slug: 'coords', image: '/images/ref_cat_coords.jpg' }
];

// Reference New Arrivals Products (Matching WhatsApp Image Mockup)
const newArrivalsList = [
  {
    id: 101,
    name: "Floral A-Line Kurti",
    price: 899,
    originalPrice: 1299,
    tag: "NEW ARRIVAL",
    category: "Kurtis",
    subCategory: "kurti",
    description: "Lightweight, breathable floral A-line cotton kurti with three-quarter sleeves and mandarin neckline. Perfect for festive daytime gatherings and comfortable everyday elegance.",
    image: "/images/ref_prod_kurti.jpg",
    rating: 4.8,
    reviewCount: 48,
    thumbnails: ["/images/ref_prod_kurti.jpg", "/images/ref_prod_dress.jpg", "/images/ref_prod_kurtaset.jpg"]
  },
  {
    id: 102,
    name: "Printed Maxi Dress",
    price: 1299,
    originalPrice: 1699,
    tag: "NEW ARRIVAL",
    category: "Dresses",
    subCategory: "dresses",
    description: "Graceful flared printed maxi dress featuring hand-block floral motifs in soothing Mediterranean blue tones with an elegant flowy silhouette.",
    image: "/images/ref_prod_dress.jpg",
    rating: 4.7,
    reviewCount: 36,
    thumbnails: ["/images/ref_prod_dress.jpg", "/images/ref_prod_kurti.jpg", "/images/ref_prod_coord.jpg"]
  },
  {
    id: 103,
    name: "Embroidered Kurta Set",
    price: 1599,
    originalPrice: 2299,
    tag: "NEW ARRIVAL",
    category: "Kurta Sets",
    subCategory: "kurtasets",
    description: "Exquisite sage green organza & silk blend Kurta Set adorned with delicate thread work embroidery, accompanied by matching tailored pants and sheer dupatta.",
    image: "/images/ref_prod_kurtaset.jpg",
    rating: 4.9,
    reviewCount: 64,
    thumbnails: ["/images/ref_prod_kurtaset.jpg", "/images/ref_prod_kurti.jpg", "/images/ref_prod_dress.jpg"]
  },
  {
    id: 104,
    name: "Cotton Co-ord Set",
    price: 1199,
    originalPrice: 1799,
    tag: "NEW ARRIVAL",
    category: "Co-ord Sets",
    subCategory: "coords",
    description: "Smart contemporary tunic and trouser co-ord set crafted from breathable pure cotton, designed for effortless casual chic styling.",
    image: "/images/ref_prod_coord.jpg",
    rating: 4.6,
    reviewCount: 29,
    thumbnails: ["/images/ref_prod_coord.jpg", "/images/ref_prod_kurtaset.jpg", "/images/ref_prod_kurti.jpg"]
  }
];

// Products Data (Using generated premium assets)
const products = [
  ...newArrivalsList,
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
    tag: "MAADROBE SPECIAL",
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
    text: "MaaDrobe's Lucknowi Chikankari is the real deal. The hand embroidery is incredibly clean, and the pastel shades are so elegant.",
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
    text: "As someone from Lucknow, I'm picky about Chikankari. MaaDrobe's craftsmanship is authentic and beautiful. Fully satisfied!",
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

// Reference Layout Data & Components (Matching WhatsApp Design Mockup Exactly)
const BotanicalBranch = ({ className = '', style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 140 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 170 C 35 130, 60 80, 95 15"
      stroke="#c2aca0"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path d="M36 142 C 20 140, 10 147, 8 156 C 18 160, 32 153, 36 142 Z" stroke="#c2aca0" strokeWidth="1.2" fill="none" />
    <path d="M43 125 C 58 116, 72 118, 78 126 C 68 135, 54 132, 43 125 Z" stroke="#c2aca0" strokeWidth="1.2" fill="none" />
    <path d="M51 100 C 34 94, 24 99, 18 108 C 30 114, 44 110, 51 100 Z" stroke="#c2aca0" strokeWidth="1.2" fill="none" />
    <path d="M60 80 C 76 70, 90 73, 96 82 C 86 90, 71 87, 60 80 Z" stroke="#c2aca0" strokeWidth="1.2" fill="none" />
    <path d="M69 58 C 52 48, 42 54, 35 62 C 46 68, 60 66, 69 58 Z" stroke="#c2aca0" strokeWidth="1.2" fill="none" />
    <path d="M78 38 C 92 26, 105 29, 110 37 C 100 45, 87 43, 78 38 Z" stroke="#c2aca0" strokeWidth="1.2" fill="none" />
    <path d="M92 18 C 88 8, 92 2, 98 4 C 102 9, 99 15, 92 18 Z" stroke="#c2aca0" strokeWidth="1.2" fill="none" />
  </svg>
);

const refFeatures = [
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#221815" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Get your order quickly."
  },
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#221815" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    title: "Easy Returns",
    desc: "Shop with confidence."
  },
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#221815" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Secure Payments",
    desc: "Your data is always safe."
  },
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#221815" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Quality Checked",
    desc: "Every piece, carefully checked."
  }
];

const refInstaLooks = [
  { id: 1, image: "/images/ref_insta_1.jpg", alt: "MaaDrobe Real Styles Look 1" },
  { id: 2, image: "/images/ref_insta_2.jpg", alt: "MaaDrobe Real Styles Look 2" },
  { id: 3, image: "/images/ref_insta_3.jpg", alt: "MaaDrobe Real Styles Look 3" },
  { id: 4, image: "/images/ref_insta_4.jpg", alt: "MaaDrobe Real Styles Look 4" },
  { id: 5, image: "/images/ref_insta_5.jpg", alt: "MaaDrobe Real Styles Look 5" },
  { id: 6, image: "/images/ref_insta_6.jpg", alt: "MaaDrobe Real Styles Look 6" }
];

export default function App() {
  // Loading & View States
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'chikankari' | 'festive' | 'daily' | 'tailoring' | 'product' | 'checkout' | 'login'
  const [previousView, setPreviousView] = useState('home');
  const [activeProductId, setActiveProductId] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Mobile Back Navigation & Exit Guard States
  const [backToast, setBackToast] = useState('');
  const lastBackPressTimeRef = useRef(0);
  const currentViewRef = useRef('home');
  const activeProductIdRef = useRef(1);
  const showPromoPopupRef = useRef(false);
  const isCartOpenRef = useRef(false);
  const isWishlistOpenRef = useRef(false);
  const isMobileMenuOpenRef = useRef(false);

  // Keep refs synchronized on every state update
  useEffect(() => { currentViewRef.current = currentView; }, [currentView]);
  useEffect(() => { activeProductIdRef.current = activeProductId; }, [activeProductId]);
  useEffect(() => { isCartOpenRef.current = isCartOpen; }, [isCartOpen]);
  useEffect(() => { isWishlistOpenRef.current = isWishlistOpen; }, [isWishlistOpen]);
  useEffect(() => { isMobileMenuOpenRef.current = isMobileMenuOpen; }, [isMobileMenuOpen]);

  // Helper to convert view name + productId into URL hash
  const getHashForState = (view, prodId) => {
    if (view === 'product' && prodId) return `#product-${prodId}`;
    if (!view || view === 'home') return '#home';
    return `#${view}`;
  };

  // Helper to parse URL hash into view + productId
  const parseHash = (hashStr) => {
    const hash = (hashStr || window.location.hash || '').replace(/^#/, '').trim();
    if (!hash || hash === 'home') {
      return { view: 'home', productId: null };
    }
    if (hash.startsWith('product-')) {
      const idStr = hash.replace('product-', '');
      const prodId = isNaN(Number(idStr)) ? idStr : Number(idStr);
      return { view: 'product', productId: prodId };
    }
    if (hash.startsWith('product')) {
      const match = hash.match(/id=([0-9a-zA-Z_-]+)/);
      if (match) {
        const prodId = isNaN(Number(match[1])) ? match[1] : Number(match[1]);
        return { view: 'product', productId: prodId };
      }
      return { view: 'product', productId: null };
    }
    return { view: hash, productId: null };
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Drawer control functions with browser history integration
  const openCart = () => {
    setIsCartOpen(true);
    setIsWishlistOpen(false);
    setIsMobileMenuOpen(false);
    window.history.pushState({
      view: currentViewRef.current,
      productId: activeProductIdRef.current,
      isDrawer: true,
      drawerType: 'cart',
      hasAppHistory: true
    }, '', window.location.hash || '#home');
  };

  const closeCart = (fromPopstate = false) => {
    setIsCartOpen(false);
    if (!fromPopstate && window.history.state?.isDrawer && window.history.state?.drawerType === 'cart') {
      window.history.back();
    }
  };

  const openWishlist = () => {
    setIsWishlistOpen(true);
    setIsCartOpen(false);
    setIsMobileMenuOpen(false);
    window.history.pushState({
      view: currentViewRef.current,
      productId: activeProductIdRef.current,
      isDrawer: true,
      drawerType: 'wishlist',
      hasAppHistory: true
    }, '', window.location.hash || '#home');
  };

  const closeWishlist = (fromPopstate = false) => {
    setIsWishlistOpen(false);
    if (!fromPopstate && window.history.state?.isDrawer && window.history.state?.drawerType === 'wishlist') {
      window.history.back();
    }
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    window.history.pushState({
      view: currentViewRef.current,
      productId: activeProductIdRef.current,
      isDrawer: true,
      drawerType: 'menu',
      hasAppHistory: true
    }, '', window.location.hash || '#home');
  };

  const closeMobileMenu = (fromPopstate = false) => {
    setIsMobileMenuOpen(false);
    if (!fromPopstate && window.history.state?.isDrawer && window.history.state?.drawerType === 'menu') {
      window.history.back();
    }
  };

  // Core view navigation with browser history push/replace
  const navigateToView = (viewName, options = {}) => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);

    if (currentViewRef.current === viewName && !options.force) {
      scrollToTop();
      return;
    }

    setPreviousView(currentViewRef.current);
    setCurrentView(viewName);
    scrollToTop();

    const targetHash = getHashForState(viewName, null);
    const stateObj = {
      view: viewName,
      productId: null,
      isDrawer: false,
      hasAppHistory: true
    };

    if (options.replace || window.history.state?.isDrawer) {
      window.history.replaceState(stateObj, '', targetHash);
    } else {
      window.history.pushState(stateObj, '', targetHash);
    }
  };

  // Product detail view navigation with browser history
  const navigateToProduct = (productOrId, options = {}) => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);

    const id = typeof productOrId === 'object' && productOrId !== null ? productOrId.id : productOrId;
    setPreviousView(currentViewRef.current);
    setActiveProductId(id);
    setCurrentView('product');
    scrollToTop();

    const targetHash = getHashForState('product', id);
    const stateObj = {
      view: 'product',
      productId: id,
      hasAppHistory: true
    };

    if (options.replace || window.history.state?.isDrawer) {
      window.history.replaceState(stateObj, '', targetHash);
    } else {
      window.history.pushState(stateObj, '', targetHash);
    }
  };

  // Universal in-app back button handler
  const handleGoBack = () => {
    if (isCartOpenRef.current) { closeCart(); return; }
    if (isWishlistOpenRef.current) { closeWishlist(); return; }
    if (isMobileMenuOpenRef.current) { closeMobileMenu(); return; }
    if (showPromoPopupRef.current) {
      setShowPromoPopup(false);
      sessionStorage.setItem('hasSeenPromoPopup', 'true');
      return;
    }

    if (currentViewRef.current === 'product' && previousView) {
      navigateToView(previousView);
      return;
    }

    if (window.history.state && (window.history.state.hasAppHistory || window.history.state.isHomeSentinel)) {
      window.history.back();
    } else {
      navigateToView('home');
    }
  };


  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterStatus('Thank you for subscribing! Welcome to MaaDrobe.');
      setTimeout(() => setNewsletterStatus(''), 4500);
      setNewsletterEmail('');
    }
  };

  // Customer Auth State
  const [customerToken, setCustomerToken] = useState(localStorage.getItem('customer_token') || '');
  const [customerUser, setCustomerUser] = useState(JSON.parse(localStorage.getItem('customer_user') || 'null'));
  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '', phone: '' });
  const [loginError, setLoginError] = useState('');
  const [loginMode, setLoginMode] = useState('login'); // 'login' | 'register'
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('customer_token', data.data.token);
        localStorage.setItem('customer_user', JSON.stringify(data.data.user));
        setCustomerToken(data.data.token);
        setCustomerUser(data.data.user);
        setLoginForm({ email: '', password: '', name: '', phone: '' });
        navigateToView('home');
      } else {
        setLoginError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setLoginError('Connection error. Please try again.');
    }
    setLoginLoading(false);
  };

  const handleCustomerRegister = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: loginForm.name, email: loginForm.email, password: loginForm.password, phone: loginForm.phone })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('customer_token', data.data.token);
        localStorage.setItem('customer_user', JSON.stringify(data.data.user));
        setCustomerToken(data.data.token);
        setCustomerUser(data.data.user);
        setLoginForm({ email: '', password: '', name: '', phone: '' });
        navigateToView('home');
      } else {
        setLoginError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setLoginError('Connection error. Please try again.');
    }
    setLoginLoading(false);
  };

  const [fpStep, setFpStep] = useState(1); // 1=enter email, 2=enter OTP+newpass
  const [fpEmail, setFpEmail] = useState('');
  const [fpOtp, setFpOtp] = useState('');
  const [fpNewPass, setFpNewPass] = useState('');
  const [fpConfirmPass, setFpConfirmPass] = useState('');
  const [fpLoading, setFpLoading] = useState(false);
  const [fpError, setFpError] = useState('');
  const [fpSuccess, setFpSuccess] = useState('');

  const handleForgotPasswordSend = async (e) => {
    e.preventDefault();
    setFpError(''); setFpSuccess(''); setFpLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: fpEmail })
      });
      const data = await res.json();
      if (data.success) { setFpStep(2); setFpSuccess(data.message); }
      else { setFpError(data.message || 'No account found with this email.'); }
    } catch { setFpError('Connection error. Please try again.'); }
    setFpLoading(false);
  };

  const handleForgotPasswordReset = async (e) => {
    e.preventDefault();
    if (fpNewPass !== fpConfirmPass) { setFpError('Passwords do not match.'); return; }
    setFpError(''); setFpSuccess(''); setFpLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: fpEmail, otp: fpOtp, password: fpNewPass, password_confirmation: fpConfirmPass })
      });
      const data = await res.json();
      if (data.success) {
        setFpSuccess('Password reset! Please sign in with your new password.');
        setTimeout(() => { setLoginMode('login'); setFpStep(1); setFpEmail(''); setFpOtp(''); setFpNewPass(''); setFpConfirmPass(''); setFpError(''); setFpSuccess(''); }, 2000);
      } else { setFpError(data.message || 'Invalid OTP. Please try again.'); }
    } catch { setFpError('Connection error. Please try again.'); }
    setFpLoading(false);
  };

  const handleCustomerLogout = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_user');
    setCustomerToken('');
    setCustomerUser(null);
    navigateToView('home');
  };

  // Dynamic API Database states
  const [productsList, setProductsList] = useState(products);
  const [categoriesList, setCategoriesList] = useState([
    { id: 1, name: 'Co-ord Sets', slug: 'coords', image_path: '/images/maadrobe_casual.png' },
    { id: 2, name: '3-Piece Sets', slug: 'kurti', image_path: '/images/maadrobe_festive.png' },
    { id: 3, name: 'Dresses', slug: 'dresses', image_path: '/images/maadrobe_chikankari.png' }
  ]);
  const [bannersList, setBannersList] = useState(heroSlides);
  const [homepageCms, setHomepageCms] = useState({
    // Shop by Category
    categories_visible: '1',
    categories_title: 'Shop by Category',
    categories_desc: 'Explore styles for every version of you.',
    categories_cta: 'VIEW ALL →',

    // New Arrivals Section
    new_arrivals_visible: '1',
    new_arrivals_title: 'New Arrivals',
    new_arrivals_desc: 'Fresh styles, just for you.',
    new_arrivals_cta: 'VIEW ALL →',
    new_arrivals_product_ids: '',

    // Editorial Side Banner (Second Image Section)
    editorial_title: 'DRESS\nTHE WAY\nYOU FEEL',
    editorial_desc: 'Effortless styles for every moment.',
    editorial_cta: 'EXPLORE COLLECTION →',
    editorial_link: 'shop',
    editorial_image: '/images/ref_editorial_banner.jpg',

    // Spotlight / Curated Bestsellers Section
    spotlight_enabled: '0',
    spotlight_title: 'Curated Spotlight',
    spotlight_desc: 'Most-loved silhouettes handpicked by our stylists.',
    spotlight_cta: 'SHOP SPOTLIGHT →',
    spotlight_product_ids: '',

    // Features & Value Bar
    features_visible: '1',
    features_1_title: 'Fast Delivery',
    features_1_desc: 'Get your order quickly.',
    features_2_title: 'Easy Returns',
    features_2_desc: 'Shop with confidence.',
    features_3_title: 'Secure Payments',
    features_3_desc: 'Your data is always safe.',
    features_4_title: 'Quality Checked',
    features_4_desc: 'Every piece, carefully checked.',

    // Instagram / Community Showcase
    insta_visible: '1',
    insta_handle: '@MaaDrobe',
    insta_subtitle: 'Real women. Real styles. Tag us to get featured!',
    insta_cta: 'SHOP THE LOOK →',
    insta_img_1: '/images/ref_insta_1.jpg',
    insta_img_2: '/images/ref_insta_2.jpg',
    insta_img_3: '/images/ref_insta_3.jpg',
    insta_img_4: '/images/ref_insta_4.jpg',
    insta_img_5: '/images/ref_insta_5.jpg',
    insta_img_6: '/images/ref_insta_6.jpg',

    // Newsletter Section
    newsletter_visible: '1',
    newsletter_title: 'Be part of our journey',
    newsletter_desc: 'Get exclusive updates, new arrivals and offers.',
    newsletter_cta: 'SUBSCRIBE'
  });
  const [siteSettings, setSiteSettings] = useState({
    site_name: 'MAA ◆ DROBE',
    contact_number: '+91 98765 43210',
    whatsapp_number: '919876543210',
    contact_email: 'contact@maadrobe.com',
    footer_text: "Premium handcrafted Indian ethnic clothing. Tailored to perfection, made using 100% pure organic fabrics. Designed to suit every silhouette.",
    site_logo: "/only word-01.webp",
    site_font: 'Poppins'
  });



  useEffect(() => {
    // Fetch products
    fetch(`${API_BASE_URL}/products?per_page=100`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.original_price,
            tag: p.tag || '',
            category: p.category?.name || '',
            subCategory: p.category?.slug || '',
            description: p.description,
            image: p.images?.[0]?.image_path || '/images/maadrobe_casual.png',
            rating: parseFloat(p.rating || 5.0),
            reviewCount: p.review_count || 0,
            thumbnails: p.images?.map(img => img.image_path) || ['/images/maadrobe_casual.png'],
            sizes: (p.sizes && Array.isArray(p.sizes)) ? p.sizes.map(s => s.size || s) : (typeof p.sizes === 'string' ? JSON.parse(p.sizes || '[]') : ['XS', 'S', 'M', 'L', 'XL', 'XXL']),
            fabricDetails: p.fabric_details ?? "100% pure organic cotton and premium georgette linings. Features artisanal handblock printing and authentic hand-embroidered details. Color bleeding tested and reinforced seams.",
            shippingDetails: p.shipping_details ?? "We offer free express shipping pan-India. Delivery takes 3 to 5 business days. Once shipped, live tracking details are sent automatically to your WhatsApp number.",
            exchangeDetails: p.exchange_details ?? "We offer a 7-day hassle-free exchange policy. Your garment will be picked up from your doorstep at no extra cost, and the replacement size will be dispatched immediately.",
            enableFabricDetails: p.enable_fabric_details ?? true,
            enableShippingDetails: p.enable_shipping_details ?? true,
            enableExchangeDetails: p.enable_exchange_details ?? true
          }));
          setProductsList(mapped);
        }
      })
      .catch(err => console.error("Error fetching products:", err));

    // Fetch categories
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setCategoriesList(data.data);
        }
      })
      .catch(err => console.error("Error fetching categories:", err));

    // Fetch banners
    fetch(`${API_BASE_URL}/banners`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((b, idx) => ({
            id: b.id || idx,
            tag: b.tag || '',
            accent: b.tag || '',
            title: b.title || 'MaaDrobe Exclusive',
            lines: b.title ? [b.title] : ["Timeless Elegance"],
            desc: b.subtitle || 'Handcrafted pure fabrics crafted with artisanal grace.',
            image: b.image_path ? formatImgUrl(b.image_path) : '/images/maadrobe_hero_editorial.jpg',
            cta: b.cta_text || 'SHOP NOW →',
            view: (b.view_path || 'coords').toLowerCase().replace(/\s+/g, ''),
            scriptNote: ["Pure", "Grace", "In Every", "Twirl ♡"]
          }));
          setBannersList(mapped);
        } else if (data.success && Array.isArray(data.data) && data.data.length === 0) {
          setBannersList(heroSlides);
        }
      })
      .catch(err => {
        console.error("Error fetching banners:", err);
        setBannersList(heroSlides);
      });

    // Fetch homepage CMS
    fetch(`${API_BASE_URL}/homepage`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHomepageCms(prev => ({ ...prev, ...data.data }));
        }
      })
      .catch(err => console.error("Error fetching homepage cms:", err));

    // Fetch settings
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSiteSettings(prev => ({ ...prev, ...data.data }));
        }
      })
      .catch(err => console.error("Error fetching settings:", err));
  }, []);

  // Dynamically apply site font selected from Admin Panel
  useEffect(() => {
    const font = siteSettings.site_font || 'Poppins';
    document.documentElement.style.setProperty('--font-family-current', font);
    document.body.style.fontFamily = `"${font}", sans-serif`;
  }, [siteSettings.site_font]);

  // Dynamic Section Data Mappings (From Admin Homepage Sections Manager)
  const displayNewArrivals = useMemo(() => {
    if (homepageCms.new_arrivals_product_ids) {
      try {
        const ids = JSON.parse(homepageCms.new_arrivals_product_ids);
        if (Array.isArray(ids) && ids.length > 0) {
          const allPool = [...productsList, ...newArrivalsList];
          const matched = ids.map(id => allPool.find(p => String(p.id) === String(id))).filter(Boolean);
          if (matched.length > 0) return matched;
        }
      } catch (e) {}
    }
    return newArrivalsList;
  }, [homepageCms.new_arrivals_product_ids, productsList]);

  const displaySpotlightProducts = useMemo(() => {
    if (homepageCms.spotlight_product_ids) {
      try {
        const ids = JSON.parse(homepageCms.spotlight_product_ids);
        if (Array.isArray(ids) && ids.length > 0) {
          const matched = ids.map(id => productsList.find(p => String(p.id) === String(id))).filter(Boolean);
          if (matched.length > 0) return matched;
        }
      } catch (e) {}
    }
    return productsList.length >= 8 ? productsList.slice(4, 8) : productsList.slice(0, 4);
  }, [homepageCms.spotlight_product_ids, productsList]);

  const displayFeatures = useMemo(() => {
    return [
      {
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#221815" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
            <line x1="2" y1="9" x2="4" y2="9" />
            <line x1="1" y1="12" x2="3" y2="12" />
          </svg>
        ),
        title: homepageCms.features_1_title || 'Fast Delivery',
        desc: homepageCms.features_1_desc || 'Get your order quickly.'
      },
      {
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#221815" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        ),
        title: homepageCms.features_2_title || 'Easy Returns',
        desc: homepageCms.features_2_desc || 'Shop with confidence.'
      },
      {
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#221815" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        ),
        title: homepageCms.features_3_title || 'Secure Payments',
        desc: homepageCms.features_3_desc || 'Your data is always safe.'
      },
      {
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#221815" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
        title: homepageCms.features_4_title || 'Quality Checked',
        desc: homepageCms.features_4_desc || 'Every piece, carefully checked.'
      }
    ];
  }, [homepageCms]);

  const displayInstaLooks = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map(num => ({
      id: num,
      image: formatImgUrl(homepageCms[`insta_img_${num}`]) || `/images/ref_insta_${num}.jpg`,
      alt: `Look ${num}`
    }));
  }, [homepageCms]);

  // Browser History & Mobile Hardware/Gesture Back Navigation Integration
  useEffect(() => {
    const { view: initialView, productId: initialProductId } = parseHash(window.location.hash);
    const startingView = initialView || 'home';

    if (startingView !== 'home') {
      // User landed on a direct deep-link (e.g. #kurti, #product-101, #checkout)
      // Set root to home so pressing mobile back navigates to home instead of exiting!
      window.history.replaceState({
        view: 'home',
        productId: null,
        isRoot: true,
        hasAppHistory: false
      }, '', '#home');

      const targetHash = getHashForState(startingView, initialProductId);
      window.history.pushState({
        view: startingView,
        productId: initialProductId,
        isRoot: false,
        hasAppHistory: true
      }, '', targetHash);

      setCurrentView(startingView);
      if (initialProductId) {
        setActiveProductId(initialProductId);
      }
    } else {
      // User landed on home: set root state + home sentinel to prevent accidental closure on mobile
      window.history.replaceState({
        view: 'home',
        productId: null,
        isRoot: true,
        hasAppHistory: false
      }, '', '#home');

      window.history.pushState({
        view: 'home',
        productId: null,
        isHomeSentinel: true,
        hasAppHistory: false
      }, '', '#home');

      setCurrentView('home');
    }

    const handlePopState = (event) => {
      const state = event.state;

      // Close promo popup if open
      if (showPromoPopupRef.current) {
        setShowPromoPopup(false);
        sessionStorage.setItem('hasSeenPromoPopup', 'true');
      }

      // Sync drawer states
      setIsCartOpen(Boolean(state?.isDrawer && state?.drawerType === 'cart'));
      setIsWishlistOpen(Boolean(state?.isDrawer && state?.drawerType === 'wishlist'));
      setIsMobileMenuOpen(Boolean(state?.isDrawer && state?.drawerType === 'menu'));

      // Intercept exit when pressing back at root home on mobile devices
      if (state?.isRoot) {
        const now = Date.now();
        if (now - lastBackPressTimeRef.current < 2000) {
          // Double press back within 2s -> allow browser to exit normally
          window.history.back();
          return;
        } else {
          // First back press on home -> prevent site closing, show friendly toast
          lastBackPressTimeRef.current = now;
          setBackToast('Press back again to exit MaaDrobe');
          setTimeout(() => setBackToast(''), 2000);
          window.history.pushState({
            view: 'home',
            productId: null,
            isHomeSentinel: true,
            hasAppHistory: false
          }, '', '#home');
          setCurrentView('home');
          scrollToTop();
          return;
        }
      }

      // View restoration
      if (state && state.view) {
        setCurrentView(state.view);
        if (state.view === 'product' && state.productId) {
          setActiveProductId(state.productId);
        }
      } else {
        const { view, productId } = parseHash(window.location.hash);
        const resolved = view || 'home';
        setCurrentView(resolved);
        if (productId) {
          setActiveProductId(productId);
        }
      }

      scrollToTop();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
  const activeSlides = useMemo(() => {
    return (bannersList && bannersList.length > 0) ? bannersList : heroSlides;
  }, [bannersList]);

  // Guard against out-of-bounds currentSlide when banners are deleted
  useEffect(() => {
    if (activeSlides.length > 0 && currentSlide >= activeSlides.length) {
      setCurrentSlide(0);
    }
  }, [activeSlides.length, currentSlide]);

  // Dynamic Footer Columns State from siteSettings
  const footerColumns = useMemo(() => {
    const normalizeUrl = (label, url) => {
      if (!url || url === 'terms') {
        const l = (label || '').toLowerCase();
        if (l.includes('return') || l.includes('exchange')) return 'returns';
        if (l.includes('shipping') || l.includes('delivery')) return 'shipping';
        if (l.includes('size')) return 'sizeguide';
        if (l.includes('faq') || l.includes('question')) return 'faq';
        if (l.includes('privacy')) return 'privacy';
        if (l.includes('care') || l.includes('contact') || l.includes('support')) return 'customercare';
        return 'terms';
      }
      if (url === 'about') {
        const l = (label || '').toLowerCase();
        if (l.includes('story') || l.includes('heritage')) return 'story';
        if (l.includes('care') || l.includes('contact') || l.includes('support')) return 'customercare';
        return 'about';
      }
      return url;
    };

    if (siteSettings.footer_sections_json) {
      try {
        const parsed = typeof siteSettings.footer_sections_json === 'string'
          ? JSON.parse(siteSettings.footer_sections_json)
          : siteSettings.footer_sections_json;
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(col => ({
            ...col,
            links: (col.links || []).map(lnk => ({
              ...lnk,
              url: normalizeUrl(lnk.label, lnk.url)
            }))
          }));
        }
      } catch (e) {
        console.error("Error parsing footer_sections_json:", e);
      }
    }
    return [
      {
        id: 'col_shop',
        title: 'Shop',
        links: [
          { label: 'Kurtis', url: 'kurti' },
          { label: 'Dresses', url: 'dresses' },
          { label: 'Kurta Sets', url: 'kurtasets' },
          { label: 'Co-ords', url: 'coords' },
          { label: 'Sale', url: 'sale' }
        ]
      },
      {
        id: 'col_help',
        title: 'Customer Care & Help',
        links: [
          { label: 'Customer Care', url: 'customercare' },
          { label: 'Track Order', url: 'tracking' },
          { label: 'Returns & Exchanges', url: 'returns' },
          { label: 'Shipping Policy', url: 'shipping' },
          { label: 'Size Guide', url: 'sizeguide' },
          { label: 'FAQs', url: 'faq' }
        ]
      },
      {
        id: 'col_about',
        title: 'About MaaDrobe',
        links: [
          { label: 'About MaaDrobe', url: 'about' },
          { label: 'Our Story', url: 'story' },
          { label: 'Privacy Policy', url: 'privacy' },
          { label: 'Terms & Conditions', url: 'terms' }
        ]
      }
    ];
  }, [siteSettings.footer_sections_json]);

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

  // Best Sellers Bounded Carousel State
  const [bsIndex, setBsIndex] = useState(0); // Start at index 0
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

  // Auto-play Announcement
  useEffect(() => {
    const annTimer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(annTimer);
  }, []);

  // Auto-play Hero Slider
  useEffect(() => {
    if (activeSlides.length <= 1) return;

    const heroTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);

    return () => clearInterval(heroTimer);
  }, [activeSlides.length]);

  // Bounded slider controls for Best Sellers
  const handleBsNext = () => {
    setBsIndex((prev) => {
      const maxIndex = Math.max(0, productsList.length - itemsPerPage);
      return Math.min(prev + 1, maxIndex);
    });
  };

  const handleBsPrev = () => {
    setBsIndex((prev) => Math.max(prev - 1, 0));
  };

  // Hero Slider arrow controls
  const handleHeroPrev = (e) => {
    e?.stopPropagation();
    if (activeSlides.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleHeroNext = (e) => {
    e?.stopPropagation();
    if (activeSlides.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

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
    openCart();
  };

  const buyNow = (product, size) => {
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
    setIsCartOpen(false);
    navigateToView('checkout');
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

  // Checkout form submissions
  const handleWhatsAppCheckout = async (details) => {
    try {
      const payload = {
        customer_name: details.name,
        customer_phone: details.phone,
        shipping_address: details.address,
        city: details.city,
        pincode: details.pincode,
        checkout_type: 'whatsapp',
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color || null
        }))
      };

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        const orderNumber = data.data.order_number;
        const itemsSummary = cart.map(item => `- ${item.quantity} x ${item.name} (Size: ${item.size}) - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`).join('\n');
        const totalAmount = getCartTotal().toLocaleString('en-IN');
        
        const message = `Namaste MaaDrobe! 🌸\n\nI would like to place a new order:\n\n*Order ID:* ${orderNumber}\n\n*Items Ordered:*\n${itemsSummary}\n\n*Total Amount:* ₹${totalAmount}\n\n*Delivery Address:*\nName: ${details.name}\nPhone: ${details.phone}\nAddress: ${details.address}, ${details.city} - ${details.pincode}\n\n*Payment Preference:* Direct Confirmation via WhatsApp\n\nKindly confirm stock availability and share payment/QR details. Thank you!`;
        
        const whatsappNumber = siteSettings.whatsapp_number || '919876543210';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        setCart([]);
        setIsCartOpen(false);
        navigateToView('home');
        window.open(whatsappUrl, '_blank');
      } else {
        alert(data.message || 'Failed to confirm order. Please try again.');
      }
    } catch (err) {
      alert('Error connecting to checkout API. Please verify server.');
    }
  };

  const handleOnlineCheckout = async (details) => {
    try {
      const payload = {
        customer_name: details.name,
        customer_phone: details.phone,
        shipping_address: details.address,
        city: details.city,
        pincode: details.pincode,
        checkout_type: 'online',
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color || null
        }))
      };

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        const orderNumber = data.data.order_number;
        alert(`Thank you ${details.name}!\nYour order ${orderNumber} of ₹${getCartTotal().toLocaleString('en-IN')} has been submitted.\nRedirecting to Online Payment Gateway (Razorpay)...`);
        setCart([]);
        setIsCartOpen(false);
        navigateToView('home');
      } else {
        alert(data.message || 'Failed to submit online order.');
      }
    } catch (err) {
      alert('Error connecting to checkout API.');
    }
  };

  // Promo Popup trigger effect
  const isPopupEnabled = siteSettings.popup_enabled !== undefined 
    ? (siteSettings.popup_enabled === '1' || siteSettings.popup_enabled === true || siteSettings.popup_enabled === 'true')
    : true;

  useEffect(() => {
    if (!isPopupEnabled) {
      setShowPromoPopup(false);
      return;
    }
    const hasSeenPopup = sessionStorage.getItem('hasSeenPromoPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPromoPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPopupEnabled]);

  const closePopup = () => {
    setShowPromoPopup(false);
    sessionStorage.setItem('hasSeenPromoPopup', 'true');
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    if (popupEmail.trim() && popupEmail.includes('@')) {
      fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: popupEmail.trim() })
      }).catch(err => console.error("Newsletter error:", err));
      
      setPopupSubscribed(true);
      setTimeout(() => {
        setPopupSubscribed(false);
        setShowPromoPopup(false);
        sessionStorage.setItem('hasSeenPromoPopup', 'true');
      }, 2500);
    }
  };

  const activeProduct = [...productsList, ...newArrivalsList].find(p => String(p.id) === String(activeProductId)) || newArrivalsList[0] || productsList[0];

  return (
    <>
      {/* 0. Page Loader */}
      <div className={`page-loader ${!isLoading ? 'fade-out' : ''}`}>
        <div className="loader-inner">
          <div className="brand-logo-unit" style={{ marginBottom: '16px', justifyContent: 'center' }}>
            <img src="/images/ICON-01.png" alt="MaaDrobe" className="brand-logo-icon" style={{ height: '48px' }} />
            <img src="/only word-01.webp" alt="MAA DROBE" className="brand-logo-text" style={{ height: '34px' }} />
          </div>
          <div className="loader-bar">
            <div className="loader-bar-fill"></div>
          </div>
        </div>
      </div>




      {/* 2. Header / Navbar */}
      <header className={`header ${(isScrolled || isHeaderHovered) ? 'scrolled' : ''} solid-header`} onMouseEnter={() => setIsHeaderHovered(true)} onMouseLeave={() => setIsHeaderHovered(false)}>
        <div className="container navbar">
          <button className="menu-toggle" aria-label="Open Menu" onClick={openMobileMenu}>
            <Menu />
          </button>
          
          <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => navigateToView('home')}>
            <div className="brand-logo-unit">
              <img src="/images/ICON-01.png" alt="MaaDrobe" className="brand-logo-icon" />
              <img src="/only word-01.webp" alt="MAA DROBE" className="brand-logo-text" />
            </div>
          </div>

          <nav className="nav-links">
            <button className={`nav-link ${currentView === 'kurti' ? 'active' : ''}`} onClick={() => navigateToView('kurti')}>Kurtis</button>
            <button className={`nav-link ${currentView === 'dresses' ? 'active' : ''}`} onClick={() => navigateToView('dresses')}>Dresses</button>
            <button className={`nav-link ${currentView === 'kurtasets' ? 'active' : ''}`} onClick={() => navigateToView('kurtasets')}>Kurta Sets</button>
            <button className={`nav-link ${currentView === 'coords' ? 'active' : ''}`} onClick={() => navigateToView('coords')}>Co-ords</button>
            <button className={`nav-link ${currentView === 'sale' ? 'active' : ''}`} onClick={() => navigateToView('sale')}>Sale</button>
          </nav>

          <div className="header-search-bar">
            <input type="text" placeholder="Search ethnic wear, kurtas..." className="header-search-input" />
            <Search size={16} className="header-search-icon" />
          </div>

          <div className="nav-actions">
            <button className="nav-action-btn" aria-label="My Account" onClick={() => navigateToView('login')} title={customerUser ? `Hi, ${customerUser.name}` : 'Login / Register'} style={{ position: 'relative' }}>
              {customerUser ? (
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--primary-ruby)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {customerUser.name?.[0]?.toUpperCase() || 'U'}
                </span>
              ) : (
                <User />
              )}
            </button>
            <button className="nav-action-btn" aria-label="Wishlist" onClick={openWishlist}>
              <Heart />
              {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
            </button>
            <button className="nav-action-btn" aria-label="Cart" onClick={openCart}>
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
            {/* Reference Hero Banner Slider (Matching Exact Reference Mockup) */}
            <section className="ref-hero-banner">
              <div className="ref-hero-slider-wrap">
                {activeSlides.map((slide, idx) => (
                  <div key={slide.id || idx} className={`ref-hero-slide ${currentSlide === idx ? 'active' : ''}`}>
                    <div className="ref-editorial-hero" onClick={() => navigateToView(slide.view)}>
                      <img 
                        src={formatImgUrl(slide.image)} 
                        alt={slide.title || `${slide.lines ? slide.lines.join(' ') : 'Hero'}`} 
                        className="ref-editorial-hero-bg" 
                        onError={(e) => {
                          e.target.src = '/images/maadrobe_hero_editorial.jpg';
                        }}
                      />
                      <div className="ref-editorial-hero-overlay"></div>

                      <div className="container ref-editorial-hero-container">
                        <div className="ref-editorial-hero-text">
                          <h1 className="ref-editorial-hero-headline">
                            {slide.lines && slide.lines.length >= 2 ? (
                              <>
                                {slide.lines[0]}<br />
                                {slide.lines[1]}<br />
                              </>
                            ) : (
                              <>
                                {slide.title || 'MaaDrobe Exclusive'}<br />
                              </>
                            )}
                            <span className="ref-editorial-hero-accent">{slide.accent || slide.tag || ''}</span>
                          </h1>
                          <p className="ref-editorial-hero-sub">
                            {slide.desc}
                          </p>
                          <button 
                            className="ref-editorial-hero-btn"
                            onClick={(e) => { e.stopPropagation(); navigateToView(slide.view); }}
                          >
                            {slide.cta || 'SHOP NOW →'}
                          </button>
                        </div>

                        <div className="ref-editorial-script-note">
                          {(slide.scriptNote || ['Pure Grace', 'Handcrafted With Love ♡']).map((item, sIdx) => {
                            if (item.includes('♡')) {
                              const [text] = item.split('♡');
                              return (
                                <span key={sIdx}>
                                  {text.trim()} <span className="heart-icon">♡</span>
                                </span>
                              );
                            }
                            return <span key={sIdx}>{item}</span>;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Floating Arrows */}
                {activeSlides.length > 1 && (
                  <>
                    <button className="ref-hero-arrow-btn prev" onClick={handleHeroPrev} aria-label="Previous Slide">
                      &#8249;
                    </button>
                    <button className="ref-hero-arrow-btn next" onClick={handleHeroNext} aria-label="Next Slide">
                      &#8250;
                    </button>
                  </>
                )}

                {/* Bottom Dots */}
                {activeSlides.length > 1 && (
                  <div className="ref-hero-dots-bar">
                    {activeSlides.map((_, dot) => (
                      <button
                        key={dot}
                        className={`ref-hero-dot-pill ${currentSlide === dot ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(dot)}
                        aria-label={`Slide ${dot + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* 1. Shop by Category */}
            {homepageCms.categories_visible !== '0' && (
              <section className="categories-section reveal-on-scroll">
                <div className="container">
                  <div className="section-header-split">
                    <div className="section-header-left">
                      <h2 className="ref-section-title">{homepageCms.categories_title || 'Shop by Category'}</h2>
                      <p className="ref-section-subtitle">{homepageCms.categories_desc || 'Explore styles for every version of you.'}</p>
                    </div>
                    <button className="ref-view-all-btn" onClick={() => navigateToView('shop')}>
                      {homepageCms.categories_cta || 'VIEW ALL →'}
                    </button>
                  </div>

                  <div className="ref-categories-grid">
                    {(typeof categoriesList !== 'undefined' && categoriesList.length > 0 ? categoriesList : referenceCategories).map((cat) => (
                      <div key={cat.id} className="ref-category-card" onClick={() => navigateToView(cat.slug)}>
                        <div className="ref-category-img-wrapper">
                          <img src={formatImgUrl(cat.image_path || cat.image)} alt={cat.name} className="ref-category-img" />
                        </div>
                        <div className="ref-category-info">
                          <h4 className="ref-category-title">{cat.name}</h4>
                          <span className="ref-category-sub">Shop Now &rarr;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 2. New Arrivals (Admin Curated Products & Editorial Banner) */}
            {String(homepageCms.new_arrivals_visible) !== '0' && (
              <section className="new-arrivals-section reveal-on-scroll">
                <div className="container">
                  <div className="section-header-split">
                    <div className="section-header-left">
                      <h2 className="ref-section-title">{homepageCms.new_arrivals_title || 'New Arrivals'}</h2>
                      <p className="ref-section-subtitle">{homepageCms.new_arrivals_desc || 'Fresh styles, just for you.'}</p>
                    </div>
                    <button className="ref-view-all-btn" onClick={() => navigateToView('shop')}>
                      {homepageCms.new_arrivals_cta || 'VIEW ALL →'}
                    </button>
                  </div>

                  <div className="new-arrivals-layout" style={String(homepageCms.editorial_visible) === '0' ? { display: 'block' } : {}}>
                    {/* Curated Product Cards */}
                    <div className="new-arrivals-grid" style={String(homepageCms.editorial_visible) === '0' ? { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' } : {}}>
                      {displayNewArrivals.map((p) => (
                        <div key={p.id} className="ref-product-card" onClick={() => navigateToProduct(p.id)}>
                          <div className="ref-product-img-wrapper">
                            <img src={formatImgUrl(p.image)} alt={p.name} className="ref-product-img" />
                            <button 
                              className={`ref-wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}`}
                              onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                              aria-label="Add to Wishlist"
                            >
                              <Heart size={15} fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                          <div className="ref-product-info">
                            <h4 className="ref-product-title">{p.name}</h4>
                            <div className="ref-price-row">
                              <span className="ref-price-current">₹{Number(p.price || 0).toLocaleString('en-IN')}</span>
                              {p.originalPrice && (
                                <span className="ref-price-original">₹{Number(p.originalPrice).toLocaleString('en-IN')}</span>
                              )}
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Editorial Banner (Second Image Section) */}
                    {String(homepageCms.editorial_visible) !== '0' && (
                      <div 
                        className="ref-editorial-banner" 
                        onClick={() => navigateToView(homepageCms.editorial_link || 'dresses')}
                        style={{ cursor: 'pointer' }}
                      >
                        <img 
                          src={formatImgUrl(homepageCms.editorial_image) || '/images/ref_editorial_banner.jpg'} 
                          alt={homepageCms.editorial_title || 'Dress the way you feel'} 
                          className="ref-editorial-banner-img" 
                          onError={(e) => { e.target.src = '/images/ref_editorial_banner.jpg'; }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* 3. Spotlight / Curated Section (Enabled by Admin) */}
            {String(homepageCms.spotlight_enabled) === '1' && (
              <section className="categories-section reveal-on-scroll" style={{ paddingTop: '20px' }}>
                <div className="container">
                  <div className="section-header-split">
                    <div className="section-header-left">
                      <h2 className="ref-section-title">{homepageCms.spotlight_title || 'Curated Spotlight'}</h2>
                      <p className="ref-section-subtitle">{homepageCms.spotlight_desc || 'Most-loved silhouettes handpicked by our stylists.'}</p>
                    </div>
                    <button className="ref-view-all-btn" onClick={() => navigateToView('shop')}>
                      {homepageCms.spotlight_cta || 'SHOP SPOTLIGHT →'}
                    </button>
                  </div>

                  <div className="new-arrivals-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                    {displaySpotlightProducts.map((p) => (
                      <div key={p.id} className="ref-product-card" onClick={() => navigateToProduct(p.id)}>
                        <div className="ref-product-img-wrapper">
                          <img src={formatImgUrl(p.image)} alt={p.name} className="ref-product-img" />
                          <button 
                            className={`ref-wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                            aria-label="Add to Wishlist"
                          >
                            <Heart size={15} fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                        <div className="ref-product-info">
                          <h4 className="ref-product-title">{p.name}</h4>
                          <div className="ref-price-row">
                            <span className="ref-price-current">₹{Number(p.price || 0).toLocaleString('en-IN')}</span>
                            {p.originalPrice && (
                              <span className="ref-price-original">₹{Number(p.originalPrice).toLocaleString('en-IN')}</span>
                            )}
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 4. Features & Value Propositions Bar */}
            {String(homepageCms.features_visible) !== '0' && (
              <section className="ref-features-bar">
                <div className="container ref-features-grid">
                  {displayFeatures.map((item, idx) => (
                    <div key={idx} className="ref-feature-item">
                      <div className="ref-feature-icon">{item.icon}</div>
                      <div className="ref-feature-text">
                        <h4 className="ref-feature-title">{item.title}</h4>
                        <p className="ref-feature-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. @MAA ◆ DROBE Community & Instagram Showcase */}
            {String(homepageCms.insta_visible) !== '0' && (
              <section className="ref-insta-section container reveal-on-scroll">
                <div className="ref-insta-header">
                  <div className="ref-insta-header-left">
                    <h2 className="ref-insta-handle">{homepageCms.insta_handle || '@MaaDrobe'}</h2>
                    <p className="ref-insta-subtitle">{homepageCms.insta_subtitle || 'Real women. Real styles. Tag us to get featured!'}</p>
                  </div>
                  <button 
                    className="ref-insta-shop-btn" 
                    onClick={() => navigateToView('shop')}
                  >
                    {homepageCms.insta_cta || 'SHOP THE LOOK →'}
                  </button>
                </div>

                <div className="ref-insta-grid">
                  {displayInstaLooks.map((look) => (
                    <div 
                      key={look.id} 
                      className="ref-insta-card"
                      onClick={() => navigateToView('shop')}
                    >
                      <img 
                        src={look.image} 
                        alt={look.alt} 
                        className="ref-insta-img" 
                        loading="lazy"
                        onError={(e) => { e.target.src = `/images/ref_insta_${look.id}.jpg`; }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6. Newsletter Subscription Banner */}
            {homepageCms.newsletter_visible !== '0' && (
              <section className="ref-newsletter-section">
                <div className="container ref-newsletter-container">
                  <div className="ref-newsletter-left">
                    <h3 className="ref-newsletter-title">{homepageCms.newsletter_title || 'Be part of our journey'}</h3>
                    <p className="ref-newsletter-subtitle">{homepageCms.newsletter_desc || 'Get exclusive updates, new arrivals and offers.'}</p>
                  </div>

                  <div className="ref-newsletter-center">
                    <form className="ref-newsletter-form" onSubmit={handleNewsletterSubmit}>
                      <div className="ref-newsletter-input-wrapper">
                        <Mail size={18} className="ref-newsletter-icon" />
                        <input 
                          type="email" 
                          required 
                          placeholder="Enter your email address" 
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="ref-newsletter-input"
                        />
                        <button type="submit" className="ref-newsletter-btn" aria-label="Subscribe to newsletter">
                          <span>{homepageCms.newsletter_cta || 'SUBSCRIBE'}</span>
                          <ArrowRight size={14} className="ref-newsletter-btn-arrow" />
                        </button>
                      </div>
                    </form>
                    {newsletterStatus && (
                      <p className="ref-newsletter-toast">{newsletterStatus}</p>
                    )}
                  </div>

                  <div className="ref-newsletter-right">
                    <div className="ref-newsletter-divider"></div>
                    <div className="ref-newsletter-note">
                      <span className="ref-script-line">More than fashion</span>
                      <span className="ref-script-line">It&apos;s a feeling &#9825;</span>
                    </div>
                  </div>

                  {/* Delicate Botanical Accent */}
                  <BotanicalBranch className="ref-botanical-newsletter" />
                </div>
              </section>
            )}
          </>
        ) : currentView === 'chikankari' ? (
          <CollectionPage 
            title="Lucknowi Chikankari"
            tag="TRADITIONAL STITCHING"
            desc="Discover the charm of traditional Lakhnavi shadow shadow-work embroidery on premium fabrics."
            bannerImage="/images/maadrobe_chikankari.png"
            products={productsList.filter(p => p.subCategory === 'chikankari')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : currentView === 'festive' ? (
          <CollectionPage 
            title="Anarkalis & Silks"
            tag="ROYAL FESTIVE SELECTION"
            desc="Make an entrance with premium Banarasi brocades and flared handblock printed Anarkali gowns."
            bannerImage="/images/maadrobe_festive.png"
            products={productsList.filter(p => p.subCategory === 'festive')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : currentView === 'daily' ? (
          <CollectionPage 
            title="Casual Cottons & Linens"
            tag="DAILY ESSENTIALS"
            desc="Elegant, breathable handloom garments designed to keep you stylish and comfortable throughout the day."
            bannerImage="/images/maadrobe_casual.png"
            products={productsList.filter(p => p.subCategory === 'daily')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : currentView === 'kurti' ? (
          <CollectionPage 
            title="Kurti Collection"
            tag="PREMIUM WOMAN ETHNIC"
            desc="Explore our range of traditional Chikankari, elegant Anarkalis, and premium 3-Piece Kurta sets."
            bannerImage="/images/maadrobe_chikankari.png"
            products={productsList.filter(p => p.subCategory === 'kurti' || p.category.toLowerCase().includes('kurti') || p.category.toLowerCase().includes('suits'))}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : currentView === 'kurtasets' ? (
          <CollectionPage 
            title="Kurta Sets"
            tag="ROYAL ENSEMBLES & SUITS"
            desc="Exquisite 2-piece and 3-piece hand-crafted Kurta Sets, Anarkalis, and traditional ensembles tailored for grand celebrations and everyday grace."
            bannerImage="/images/maadrobe_hero_festive.png"
            products={productsList.filter(p => 
              p.subCategory === 'kurtasets' || 
              p.category.toLowerCase().includes('set') || 
              p.category.toLowerCase().includes('suit') || 
              p.name.toLowerCase().includes('set') ||
              p.name.toLowerCase().includes('anarkali')
            )}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : currentView === 'coords' ? (
          <CollectionPage 
            title="Co-ord Sets"
            tag="MODERN FUSION COMFORT"
            desc="Matching tunic and trouser sets tailored in organic cottons and pure linens for smart, easy styling."
            bannerImage="/images/maadrobe_casual.png"
            products={productsList.filter(p => p.subCategory === 'coords')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : currentView === 'dresses' ? (
          <CollectionPage 
            title="Dresses"
            tag="ELEGANT INDO-WESTERN"
            desc="Flowy tiered midi dresses and keyhole-neck silhouettes showcasing authentic traditional prints."
            bannerImage="/images/maadrobe_festive.png"
            products={productsList.filter(p => p.subCategory === 'dresses')}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : currentView === 'sale' ? (
          <CollectionPage 
            title="Special Sale & Offers"
            tag="LIMITED PERIOD PRICING"
            desc="Exclusive discounts and festival markdown prices on handcrafted ethnic kurtis, dresses, and sets."
            bannerImage="/images/maadrobe_hero_chikankari.png"
            products={productsList.filter(p => 
              (p.originalPrice && p.originalPrice > p.price) || 
              (p.tag && p.tag.toLowerCase().includes('sale'))
            )}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : categoriesList.some(c => c.slug === currentView) ? (
          <CollectionPage 
            title={categoriesList.find(c => c.slug === currentView)?.name || "Collection"}
            tag="PREMIUM WOMAN ETHNIC"
            desc="Explore our collection of handcrafted styles."
            bannerImage={formatImgUrl(categoriesList.find(c => c.slug === currentView)?.image_path || '/images/maadrobe_festive.png')}
            products={productsList.filter(p => p.subCategory === currentView || p.category?.toLowerCase() === currentView.toLowerCase() || p.category?.toLowerCase().includes(currentView.replace('-', ' ')))}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : (currentView === 'customercare' || currentView === 'customer-care') ? (
          <CustomerCarePage siteSettings={siteSettings} onBack={handleGoBack} />
        ) : (currentView === 'tracking' || currentView === 'track-order') ? (
          <OrderTrackingPage onBack={handleGoBack} />
        ) : (currentView === 'returns' || currentView === 'returns-exchanges') ? (
          <ReturnsPolicyPage siteSettings={siteSettings} onBack={handleGoBack} />
        ) : (currentView === 'shipping' || currentView === 'shipping-policy') ? (
          <ShippingPolicyPage siteSettings={siteSettings} onBack={handleGoBack} />
        ) : (currentView === 'sizeguide' || currentView === 'size-guide') ? (
          <SizeGuidePage siteSettings={siteSettings} onBack={handleGoBack} />
        ) : (currentView === 'faq' || currentView === 'faqs') ? (
          <FaqPage siteSettings={siteSettings} onBack={handleGoBack} />
        ) : (currentView === 'story' || currentView === 'our-story') ? (
          <OurStoryPage siteSettings={siteSettings} onBack={handleGoBack} />
        ) : (currentView === 'about' || currentView === 'about-us') ? (
          <AboutUsPage siteSettings={siteSettings} onBack={handleGoBack} />
        ) : (currentView === 'privacy' || currentView === 'privacy-policy') ? (
          <PrivacyPolicyPage siteSettings={siteSettings} onBack={handleGoBack} />
        ) : (currentView === 'terms' || currentView === 'terms-conditions') ? (
          <TermsConditionsPage siteSettings={siteSettings} onBack={handleGoBack} />
        ) : currentView === 'tailoring' ? (
          <BespokeTailoringPage onBack={handleGoBack} />
        ) : currentView === 'shop' ? (
          <CollectionPage 
            title="The Complete Collection"
            tag="ALL SILHOUETTES"
            desc="Explore our entire curation of handcrafted premium women ethnic wear."
            bannerImage="/images/maadrobe_hero_chikankari.png"
            products={productsList}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onNavigateProduct={navigateToProduct}
            onBack={handleGoBack}
          />
        ) : currentView === 'product' ? (
          <ProductDetailPage 
            product={activeProduct}
            products={[...productsList, ...newArrivalsList]}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            buyNow={buyNow}
            onBack={handleGoBack}
            onNavigateProduct={navigateToProduct}
          />
        ) : currentView === 'login' ? (
          <CustomerAuthPage
            mode={loginMode}
            setMode={setLoginMode}
            form={loginForm}
            setForm={setLoginForm}
            error={loginError}
            loading={loginLoading}
            customerUser={customerUser}
            showPassword={showLoginPassword}
            setShowPassword={setShowLoginPassword}
            onLogin={handleCustomerLogin}
            onRegister={handleCustomerRegister}
            fpStep={fpStep} setFpStep={setFpStep}
            fpEmail={fpEmail} setFpEmail={setFpEmail}
            fpOtp={fpOtp} setFpOtp={setFpOtp}
            fpNewPass={fpNewPass} setFpNewPass={setFpNewPass}
            fpConfirmPass={fpConfirmPass} setFpConfirmPass={setFpConfirmPass}
            fpLoading={fpLoading} fpError={fpError} fpSuccess={fpSuccess}
            setFpError={setFpError} setFpSuccess={setFpSuccess}
            onForgotSend={handleForgotPasswordSend}
            onForgotReset={handleForgotPasswordReset}
            onLogout={handleCustomerLogout}
            onBack={handleGoBack}
            setCustomerUser={setCustomerUser}
          />
        ) : (
          /* DEDICATED SEPARATE CHECKOUT VIEW */
          <CheckoutPage 
            cart={cart}
            getCartTotal={getCartTotal}
            onBack={handleGoBack}
            handleWhatsAppCheckout={handleWhatsAppCheckout}
            handleOnlineCheckout={handleOnlineCheckout}
            customerUser={customerUser}
          />
        )}
      </main>



      {/* 14. Reference Footer & Subfooter (Matching WhatsApp Mockup Exactly) */}
      <footer className="ref-footer">
        <div className="container ref-footer-grid">
          {/* Brand Col */}
          <div className="ref-footer-col ref-footer-brand">
            <div className="ref-footer-logo" onClick={() => navigateToView('home')} style={{ cursor: 'pointer' }}>
              <div className="brand-logo-unit footer-brand-unit">
                <img src="/images/ICON-01.png" alt="MaaDrobe" className="brand-logo-icon footer-brand-icon" />
                <img src="/only word-01.webp" alt="MAA DROBE" className="brand-logo-text footer-brand-text" />
              </div>
            </div>
          </div>

          {/* Dynamic Admin-Managed Link Columns */}
          {footerColumns.map((col, cIdx) => (
            <div key={col.id || cIdx} className="ref-footer-col">
              <h4 className="ref-footer-heading">{col.title}</h4>
              <ul className="ref-footer-links">
                {col.links && col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button onClick={() => {
                      if (link.url && (link.url.startsWith('http://') || link.url.startsWith('https://'))) {
                        window.open(link.url, '_blank', 'noopener,noreferrer');
                      } else {
                        navigateToView(link.url);
                        scrollToTop();
                      }
                    }}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow Us & Payment Badges Col */}
          <div className="ref-footer-col ref-footer-follow">
            <h4 className="ref-footer-heading">Follow Us</h4>
            <div className="ref-footer-socials">
              <a href={siteSettings.instagram_url || "https://instagram.com"} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="ref-footer-social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={siteSettings.facebook_url || "https://facebook.com"} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="ref-footer-social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>

            {/* Payment Method Badges */}
            <div className="ref-footer-payments">
              <span className="ref-pay-badge" title="Visa">
                <svg width="34" height="12" viewBox="0 0 50 16" fill="none">
                  <path d="M19.5 1.5L13.8 14.5H9.6L6 3.7C5.8 2.8 5.6 2.5 4.8 2.1C3.6 1.4 1.7 0.9 0 0.5L0.2 0.2H8.3C9.4 0.2 10.3 0.9 10.5 2.1L12.3 10.8L16.4 1.5H19.5ZM36.7 10C36.7 6.2 31.4 6 31.4 4.3C31.4 3.7 32 3.1 33.2 2.9C33.8 2.8 35.4 2.8 37 3.5L37.7 0.7C36.8 0.4 35.5 0.1 33.8 0.1C29.6 0.1 26.6 2.3 26.6 5.5C26.6 7.9 28.7 9.2 30.3 10C32 10.8 32.5 11.3 32.5 12C32.5 13.1 31.2 13.6 30 13.6C27.9 13.6 26.7 13.3 25.3 12.6L24.5 15.6C26 16.3 27.8 16.6 29.6 16.6C34.1 16.6 37 14.4 37 10.9L36.7 10ZM47.6 14.5H51.4L48 1.5H44.6C43.8 1.5 43.1 1.9 42.8 2.6L36.6 14.5H40.7L41.5 12.3H46.6L47.6 14.5ZM42.6 9.3L44.8 3.5L46 9.3H42.6ZM25.8 1.5L22.6 14.5H18.7L21.9 1.5H25.8Z" fill="#1A1F71"/>
                </svg>
              </span>
              <span className="ref-pay-badge" title="Mastercard">
                <svg width="26" height="16" viewBox="0 0 36 22" fill="none">
                  <circle cx="13" cy="11" r="10" fill="#EB001B"/>
                  <circle cx="23" cy="11" r="10" fill="#F79E1B"/>
                  <path d="M18 4.2a10 10 0 0 1 0 13.6 10 10 0 0 1 0-13.6z" fill="#FF5F00"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Decorative Corner Botanical Accent */}
          <BotanicalBranch className="ref-botanical-footer-left" />
        </div>

        {/* Subfooter */}
        <div className="ref-subfooter">
          <div className="container ref-subfooter-inner">
            <span className="ref-subfooter-copy">&copy; 2026 <img src="/only word-01.webp" alt="MaaDrobe" className="subfooter-logo-img" />. All rights reserved.</span>

          </div>
          <BotanicalBranch className="ref-botanical-subfooter-right" />
        </div>
      </footer>

      {/* 15. Simplified Cart Drawer */}
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => closeCart()}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="cart-drawer-header">
            <h3 className="cart-drawer-title">Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})</h3>
            <button className="cart-close-btn" onClick={() => closeCart()} aria-label="Close Bag">
              <X />
            </button>
          </div>

          <div className="cart-drawer-body">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag />
                <p>Your shopping bag is empty.</p>
                <button className="btn-solid-gold" onClick={() => { closeCart(); navigateToView('shop'); }}>Browse Collections</button>
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

      {/* 16. Wishlist Drawer */}
      <div className={`wishlist-drawer-overlay ${isWishlistOpen ? 'open' : ''}`} onClick={() => closeWishlist()}>
        <div className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="wishlist-drawer-header">
            <h3 className="wishlist-drawer-title">Wishlist ({wishlist.length})</h3>
            <button className="wishlist-close-btn" onClick={() => closeWishlist()} aria-label="Close Wishlist">
              <X />
            </button>
          </div>

          <div className="wishlist-drawer-body">
            {wishlist.length === 0 ? (
              <div className="cart-empty">
                <Heart size={48} style={{ color: 'var(--primary-ruby)', strokeWidth: 1.5, marginBottom: '20px' }} />
                <p>Your wishlist is empty.</p>
                <button className="btn-solid-gold" onClick={() => { closeWishlist(); navigateToView('shop'); }}>Browse Collections</button>
              </div>
            ) : (
              <div className="wishlist-items-list">
                {wishlist.map(id => {
                  const product = productsList.find(p => p.id === id);
                  if (!product) return null;
                  return (
                    <div className="cart-item" key={id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                      <img src={product.image} alt={product.name} className="cart-item-img" onClick={() => { closeWishlist(); navigateToProduct(product.id || product); }} style={{ cursor: 'pointer' }} />
                      <div className="cart-item-details" style={{ flexGrow: 1, paddingLeft: '16px' }}>
                        <h4 className="cart-item-title" onClick={() => { closeWishlist(); navigateToProduct(product.id || product); }} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>{product.name}</h4>
                        <span className="cart-item-meta">{product.category}</span>
                        <div style={{ marginTop: '8px', display: 'flex', gap: '10px' }}>
                          <button className="btn-solid-gold" style={{ padding: '6px 12px', fontSize: '0.75rem', fontWeight: 600, border: 'none', borderRadius: '4px' }} onClick={() => {
                            addToCart(product, 'M');
                            toggleWishlist(product.id);
                          }}>
                            Move to Bag
                          </button>
                          <button style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '6px 12px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, cursor: 'pointer' }} onClick={() => toggleWishlist(product.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <span className="cart-item-price" style={{ alignSelf: 'flex-start', fontWeight: 700 }}>₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 17. Slideout Mobile Drawer */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => closeMobileMenu()}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <div className="logo-container" onClick={() => { closeMobileMenu(); navigateToView('home'); }}>
              <div className="brand-logo-unit">
                <img src="/images/ICON-01.png" alt="MaaDrobe" className="brand-logo-icon" style={{ height: '36px' }} />
                <img src="/only word-01.webp" alt="MAA DROBE" className="brand-logo-text" style={{ height: '25px' }} />
              </div>
            </div>
            <button className="mobile-menu-close" onClick={() => closeMobileMenu()}>
              <X />
            </button>
          </div>
          <div className="mobile-menu-body">
            <nav className="mobile-nav-links">
              <button onClick={() => { closeMobileMenu(); navigateToView('kurti'); }}>Kurtis</button>
              <button onClick={() => { closeMobileMenu(); navigateToView('dresses'); }}>Dresses</button>
              <button onClick={() => { closeMobileMenu(); navigateToView('kurtasets'); }}>Kurta Sets</button>
              <button onClick={() => { closeMobileMenu(); navigateToView('coords'); }}>Co-ords</button>
              <button onClick={() => { closeMobileMenu(); navigateToView('sale'); }}>Sale</button>
            </nav>
          </div>
        </div>
      </div>

      {/* 18. Promo Subscription Popup Modal */}
      {isPopupEnabled && (
        <div className={`popup-overlay ${showPromoPopup ? 'open' : ''}`} onClick={closePopup}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={closePopup} aria-label="Close Popup">
              <X size={20} />
            </button>
            <div className="popup-image-banner">
              <div className="brand-logo-unit" style={{ filter: 'brightness(0) invert(1)' }}>
                <img src="/images/ICON-01.png" alt="MaaDrobe" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
                <img src="/only word-01.webp" alt="MAA DROBE" style={{ height: '22px', width: 'auto', objectFit: 'contain' }} />
              </div>
            </div>
            <div className="popup-content">
              <h3 className="popup-title">{siteSettings.popup_title || 'Unlock 10% Off'}</h3>
              <p className="popup-desc">{siteSettings.popup_desc || 'Join the MAA ◆ DROBE family today. Subscribe to our newsletter to receive updates on new collections, private sales, and custom tailoring promotions.'}</p>
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
                  <button type="submit" className="popup-submit-btn">{siteSettings.popup_button_text || 'Subscribe & Claim 10% Off'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Back Button Navigation Toast */}
      {backToast && (
        <div className="mobile-back-toast">
          {backToast}
        </div>
      )}
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
              &larr; Back
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
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);

  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  const similarProducts = products.filter(p => p.id !== product.id && p.subCategory === product.subCategory).slice(0, 4);

  return (
    <div className="product-detail-page container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">
          &larr; Back
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
            <div className="product-info-price">
              ₹{Number(product.price || 0).toLocaleString('en-IN')}
              {product.originalPrice && (
                <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: '12px', fontSize: '0.85em' }}>
                  ₹{Number(product.originalPrice).toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {product.description && (
            <p className="product-info-desc">{product.description}</p>
          )}

          <div className="size-selector-block">
            <div className="option-header-row">
              <span className="option-title">Select Size</span>
              <a href="#size-guide" className="size-guide-link" onClick={(e) => { e.preventDefault(); setShowSizeGuideModal(true); }}>Size Guide</a>
            </div>
            <div className="size-buttons-grid">
              {(product.sizes && product.sizes.length > 0 ? product.sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map(size => (
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
            {product.enableFabricDetails !== false && (
              <div className="accordion-item">
                <button 
                  type="button" 
                  className="accordion-header" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    setOpenAccordion(prev => prev === 'fabric' ? null : 'fabric'); 
                  }}
                >
                  <span className="header-text"><ShieldCheck size={16} /> Fabric & Craftsmanship Details</span>
                  {openAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div className={`accordion-body ${openAccordion === 'fabric' ? 'open' : ''}`}>
                  <div className="accordion-body-inner">
                    <p>{product.fabricDetails ?? "100% pure organic cotton and premium georgette linings. Features artisanal handblock printing and authentic hand-embroidered details. Color bleeding tested and reinforced seams."}</p>
                  </div>
                </div>
              </div>
            )}

            {product.enableShippingDetails !== false && (
              <div className="accordion-item">
                <button 
                  type="button" 
                  className="accordion-header" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    setOpenAccordion(prev => prev === 'shipping' ? null : 'shipping'); 
                  }}
                >
                  <span className="header-text"><Truck size={16} /> Free Shipping & WhatsApp Tracking</span>
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div className={`accordion-body ${openAccordion === 'shipping' ? 'open' : ''}`}>
                  <div className="accordion-body-inner">
                    <p>{product.shippingDetails ?? "We offer free express shipping pan-India. Delivery takes 3 to 5 business days. Once shipped, live tracking details are sent automatically to your WhatsApp number."}</p>
                  </div>
                </div>
              </div>
            )}

            {product.enableExchangeDetails !== false && (
              <div className="accordion-item">
                <button 
                  type="button" 
                  className="accordion-header" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    setOpenAccordion(prev => prev === 'returns' ? null : 'returns'); 
                  }}
                >
                  <span className="header-text"><RotateCcw size={16} /> Custom Exchanges</span>
                  {openAccordion === 'returns' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div className={`accordion-body ${openAccordion === 'returns' ? 'open' : ''}`}>
                  <div className="accordion-body-inner">
                    <p>{product.exchangeDetails ?? "We want your Kurti to fit you perfectly. We provide free size exchanges and alteration assistance within 7 days of delivery. Drop us a text on WhatsApp to coordinate."}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
                <div className="product-price-layout">
                  <span className="price-sale">₹{p.price.toLocaleString('en-IN')}</span>
                  {p.originalPrice && <span className="price-original">₹{p.originalPrice.toLocaleString('en-IN')}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Size Guide Modal */}
      {showSizeGuideModal && (
        <div className="cart-overlay active" style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowSizeGuideModal(false)}>
          <div className="modal-content" style={{ maxWidth: '500px', width: '90%', background: '#fff', padding: '30px', borderRadius: '8px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setShowSizeGuideModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            <h3 style={{ marginBottom: '20px', fontFamily: '"Cinzel", serif', fontSize: '1.5rem', color: '#5a0b22' }}>Size Guide</h3>
            {product.size_guide_image ? (
              <img src={product.size_guide_image} alt="Size Guide" style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
            ) : (
              <div style={{ lineHeight: '1.6', fontSize: '15px' }}>
                <p style={{ fontWeight: '600', marginBottom: '10px' }}>Sizing Chart:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}><strong>XS:</strong> Bust 32"</li>
                  <li style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}><strong>S:</strong> Bust 34"</li>
                  <li style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}><strong>M:</strong> Bust 36"</li>
                  <li style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}><strong>L:</strong> Bust 38"</li>
                  <li style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}><strong>XL:</strong> Bust 40"</li>
                  <li style={{ padding: '8px 0' }}><strong>XXL:</strong> Bust 42"</li>
                </ul>
                <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>We also offer custom sizing via our Bespoke Tailoring page!</p>
              </div>
            )}
          </div>
        </div>
      )}
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

    const message = `Namaste MaaDrobe! 🌸\n\nI want to place a *Bespoke Tailoring Request*:\n\n*Customer Details:*\nName: ${name}\nPhone: ${phone}\n\n*Garment Custom Options:*\nFabric Selection: ${fabric}\nSilhouette Style: ${style}\nNeckline Design: ${neck}\nSleeve Length: ${sleeves}\n\n*Measurements (Inches):*\nBust Size: ${bust}"\nWaist Size: ${waist}"\nHip Size: ${hips || "N/A"}"\nDesired Kurti Length: ${length || "Standard"}"\n\n*Additional Stylist Notes:*\n${notes || "None"}\n\nPlease reach out to me to confirm my custom design order details!`;
    
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
        tag="BESPOKE SERVICE"
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
function CheckoutPage({ cart, getCartTotal, onBack, handleWhatsAppCheckout, handleOnlineCheckout, customerUser }) {
  const [name, setName] = useState(customerUser?.name || '');
  const [phone, setPhone] = useState(customerUser?.phone || '');
  
  // Parse structured address from user
  let initialAddress = { flatHouse: '', streetLane: '', landmark: '', state: '' };
  if (customerUser?.address) {
    try {
      const parsed = JSON.parse(customerUser.address);
      if (parsed && typeof parsed === 'object') {
        initialAddress = {
          flatHouse: parsed.flat_house || '',
          streetLane: parsed.street_lane || '',
          landmark: parsed.landmark || '',
          state: parsed.state || ''
        };
      } else {
        initialAddress.streetLane = customerUser.address;
      }
    } catch (e) {
      initialAddress.streetLane = customerUser.address;
    }
  }

  const [flatHouse, setFlatHouse] = useState(initialAddress.flatHouse);
  const [streetLane, setStreetLane] = useState(initialAddress.streetLane);
  const [landmark, setLandmark] = useState(initialAddress.landmark);
  const [state, setState] = useState(initialAddress.state);
  const [city, setCity] = useState(customerUser?.city || '');
  const [pincode, setPincode] = useState(customerUser?.pincode || '');
  const [paymentMode, setPaymentMode] = useState('whatsapp');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const subtotal = getCartTotal();
  const discountAmount = appliedCoupon 
    ? (appliedCoupon.type === 'percentage' 
        ? Math.min(subtotal * (appliedCoupon.value / 100), appliedCoupon.max_discount || Infinity)
        : appliedCoupon.value)
    : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    setCouponError('');
    try {
      // API_BASE_URL is accessible here
      const res = await fetch(`${API_BASE_URL}/coupons/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ code: couponCode.trim(), amount: subtotal })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAppliedCoupon(data.data || data.coupon || data); // Depending on API response
        setCouponCode('');
      } else {
        setCouponError(data.message || 'Invalid coupon code');
        setAppliedCoupon(null);
      }
    } catch (e) {
      setCouponError('Network error while applying coupon');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !flatHouse || !streetLane || !city || !pincode || !state) {
      alert("Please fill out all required shipping details.");
      return;
    }
    const combinedAddress = `${flatHouse}, ${streetLane}${landmark ? `, Near ${landmark}` : ''}, State: ${state}`;
    const details = { 
      name, 
      phone, 
      address: combinedAddress, 
      city, 
      pincode,
      coupon_code: appliedCoupon ? (appliedCoupon.code || appliedCoupon.coupon_code) : null
    };
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
          &larr; Back
        </button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">Checkout</span>
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

            {/* Structured Shipping Address Fields */}
            <div className="form-group">
              <label className="form-label" htmlFor="cust-flat">Flat, House No., Building, Apartment *</label>
              <input type="text" id="cust-flat" className="form-input" placeholder="e.g. Flat 302, Royal Palms" value={flatHouse} onChange={(e) => setFlatHouse(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cust-street">Street Address, Lane, Area *</label>
              <input type="text" id="cust-street" className="form-input" placeholder="e.g. Lane 4, Vaishali Nagar" value={streetLane} onChange={(e) => setStreetLane(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cust-landmark">Landmark (Optional)</label>
              <input type="text" id="cust-landmark" className="form-input" placeholder="e.g. Near Hanuman Temple" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px', width: '100%', marginBottom: '15px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="cust-city">City *</label>
                <input type="text" id="cust-city" className="form-input" placeholder="Jaipur" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="cust-state">State *</label>
                <select id="cust-state" className="form-input" value={state} onChange={(e) => setState(e.target.value)} required style={{ background: '#fff', cursor: 'pointer', height: '46px' }}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
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
              {paymentMode === 'whatsapp' ? 'Confirm and Order via WhatsApp' : 'Proceed to Pay Online (Razorpay)'}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="checkout-summary-container">
          <h3 className="checkout-summary-title">Shopping Bag Summary</h3>
          
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

              <div className="checkout-coupon-section" style={{ padding: '15px 0', borderTop: '1px dashed var(--color-border)', borderBottom: '1px dashed var(--color-border)', margin: '15px 0' }}>
                {!appliedCoupon ? (
                  <div>
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Have a Coupon Code?</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Enter code" 
                        value={couponCode} 
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        style={{ margin: 0 }}
                      />
                      <button 
                        type="button" 
                        onClick={handleApplyCoupon} 
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        className="btn-primary" 
                        style={{ padding: '0 16px', borderRadius: '4px', whiteSpace: 'nowrap' }}
                      >
                        {isApplyingCoupon ? '...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && <p style={{ color: 'var(--primary-ruby)', fontSize: '0.8rem', marginTop: '6px' }}>{couponError}</p>}
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,128,96,0.05)', padding: '10px 12px', borderRadius: '4px', border: '1px solid rgba(0,128,96,0.2)' }}>
                    <div>
                      <span style={{ fontWeight: 600, color: 'var(--color-success)', display: 'block', fontSize: '0.9rem' }}>
                        <Tag size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/>
                        {appliedCoupon.code || 'COUPON'} APPLIED
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>You saved ₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <button type="button" onClick={handleRemoveCoupon} style={{ background: 'none', border: 'none', color: 'var(--primary-ruby)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                  </div>
                )}
              </div>

              <div className="checkout-summary-totals">
                <div className="summary-total-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="summary-total-row" style={{ color: 'var(--color-success)' }}>
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="summary-total-row">
                  <span>Standard Delivery</span>
                  <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>FREE</span>
                </div>
                <div className="summary-total-row grand-total">
                  <span>Grand Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
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
  const [orderIdInput, setOrderIdInput] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchedId) return;
    setLoading(true);
    setError('');
    setOrder(null);

    fetch(`${API_BASE_URL}/orders/track/${searchedId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setOrder(data.data);
        } else {
          setError(data.message || 'Order not found. Please verify the Order ID.');
        }
      })
      .catch(err => {
        setError('Connection error. Could not query tracking API.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchedId]);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      setSearchedId(orderIdInput.trim());
    }
  };

  const getStatusIndex = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const statusIdx = order ? getStatusIndex(order.status) : -1;

  return (
    <div className="tracking-page-container container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">
          &larr; Back
        </button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">Order Tracking</span>
      </div>

      <h1 className="section-title" style={{ display: 'block', margin: '20px auto 40px auto', textAlign: 'center' }}>Track Your Order</h1>

      <form onSubmit={handleTrackSubmit} className="tracking-search-bar">
        <input 
          type="text" 
          placeholder="Enter Order ID (e.g. MD-ORD-XXXX)" 
          className="tracking-input"
          value={orderIdInput}
          onChange={(e) => setOrderIdInput(e.target.value)}
          required 
        />
        <button type="submit" className="tracking-btn">Track</button>
      </form>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--primary-ruby)', fontWeight: 600 }}>
          Querying database...
        </div>
      )}

      {error && (
        <div className="tracking-card" style={{ textAlign: 'center', padding: '30px', color: 'var(--color-danger)' }}>
          <p>{error}</p>
        </div>
      )}

      {order && (
        <div className="tracking-card">
          <div className="tracking-details-header">
            <div>
              <span className="tracking-id-label">Order: {order.order_number}</span>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Customer: {order.customer_name} | Type: {order.checkout_type}
              </div>
            </div>
            <span className={`tracking-status-badge status-badge ${order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'warning' : 'info'}`}>
              {order.status}
            </span>
          </div>

          <div style={{ padding: '20px', background: '#fafafa', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
            <p><strong>Total Amount:</strong> ₹{order.total_amount?.toLocaleString('en-IN')}</p>
            <p><strong>Shipping To:</strong> {order.shipping_address}, {order.city} - {order.pincode}</p>
            {order.custom_tailoring_details && (
              <p style={{ marginTop: '8px', color: 'var(--primary-gold-dark)' }}><strong>Stitching Instructions:</strong> {order.custom_tailoring_details}</p>
            )}
          </div>

          {order.status === 'cancelled' ? (
            <div style={{ color: 'var(--color-danger)', fontWeight: 700, textAlign: 'center', padding: '20px' }}>
              ❌ This order was cancelled. Please reach out to customer support on WhatsApp for queries.
            </div>
          ) : (
            <div className="timeline-container">
              <div className={`timeline-step ${statusIdx >= 0 ? 'completed' : ''} ${statusIdx === 0 ? 'active' : ''}`}>
                <div className="timeline-bullet">{statusIdx > 0 ? <Check size={16} /> : 1}</div>
                <div className="timeline-info">
                  <span className="timeline-title">Order Received</span>
                  <span className="timeline-desc">Your order request has been logged in our system.</span>
                </div>
              </div>

              <div className={`timeline-step ${statusIdx >= 1 ? 'completed' : ''} ${statusIdx === 1 ? 'active' : ''}`}>
                <div className="timeline-bullet">{statusIdx > 1 ? <Check size={16} /> : 2}</div>
                <div className="timeline-info">
                  <span className="timeline-title">Confirmed & Approved</span>
                  <span className="timeline-desc">Stitching options and stock availability verified by our stylist.</span>
                </div>
              </div>

              <div className={`timeline-step ${statusIdx >= 2 ? 'completed' : ''} ${statusIdx === 2 ? 'active' : ''}`}>
                <div className="timeline-bullet">{statusIdx > 2 ? <Check size={16} /> : 3}</div>
                <div className="timeline-info">
                  <span className="timeline-title">Processing & Stitching</span>
                  <span className="timeline-desc">Our master artisans are sewing and tailoring the garment to your specifications.</span>
                </div>
              </div>

              <div className={`timeline-step ${statusIdx >= 3 ? 'completed' : ''} ${statusIdx === 3 ? 'active' : ''}`}>
                <div className="timeline-bullet">{statusIdx > 3 ? <Check size={16} /> : <Truck size={16} />}</div>
                <div className="timeline-info">
                  <span className="timeline-title">Shipped & In Transit</span>
                  <span className="timeline-desc">Package handed over to BlueDart Express courier.</span>
                </div>
              </div>

              <div className={`timeline-step ${statusIdx >= 4 ? 'completed' : ''} ${statusIdx === 4 ? 'active' : ''}`}>
                <div className="timeline-bullet">{statusIdx >= 4 ? <Check size={16} /> : <ShoppingBag size={16} />}</div>
                <div className="timeline-info">
                  <span className="timeline-title">Delivered</span>
                  <span className="timeline-desc">Package arrived at your delivery address. Wear it with pride!</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   ABOUT US PAGE COMPONENT
   ========================================================================== */
function AboutUsPage({ siteSettings = {}, onBack }) {
  const customAbout = siteSettings?.page_about;
  const pageTitle = siteSettings?.page_about_title || 'Our Legacy';

  return (
    <div className="about-page-container reveal-on-scroll">
      <div className="container">
        <div className="breadcrumb-nav">
          <button onClick={onBack} className="back-btn">
            &larr; Back
          </button>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-current font-bold">{siteSettings?.page_about_title || 'About Us'}</span>
        </div>

        <h1 className="section-title" style={{ display: 'block', margin: '20px auto 40px auto', textAlign: 'center' }}>{pageTitle}</h1>
        
        {customAbout ? (
          <div className="cms-card cms-prose">
            {/<[a-z][\s\S]*>/i.test(customAbout) ? (
              <div className="cms-html-content" dangerouslySetInnerHTML={{ __html: customAbout }} />
            ) : (
              <div style={{ whiteSpace: 'pre-line' }}>{customAbout}</div>
            )}
          </div>
        ) : (
          <>
            <div className="about-intro-grid">
              <div>
                <h3 className="about-subtitle-premium">Preserving the Essence of Indian Handloom</h3>
                <p className="about-para"><strong>MaaDrobe</strong> was founded with a singular, passionate vision: to celebrate the timeless elegance of traditional Indian weaves while tailoring each piece to match the unique silhouette of the modern woman.</p>
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
                <p className="pillar-text">To prevent wastage and promote sustainable fashion, we offer a complimentary online custom adjustment service. Our master tailors verify your measurements to deliver a perfect, tailor-made drape.</p>
              </div>
            </div>

            <div className="about-philosophy">
              <h3 className="philosophy-title">Our Sustainable Philosophy</h3>
              <p className="philosophy-para">
                In a world dominated by fast fashion, MaaDrobe stands as a beacon of slow, intentional couture. We believe in creating garments that last generations. By combining ancient needlecraft with contemporary silhouettes, we design apparel that tells a story of heritage, pride, and ultimate comfort.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   CUSTOMER CARE PAGE COMPONENT
   ========================================================================== */
function CustomerCarePage({ siteSettings = {}, onBack }) {
  const [ticketForm, setTicketForm] = useState({ name: '', phone: '', email: '', orderNumber: '', queryType: 'General Inquiry', message: '' });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const phone = siteSettings.contact_number || '+91 98765 43210';
  const whatsapp = siteSettings.whatsapp_number || '919876543210';
  const email = siteSettings.contact_email || 'contact@maadrobe.com';
  const hours = siteSettings.support_hours || 'Mon - Sat: 10:00 AM - 7:00 PM IST';
  const customCareText = siteSettings.page_customercare;

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const waMsg = `Namaste MaaDrobe Care! 🌸\n\n*Customer Support Request:*\n*Name:* ${ticketForm.name}\n*Phone:* ${ticketForm.phone}\n*Email:* ${ticketForm.email || 'N/A'}\n*Order ID:* ${ticketForm.orderNumber || 'N/A'}\n*Topic:* ${ticketForm.queryType}\n\n*Message:* ${ticketForm.message}`;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(waMsg)}`;
    window.open(url, '_blank');
    setTicketSubmitted(true);
    setTimeout(() => setTicketSubmitted(false), 5000);
  };

  return (
    <div className="cms-page-wrapper container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">&larr; Back</button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">{siteSettings?.page_customercare_title || 'Customer Care'}</span>
      </div>

      <div className="cms-hero-header">
        <span className="cms-hero-badge">WE ARE HERE FOR YOU</span>
        <h1 className="cms-hero-title">{siteSettings?.page_customercare_title || 'Customer Care & Support'}</h1>
        {customCareText && /<[a-z][\s\S]*>/i.test(customCareText) ? (
          <div className="cms-html-content" style={{ marginTop: 12 }} dangerouslySetInnerHTML={{ __html: customCareText }} />
        ) : (
          <p className="cms-hero-subtitle">
            {customCareText || "Whether you have questions about sizing, bespoke tailoring, order delivery, or fabric care, our dedicated concierge team is delighted to assist you."}
          </p>
        )}
      </div>

      <div className="care-contact-grid">
        <div className="care-contact-card">
          <div>
            <div className="care-card-header">
              <div className="care-card-icon" style={{ background: '#eafaf1', color: '#25D366' }}>
                <MessageCircle size={22} />
              </div>
              <div>
                <h4 className="care-card-title">WhatsApp Support</h4>
                <span style={{ fontSize: '0.75rem', color: '#25D366', fontWeight: 600 }}>Fastest Response (Avg 5 mins)</span>
              </div>
            </div>
            <div className="care-card-value">+{whatsapp}</div>
            <div className="care-card-timing">{hours}</div>
          </div>
          <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello MaaDrobe! I need some assistance with my order.')}`} target="_blank" rel="noopener noreferrer" className="care-card-btn primary">
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
        </div>

        <div className="care-contact-card">
          <div>
            <div className="care-card-header">
              <div className="care-card-icon">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="care-card-title">Direct Helpline</h4>
                <span style={{ fontSize: '0.75rem', color: '#888' }}>Mon to Sat Support</span>
              </div>
            </div>
            <div className="care-card-value">{phone}</div>
            <div className="care-card-timing">{hours}</div>
          </div>
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="care-card-btn secondary">
            <Phone size={16} /> Call Helpline
          </a>
        </div>

        <div className="care-contact-card">
          <div>
            <div className="care-card-header">
              <div className="care-card-icon">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="care-card-title">Email Desk</h4>
                <span style={{ fontSize: '0.75rem', color: '#888' }}>Official Correspondence</span>
              </div>
            </div>
            <div className="care-card-value">{email}</div>
            <div className="care-card-timing">Replies within 1 business day</div>
          </div>
          <a href={`mailto:${email}`} className="care-card-btn secondary">
            <Mail size={16} /> Send Email
          </a>
        </div>
      </div>

      <div className="cms-card">
        <h2 style={{ marginTop: 0 }}>Send a Message to Support</h2>
        <p style={{ color: '#666', marginBottom: 24 }}>Fill out the details below to connect directly with our resolution desk via WhatsApp or email.</p>
        
        {ticketSubmitted ? (
          <div style={{ background: '#f0f9f4', border: '1px solid #b7ebcf', borderRadius: 8, padding: '20px', color: '#276749', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem' }}>🌸 Thank you! Your message has been routed to our care desk.</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>We will connect back with you promptly.</p>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
            <div className="form-group">
              <label className="form-label">Your Full Name *</label>
              <input type="text" className="form-input" required value={ticketForm.name} onChange={e => setTicketForm({...ticketForm, name: e.target.value})} placeholder="e.g. Priya Sen" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone / WhatsApp Number *</label>
              <input type="tel" className="form-input" required value={ticketForm.phone} onChange={e => setTicketForm({...ticketForm, phone: e.target.value})} placeholder="e.g. 9876543210" />
            </div>
            <div className="form-group">
              <label className="form-label">Order Number (if applicable)</label>
              <input type="text" className="form-input" value={ticketForm.orderNumber} onChange={e => setTicketForm({...ticketForm, orderNumber: e.target.value})} placeholder="e.g. MAA-1082" />
            </div>
            <div className="form-group">
              <label className="form-label">Query Category</label>
              <select className="form-input" value={ticketForm.queryType} onChange={e => setTicketForm({...ticketForm, queryType: e.target.value})}>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Tracking">Order Tracking & Delivery</option>
                <option value="Size & Fit Assistance">Size & Fit Assistance</option>
                <option value="Returns & Exchanges">Returns & Exchanges</option>
                <option value="Bespoke Tailoring Request">Bespoke Tailoring Request</option>
                <option value="Payment Issue">Payment Issue</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Your Message or Issue Description *</label>
              <textarea className="form-input" rows={4} required value={ticketForm.message} onChange={e => setTicketForm({...ticketForm, message: e.target.value})} placeholder="Please describe how we can assist you..." />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn-solid-gold" style={{ padding: '14px 28px', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}>
                Submit Support Request &rarr;
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   RETURNS & EXCHANGES PAGE COMPONENT
   ========================================================================== */
function ReturnsPolicyPage({ siteSettings = {}, onBack }) {
  const content = siteSettings.page_returns || siteSettings.return_policy;
  const whatsapp = siteSettings.whatsapp_number || '919876543210';

  return (
    <div className="cms-page-wrapper container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">&larr; Back</button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">{siteSettings?.page_returns_title || 'Returns & Exchanges'}</span>
      </div>

      <div className="cms-hero-header">
        <span className="cms-hero-badge">WORRY-FREE SHOPPING</span>
        <h1 className="cms-hero-title">{siteSettings?.page_returns_title || 'Returns & Exchanges'}</h1>
        <p className="cms-hero-subtitle">
          We want you to fall in love with every outfit you wear. If something isn&apos;t completely perfect, we are here to make it right.
        </p>
      </div>

      <div className="cms-highlights-grid">
        <div className="cms-highlight-card">
          <div className="cms-highlight-icon"><RotateCcw size={22} /></div>
          <h4 className="cms-highlight-title">7-Day Easy Returns</h4>
          <p className="cms-highlight-desc">Request a return or size exchange within 7 days of delivery.</p>
        </div>
        <div className="cms-highlight-card">
          <div className="cms-highlight-icon"><RefreshCw size={22} /></div>
          <h4 className="cms-highlight-title">Free Size Exchanges</h4>
          <p className="cms-highlight-desc">Wrong fit? We will exchange it for your preferred size at zero return pickup fee.</p>
        </div>
        <div className="cms-highlight-card">
          <div className="cms-highlight-icon"><Truck size={22} /></div>
          <h4 className="cms-highlight-title">Doorstep Reverse Pickup</h4>
          <p className="cms-highlight-desc">Our courier partners pick up the package straight from your doorstep across India.</p>
        </div>
        <div className="cms-highlight-card">
          <div className="cms-highlight-icon"><ShieldCheck size={22} /></div>
          <h4 className="cms-highlight-title">Prompt Refunds</h4>
          <p className="cms-highlight-desc">Refunds processed back to your original payment mode or bank account within 3-5 days.</p>
        </div>
      </div>

      <div className="cms-card cms-prose">
        {content ? (
          /<[a-z][\s\S]*>/i.test(content) ? (
            <div className="cms-html-content" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
          )
        ) : (
          <>
            <h2>Return & Exchange Guidelines</h2>
            <p>At MaaDrobe, every garment is handcrafted with care using 100% pure organic fabrics. We inspect each piece before dispatch to ensure heirloom quality. However, if you are not fully satisfied with your purchase, you may initiate a return or exchange within <strong>7 days</strong> of order delivery.</p>

            <h3>1. Eligibility for Returns & Exchanges</h3>
            <ul>
              <li>The garment must be in its original, unworn, unwashed, and undamaged condition.</li>
              <li>All original brand tags, barcodes, and packaging must remain intact.</li>
              <li>Apparel that has been custom-altered to bespoke body measurements upon request is not eligible for return unless a genuine tailoring defect is verified by our team.</li>
              <li>Special clearance sale items marked &ldquo;FINAL SALE&rdquo; are eligible for size exchange only, subject to stock availability.</li>
            </ul>

            <h3>2. How to Request a Return or Exchange</h3>
            <ol>
              <li>Reach out to our WhatsApp Care Desk at <strong>+{whatsapp}</strong> or email <strong>{siteSettings.contact_email || 'contact@maadrobe.com'}</strong> with your Order Number (e.g., MAA-1082) and a clear photo/reason for exchange.</li>
              <li>Our team will approve your request within 24 business hours and schedule a reverse courier pickup.</li>
              <li>Hand over the securely packed garment to our courier executive.</li>
              <li>Once received at our fulfillment center and quality checked, your replacement piece or full refund will be processed immediately.</li>
            </ol>

            <h3>3. Refund Processing</h3>
            <p>For prepaid online orders, refunds are credited back to your original source (UPI, Credit/Debit card, Netbanking) within <strong>3 to 5 business days</strong>. For Cash on Delivery or WhatsApp confirmed orders, refunds are credited directly to your bank account via IMPS/UPI upon verification.</p>
          </>
        )}

        <div style={{ marginTop: 32, padding: '20px', background: '#faf5f0', borderRadius: 10, border: '1px solid #ebd9c8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#7a0a0a', fontSize: '1.05rem' }}>Need to start a return or exchange right now?</h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#666' }}>Chat directly with our dedicated returns concierge on WhatsApp.</p>
          </div>
          <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello! I would like to request an exchange/return for my order.')}`} target="_blank" rel="noopener noreferrer" className="btn-solid-gold" style={{ textDecoration: 'none', padding: '10px 20px', borderRadius: 6, fontWeight: 600 }}>
            Start Return on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SHIPPING POLICY PAGE COMPONENT
   ========================================================================== */
function ShippingPolicyPage({ siteSettings = {}, onBack }) {
  const content = siteSettings.page_shipping || siteSettings.shipping_info;

  return (
    <div className="cms-page-wrapper container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">&larr; Back</button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">{siteSettings?.page_shipping_title || 'Shipping Policy'}</span>
      </div>

      <div className="cms-hero-header">
        <span className="cms-hero-badge">DELIVERED WITH LOVE</span>
        <h1 className="cms-hero-title">{siteSettings?.page_shipping_title || 'Shipping & Delivery Policy'}</h1>
        <p className="cms-hero-subtitle">
          Reliable, fast, and insured doorstep delivery across every pin code in India.
        </p>
      </div>

      <div className="cms-highlights-grid">
        <div className="cms-highlight-card">
          <div className="cms-highlight-icon"><Truck size={22} /></div>
          <h4 className="cms-highlight-title">Free All-India Shipping</h4>
          <p className="cms-highlight-desc">Complimentary free delivery on all orders across 20,000+ pin codes.</p>
        </div>
        <div className="cms-highlight-card">
          <div className="cms-highlight-icon"><Clock size={22} /></div>
          <h4 className="cms-highlight-title">24-48h Dispatch</h4>
          <p className="cms-highlight-desc">Standard catalog items dispatched within 1-2 business days.</p>
        </div>
        <div className="cms-highlight-card">
          <div className="cms-highlight-icon"><Package size={22} /></div>
          <h4 className="cms-highlight-title">Tamper-Proof Packaging</h4>
          <p className="cms-highlight-desc">Each garment is steamed, hand-folded and packed in premium eco-friendly bags.</p>
        </div>
        <div className="cms-highlight-card">
          <div className="cms-highlight-icon"><ShieldCheck size={22} /></div>
          <h4 className="cms-highlight-title">Live Tracking Alerts</h4>
          <p className="cms-highlight-desc">Receive real-time WhatsApp & SMS tracking links upon dispatch.</p>
        </div>
      </div>

      <div className="cms-card cms-prose">
        {content ? (
          /<[a-z][\s\S]*>/i.test(content) ? (
            <div className="cms-html-content" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
          )
        ) : (
          <>
            <h2>Delivery Timelines & Information</h2>
            <p>At MaaDrobe, we partner exclusively with India&apos;s leading logistics carriers including <strong>BlueDart, Delhivery, DTDC, and Xpressbees</strong> to ensure your handcrafted ensembles arrive safely and on time.</p>

            <div className="size-table-container">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Estimated Transit Time</th>
                    <th>Shipping Charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Metro Cities</strong> (Delhi, Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad)</td>
                    <td>2 to 4 Business Days</td>
                    <td><span style={{ color: '#276749', fontWeight: 700 }}>FREE</span></td>
                  </tr>
                  <tr>
                    <td><strong>Rest of India</strong> (Tier 2 & 3 Cities)</td>
                    <td>3 to 6 Business Days</td>
                    <td><span style={{ color: '#276749', fontWeight: 700 }}>FREE</span></td>
                  </tr>
                  <tr>
                    <td><strong>Northeast & Remote Pin Codes</strong></td>
                    <td>5 to 8 Business Days</td>
                    <td><span style={{ color: '#276749', fontWeight: 700 }}>FREE</span></td>
                  </tr>
                  <tr>
                    <td><strong>Bespoke Custom Tailored Pieces</strong></td>
                    <td>+3 Days (Crafting & Master Stitching)</td>
                    <td><span style={{ color: '#276749', fontWeight: 700 }}>FREE</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Order Tracking</h3>
            <p>Once your order has shipped, you will receive an automatic dispatch notification containing your tracking AWB number and live carrier link. You can also track your shipment anytime on our <a href="#tracking" style={{ color: '#7a0a0a', fontWeight: 600 }}>Track Order Page</a>.</p>

            <h3>Incorrect Address or Undelivered Packages</h3>
            <p>Please double-check your shipping address, landmark, and pincode at checkout. In the event of delivery delays or attempted deliveries when you are unavailable, our courier partners attempt delivery up to 3 times before returning the parcel to our origin hub.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   SIZE GUIDE PAGE COMPONENT
   ========================================================================== */
function SizeGuidePage({ siteSettings = {}, onBack }) {
  const [unit, setUnit] = useState('in'); // 'in' | 'cm'
  const [activeCategory, setActiveCategory] = useState('kurtis'); // 'kurtis' | 'dresses' | 'sets'
  const whatsapp = siteSettings.whatsapp_number || '919876543210';
  const customNotes = siteSettings.page_sizeguide;

  const toUnit = (valInInches) => {
    if (unit === 'in') return `${valInInches}"`;
    return `${Math.round(valInInches * 2.54)} cm`;
  };

  return (
    <div className="cms-page-wrapper container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">&larr; Back</button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">{siteSettings?.page_sizeguide_title || 'Size Guide'}</span>
      </div>

      <div className="cms-hero-header">
        <span className="cms-hero-badge">PERFECT FIT GUARANTEE</span>
        <h1 className="cms-hero-title">{siteSettings?.page_sizeguide_title || 'MaaDrobe Size & Fit Guide'}</h1>
        <p className="cms-hero-subtitle">
          Our silhouettes are tailored with comfortable ease to complement diverse Indian body types. Measure yourself and choose your ideal size below.
        </p>
      </div>

      <div className="size-guide-unit-toggle">
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666' }}>Units:</span>
        <button className={`size-unit-btn ${unit === 'in' ? 'active' : ''}`} onClick={() => setUnit('in')}>Inches (in)</button>
        <button className={`size-unit-btn ${unit === 'cm' ? 'active' : ''}`} onClick={() => setUnit('cm')}>Centimeters (cm)</button>
      </div>

      <div className="size-guide-tabs">
        <button className={`size-tab-btn ${activeCategory === 'kurtis' ? 'active' : ''}`} onClick={() => setActiveCategory('kurtis')}>Kurtis & Tunic Tops</button>
        <button className={`size-tab-btn ${activeCategory === 'dresses' ? 'active' : ''}`} onClick={() => setActiveCategory('dresses')}>Flared & Tiered Dresses</button>
        <button className={`size-tab-btn ${activeCategory === 'sets' ? 'active' : ''}`} onClick={() => setActiveCategory('sets')}>Kurta Sets & Co-ords</button>
      </div>

      <div className="cms-card">
        {activeCategory === 'kurtis' && (
          <div className="size-table-container">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest / Bust</th>
                  <th>Waist</th>
                  <th>Hip</th>
                  <th>Shoulder</th>
                  <th>Garment Length</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>XS</strong></td><td>{toUnit(34)}</td><td>{toUnit(30)}</td><td>{toUnit(36)}</td><td>{toUnit(14)}</td><td>{toUnit(44)}</td></tr>
                <tr><td><strong>S</strong></td><td>{toUnit(36)}</td><td>{toUnit(32)}</td><td>{toUnit(38)}</td><td>{toUnit(14.5)}</td><td>{toUnit(44)}</td></tr>
                <tr><td><strong>M</strong></td><td>{toUnit(38)}</td><td>{toUnit(34)}</td><td>{toUnit(40)}</td><td>{toUnit(15)}</td><td>{toUnit(45)}</td></tr>
                <tr><td><strong>L</strong></td><td>{toUnit(40)}</td><td>{toUnit(36)}</td><td>{toUnit(42)}</td><td>{toUnit(15.5)}</td><td>{toUnit(45)}</td></tr>
                <tr><td><strong>XL</strong></td><td>{toUnit(42)}</td><td>{toUnit(38)}</td><td>{toUnit(44)}</td><td>{toUnit(16)}</td><td>{toUnit(46)}</td></tr>
                <tr><td><strong>XXL</strong></td><td>{toUnit(44)}</td><td>{toUnit(40)}</td><td>{toUnit(46)}</td><td>{toUnit(16.5)}</td><td>{toUnit(46)}</td></tr>
                <tr><td><strong>3XL</strong></td><td>{toUnit(46)}</td><td>{toUnit(42)}</td><td>{toUnit(48)}</td><td>{toUnit(17)}</td><td>{toUnit(46)}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {activeCategory === 'dresses' && (
          <div className="size-table-container">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Bust</th>
                  <th>Waist</th>
                  <th>Dress Length</th>
                  <th>Flair / Hem Sweep</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>XS</strong></td><td>{toUnit(34)}</td><td>{toUnit(28)}</td><td>{toUnit(48)}</td><td>{toUnit(90)}</td></tr>
                <tr><td><strong>S</strong></td><td>{toUnit(36)}</td><td>{toUnit(30)}</td><td>{toUnit(48)}</td><td>{toUnit(92)}</td></tr>
                <tr><td><strong>M</strong></td><td>{toUnit(38)}</td><td>{toUnit(32)}</td><td>{toUnit(49)}</td><td>{toUnit(95)}</td></tr>
                <tr><td><strong>L</strong></td><td>{toUnit(40)}</td><td>{toUnit(34)}</td><td>{toUnit(50)}</td><td>{toUnit(98)}</td></tr>
                <tr><td><strong>XL</strong></td><td>{toUnit(42)}</td><td>{toUnit(36)}</td><td>{toUnit(50)}</td><td>{toUnit(100)}</td></tr>
                <tr><td><strong>XXL</strong></td><td>{toUnit(44)}</td><td>{toUnit(38)}</td><td>{toUnit(51)}</td><td>{toUnit(102)}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {activeCategory === 'sets' && (
          <div className="size-table-container">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Kurta Bust</th>
                  <th>Kurta Length</th>
                  <th>Pant Elastic Waist</th>
                  <th>Pant Length</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>XS</strong></td><td>{toUnit(34)}</td><td>{toUnit(42)}</td><td>{toUnit(26)} - {toUnit(32)}</td><td>{toUnit(37)}</td></tr>
                <tr><td><strong>S</strong></td><td>{toUnit(36)}</td><td>{toUnit(42)}</td><td>{toUnit(28)} - {toUnit(34)}</td><td>{toUnit(37)}</td></tr>
                <tr><td><strong>M</strong></td><td>{toUnit(38)}</td><td>{toUnit(43)}</td><td>{toUnit(30)} - {toUnit(36)}</td><td>{toUnit(38)}</td></tr>
                <tr><td><strong>L</strong></td><td>{toUnit(40)}</td><td>{toUnit(43)}</td><td>{toUnit(32)} - {toUnit(38)}</td><td>{toUnit(38)}</td></tr>
                <tr><td><strong>XL</strong></td><td>{toUnit(42)}</td><td>{toUnit(44)}</td><td>{toUnit(34)} - {toUnit(40)}</td><td>{toUnit(39)}</td></tr>
                <tr><td><strong>XXL</strong></td><td>{toUnit(44)}</td><td>{toUnit(44)}</td><td>{toUnit(36)} - {toUnit(42)}</td><td>{toUnit(40)}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {customNotes && (
          <div style={{ marginTop: 24, padding: 16, background: '#faf5f0', borderRadius: 8, borderLeft: '4px solid #7a0a0a', whiteSpace: 'pre-line' }}>
            {customNotes}
          </div>
        )}

        <h3 style={{ marginTop: 24, marginBottom: 12 }}>How to Measure Yourself</h3>
        <div className="size-measure-tips-grid">
          <div className="size-tip-box">
            <h5>1. Bust</h5>
            <p>Measure across the fullest part of your chest, keeping the tape level under your arms and across your shoulder blades.</p>
          </div>
          <div className="size-tip-box">
            <h5>2. Waist</h5>
            <p>Measure around your natural waistline, typically the narrowest part of your torso above your belly button.</p>
          </div>
          <div className="size-tip-box">
            <h5>3. Hips</h5>
            <p>Stand with feet together and measure around the fullest part of your hips and rear.</p>
          </div>
          <div className="size-tip-box">
            <h5>4. Garment Length</h5>
            <p>From the highest point of the shoulder down to the hem of the kurti or dress.</p>
          </div>
        </div>

        <div style={{ marginTop: 32, padding: '20px', background: '#faf5f0', borderRadius: 10, border: '1px solid #ebd9c8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#7a0a0a', fontSize: '1.05rem' }}>Need Bespoke Custom Tailoring?</h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#666' }}>Our in-house master tailors can adjust any design to your exact height and measurements.</p>
          </div>
          <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello! I would like to request custom tailoring for an outfit.')}`} target="_blank" rel="noopener noreferrer" className="btn-solid-gold" style={{ textDecoration: 'none', padding: '10px 20px', borderRadius: 6, fontWeight: 600 }}>
            Consult Tailor on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   FAQS PAGE COMPONENT
   ========================================================================== */
function FaqPage({ siteSettings = {}, onBack }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const whatsapp = siteSettings.whatsapp_number || '919876543210';

  const defaultFaqs = [
    { q: "What fabrics does MaaDrobe use in its collection?", a: "We prioritize 100% pure organic fabrics: handloom cottons, breathable georgettes, and artisanal Banarasi brocades. Every piece is hypoallergenic and tested for all-day comfort.", category: "fabrics" },
    { q: "How long does shipping take across India?", a: "Standard dispatch happens within 24 to 48 hours. Metro cities receive orders in 2-4 business days, while other areas take 4-6 business days. Express shipping is also available on request.", category: "orders" },
    { q: "Can I customize the length or sleeve of an outfit?", a: "Yes! We offer complimentary custom tailoring adjustments. Simply click 'Custom Adjustments' on WhatsApp or leave a note at checkout with your measurements.", category: "sizing" },
    { q: "What is your return and exchange policy?", a: "We provide a 7-day hassle-free return and exchange window. If an item doesn't fit, we offer free doorstep reverse pickup and replace it with your preferred size.", category: "returns" },
    { q: "How do I care for Chikankari and handcrafted embroidery?", a: "We recommend gentle hand washing in cold water with mild detergent or eco dry cleaning for silk and georgette Chikankari garments. Always dry in shade.", category: "fabrics" },
    { q: "What payment methods do you accept?", a: "We accept all major UPI apps (Google Pay, PhonePe, Paytm), Credit/Debit cards, Net Banking, and direct WhatsApp order confirmation.", category: "payments" },
    { q: "How can I track my order status?", a: "You can track your order at any time using our dedicated 'Track Order' page with your Order Number (e.g. MAA-1082) and phone number.", category: "orders" },
    { q: "Are your garments authentic artisan crafts?", a: "Yes. Our embroidery is created by certified artisan clusters in Lucknow and Rajasthan, sustaining generational handcrafting techniques.", category: "fabrics" }
  ];

  let faqs = defaultFaqs;
  if (siteSettings.page_faq) {
    try {
      const parsed = JSON.parse(siteSettings.page_faq);
      if (Array.isArray(parsed) && parsed.length > 0) faqs = parsed;
    } catch {
      // Fallback
    }
  }

  const filtered = activeCategory === 'all' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="cms-page-wrapper container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">&larr; Back</button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">{siteSettings?.page_faq_title || 'FAQs'}</span>
      </div>

      <div className="cms-hero-header">
        <span className="cms-hero-badge">FREQUENTLY ASKED QUESTIONS</span>
        <h1 className="cms-hero-title">{siteSettings?.page_faq_title || 'How Can We Help You?'}</h1>
        <p className="cms-hero-subtitle">
          Find answers to common questions about our silhouettes, order fulfillment, sizing, and artisanal craftsmanship.
        </p>
      </div>

      <div className="faq-category-pills">
        <button className={`faq-pill-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All Questions</button>
        <button className={`faq-pill-btn ${activeCategory === 'orders' ? 'active' : ''}`} onClick={() => setActiveCategory('orders')}>Orders & Shipping</button>
        <button className={`faq-pill-btn ${activeCategory === 'sizing' ? 'active' : ''}`} onClick={() => setActiveCategory('sizing')}>Sizing & Customization</button>
        <button className={`faq-pill-btn ${activeCategory === 'returns' ? 'active' : ''}`} onClick={() => setActiveCategory('returns')}>Returns & Exchanges</button>
        <button className={`faq-pill-btn ${activeCategory === 'fabrics' ? 'active' : ''}`} onClick={() => setActiveCategory('fabrics')}>Fabric & Care</button>
        <button className={`faq-pill-btn ${activeCategory === 'payments' ? 'active' : ''}`} onClick={() => setActiveCategory('payments')}>Payments</button>
      </div>

      <div className="faq-accordion-list" style={{ maxWidth: 860, margin: '0 auto 40px auto' }}>
        {filtered.map((item, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
              <button className="faq-accordion-header" onClick={() => setOpenFaq(isOpen ? null : idx)}>
                <span>{item.q}</span>
                {isOpen ? <ChevronUp size={18} style={{ color: '#7a0a0a' }} /> : <ChevronDown size={18} />}
              </button>
              {isOpen && (
                <div className="faq-accordion-body">
                  <p style={{ margin: 0 }}>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', padding: '32px 24px', background: '#ffffff', border: '1px solid #e8ded4', borderRadius: 12 }}>
        <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-serif)' }}>Didn&apos;t find what you were looking for?</h3>
        <p style={{ color: '#666', marginBottom: 20 }}>Our friendly customer support team is available on WhatsApp to assist you immediately.</p>
        <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello MaaDrobe! I have a question about your collection.')}`} target="_blank" rel="noopener noreferrer" className="btn-solid-gold" style={{ display: 'inline-block', textDecoration: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 600 }}>
          Ask Us on WhatsApp &rarr;
        </a>
      </div>
    </div>
  );
}

/* ==========================================================================
   OUR STORY PAGE COMPONENT
   ========================================================================== */
function OurStoryPage({ siteSettings = {}, onBack }) {
  const customStory = siteSettings.page_story;

  return (
    <div className="about-page-container reveal-on-scroll">
      <div className="container">
        <div className="breadcrumb-nav">
          <button onClick={onBack} className="back-btn">&larr; Back</button>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-current font-bold">{siteSettings?.page_story_title || 'Our Story'}</span>
        </div>

        <div className="cms-hero-header">
          <span className="cms-hero-badge">THE ARTISANAL JOURNEY</span>
          <h1 className="cms-hero-title">{siteSettings?.page_story_title || 'The MaaDrobe Story'}</h1>
          <p className="cms-hero-subtitle">
            Born from a reverence for generational Indian handcraft and a modern vision for graceful everyday silhouettes.
          </p>
        </div>
        
        {siteSettings.page_story_image && (
          <div className="cms-hero-image-wrapper" style={{ margin: '0 auto 32px auto', maxWidth: '800px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={formatImgUrl(siteSettings.page_story_image)} alt="MaaDrobe Story" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        )}

        <div className="cms-card cms-prose">
          {customStory ? (
            /<[a-z][\s\S]*>/i.test(customStory) ? (
              <div className="cms-html-content" dangerouslySetInnerHTML={{ __html: customStory }} />
            ) : (
              <div style={{ whiteSpace: 'pre-line' }}>{customStory}</div>
            )
          ) : (
            <>
              <h2>Where Tradition Meets Modern Grace</h2>
              <p>MaaDrobe began with a simple observation: modern women cherish the delicate romance of authentic Indian handlooms, but struggle with heavy, uncomfortable fabrics and generic fast-fashion fits.</p>
              
              <p>We set out on a journey through the artisanal heartlands of India — from the historic shadow-work embroidery clusters of Lucknow to the handblock printers of Sanganer and the master silk weavers of Varanasi. Our mission was to bring centuries-old heritage techniques into breathable, pure organic fabrics tailored for the modern rhythm of life.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, margin: '28px 0' }}>
                <img src="/images/ref_cat_kurtis.jpg" alt="Artisanal Kurtis" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 10 }} />
                <img src="/images/ref_cat_dresses.jpg" alt="Graceful Dresses" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 10 }} />
                <img src="/images/ref_cat_kurtasets.jpg" alt="Royal Kurta Sets" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 10 }} />
              </div>

              <h3>The Hands Behind the Stitches</h3>
              <p>Every MaaDrobe kurti, dress, and co-ord set is handcrafted by rural women artisans and master weavers. By supporting self-help artisan clusters, we help ensure fair, dignified wages and keep invaluable handicraft traditions alive in a world dominated by mass factory production.</p>

              <h3>Our Promise to You</h3>
              <p>When you wear MaaDrobe, you are not merely wearing an outfit — you are embracing a story of heritage, organic purity, and soulful craftsmanship made to celebrate you.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PRIVACY POLICY PAGE COMPONENT
   ========================================================================== */
function PrivacyPolicyPage({ siteSettings = {}, onBack }) {
  const content = siteSettings.page_privacy;

  return (
    <div className="cms-page-wrapper container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">&larr; Back</button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">{siteSettings?.page_privacy_title || 'Privacy Policy'}</span>
      </div>

      <div className="cms-hero-header">
        <span className="cms-hero-badge">DATA PRIVACY & INTEGRITY</span>
        <h1 className="cms-hero-title">{siteSettings?.page_privacy_title || 'Privacy Policy'}</h1>
        <p className="cms-hero-subtitle">
          How MaaDrobe collects, protects, and handles your personal information with absolute transparency.
        </p>
      </div>

      <div className="cms-card cms-prose">
        {content ? (
          /<[a-z][\s\S]*>/i.test(content) ? (
            <div className="cms-html-content" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
          )
        ) : (
          <>
            <p><strong>Last Updated: January 2026</strong></p>
            <p>At MaaDrobe (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we are committed to respecting your privacy and protecting the personal information you share with us when visiting our website or ordering our garments.</p>

            <h2>1. Information We Collect</h2>
            <p>When you browse our store, create an account, or place an order, we collect:</p>
            <ul>
              <li><strong>Personal Details:</strong> Name, email address, mobile/WhatsApp number, delivery and billing address.</li>
              <li><strong>Order History:</strong> Products purchased, sizing selections, bespoke measurements, and payment confirmation status.</li>
              <li><strong>Device & Browsing Info:</strong> IP address, device type, browser settings, and cookies for cart persistence and secure checkout.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To fulfill and deliver your orders accurately to your doorstep.</li>
              <li>To send order status, live courier tracking updates, and delivery alerts via WhatsApp and SMS.</li>
              <li>To offer customized sizing recommendations and customer care assistance.</li>
              <li>To prevent fraudulent transactions and maintain high website security.</li>
            </ul>

            <h2>3. Payment Security</h2>
            <p>We do not store your credit card, debit card, or net banking credentials on our servers. All online transactions are processed through RBI-authorized, 256-bit SSL encrypted payment gateways (such as Razorpay). For WhatsApp orders, payment confirmation is done directly with our authorized executive.</p>

            <h2>4. Third-Party Sharing</h2>
            <p>We never sell or rent your personal data to any external marketing agencies. Your contact details are only shared with:</p>
            <ul>
              <li>Our trusted courier and logistics partners (Delhivery, BlueDart, DTDC) exclusively for delivering your orders.</li>
              <li>Payment gateways to authenticate transactions.</li>
            </ul>

            <h2>5. Your Rights & Contact</h2>
            <p>You have the right to request access, correction, or deletion of your personal account information at any time. For any privacy queries, please write to our Data Privacy Officer at <strong>{siteSettings.contact_email || 'contact@maadrobe.com'}</strong>.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   TERMS & CONDITIONS PAGE COMPONENT
   ========================================================================== */
function TermsConditionsPage({ siteSettings = {}, onBack }) {
  const content = siteSettings.page_terms;

  return (
    <div className="cms-page-wrapper container reveal-on-scroll">
      <div className="breadcrumb-nav">
        <button onClick={onBack} className="back-btn">&larr; Back</button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current font-bold">{siteSettings?.page_terms_title || 'Terms & Conditions'}</span>
      </div>

      <div className="cms-hero-header">
        <span className="cms-hero-badge">TERMS OF SERVICE</span>
        <h1 className="cms-hero-title">{siteSettings?.page_terms_title || 'Terms & Conditions'}</h1>
        <p className="cms-hero-subtitle">
          Please read these terms and conditions carefully before using our website or purchasing our handcrafted garments.
        </p>
      </div>

      <div className="cms-card cms-prose">
        {content ? (
          /<[a-z][\s\S]*>/i.test(content) ? (
            <div className="cms-html-content" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
          )
        ) : (
          <>
            <p><strong>Effective Date: January 2026</strong></p>
            <p>Welcome to <strong>MaaDrobe</strong>. By accessing or using our website, services, or placing an order through our digital storefront or WhatsApp concierge, you agree to be bound by the terms outlined below.</p>

            <h2>1. Fabric & Handcraft Authenticity</h2>
            <p>Each MaaDrobe outfit is individually hand-woven, dyed, and embroidered by skilled artisans. Subtle irregularities in weave, color shading, block prints, or thread work are characteristic of authentic handloom textiles and are not considered manufacturing defects.</p>

            <h2>2. Pricing & Product Descriptions</h2>
            <ul>
              <li>All prices displayed are in Indian Rupees (INR) and are inclusive of applicable taxes.</li>
              <li>We make every effort to display garment colors as accurately as possible. However, slight variations may occur due to device screen calibrations and natural studio lighting.</li>
              <li>We reserve the right to correct any typographical pricing errors or modify product prices without prior notice.</li>
            </ul>

            <h2>3. Orders & Cancellation</h2>
            <p>Orders placed on the website or via WhatsApp are confirmed upon successful payment verification. You may cancel your order within <strong>12 hours</strong> of placement by contacting our care desk at <strong>{siteSettings.contact_number || '+91 98765 43210'}</strong>. Once an order is dispatched or custom-tailored, cancellations cannot be processed.</p>

            <h2>4. Intellectual Property</h2>
            <p>All designs, photography, branding, trademarks, logos, and digital assets on MaaDrobe.com are the exclusive intellectual property of MaaDrobe. Any unauthorized reproduction, resale, or distribution is strictly prohibited.</p>

            <h2>5. Governing Law & Jurisdiction</h2>
            <p>These terms and any disputes arising out of your purchases shall be governed by and construed in accordance with the laws of India, subject to the exclusive jurisdiction of the competent courts in India.</p>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// CUSTOMER AUTH PAGE  (Login / Register / Profile)
// ─────────────────────────────────────────────────────
function CustomerAuthPage({ mode, setMode, form, setForm, error, loading, customerUser, showPassword, setShowPassword, onLogin, onRegister, onLogout, onBack, setCustomerUser, fpStep, setFpStep, fpEmail, setFpEmail, fpOtp, setFpOtp, fpNewPass, setFpNewPass, fpConfirmPass, setFpConfirmPass, fpLoading, fpError, fpSuccess, setFpError, setFpSuccess, onForgotSend, onForgotReset }) {

  if (customerUser) {
    const [activeTab, setActiveTab] = useState('profile');
    const [name, setName] = useState(customerUser.name || '');
    const [phone, setPhone] = useState(customerUser.phone || '');
    const [password, setPassword] = useState('');
    
    // Parse structured address from user
    let initialAddress = { flatHouse: '', streetLane: '', landmark: '', state: '' };
    if (customerUser.address) {
      try {
        const parsed = JSON.parse(customerUser.address);
        if (parsed && typeof parsed === 'object') {
          initialAddress = {
            flatHouse: parsed.flat_house || '',
            streetLane: parsed.street_lane || '',
            landmark: parsed.landmark || '',
            state: parsed.state || ''
          };
        } else {
          initialAddress.streetLane = customerUser.address;
        }
      } catch (e) {
        initialAddress.streetLane = customerUser.address;
      }
    }

    const [flatHouse, setFlatHouse] = useState(initialAddress.flatHouse);
    const [streetLane, setStreetLane] = useState(initialAddress.streetLane);
    const [landmark, setLandmark] = useState(initialAddress.landmark);
    const [state, setState] = useState(initialAddress.state);
    const [city, setCity] = useState(customerUser.city || '');
    const [pincode, setPincode] = useState(customerUser.pincode || '');
    
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [tabError, setTabError] = useState('');

    useEffect(() => {
      setName(customerUser.name || '');
      setPhone(customerUser.phone || '');
      setCity(customerUser.city || '');
      setPincode(customerUser.pincode || '');

      let parsedAddr = { flatHouse: '', streetLane: '', landmark: '', state: '' };
      if (customerUser.address) {
        try {
          const parsed = JSON.parse(customerUser.address);
          if (parsed && typeof parsed === 'object') {
            parsedAddr = {
              flatHouse: parsed.flat_house || '',
              streetLane: parsed.street_lane || '',
              landmark: parsed.landmark || '',
              state: parsed.state || ''
            };
          } else {
            parsedAddr.streetLane = customerUser.address;
          }
        } catch (e) {
          parsedAddr.streetLane = customerUser.address;
        }
      }
      setFlatHouse(parsedAddr.flatHouse);
      setStreetLane(parsedAddr.streetLane);
      setLandmark(parsedAddr.landmark);
      setState(parsedAddr.state);
    }, [customerUser]);

    useEffect(() => {
      if (activeTab === 'orders') {
        const fetchOrders = async () => {
          setOrdersLoading(true);
          setTabError('');
          try {
            const token = localStorage.getItem('customer_token');
            const res = await fetch(`${API_BASE_URL}/auth/orders`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
              }
            });
            const data = await res.json();
            if (data.success) {
              setOrders(data.data);
            } else {
              setTabError(data.message || 'Failed to fetch orders.');
            }
          } catch (err) {
            setTabError('Error connecting to server.');
          } finally {
            setOrdersLoading(false);
          }
        };
        fetchOrders();
      }
    }, [activeTab]);

    const handleUpdateProfile = async (e) => {
      e.preventDefault();
      setSaving(true);
      setSuccessMsg('');
      setTabError('');
      try {
        const token = localStorage.getItem('customer_token');
        const res = await fetch(`${API_BASE_URL}/auth/profile`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            phone,
            password: password || undefined,
            address: JSON.stringify({
              flat_house: flatHouse,
              street_lane: streetLane,
              landmark,
              state
            }),
            city,
            pincode
          })
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg('Profile updated successfully!');
          localStorage.setItem('customer_user', JSON.stringify(data.data));
          setCustomerUser(data.data);
          setPassword('');
        } else {
          setTabError(data.message || 'Failed to update profile.');
        }
      } catch (err) {
        setTabError('Error connecting to server.');
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="container reveal-on-scroll" style={{ minHeight: '80vh', padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Left Column: Sidebar / Navigation */}
          <div style={{ flex: '1 1 280px', background: '#fff', borderRadius: 16, padding: '30px', boxShadow: '0 8px 30px rgba(122,10,10,0.06)', height: 'fit-content', border: '1px solid #f0e6d6' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-ruby),var(--primary-ruby-light))', color: '#fff', fontSize: '2.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                {customerUser.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--primary-ruby)', margin: '0 0 4px 0' }}>{customerUser.name}</h3>
              <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>{customerUser.email}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => { setActiveTab('profile'); setSuccessMsg(''); setTabError(''); }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  background: activeTab === 'profile' ? 'var(--primary-ruby)' : 'transparent',
                  color: activeTab === 'profile' ? '#fff' : 'var(--text-color)',
                  transition: 'all 0.2s'
                }}
              >
                Profile Details
              </button>
              
              <button 
                onClick={() => { setActiveTab('address'); setSuccessMsg(''); setTabError(''); }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  background: activeTab === 'address' ? 'var(--primary-ruby)' : 'transparent',
                  color: activeTab === 'address' ? '#fff' : 'var(--text-color)',
                  transition: 'all 0.2s'
                }}
              >
                Saved Address
              </button>

              <button 
                onClick={() => { setActiveTab('orders'); setSuccessMsg(''); setTabError(''); }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  background: activeTab === 'orders' ? 'var(--primary-ruby)' : 'transparent',
                  color: activeTab === 'orders' ? '#fff' : 'var(--text-color)',
                  transition: 'all 0.2s'
                }}
              >
                Order History
              </button>

              <hr style={{ border: 'none', borderTop: '1px solid #f0e6d6', margin: '15px 0' }} />

              <button 
                onClick={onLogout}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #f5c6c6',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  background: '#fde8e8',
                  color: '#7a0a0a',
                  transition: 'all 0.2s'
                }}
              >
                Sign Out
              </button>

              <button 
                onClick={onBack}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e0d5c5',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  background: 'none',
                  color: 'var(--primary-ruby)',
                  transition: 'all 0.2s'
                }}
              >
                Back to Shop
              </button>
            </div>
          </div>

          {/* Right Column: Active Tab Content */}
          <div style={{ flex: '1 1 500px', background: '#fff', borderRadius: 16, padding: '40px', boxShadow: '0 8px 30px rgba(122,10,10,0.06)', border: '1px solid #f0e6d6' }}>
            {successMsg && (
              <div style={{ background: '#eafaf1', border: '1px solid #c3e6cb', borderRadius: 8, padding: '12px 16px', color: '#155724', fontSize: '0.9rem', marginBottom: '20px', fontWeight: 600 }}>
                {successMsg}
              </div>
            )}
            {tabError && (
              <div style={{ background: '#fde8e8', border: '1px solid #f5c6c6', borderRadius: 8, padding: '12px 16px', color: '#7a0a0a', fontSize: '0.9rem', marginBottom: '20px', fontWeight: 600 }}>
                {tabError}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-ruby)', marginBottom: '25px', marginTop: 0 }}>Profile Details</h2>
                <form onSubmit={handleUpdateProfile}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>Full Name</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>Email Address</label>
                    <input type="email" disabled value={customerUser.email} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #f0e6d6', background: '#faf8f5', color: '#888', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box', cursor: 'not-allowed' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>Phone Number</label>
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>New Password (Leave blank to keep current)</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box' }} />
                  </div>
                  <button type="submit" disabled={saving} style={{ padding: '14px 28px', background: 'var(--primary-ruby)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                    {saving ? 'Saving changes...' : 'Save Profile Details'}
                  </button>
                </form>
              </div>
            )}

            {/* ADDRESS TAB */}
            {activeTab === 'address' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-ruby)', marginBottom: '25px', marginTop: 0 }}>Saved Address</h2>
                <form onSubmit={handleUpdateProfile}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>Flat, House No., Building, Apartment *</label>
                    <input type="text" required value={flatHouse} onChange={e => setFlatHouse(e.target.value)} placeholder="e.g. Flat 302, Royal Palms" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>Street Address, Lane, Area *</label>
                    <input type="text" required value={streetLane} onChange={e => setStreetLane(e.target.value)} placeholder="e.g. Lane 4, Vaishali Nagar" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>Landmark (Optional)</label>
                    <input type="text" value={landmark} onChange={e => setLandmark(e.target.value)} placeholder="e.g. Near Hanuman Temple" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px', width: '100%', marginBottom: '30px' }}>
                    <div style={{ marginBottom: 0 }}>
                      <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>City *</label>
                      <input type="text" required value={city} onChange={e => setCity(e.target.value)} placeholder="City" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: 0 }}>
                      <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>State *</label>
                      <select required value={state} onChange={e => setState(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box', background: '#fff', cursor: 'pointer', height: '46px' }}>
                        <option value="">Select State</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom: 0 }}>
                      <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: '6px' }}>Pincode *</label>
                      <input type="text" required value={pincode} onChange={e => setPincode(e.target.value)} placeholder="6-digit Pincode" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  
                  <button type="submit" disabled={saving} style={{ padding: '14px 28px', background: 'var(--primary-ruby)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                    {saving ? 'Saving address...' : 'Save Shipping Address'}
                  </button>
                </form>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-ruby)', marginBottom: '25px', marginTop: 0 }}>Order History</h2>
                
                {ordersLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--primary-ruby)', fontWeight: 600 }}>
                    Loading your orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>You haven't placed any orders yet.</p>
                    <button className="btn-solid-gold" onClick={onBack}>Shop Now</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => (
                      <div key={order.id} style={{ border: '1px solid #f0e6d6', borderRadius: 12, padding: '20px', background: '#faf8f5' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', borderBottom: '1px dashed #e0d5c5', paddingBottom: '12px', marginBottom: '12px' }}>
                          <div>
                            <span style={{ fontWeight: 700, color: 'var(--primary-ruby)' }}>Order #{order.order_number}</span>
                            <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '2px' }}>
                              Placed on: {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          </div>
                          <span className={`status-badge ${order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'warning' : 'info'}`} style={{ alignSelf: 'center', textTransform: 'capitalize' }}>
                            {order.status}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                          {order.items?.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                              <span>{item.product_name} <span style={{ color: '#888' }}>x {item.quantity} (Size: {item.size || 'M'})</span></span>
                              <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0e6d6', paddingTop: '12px', fontSize: '0.95rem', flexWrap: 'wrap', gap: '10px' }}>
                          <span style={{ color: '#666', fontSize: '0.85rem' }}>Shipping details: {order.shipping_address}, {order.city} - {order.pincode}</span>
                          <span style={{ fontWeight: 800, color: 'var(--primary-ruby)' }}>Total: ₹{order.total_amount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  // ── Forgot Password view ──────────────────────────────
  if (mode === 'forgot') {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', maxWidth: 440, width: '100%', boxShadow: '0 12px 48px rgba(122,10,10,0.10)' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#7a0a0a,#c0392b)', color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              {fpStep === 1 ? '🔑' : '✉️'}
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-ruby)', margin: 0 }}>
              {fpStep === 1 ? 'Forgot Password?' : 'Enter Your OTP'}
            </h2>
            <p style={{ color: '#888', fontSize: '0.88rem', marginTop: 6 }}>
              {fpStep === 1
                ? 'Enter your email and we\'ll send a 6-digit OTP'
                : `OTP sent to ${fpEmail}. Check your inbox.`
              }
            </p>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#7a0a0a', color: '#fff', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
            <div style={{ height: 2, width: 40, background: fpStep >= 2 ? '#7a0a0a' : '#e0d5c5', transition: 'background 0.3s' }} />
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: fpStep >= 2 ? '#7a0a0a' : '#e0d5c5', color: fpStep >= 2 ? '#fff' : '#aaa', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>2</div>
          </div>

          {/* Messages */}
          {fpError && (
            <div style={{ background: '#fde8e8', border: '1px solid #f5c6c6', borderRadius: 8, padding: '12px 16px', color: '#7a0a0a', fontSize: '0.88rem', marginBottom: 20, textAlign: 'center' }}>
              {fpError}
            </div>
          )}
          {fpSuccess && (
            <div style={{ background: '#eafaf1', border: '1px solid #c3e6cb', borderRadius: 8, padding: '12px 16px', color: '#155724', fontSize: '0.88rem', marginBottom: 20, textAlign: 'center', fontWeight: 600 }}>
              ✓ {fpSuccess}
            </div>
          )}

          {/* Step 1: Email */}
          {fpStep === 1 && (
            <form onSubmit={onForgotSend}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: 6 }}>Email Address</label>
                <input
                  type="email" required placeholder="you@example.com"
                  value={fpEmail} onChange={e => setFpEmail(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" disabled={fpLoading} style={{ width: '100%', padding: '14px', background: fpLoading ? '#c0a080' : 'linear-gradient(135deg,#7a0a0a,#c0392b)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: fpLoading ? 'not-allowed' : 'pointer', marginBottom: 14 }}>
                {fpLoading ? 'Sending OTP...' : 'Send OTP to Email'}
              </button>
              <button type="button" onClick={() => { setMode('login'); setFpError(''); setFpSuccess(''); }} style={{ width: '100%', padding: '12px', background: 'none', border: '1.5px solid #e0d5c5', borderRadius: 10, color: '#7a0a0a', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>
                ← Back to Sign In
              </button>
            </form>
          )}

          {/* Step 2: OTP + New Password */}
          {fpStep === 2 && (
            <form onSubmit={onForgotReset}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: 6 }}>6-Digit OTP</label>
                <input
                  type="text" required maxLength={6} placeholder="Enter OTP from email"
                  value={fpOtp} onChange={e => setFpOtp(e.target.value.replace(/\D/g, '').slice(0,6))}
                  style={{ width: '100%', padding: '14px', border: '2px solid #7a0a0a', borderRadius: 10, fontSize: '1.4rem', fontWeight: 700, letterSpacing: '10px', textAlign: 'center', outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace', color: '#7a0a0a' }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: 6 }}>New Password</label>
                <input
                  type="password" required placeholder="Min 6 characters"
                  value={fpNewPass} onChange={e => setFpNewPass(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: 6 }}>Confirm New Password</label>
                <input
                  type="password" required placeholder="Repeat new password"
                  value={fpConfirmPass} onChange={e => setFpConfirmPass(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" disabled={fpLoading || fpOtp.length < 6} style={{ width: '100%', padding: '14px', background: (fpLoading || fpOtp.length < 6) ? '#c0a080' : 'linear-gradient(135deg,#7a0a0a,#c0392b)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: (fpLoading || fpOtp.length < 6) ? 'not-allowed' : 'pointer', marginBottom: 14 }}>
                {fpLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
              <button type="button" onClick={() => { setFpStep(1); setFpError(''); setFpSuccess(''); }} style={{ width: '100%', padding: '12px', background: 'none', border: '1.5px solid #e0d5c5', borderRadius: 10, color: '#7a0a0a', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>
                ← Change Email
              </button>
            </form>
          )}

          {/* Resend OTP hint */}
          {fpStep === 2 && (
            <p style={{ textAlign: 'center', color: '#999', fontSize: '0.82rem', marginTop: 16 }}>
              Didn't receive? Check spam or{' '}
              <button type="button" onClick={() => { setFpStep(1); setFpError(''); setFpSuccess(''); }} style={{ background: 'none', border: 'none', color: '#7a0a0a', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem', padding: 0 }}>try again</button>
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── Login / Register view ─────────────────────────────
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', maxWidth: 440, width: '100%', boxShadow: '0 12px 48px rgba(122,10,10,0.10)' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="brand-logo-unit" style={{ margin: '0 auto 16px', justifyContent: 'center' }}>
            <img src="/images/ICON-01.png" alt="MaaDrobe" className="brand-logo-icon" style={{ height: '46px' }} />
            <img src="/only word-01.webp" alt="MAA DROBE" className="brand-logo-text" style={{ height: '32px' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#222', margin: 0 }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: '#888', fontSize: '0.88rem', marginTop: 6 }}>
            {mode === 'login' ? 'Sign in to your account' : 'Join our family'}
          </p>
        </div>

        {/* Tab toggle */}
        <div style={{ display: 'flex', background: '#f5f0e8', borderRadius: 10, padding: 4, marginBottom: 28 }}>
          <button onClick={() => { setMode('login'); }} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.92rem', background: mode === 'login' ? '#7a0a0a' : 'transparent', color: mode === 'login' ? '#fff' : '#7a0a0a', transition: 'all 0.2s' }}>
            Sign In
          </button>
          <button onClick={() => { setMode('register'); }} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.92rem', background: mode === 'register' ? '#7a0a0a' : 'transparent', color: mode === 'register' ? '#fff' : '#7a0a0a', transition: 'all 0.2s' }}>
            Register
          </button>
        </div>

        {error && (
          <div style={{ background: '#fde8e8', border: '1px solid #f5c6c6', borderRadius: 8, padding: '12px 16px', color: '#7a0a0a', fontSize: '0.88rem', marginBottom: 20, textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={mode === 'login' ? onLogin : onRegister}>
          {mode === 'register' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: 6 }}>Full Name</label>
              <input type="text" required placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          )}
          {mode === 'register' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: 6 }}>Phone Number</label>
              <input type="tel" placeholder="10-digit phone number" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: 6 }}>Email Address</label>
            <input type="email" required placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: mode === 'login' ? 8 : 24 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#444', fontSize: '0.88rem', marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} required placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))}
                style={{ width: '100%', padding: '12px 42px 12px 14px', border: '1.5px solid #e0d5c5', borderRadius: 10, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 4 }}>
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* ── Forgot Password Link (login mode only) ── */}
          {mode === 'login' && (
            <div style={{ textAlign: 'right', marginBottom: 20 }}>
              <button
                type="button"
                onClick={() => { setMode('forgot'); setFpError(''); setFpSuccess(''); setFpStep(1); }}
                style={{ background: 'none', border: 'none', color: '#7a0a0a', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#c0a080' : 'linear-gradient(135deg,#7a0a0a,#c0392b)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 14 }}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
          <button type="button" onClick={onBack} style={{ width: '100%', padding: '12px', background: 'none', border: '1.5px solid #e0d5c5', borderRadius: 10, color: '#7a0a0a', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>
            ← Back
          </button>
        </form>
      </div>
    </div>
  );
}
