import { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  Image as ImageIcon, 
  Home, 
  ShoppingCart, 
  Percent, 
  Settings, 
  LogOut, 
  Upload, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Check, 
  Search, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  FileText, 
  Users,
  Palette,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RefreshCw,
  PackageCheck,
  Clock,
  Compass,
  ArrowUp,
  ArrowDown,
  Link as LinkIcon
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const getStorefrontUrl = () => {
  if (import.meta.env.VITE_STOREFRONT_URL) {
    return import.meta.env.VITE_STOREFRONT_URL;
  }
  if (typeof window !== 'undefined') {
    if (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
      return window.location.origin;
    }
  }
  return 'http://localhost:5173';
};

const STOREFRONT_URL = getStorefrontUrl();

// Available fonts similar to Poppins
const FONT_OPTIONS = [
  {
    id: 'Poppins',
    name: 'Poppins',
    tagline: 'Geometric & Balanced Modern Sans',
    sample: 'Handcrafted Chikankari & Festive Kurtis',
    desc: 'Clean circular curves with high legibility and balanced proportions. The classic modern luxury standard.',
    previewHeading: 'The Art of Indian Craftsmanship',
    previewPrice: 'Starting from ₹1,499'
  },
  {
    id: 'Plus Jakarta Sans',
    name: 'Plus Jakarta Sans',
    tagline: 'Contemporary & Sleek Luxury',
    sample: 'Handcrafted Chikankari & Festive Kurtis',
    desc: 'Modern geometric sans-serif tailored for high-end boutique aesthetics. Ultra-crisp character shapes.',
    previewHeading: 'Bespoke Tailoring & Pure Georgette',
    previewPrice: 'Special Edition at ₹2,299'
  },
  {
    id: 'Outfit',
    name: 'Outfit',
    tagline: 'Editorial & Haute-Couture Geometric',
    sample: 'Handcrafted Chikankari & Festive Kurtis',
    desc: 'Bold, expressive geometry designed for modern lifestyle & fashion brands. Rich aesthetic presence.',
    previewHeading: 'Artisanal Elegance in Every Thread',
    previewPrice: 'Designer Collection ₹2,899'
  },
  {
    id: 'Montserrat',
    name: 'Montserrat',
    tagline: 'Architectural & Crisp Designer Sans',
    sample: 'Handcrafted Chikankari & Festive Kurtis',
    desc: 'Iconic urban geometric proportions with commanding title presence and easy-to-read body rhythm.',
    previewHeading: 'Authentic Shadow-Work Silhouettes',
    previewPrice: 'Exclusive Festive Set ₹3,499'
  }
];

/* ==========================================================================
   MS WORD STYLE WYSIWYG RICH TEXT EDITOR COMPONENT
   ========================================================================== */
function WordRichEditor({ value, onChange, placeholder = 'Start typing or paste content here...' }) {
  const editorRef = useRef(null);
  const [showCode, setShowCode] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#222222');
  const [selectedHighlight, setSelectedHighlight] = useState('#fef08a');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  useEffect(() => {
    if (editorRef.current && !showCode) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, showCode]);

  const exec = (command, val = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const applyColor = (color) => {
    setSelectedColor(color);
    exec('foreColor', color);
    setShowColorPicker(false);
  };

  const applyHighlight = (color) => {
    setSelectedHighlight(color);
    exec('hiliteColor', color);
    setShowHighlightPicker(false);
  };

  const applyFontSize = (size) => {
    exec('fontSize', size);
  };

  const applyHeading = (tag) => {
    exec('formatBlock', tag);
  };

  return (
    <div className="ms-word-editor-box" style={{ border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
      {/* MS Word Ribbon Toolbar */}
      <div className="ms-word-toolbar" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '8px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
        
        {/* Paragraph / Heading Styles */}
        <select 
          onChange={(e) => {
            if (e.target.value.startsWith('h') || e.target.value === 'p') {
              applyHeading(e.target.value);
            }
          }}
          defaultValue="p"
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff', cursor: 'pointer' }}
          title="Text Style"
        >
          <option value="p">Normal Text (Paragraph)</option>
          <option value="h1">Heading 1 (Main Title)</option>
          <option value="h2">Heading 2 (Section Title)</option>
          <option value="h3">Heading 3 (Sub-heading)</option>
          <option value="h4">Heading 4 (Minor Title)</option>
        </select>

        {/* Font Size */}
        <select 
          onChange={(e) => applyFontSize(e.target.value)}
          defaultValue="3"
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff', cursor: 'pointer' }}
          title="Font Size"
        >
          <option value="1">10 pt (Small)</option>
          <option value="2">12 pt</option>
          <option value="3">14 pt (Normal)</option>
          <option value="4">18 pt (Medium)</option>
          <option value="5">24 pt (Large)</option>
          <option value="6">32 pt (Huge)</option>
        </select>

        <span style={{ height: '22px', width: '1px', background: '#cbd5e1', margin: '0 2px' }} />

        {/* Bold, Italic, Underline */}
        <button 
          type="button" 
          onClick={() => exec('bold')} 
          style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem', minWidth: '28px' }}
          title="Bold (Ctrl+B)"
        >
          B
        </button>
        <button 
          type="button" 
          onClick={() => exec('italic')} 
          style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontStyle: 'italic', fontWeight: 600, fontSize: '0.85rem', minWidth: '28px' }}
          title="Italic (Ctrl+I)"
        >
          I
        </button>
        <button 
          type="button" 
          onClick={() => exec('underline')} 
          style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600, fontSize: '0.85rem', minWidth: '28px' }}
          title="Underline (Ctrl+U)"
        >
          U
        </button>
        <button 
          type="button" 
          onClick={() => exec('strikeThrough')} 
          style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', textDecoration: 'line-through', fontSize: '0.85rem', minWidth: '28px' }}
          title="Strikethrough"
        >
          S
        </button>

        <span style={{ height: '22px', width: '1px', background: '#cbd5e1', margin: '0 2px' }} />

        {/* Font Color Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            type="button" 
            onClick={() => { setShowColorPicker(!showColorPicker); setShowHighlightPicker(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
            title="Font Color"
          >
            <span style={{ fontWeight: 800, color: selectedColor, borderBottom: `3px solid ${selectedColor}`, paddingBottom: '1px' }}>A</span>
            <span style={{ fontSize: '0.7rem' }}>▼</span>
          </button>
          {showColorPicker && (
            <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '10px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px', width: '170px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Text Color</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                {[
                  '#1f2937', '#701325', '#b8860b', '#1e40af', '#15803d', 
                  '#991b1b', '#d97706', '#0284c7', '#7c3aed', '#4b5563'
                ].map(c => (
                  <button 
                    key={c} 
                    type="button" 
                    onClick={() => applyColor(c)}
                    style={{ width: '22px', height: '22px', borderRadius: '3px', background: c, border: selectedColor === c ? '2px solid #000' : '1px solid #cbd5e1', cursor: 'pointer' }}
                    title={c}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <label style={{ fontSize: '0.75rem', color: '#475569' }}>Custom:</label>
                <input 
                  type="color" 
                  value={selectedColor} 
                  onChange={(e) => applyColor(e.target.value)} 
                  style={{ width: '28px', height: '24px', border: 'none', cursor: 'pointer' }} 
                />
              </div>
            </div>
          )}
        </div>

        {/* Text Highlight Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            type="button" 
            onClick={() => { setShowHighlightPicker(!showHighlightPicker); setShowColorPicker(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
            title="Text Highlight Color"
          >
            <span style={{ background: selectedHighlight, padding: '1px 4px', borderRadius: '2px', fontWeight: 700, fontSize: '0.82rem' }}>ab</span>
            <span style={{ fontSize: '0.7rem' }}>▼</span>
          </button>
          {showHighlightPicker && (
            <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '10px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px', width: '160px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Highlight Color</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {[
                  '#fef08a', '#bbf7d0', '#a5f3fc', '#fed7aa',
                  '#fecdd3', '#e9d5ff', '#e2e8f0', 'transparent'
                ].map(c => (
                  <button 
                    key={c} 
                    type="button" 
                    onClick={() => applyHighlight(c)}
                    style={{ width: '24px', height: '24px', borderRadius: '3px', background: c === 'transparent' ? '#fff' : c, border: '1px solid #cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}
                    title={c === 'transparent' ? 'No Color' : c}
                  >
                    {c === 'transparent' ? '✕' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <span style={{ height: '22px', width: '1px', background: '#cbd5e1', margin: '0 2px' }} />

        {/* Alignment */}
        <button type="button" onClick={() => exec('justifyLeft')} style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }} title="Align Left">
          ☰
        </button>
        <button type="button" onClick={() => exec('justifyCenter')} style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }} title="Align Center">
          ☵
        </button>
        <button type="button" onClick={() => exec('justifyRight')} style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }} title="Align Right">
          ☱
        </button>

        {/* Lists */}
        <button type="button" onClick={() => exec('insertUnorderedList')} style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }} title="Bulleted List">
          • List
        </button>
        <button type="button" onClick={() => exec('insertOrderedList')} style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }} title="Numbered List">
          1. List
        </button>

        {/* Clear formatting */}
        <button type="button" onClick={() => exec('removeFormat')} style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontSize: '0.78rem', color: '#64748b' }} title="Clear Formatting">
          Tx Clear
        </button>

        <span style={{ flex: 1 }} />

        {/* HTML / Visual Toggle */}
        <button 
          type="button" 
          onClick={() => setShowCode(!showCode)} 
          style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #008060', background: showCode ? '#008060' : '#f0fdf4', color: showCode ? '#fff' : '#008060', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer' }}
        >
          {showCode ? 'Visual (MS Word)' : 'HTML Source'}
        </button>
      </div>

      {/* Editor Content Area */}
      {showCode ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={12}
          style={{ width: '100%', padding: '14px', border: 'none', outline: 'none', fontFamily: 'monospace', fontSize: '0.88rem', background: '#1e293b', color: '#e2e8f0', resize: 'vertical', boxSizing: 'border-box' }}
          placeholder="Type or edit raw HTML..."
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          style={{
            minHeight: '280px',
            padding: '16px 20px',
            outline: 'none',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: '#1f2937',
            background: '#ffffff',
            boxSizing: 'border-box'
          }}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default function App() {
  // Auth state
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('admin_user')) || null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // UI state
  // dashboard | orders | products | categories | customers | banners | homepage | coupons | settings | appearance
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');

  // Data states
  const [dashboardStats, setDashboardStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [homepageCms, setHomepageCms] = useState({});
  const [productPickerState, setProductPickerState] = useState({
    isOpen: false,
    targetField: '',
    title: '',
    selectedIds: []
  });
  const [activeSectionTab, setActiveSectionTab] = useState('all');
  const [settings, setSettings] = useState({});
  const [users, setUsers] = useState([]);

  // Footer CMS State
  const DEFAULT_FOOTER_SECTIONS = [
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
      title: 'Help',
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
      title: 'About',
      links: [
        { label: 'About MaaDrobe', url: 'about' },
        { label: 'Our Story', url: 'story' },
        { label: 'Privacy Policy', url: 'privacy' },
        { label: 'Terms & Conditions', url: 'terms' }
      ]
    }
  ];
  const [footerSections, setFooterSections] = useState(DEFAULT_FOOTER_SECTIONS);
  const [savingFooter, setSavingFooter] = useState(false);

  // Dedicated Pages CMS State & Definitions
  const CMS_PAGE_LIST = [
    { id: 'customercare', title: 'Customer Care', key: 'page_customercare', badge: 'Support & Desk' },
    { id: 'returns', title: 'Returns & Exchanges', key: 'page_returns', badge: '7-Day Return Policy' },
    { id: 'shipping', title: 'Shipping Policy', key: 'page_shipping', badge: 'Dispatch & Delivery' },
    { id: 'sizeguide', title: 'Size Guide Notes', key: 'page_sizeguide', badge: 'Fit & Alterations' },
    { id: 'faq', title: 'FAQs', key: 'page_faq', badge: 'Frequently Asked Questions', isFaq: true },
    { id: 'about', title: 'About MaaDrobe', key: 'page_about', badge: 'Heritage & Craft' },
    { id: 'story', title: 'Our Story', key: 'page_story', badge: 'Artisanal Journey' },
    { id: 'privacy', title: 'Privacy Policy', key: 'page_privacy', badge: 'Data & Security' },
    { id: 'terms', title: 'Terms & Conditions', key: 'page_terms', badge: 'Legal & Guidelines' }
  ];

  const DEFAULT_PAGE_TEMPLATES = {
    page_customercare: `Customer Care & Concierge
Hours: Monday to Saturday, 10:00 AM – 7:00 PM IST
Email: care@maadrobe.com
WhatsApp Helpline: +91 98765 43210

At MaaDrobe, every customer is an integral part of our artisanal family. Whether you require sizing guidance, outfit styling recommendations, bespoke alteration consultations, or real-time order tracking, our concierge desk is at your service.

Response Time Promise:
- WhatsApp Concierge: Instant reply within business hours (10 AM - 7 PM).
- Email Queries: Resolved within 4 business hours.
- Alteration & Custom Sizing Requests: Acknowledged within 2 hours by our master pattern makers.`,

    page_returns: `7-Day Return & Exchange Policy

We take utmost pride in the handcrafted quality of our pure cotton and artisanal embroidery. If you are not completely satisfied with your purchase, we offer a hassle-free 7-day return and exchange window.

Return Conditions:
- The garment must be unused, unwashed, and in its original condition with all tags and artisanal packaging intact.
- Reverse pickup is arranged directly from your doorstep across 19,000+ pin codes.
- Size exchanges are completely free of charge.
- Refunds are processed to the original payment source within 3-5 business days upon receipt and quality check.`,

    page_shipping: `Shipping & Delivery Policy

Dispatch Timeline:
- Ready-to-wear orders are dispatched within 24 to 48 hours of order confirmation.
- Made-to-measure / custom-altered outfits are handcrafted and dispatched within 3 to 5 working days.

Delivery Timeframes:
- Metro Cities (Delhi NCR, Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad): 2 to 4 business days.
- Rest of India: 4 to 6 business days.
- Express Priority Shipping: Available on special request via WhatsApp concierge.

Courier Partners:
All shipments are handled by premier logistics services including Delhivery, BlueDart, and DTDC with real-time SMS/WhatsApp tracking.`,

    page_sizeguide: `Size & Fit Guidelines

- All MaaDrobe garments follow standard Indian sizing with comfortable ease.
- For relaxed straight-cut kurtis, we recommend choosing your exact bust measurement size.
- For flared anarkalis and tiered dresses, the chest and waist measurements are the primary fit points.
- If you fall between two sizes, we recommend sizing up for a relaxed luxury silhouette, or messaging our WhatsApp concierge for complimentary custom pattern adjustments.`,

    page_about: `About MaaDrobe

MaaDrobe is a tribute to generational Indian textile artistry, modern silhouette tailoring, and pure, breathable luxury.

Founded on the principle of conscious craftsmanship, MaaDrobe bridges centuries-old handcrafting traditions — from the delicate shadow stitches of Lucknowi Chikankari to the artisanal block prints of Sanganer and the rich weaves of Banaras — with contemporary silhouettes designed for the modern woman.

Every garment tells a story of cultural reverence, handcrafted dedication, and effortless elegance.`,

    page_story: `The MaaDrobe Story - Handcrafted With Soul

Born from a reverence for generational Indian handcraft and a modern vision for graceful everyday silhouettes.

Where Tradition Meets Modern Grace:
MaaDrobe began with a simple observation: modern women cherish the delicate romance of authentic Indian handlooms, but struggle with heavy, uncomfortable fabrics and generic fast-fashion fits.

We set out on a journey through the artisanal heartlands of India — from the historic shadow-work embroidery clusters of Lucknow to the handblock printers of Sanganer and the master silk weavers of Varanasi. Our mission was to bring centuries-old heritage techniques into breathable, pure organic fabrics tailored for the modern rhythm of life.

The Hands Behind the Stitches:
Every MaaDrobe kurti, dress, and co-ord set is handcrafted by rural women artisans and master weavers. By supporting self-help artisan clusters, we help ensure fair, dignified wages and keep invaluable handicraft traditions alive in a world dominated by mass factory production.`,

    page_privacy: `Privacy Policy & Data Security

At MaaDrobe, we value the trust you place in us when sharing your personal information.

Information We Collect:
- Contact details (Name, delivery address, phone/WhatsApp number, email).
- Transaction details (We never store payment card credentials; all payments are processed through secure 256-bit SSL encrypted RBI-authorized gateways).
- Sizing preferences and order customization notes.

Use of Information:
- Order fulfillment and delivery tracking alerts.
- Dedicated customer support communication.
- Continuous improvement of your shopping experience.

We never sell or distribute your personal information to third parties.`,

    page_terms: `Terms & Conditions of Service

1. Handcrafted Authenticity:
Each MaaDrobe garment is hand-woven, dyed, and embroidered by master artisans. Minor variations in motif alignment, thread shades, or weave slubs are natural hallmarks of handcrafted artisanal textiles and are not considered defects.

2. Pricing & Orders:
All prices listed on MaaDrobe are in Indian Rupees (INR) and are inclusive of applicable GST. We reserve the right to correct any typographical pricing errors.

3. Cancellations:
Orders can be cancelled within 12 hours of placement before dispatch by contacting our customer care desk. Custom-tailored or altered orders cannot be cancelled once cutting begins.`
  };

  const DEFAULT_FAQS_LIST = [
    { q: "What fabrics does MaaDrobe use in its collection?", a: "We prioritize 100% pure organic fabrics: handloom cottons, breathable georgettes, and artisanal Banarasi brocades. Every piece is hypoallergenic and tested for all-day comfort.", category: "fabrics" },
    { q: "How long does shipping take across India?", a: "Standard dispatch happens within 24 to 48 hours. Metro cities receive orders in 2-4 business days, while other areas take 4-6 business days. Express shipping is also available on request.", category: "orders" },
    { q: "Can I customize the length or sleeve of an outfit?", a: "Yes! We offer complimentary custom tailoring adjustments. Simply click 'Custom Adjustments' on WhatsApp or leave a note at checkout with your measurements.", category: "sizing" },
    { q: "What is your return and exchange policy?", a: "We provide a 7-day hassle-free return and exchange window. If an item doesn't fit, we offer free doorstep reverse pickup and replace it with your preferred size.", category: "returns" },
    { q: "How do I care for Chikankari and handcrafted embroidery?", a: "We recommend gentle hand washing in cold water with mild detergent or eco dry cleaning for silk and georgette Chikankari garments. Always dry in shade.", category: "fabrics" },
    { q: "What payment methods do you accept?", a: "We accept all major UPI apps (Google Pay, PhonePe, Paytm), Credit/Debit cards, Net Banking, and direct WhatsApp order confirmation.", category: "payments" },
    { q: "How can I track my order status?", a: "You can track your order at any time using our dedicated 'Track Order' page with your Order Number (e.g. MAA-1082) and phone number.", category: "orders" },
    { q: "Are your garments authentic artisan crafts?", a: "Yes. Our embroidery is created by certified artisan clusters in Lucknow and Rajasthan, sustaining generational handcrafting techniques.", category: "fabrics" }
  ];

  const [selectedCmsPage, setSelectedCmsPage] = useState('customercare');
  const [savingPages, setSavingPages] = useState(false);

  // Appearance & Font state
  const [selectedFont, setSelectedFont] = useState('Poppins');
  const [fontSandboxText, setFontSandboxText] = useState('Experience authentic Indian clothing with elegant designs.');
  const [savingFont, setSavingFont] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Modals / Edit states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // add_product | edit_product | add_category | edit_category | add_banner | edit_banner | add_coupon | edit_coupon | view_order
  const [activeItem, setActiveItem] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Helper Headers for APIs
  const getHeaders = () => ({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Sync font to document root
  useEffect(() => {
    const font = settings.site_font || selectedFont || 'Poppins';
    document.documentElement.style.setProperty('--font-family-current', font);
  }, [selectedFont, settings.site_font]);

  // Handle Logins
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE_URL}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.data.user));
        setToken(data.data.token);
        setUser(data.data.user);
        setLoginEmail('');
        setLoginPassword('');
        showToast('Signed in successfully as Administrator');
      } else {
        setLoginError(data.message || 'Login failed. Invalid credentials.');
      }
    } catch (err) {
      setLoginError('Server error occurred. Please verify backend is active.');
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getHeaders()
      });
    } catch (err) {
      // Clear token locally
    }
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setToken('');
    setUser(null);
    setCurrentTab('dashboard');
  };

  // Load Tab Specific Data
  useEffect(() => {
    if (!token) return;

    // Always fetch settings on start to get site font
    fetchSettings();

    if (currentTab === 'dashboard') {
      fetchDashboardStats();
      fetchOrders();
    } else if (currentTab === 'products') {
      fetchProducts();
      fetchCategories();
    } else if (currentTab === 'categories') {
      fetchCategories();
    } else if (currentTab === 'banners') {
      fetchBanners();
    } else if (currentTab === 'orders') {
      fetchOrders();
    } else if (currentTab === 'coupons') {
      fetchCoupons();
    } else if (currentTab === 'homepage') {
      fetchHomepageCms();
    } else if (currentTab === 'footer' || currentTab === 'pages') {
      fetchSettings();
    } else if (currentTab === 'settings') {
      fetchSettings();
    } else if (currentTab === 'appearance') {
      fetchSettings();
    } else if (currentTab === 'customers') {
      fetchUsers();
    }
  }, [currentTab, token]);

  // Sync settings site_font to selectedFont
  useEffect(() => {
    if (settings.site_font) {
      setSelectedFont(settings.site_font);
    }
  }, [settings.site_font]);

  // API Fetches
  const fetchDashboardStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/dashboard`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setDashboardStats(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/products`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/categories`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchBanners = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/banners`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setBanners(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/orders`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/coupons`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setCoupons(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchHomepageCms = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/homepage`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setHomepageCms(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
        if (data.data.site_font) {
          setSelectedFont(data.data.site_font);
        }
        if (data.data.footer_sections_json) {
          try {
            const parsed = typeof data.data.footer_sections_json === 'string'
              ? JSON.parse(data.data.footer_sections_json)
              : data.data.footer_sections_json;
            if (Array.isArray(parsed) && parsed.length > 0) {
              setFooterSections(parsed);
            }
          } catch (e) {
            console.error("Error parsing footer_sections_json:", e);
          }
        }
      }
    } catch (err) { console.error(err); }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (err) { console.error(err); }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this registered customer?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, { method: 'DELETE', headers: getHeaders() });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        showToast('Customer account removed successfully.');
      } else {
        alert(data.message || 'Failed to delete customer.');
      }
    } catch (err) { alert('Error deleting customer.'); }
  };

  // Direct Device File Upload Handler
  const handleFileUpload = async (e, onUploadSuccess) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/media/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        onUploadSuccess(data.data.path);
        showToast('Media uploaded to server successfully.');
      } else {
        alert(data.message || 'File upload failed');
      }
    } catch (err) {
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  // Form Submissions / Delete Helpers
  const handleSaveProduct = async (formData) => {
    const isEdit = modalType === 'edit_product';
    const url = isEdit 
      ? `${API_BASE_URL}/admin/products/${activeItem.id}` 
      : `${API_BASE_URL}/admin/products`;

    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: getHeaders(),
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        closeModal();
        showToast(isEdit ? 'Product updated successfully.' : 'Product created successfully.');
      } else {
        const errorMsg = data.errors ? Object.values(data.errors).flat().join('\n') : (data.message || 'Error saving product');
        showToast(errorMsg, 'error');
      }
    } catch (err) {
      showToast(err.message || 'Network error saving product', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this product?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        showToast('Product removed from catalog.');
      } else {
        showToast(data.message || 'Failed to delete product', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Error deleting product', 'error');
    }
  };

  const handleSaveCategory = async (formData) => {
    const isEdit = modalType === 'edit_category';
    const url = isEdit 
      ? `${API_BASE_URL}/admin/categories/${activeItem.id}` 
      : `${API_BASE_URL}/admin/categories`;

    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: getHeaders(),
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        fetchCategories();
        closeModal();
        showToast(isEdit ? 'Category updated successfully.' : 'Category created successfully.');
      } else {
        const errorMsg = data.errors ? Object.values(data.errors).flat().join('\n') : (data.message || 'Error saving category');
        showToast(errorMsg, 'error');
      }
    } catch (err) {
      showToast(err.message || 'Network error saving category', 'error');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const data = await res.json();
      if (data.success) {
        fetchCategories();
        showToast('Category deleted.');
      } else {
        showToast(data.message || 'Failed to delete category', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Error deleting category', 'error');
    }
  };

  const handleSaveBanner = async (formData) => {
    const isEdit = modalType === 'edit_banner';
    const url = isEdit 
      ? `${API_BASE_URL}/admin/banners/${activeItem.id}` 
      : `${API_BASE_URL}/admin/banners`;

    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: getHeaders(),
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        fetchBanners();
        closeModal();
        showToast(isEdit ? 'Banner updated.' : 'Hero banner created successfully.');
      } else {
        const errorMsg = data.errors ? Object.values(data.errors).flat().join('\n') : (data.message || 'Error saving banner');
        showToast(errorMsg, 'error');
      }
    } catch (err) {
      showToast(err.message || 'Network error saving banner', 'error');
    }
  };

  const handleDeleteBanner = async (id) => {
    if (!confirm('Are you sure you want to delete this hero banner?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/banners/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const data = await res.json();
      if (data.success) {
        fetchBanners();
        showToast('Hero banner deleted.');
      } else {
        showToast(data.message || 'Failed to delete banner', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Error deleting banner', 'error');
    }
  };

  const handleSaveCoupon = async (formData) => {
    const isEdit = modalType === 'edit_coupon';
    const url = isEdit 
      ? `${API_BASE_URL}/admin/coupons/${activeItem.id}` 
      : `${API_BASE_URL}/admin/coupons`;

    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: getHeaders(),
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        fetchCoupons();
        closeModal();
        showToast(isEdit ? 'Coupon code updated.' : 'Coupon code created.');
      } else {
        const errorMsg = data.errors ? Object.values(data.errors).flat().join('\n') : (data.message || 'Error saving coupon');
        showToast(errorMsg, 'error');
      }
    } catch (err) {
      showToast(err.message || 'Network error saving coupon', 'error');
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/coupons/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const data = await res.json();
      if (data.success) {
        fetchCoupons();
        showToast('Coupon code deleted.');
      } else {
        showToast(data.message || 'Failed to delete coupon', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Error deleting coupon', 'error');
    }
  };

  const handleSaveHomepageCms = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/admin/homepage`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ cms: homepageCms })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Homepage sections updated successfully.');
      } else {
        showToast(data.message || 'Error updating homepage sections', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update homepage sections', 'error');
    }
  };

  // Product Picker Helpers for Homepage Sections
  const openProductPicker = (targetField, title, currentJsonStr) => {
    let currentIds = [];
    try {
      if (currentJsonStr) {
        currentIds = JSON.parse(currentJsonStr);
        if (!Array.isArray(currentIds)) currentIds = [];
      }
    } catch (e) {
      currentIds = [];
    }
    setProductPickerState({
      isOpen: true,
      targetField,
      title,
      selectedIds: currentIds.map(String)
    });
  };

  const handleConfirmProductPicker = (newIds) => {
    setHomepageCms(prev => ({
      ...prev,
      [productPickerState.targetField]: JSON.stringify(newIds)
    }));
    setProductPickerState(prev => ({ ...prev, isOpen: false }));
    showToast(`${newIds.length} products selected for section.`);
  };

  const handleRemoveProductFromSection = (targetField, removeId) => {
    let currentIds = [];
    try {
      currentIds = JSON.parse(homepageCms[targetField] || '[]');
      if (!Array.isArray(currentIds)) currentIds = [];
    } catch (e) {
      currentIds = [];
    }
    const updated = currentIds.filter(id => String(id) !== String(removeId));
    setHomepageCms(prev => ({
      ...prev,
      [targetField]: JSON.stringify(updated)
    }));
  };

  // Footer Navigation CMS Handlers
  const handleAddFooterColumn = () => {
    const newColId = 'col_' + Date.now();
    setFooterSections(prev => [
      ...prev,
      {
        id: newColId,
        title: 'New Column',
        links: [
          { label: 'Shop All', url: 'shop' }
        ]
      }
    ]);
  };

  const handleDeleteFooterColumn = (colId) => {
    if (!confirm('Are you sure you want to delete this footer column and all its links?')) return;
    setFooterSections(prev => prev.filter(c => c.id !== colId));
  };

  const handleUpdateColumnTitle = (colId, newTitle) => {
    setFooterSections(prev => prev.map(c => c.id === colId ? { ...c, title: newTitle } : c));
  };

  const handleAddFooterLink = (colId) => {
    setFooterSections(prev => prev.map(c => {
      if (c.id === colId) {
        return {
          ...c,
          links: [...(c.links || []), { label: 'New Link', url: 'kurti' }]
        };
      }
      return c;
    }));
  };

  const handleUpdateFooterLink = (colId, linkIdx, field, val) => {
    setFooterSections(prev => prev.map(c => {
      if (c.id === colId) {
        const newLinks = [...(c.links || [])];
        newLinks[linkIdx] = { ...newLinks[linkIdx], [field]: val };
        return { ...c, links: newLinks };
      }
      return c;
    }));
  };

  const handleDeleteFooterLink = (colId, linkIdx) => {
    setFooterSections(prev => prev.map(c => {
      if (c.id === colId) {
        return {
          ...c,
          links: c.links.filter((_, idx) => idx !== linkIdx)
        };
      }
      return c;
    }));
  };

  const handleMoveFooterLink = (colId, linkIdx, direction) => {
    setFooterSections(prev => prev.map(c => {
      if (c.id === colId) {
        const newLinks = [...c.links];
        const targetIdx = direction === 'up' ? linkIdx - 1 : linkIdx + 1;
        if (targetIdx < 0 || targetIdx >= newLinks.length) return c;
        const temp = newLinks[linkIdx];
        newLinks[linkIdx] = newLinks[targetIdx];
        newLinks[targetIdx] = temp;
        return { ...c, links: newLinks };
      }
      return c;
    }));
  };

  const handleSaveFooter = async () => {
    setSavingFooter(true);
    try {
      const updatedSettings = {
        ...settings,
        footer_sections_json: JSON.stringify(footerSections)
      };
      const res = await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ settings: updatedSettings })
      });
      const data = await res.json();
      if (data.success) {
        setSettings(updatedSettings);
        showToast('Footer navigation updated successfully!');
      } else {
        const msg = data.errors ? Object.values(data.errors).flat().join(' ') : (data.message || 'Error saving footer');
        showToast(msg, 'error');
      }
    } catch (err) {
      showToast(err.message || 'Failed to save footer navigation', 'error');
    } finally {
      setSavingFooter(false);
    }
  };

  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ settings: settings })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Store settings saved successfully.');
      } else {
        showToast(data.message || 'Error saving settings', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Failed to save settings', 'error');
    }
  };

  const handleSaveCmsPages = async () => {
    setSavingPages(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ settings: settings })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Page content saved successfully! Storefront updated.');
      } else {
        showToast(data.message || 'Error saving page content', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Failed to save page content', 'error');
    } finally {
      setSavingPages(false);
    }
  };

  const getFaqsList = () => {
    if (!settings.page_faq) return DEFAULT_FAQS_LIST;
    try {
      const parsed = typeof settings.page_faq === 'string' ? JSON.parse(settings.page_faq) : settings.page_faq;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      // fallback
    }
    return DEFAULT_FAQS_LIST;
  };

  const handleUpdateFaq = (index, field, value) => {
    const list = [...getFaqsList()];
    list[index] = { ...list[index], [field]: value };
    setSettings(prev => ({ ...prev, page_faq: JSON.stringify(list) }));
  };

  const handleAddFaq = () => {
    const list = [...getFaqsList(), { q: 'New Question?', a: 'Answer goes here...', category: 'orders' }];
    setSettings(prev => ({ ...prev, page_faq: JSON.stringify(list) }));
  };

  const handleDeleteFaq = (index) => {
    const list = getFaqsList().filter((_, i) => i !== index);
    setSettings(prev => ({ ...prev, page_faq: JSON.stringify(list) }));
  };

  const handleMoveFaq = (index, direction) => {
    const list = [...getFaqsList()];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    setSettings(prev => ({ ...prev, page_faq: JSON.stringify(list) }));
  };

  // Save Font Setting Specifically
  const handleApplyFont = async (fontName) => {
    setSelectedFont(fontName);
    setSavingFont(true);
    try {
      const updatedSettings = { ...settings, site_font: fontName };
      const res = await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ settings: updatedSettings })
      });
      const data = await res.json();
      if (data.success) {
        setSettings(updatedSettings);
        showToast(`Store typography updated to ${fontName}! Whole website updated.`);
      } else {
        showToast(`Font set to ${fontName} locally.`, 'success');
      }
    } catch (err) {
      showToast(`Font set to ${fontName} locally.`, 'success');
    } finally {
      setSavingFont(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, statusVal, paymentStatusVal) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status: statusVal, payment_status: paymentStatusVal })
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
        fetchDashboardStats();
        closeModal();
        showToast(`Order #${activeItem?.order_number || orderId} status updated to ${statusVal}.`);
      } else {
        showToast(data.message || 'Error updating order status', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update order status', 'error');
    }
  };

  // Modal Openers
  const openModal = (type, item = null) => {
    setModalType(type);
    setActiveItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setActiveItem(null);
  };

  // Asset URL Formatter
  const formatAssetUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/images/')) return path;
    if (path.startsWith('storage/')) return `${API_BASE_URL.replace('/api/v1', '')}/${path}`;
    return `${API_BASE_URL.replace('/api/v1', '')}/${path.replace(/^\//, '')}`;
  };

  // Pending orders count for badge
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'ALL' || String(p.category_id) === String(filterCategory);
    return matchesSearch && matchesCategory;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = filterStatus === 'ALL' || o.status === filterStatus;
    const matchesSearch = o.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (o.customer_phone && o.customer_phone.includes(searchTerm));
    return matchesStatus && matchesSearch;
  });

  // Render Login Screen if not authenticated
  if (!token) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="brand-logo-unit" style={{ margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <img src="/images/ICON-01.png" alt="MaaDrobe" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
            <img src="/only word-01.webp" alt="MAA DROBE" style={{ height: '36px', width: 'auto', objectFit: 'contain', marginLeft: '-15px' }} />
          </div>
          <h2 className="login-title" style={{ fontSize: '1.25rem' }}>Store Administration</h2>
          <p className="login-subtitle">Luxury Store Management Portal</p>
          
          {loginError && (
            <div className="status-badge danger" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '6px' }}>
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <input 
                type="email" 
                required 
                className="form-control" 
                placeholder="admin@maadrobe.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  className="form-control" 
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#888',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '12px' }}>
              Sign In to Store Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <Check size={16} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* 1. Shopify Polaris Style Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand-link">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/images/ICON-01.png" alt="MaaDrobe" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
              <img src="/only word-01.webp" alt="MAA DROBE" style={{ height: '24px', width: 'auto', objectFit: 'contain', marginLeft: '-15px' }} />
            </div>
            <div className="sidebar-brand-text">
              <span className="sidebar-status-indicator">
                <span className="sidebar-status-dot"></span>
                Online Store
              </span>
            </div>
          </div>
          <a 
            href={STOREFRONT_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="sidebar-view-store" 
            title="Open Live Store in New Tab"
          >
            <ExternalLink size={13} />
          </a>
        </div>

        <nav className="sidebar-nav">
          {/* Main Core Management */}
          <div>
            <div className="sidebar-section-title">Core</div>
            <ul className="sidebar-menu-list">
              <li>
                <button className={`menu-item-btn ${currentTab === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentTab('dashboard')}>
                  <span className="menu-item-btn-left">
                    <LayoutDashboard size={18} /> Home
                  </span>
                </button>
              </li>
              <li>
                <button className={`menu-item-btn ${currentTab === 'orders' ? 'active' : ''}`} onClick={() => setCurrentTab('orders')}>
                  <span className="menu-item-btn-left">
                    <ShoppingCart size={18} /> Orders
                  </span>
                  {pendingOrdersCount > 0 && (
                    <span className="menu-badge amber">{pendingOrdersCount}</span>
                  )}
                </button>
              </li>
              <li>
                <button className={`menu-item-btn ${currentTab === 'products' ? 'active' : ''}`} onClick={() => setCurrentTab('products')}>
                  <span className="menu-item-btn-left">
                    <ShoppingBag size={18} /> Products
                  </span>
                  <span className="menu-badge">{products.length}</span>
                </button>
              </li>
              <li>
                <button className={`menu-item-btn ${currentTab === 'categories' ? 'active' : ''}`} onClick={() => setCurrentTab('categories')}>
                  <span className="menu-item-btn-left">
                    <Layers size={18} /> Manage Categories
                  </span>
                </button>
              </li>
              <li>
                <button className={`menu-item-btn ${currentTab === 'customers' ? 'active' : ''}`} onClick={() => setCurrentTab('customers')}>
                  <span className="menu-item-btn-left">
                    <Users size={18} /> Customers
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Sales Channels & Content */}
          <div>
            <div className="sidebar-section-title">Sales & Content</div>
            <ul className="sidebar-menu-list">
              <li>
                <button className={`menu-item-btn ${currentTab === 'banners' ? 'active' : ''}`} onClick={() => setCurrentTab('banners')}>
                  <span className="menu-item-btn-left">
                    <ImageIcon size={18} /> Banners Slider
                  </span>
                </button>
              </li>
              <li>
                <button className={`menu-item-btn ${currentTab === 'homepage' ? 'active' : ''}`} onClick={() => setCurrentTab('homepage')}>
                  <span className="menu-item-btn-left">
                    <FileText size={18} /> Homepage Sections
                  </span>
                </button>
              </li>
              <li>
                <button className={`menu-item-btn ${currentTab === 'footer' ? 'active' : ''}`} onClick={() => setCurrentTab('footer')}>
                  <span className="menu-item-btn-left">
                    <Compass size={18} /> Footer Navigation
                  </span>
                </button>
              </li>
              <li>
                <button className={`menu-item-btn ${currentTab === 'pages' ? 'active' : ''}`} onClick={() => setCurrentTab('pages')}>
                  <span className="menu-item-btn-left">
                    <FileText size={18} /> Pages (CMS)
                  </span>
                </button>
              </li>
              <li>
                <button className={`menu-item-btn ${currentTab === 'coupons' ? 'active' : ''}`} onClick={() => setCurrentTab('coupons')}>
                  <span className="menu-item-btn-left">
                    <Percent size={18} /> Discounts
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Store Settings & Appearance */}
          <div>
            <div className="sidebar-section-title">Preferences</div>
            <ul className="sidebar-menu-list">
              <li>
                <button className={`menu-item-btn ${currentTab === 'appearance' ? 'active' : ''}`} onClick={() => setCurrentTab('appearance')}>
                  <span className="menu-item-btn-left">
                    <Palette size={18} /> Appearance & Fonts
                  </span>
                </button>
              </li>
              <li>
                <button className={`menu-item-btn ${currentTab === 'settings' ? 'active' : ''}`} onClick={() => setCurrentTab('settings')}>
                  <span className="menu-item-btn-left">
                    <Settings size={18} /> Store Settings
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="sidebar-footer">
          <div className="sidebar-user-pill">
            <span className="sidebar-user-avatar">{user?.name ? user.name[0] : 'A'}</span>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user?.name || 'Administrator'}</span>
              <span className="sidebar-user-role">Store Admin</span>
            </div>
          </div>
          <button className="btn-logout-sidebar" onClick={handleLogout} title="Log Out">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* 2. Main Workspace */}
      <main className="admin-main">
        {/* Top Header Bar */}
        <header className="admin-topbar">
          <div className="topbar-search-wrapper">
            <Search size={16} className="topbar-search-icon" />
            <input 
              type="text" 
              placeholder="Search products, orders, categories..." 
              className="topbar-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="topbar-right-actions">
            <div className="topbar-live-badge">
              <span className="topbar-live-dot"></span>
              Store Live
            </div>
            <a 
              href={STOREFRONT_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="topbar-view-store-btn"
            >
              <ExternalLink size={14} />
              View Online Store
            </a>
          </div>
        </header>

        {/* Tab Container */}
        <div className="admin-container">
          
          {/* ========================================================
              TAB A: DASHBOARD VIEW
             ======================================================== */}
          {currentTab === 'dashboard' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Admin</span>
                  <h1 className="page-header-title">Dashboard Overview</h1>
                  <p className="page-header-subtitle">Real-time performance metrics and recent store stream.</p>
                </div>
                <div>
                  <button className="btn-primary" onClick={() => openModal('add_product')}>
                    <Plus size={16} /> Add Product
                  </button>
                </div>
              </div>

              {/* Stats KPI Cards */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div>
                    <p className="kpi-label">Total Revenue</p>
                    <p className="kpi-value">₹{dashboardStats?.total_sales?.toLocaleString('en-IN') || '0'}</p>
                  </div>
                  <div className="kpi-icon-wrapper" style={{ color: '#008060' }}>
                    <ShoppingCart size={22} />
                  </div>
                </div>

                <div className="kpi-card">
                  <div>
                    <p className="kpi-label">Total Orders</p>
                    <p className="kpi-value">{dashboardStats?.orders_count || orders.length}</p>
                  </div>
                  <div className="kpi-icon-wrapper" style={{ color: '#0066cc' }}>
                    <PackageCheck size={22} />
                  </div>
                </div>

                <div className="kpi-card">
                  <div>
                    <p className="kpi-label">Pending Orders</p>
                    <p className="kpi-value">{dashboardStats?.pending_count ?? pendingOrdersCount}</p>
                  </div>
                  <div className="kpi-icon-wrapper" style={{ color: '#b98900' }}>
                    <Clock size={22} />
                  </div>
                </div>

                <div className="kpi-card">
                  <div>
                    <p className="kpi-label">Delivered Orders</p>
                    <p className="kpi-value">{dashboardStats?.delivered_count || '0'}</p>
                  </div>
                  <div className="kpi-icon-wrapper" style={{ color: '#008060' }}>
                    <Check size={22} />
                  </div>
                </div>
              </div>

              {/* Recent Orders Stream */}
              <div className="polaris-card">
                <div className="table-header-bar">
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Recent Orders</h3>
                  <button className="btn-secondary" onClick={() => setCurrentTab('orders')}>
                    View All Orders
                  </button>
                </div>
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Order Number</th>
                      <th>Customer</th>
                      <th>Total Amount</th>
                      <th>Method</th>
                      <th>Order Status</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dashboardStats?.recent_orders || orders.slice(0, 5)).map(ord => (
                      <tr key={ord.id}>
                        <td style={{ fontWeight: 700 }}>{ord.order_number}</td>
                        <td>{ord.customer_name}</td>
                        <td style={{ fontWeight: 700 }}>₹{ord.total_amount?.toLocaleString('en-IN')}</td>
                        <td>
                          <span className={`status-badge ${ord.checkout_type === 'whatsapp' ? 'info' : 'success'}`}>
                            {ord.checkout_type}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${
                            ord.status === 'delivered' ? 'success' : 
                            ord.status === 'pending' ? 'warning' : 
                            ord.status === 'cancelled' ? 'danger' : 'info'
                          }`}>{ord.status}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${ord.payment_status === 'paid' ? 'success' : 'warning'}`}>
                            {ord.payment_status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-icon" onClick={() => openModal('view_order', ord)} title="Inspect Order">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB B: ORDERS MANAGEMENT VIEW
             ======================================================== */}
          {currentTab === 'orders' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Orders</span>
                  <h1 className="page-header-title">Orders Management</h1>
                  <p className="page-header-subtitle">Track, fulfill, and manage customer orders pan-India.</p>
                </div>
              </div>

              <div className="polaris-card">
                {/* Status Filter Tabs */}
                <div className="filter-tabs-row">
                  {['ALL', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(st => (
                    <button 
                      key={st}
                      className={`filter-tab-btn ${filterStatus === st ? 'active' : ''}`}
                      onClick={() => setFilterStatus(st)}
                    >
                      {st === 'ALL' ? 'All Orders' : st.charAt(0).toUpperCase() + st.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="table-header-bar">
                  <input 
                    type="text" 
                    placeholder="Search by order #, customer name, phone..." 
                    className="table-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Showing {filteredOrders.length} orders
                  </span>
                </div>

                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Order Number</th>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Total Amount</th>
                      <th>Type</th>
                      <th>Lifecycle Status</th>
                      <th>Payment</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#8c9196' }}>
                          No matching orders found.
                        </td>
                      </tr>
                    ) : filteredOrders.map(ord => (
                      <tr key={ord.id}>
                        <td style={{ fontWeight: 700 }}>{ord.order_number}</td>
                        <td style={{ fontWeight: 600 }}>{ord.customer_name}</td>
                        <td>{ord.customer_phone || '—'}</td>
                        <td style={{ fontWeight: 700 }}>₹{ord.total_amount?.toLocaleString('en-IN')}</td>
                        <td>
                          <span className={`status-badge ${ord.checkout_type === 'whatsapp' ? 'info' : 'success'}`}>
                            {ord.checkout_type}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${
                            ord.status === 'delivered' ? 'success' : 
                            ord.status === 'pending' ? 'warning' : 
                            ord.status === 'cancelled' ? 'danger' : 'info'
                          }`}>{ord.status}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${ord.payment_status === 'paid' ? 'success' : 'warning'}`}>
                            {ord.payment_status}
                          </span>
                        </td>
                        <td>{new Date(ord.created_at).toLocaleDateString()}</td>
                        <td>
                          <button className="btn-icon" onClick={() => openModal('view_order', ord)} title="View & Edit Order">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB C: PRODUCTS CATALOG (FULL CRUD)
             ======================================================== */}
          {currentTab === 'products' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Catalog</span>
                  <h1 className="page-header-title">Product Catalog</h1>
                  <p className="page-header-subtitle">Manage garment designs, inventory levels, sizes, and pricing.</p>
                </div>
                <div>
                  <button className="btn-primary" onClick={() => openModal('add_product')}>
                    <Plus size={16} /> Add Product
                  </button>
                </div>
              </div>

              <div className="polaris-card">
                <div className="table-header-bar">
                  <div className="table-filter-group">
                    <input 
                      type="text" 
                      placeholder="Filter by product name, SKU..." 
                      className="table-search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select 
                      className="table-select"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="ALL">All Categories</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Total: {filteredProducts.length} items
                  </span>
                </div>

                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Title</th>
                      <th>SKU</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#8c9196' }}>
                          No products found.
                        </td>
                      </tr>
                    ) : filteredProducts.map(prod => {
                      const coverImg = prod.images?.find(i => i.is_thumbnail) || prod.images?.[0];
                      const imgUrl = coverImg ? formatAssetUrl(coverImg.image_path) : '/images/placeholder.jpg';
                      const catName = categories.find(c => c.id === prod.category_id)?.name || 'Unassigned';

                      return (
                        <tr key={prod.id}>
                          <td>
                            <img src={imgUrl} alt={prod.name} className="table-img" />
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{prod.name}</div>
                            {prod.tag && (
                              <span style={{ fontSize: '0.72rem', color: 'var(--primary-ruby)', fontWeight: 600 }}>
                                {prod.tag}
                              </span>
                            )}
                          </td>
                          <td><code>{prod.sku || 'N/A'}</code></td>
                          <td>{catName}</td>
                          <td style={{ fontWeight: 700 }}>₹{prod.price?.toLocaleString('en-IN')}</td>
                          <td>
                            <span className={`status-badge ${prod.stock > 5 ? 'success' : prod.stock > 0 ? 'warning' : 'danger'}`}>
                              {prod.stock > 0 ? `${prod.stock} in stock` : 'Out of stock'}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${prod.is_active ? 'success' : 'neutral'}`}>
                              {prod.is_active ? 'Active' : 'Draft'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button className="btn-icon" onClick={() => openModal('edit_product', prod)} title="Edit Design">
                                <Edit2 size={15} />
                              </button>
                              <button className="btn-icon delete" onClick={() => handleDeleteProduct(prod.id)} title="Delete Product">
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB D: COLLECTIONS / CATEGORIES (FULL CRUD)
             ======================================================== */}
          {currentTab === 'categories' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Collections</span>
                  <h1 className="page-header-title">Collections & Categories</h1>
                  <p className="page-header-subtitle">Organize garments into collections for storefront navigation.</p>
                </div>
                <div>
                  <button className="btn-primary" onClick={() => openModal('add_category')}>
                    <Plus size={16} /> Add Collection
                  </button>
                </div>
              </div>

              <div className="polaris-card">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Cover</th>
                      <th>Collection Name</th>
                      <th>Slug URL</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(cat => (
                      <tr key={cat.id}>
                        <td>
                          <img src={formatAssetUrl(cat.image_path)} alt={cat.name} className="table-img" />
                        </td>
                        <td style={{ fontWeight: 600 }}>{cat.name}</td>
                        <td><code>/{cat.slug}</code></td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>
                          {cat.description || 'No description provided.'}
                        </td>
                        <td>
                          <span className={`status-badge ${cat.is_active ? 'success' : 'neutral'}`}>
                            {cat.is_active ? 'Visible' : 'Hidden'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button className="btn-icon" onClick={() => openModal('edit_category', cat)} title="Edit Collection">
                              <Edit2 size={15} />
                            </button>
                            <button className="btn-icon delete" onClick={() => handleDeleteCategory(cat.id)} title="Delete Collection">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB E: CUSTOMERS
             ======================================================== */}
          {currentTab === 'customers' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Customers</span>
                  <h1 className="page-header-title">Customer Accounts</h1>
                  <p className="page-header-subtitle">Registered shoppers and contact details.</p>
                </div>
              </div>

              <div className="polaris-card">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Email Address</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Joined Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#8c9196' }}>
                          No customer accounts found.
                        </td>
                      </tr>
                    ) : users.map((u, idx) => (
                      <tr key={u.id}>
                        <td style={{ color: '#8c9196' }}>{idx + 1}</td>
                        <td style={{ fontWeight: 600 }}>
                          <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary-ruby)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, marginRight: 8 }}>
                            {u.name?.[0]?.toUpperCase() || 'U'}
                          </span>
                          {u.name}
                        </td>
                        <td>{u.email}</td>
                        <td>{u.phone || '—'}</td>
                        <td>
                          <span className={`status-badge ${u.role === 'admin' ? 'danger' : 'info'}`}>
                            {u.role || 'customer'}
                          </span>
                        </td>
                        <td>{new Date(u.created_at).toLocaleDateString()}</td>
                        <td>
                          {u.role !== 'admin' && (
                            <button className="btn-icon delete" onClick={() => handleDeleteUser(u.id)} title="Remove Account">
                              <Trash2 size={15} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB F: BANNERS & SLIDERS (FULL CRUD)
             ======================================================== */}
          {currentTab === 'banners' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Banners</span>
                  <h1 className="page-header-title">Carousel Banners</h1>
                  <p className="page-header-subtitle">Manage homepage hero slides and seasonal promo visuals.</p>
                </div>
                <div>
                  <button className="btn-primary" onClick={() => openModal('add_banner')}>
                    <Plus size={16} /> Add Hero Banner
                  </button>
                </div>
              </div>

              <div className="polaris-card">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Visual</th>
                      <th>Headline Title</th>
                      <th>Subtitle</th>
                      <th>Tag / Accent</th>
                      <th>Target View</th>
                      <th>CTA Button</th>
                      <th>Order</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.map(b => (
                      <tr key={b.id}>
                        <td>
                          <img src={formatAssetUrl(b.image_path)} alt={b.title} style={{ width: 80, height: 45, objectFit: 'cover', borderRadius: 4 }} />
                        </td>
                        <td style={{ fontWeight: 600 }}>{b.title}</td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '240px' }}>{b.subtitle}</td>
                        <td><span className="table-tag">{b.tag || 'Standard'}</span></td>
                        <td><code>{b.view_path || 'coords'}</code></td>
                        <td style={{ fontSize: '0.85rem', fontWeight: 500 }}>{b.cta_text || 'SHOP NOW →'}</td>
                        <td>#{b.ordering}</td>
                        <td>
                          <span className={`status-badge ${b.is_active ? 'success' : 'neutral'}`}>
                            {b.is_active ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button className="btn-icon" onClick={() => openModal('edit_banner', b)} title="Edit Banner">
                              <Edit2 size={15} />
                            </button>
                            <button className="btn-icon delete" onClick={() => handleDeleteBanner(b.id)} title="Delete Banner">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB G: HOMEPAGE CMS
             ======================================================== */}
          {currentTab === 'homepage' && (
            <div>
              {/* Header Banner */}
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MAA ◆ DROBE &gt; Storefront CMS &gt; Sections</span>
                  <h1 className="page-header-title">Homepage Sections Manager</h1>
                  <p className="page-header-subtitle">
                    Manage title, description, showcase images, and curated products for each homepage section.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a 
                    href={STOREFRONT_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary"
                  >
                    <ExternalLink size={15} /> Preview Storefront
                  </a>
                  <button type="button" onClick={handleSaveHomepageCms} className="btn-primary">
                    <Check size={16} /> Save All Sections
                  </button>
                </div>
              </div>

              {/* Section Filter Tabs */}
              <div className="sections-nav-tabs">
                {[
                  { id: 'all', label: 'All Sections' },
                  { id: 'categories', label: '1. Categories' },
                  { id: 'new_arrivals', label: '2. New Arrivals (Products)' },
                  { id: 'second_image', label: '3. Second Image Section' },
                  { id: 'spotlight', label: '4. Spotlight Collection' },
                  { id: 'features', label: '5. Trust Badges' },
                  { id: 'insta', label: '6. Instagram Gallery' },
                  { id: 'newsletter', label: '7. Newsletter' }
                ].map(tab => (
                  <button 
                    key={tab.id} 
                    type="button" 
                    className={`sections-tab-btn ${activeSectionTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveSectionTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* SECTION 1: SHOP BY CATEGORY */}
              {(activeSectionTab === 'all' || activeSectionTab === 'categories') && (
                <div className="section-card">
                  <div className="section-card-header">
                    <div className="section-card-title-group">
                      <span className="section-card-badge ruby">Section 01</span>
                      <h3 className="section-card-title">Shop by Category</h3>
                    </div>
                    <label className="section-toggle-label">
                      <input 
                        type="checkbox" 
                        checked={homepageCms.categories_visible !== '0'} 
                        onChange={(e) => setHomepageCms({...homepageCms, categories_visible: e.target.checked ? '1' : '0'})} 
                      />
                      <span>Display on Homepage</span>
                    </label>
                  </div>
                  <div className="section-card-body">
                    <div className="form-row">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Section Heading Title</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Shop by Category" 
                          value={homepageCms.categories_title ?? 'Shop by Category'} 
                          onChange={(e) => setHomepageCms({...homepageCms, categories_title: e.target.value})} 
                        />
                      </div>
                      <div className="form-group" style={{ width: '220px' }}>
                        <label className="form-label">Action Button Text</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="VIEW ALL →" 
                          value={homepageCms.categories_cta ?? 'VIEW ALL →'} 
                          onChange={(e) => setHomepageCms({...homepageCms, categories_cta: e.target.value})} 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Section Subtitle / Description</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Explore styles for every version of you." 
                        value={homepageCms.categories_desc ?? 'Explore styles for every version of you.'} 
                        onChange={(e) => setHomepageCms({...homepageCms, categories_desc: e.target.value})} 
                      />
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#6d7175', marginTop: '6px' }}>
                      Categories are managed under the <strong>Collections</strong> tab and automatically link into this section.
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: NEW ARRIVALS (PRODUCTS & EDITORIAL BANNER) */}
              {(activeSectionTab === 'all' || activeSectionTab === 'new_arrivals') && (
                <div className="section-card">
                  <div className="section-card-header">
                    <div className="section-card-title-group">
                      <span className="section-card-badge ruby">Section 02</span>
                      <h3 className="section-card-title">New Arrivals (Products Grid & Editorial Banner)</h3>
                    </div>
                    <label className="section-toggle-label">
                      <input 
                        type="checkbox" 
                        checked={homepageCms.new_arrivals_visible !== '0'} 
                        onChange={(e) => setHomepageCms({...homepageCms, new_arrivals_visible: e.target.checked ? '1' : '0'})} 
                      />
                      <span>Display on Homepage</span>
                    </label>
                  </div>
                  <div className="section-card-body">
                    <div className="form-row">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Section Heading Title</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="New Arrivals" 
                          value={homepageCms.new_arrivals_title ?? 'New Arrivals'} 
                          onChange={(e) => setHomepageCms({...homepageCms, new_arrivals_title: e.target.value})} 
                        />
                      </div>
                      <div className="form-group" style={{ width: '220px' }}>
                        <label className="form-label">Action Button Text</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="VIEW ALL →" 
                          value={homepageCms.new_arrivals_cta ?? 'VIEW ALL →'} 
                          onChange={(e) => setHomepageCms({...homepageCms, new_arrivals_cta: e.target.value})} 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Section Subtitle / Description</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Fresh styles, just for you." 
                        value={homepageCms.new_arrivals_desc ?? 'Fresh styles, just for you.'} 
                        onChange={(e) => setHomepageCms({...homepageCms, new_arrivals_desc: e.target.value})} 
                      />
                    </div>

                    {/* Products Selection for New Arrivals */}
                    <div className="selected-products-wrap">
                      <div className="selected-products-header">
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: '#202223' }}>
                            Curated Products for New Arrivals
                          </strong>
                          <div style={{ fontSize: '0.8rem', color: '#6d7175' }}>
                            Select exact products to feature in the 4-item grid.
                          </div>
                        </div>
                        <button 
                          type="button" 
                          className="btn-primary" 
                          onClick={() => openProductPicker('new_arrivals_product_ids', 'Select Products for New Arrivals', homepageCms.new_arrivals_product_ids)}
                        >
                          <ShoppingBag size={15} /> Choose Products ({(() => {
                            try {
                              const ids = JSON.parse(homepageCms.new_arrivals_product_ids || '[]');
                              return Array.isArray(ids) ? ids.length : 0;
                            } catch(e) { return 0; }
                          })()})
                        </button>
                      </div>

                      {(() => {
                        let selectedObjs = [];
                        try {
                          const ids = JSON.parse(homepageCms.new_arrivals_product_ids || '[]');
                          if (Array.isArray(ids)) {
                            selectedObjs = ids.map(id => products.find(p => String(p.id) === String(id))).filter(Boolean);
                          }
                        } catch(e) {}

                        if (selectedObjs.length === 0) {
                          return (
                            <div style={{ padding: '16px', background: '#fff', borderRadius: '4px', textAlign: 'center', fontSize: '0.85rem', color: '#6d7175' }}>
                              🌟 No specific products chosen — automatically displaying the <strong>4 newest items</strong> from your catalogue. Click &quot;Choose Products&quot; above to select exact items.
                            </div>
                          );
                        }

                        return (
                          <div className="selected-products-grid">
                            {selectedObjs.map(p => {
                              const coverImg = p.images?.[0]?.image_path || (typeof p.image === 'string' ? p.image : '/images/placeholder.jpg');
                              return (
                                <div key={p.id} className="selected-product-item">
                                  <img 
                                    src={formatAssetUrl(coverImg)} 
                                    alt={p.name} 
                                    className="selected-product-thumb" 
                                    onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                                  />
                                  <div className="selected-product-info">
                                    <h5 className="selected-product-name" title={p.name}>{p.name}</h5>
                                    <span className="selected-product-price">₹{Number(p.price || 0).toLocaleString('en-IN')}</span>
                                  </div>
                                  <button 
                                    type="button" 
                                    className="selected-product-remove" 
                                    title="Remove from Section"
                                    onClick={() => handleRemoveProductFromSection('new_arrivals_product_ids', p.id)}
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>

                  </div>
                </div>
              )}

              {/* SECTION 3: SECOND IMAGE SECTION (EDITORIAL BANNER) */}
              {(activeSectionTab === 'all' || activeSectionTab === 'second_image') && (
                <div className="section-card">
                  <div className="section-card-header">
                    <div className="section-card-title-group">
                      <span className="section-card-badge ruby">Section 03</span>
                      <h3 className="section-card-title">Second Image Section (Editorial Showcase Banner)</h3>
                    </div>
                    <label className="section-toggle-label">
                      <input 
                        type="checkbox" 
                        checked={homepageCms.editorial_visible !== '0'} 
                        onChange={(e) => setHomepageCms({...homepageCms, editorial_visible: e.target.checked ? '1' : '0'})} 
                      />
                      <span>Display on Homepage</span>
                    </label>
                  </div>
                  <div className="section-card-body">
                    <p style={{ fontSize: '0.85rem', color: '#6d635c', marginBottom: '16px' }}>
                      This is the second major image section on the storefront, displayed directly beside the New Arrivals product collection. Upload a custom banner image or set its destination link.
                    </p>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label className="form-label">Banner Image (Second Image on Homepage)</label>
                      <div className="image-upload-card" style={{ maxWidth: '440px' }}>
                        <img 
                          src={formatAssetUrl(homepageCms.editorial_image || '/images/ref_editorial_banner.jpg')} 
                          alt="Second Image Banner" 
                          className="image-upload-preview" 
                          style={{ maxHeight: '200px', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = '/images/ref_editorial_banner.jpg'; }}
                        />
                        <div className="image-upload-controls">
                          <div className="image-upload-actions">
                            <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                              <Upload size={14} /> Upload Banner Image
                              <input 
                                type="file" 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                                onChange={(e) => handleFileUpload(e, (path) => setHomepageCms({ ...homepageCms, editorial_image: path }))} 
                              />
                            </label>
                            {homepageCms.editorial_image && (
                              <button 
                                type="button" 
                                className="btn-secondary" 
                                style={{ color: '#d82c0d' }}
                                onClick={() => setHomepageCms({ ...homepageCms, editorial_image: '/images/ref_editorial_banner.jpg' })}
                              >
                                Reset Default
                              </button>
                            )}
                          </div>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="/images/ref_editorial_banner.jpg or URL" 
                            value={homepageCms.editorial_image || ''} 
                            onChange={(e) => setHomepageCms({...homepageCms, editorial_image: e.target.value})} 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Banner Title / Alt Tag</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="DRESS THE WAY YOU FEEL" 
                          value={homepageCms.editorial_title ?? 'DRESS THE WAY YOU FEEL'} 
                          onChange={(e) => setHomepageCms({...homepageCms, editorial_title: e.target.value})} 
                        />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Click Destination Link</label>
                        <select 
                          className="form-control" 
                          value={homepageCms.editorial_link || 'dresses'} 
                          onChange={(e) => setHomepageCms({...homepageCms, editorial_link: e.target.value})}
                        >
                          <option value="dresses">Dresses Collection</option>
                          <option value="kurti">Kurtis Collection</option>
                          <option value="kurtasets">Kurta Sets Collection</option>
                          <option value="coords">Co-ords Collection</option>
                          <option value="sale">Sale & Offers</option>
                          <option value="shop">All Collection (Shop)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: CURATED SPOTLIGHT / TRENDING COLLECTION */}
              {(activeSectionTab === 'all' || activeSectionTab === 'spotlight') && (
                <div className="section-card">
                  <div className="section-card-header">
                    <div className="section-card-title-group">
                      <span className="section-card-badge ruby">Section 03</span>
                      <h3 className="section-card-title">Curated Spotlight / Trending Collection</h3>
                    </div>
                    <label className="section-toggle-label">
                      <input 
                        type="checkbox" 
                        checked={homepageCms.spotlight_enabled === '1'} 
                        onChange={(e) => setHomepageCms({...homepageCms, spotlight_enabled: e.target.checked ? '1' : '0'})} 
                      />
                      <span>Enable Spotlight Section on Homepage</span>
                    </label>
                  </div>
                  <div className="section-card-body">
                    <div className="form-row">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Section Heading Title</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Curated Spotlight" 
                          value={homepageCms.spotlight_title ?? 'Curated Spotlight'} 
                          onChange={(e) => setHomepageCms({...homepageCms, spotlight_title: e.target.value})} 
                        />
                      </div>
                      <div className="form-group" style={{ width: '220px' }}>
                        <label className="form-label">Action Button Text</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="SHOP SPOTLIGHT →" 
                          value={homepageCms.spotlight_cta ?? 'SHOP SPOTLIGHT →'} 
                          onChange={(e) => setHomepageCms({...homepageCms, spotlight_cta: e.target.value})} 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Section Subtitle / Description</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Most-loved silhouettes handpicked by our stylists." 
                        value={homepageCms.spotlight_desc ?? 'Most-loved silhouettes handpicked by our stylists.'} 
                        onChange={(e) => setHomepageCms({...homepageCms, spotlight_desc: e.target.value})} 
                      />
                    </div>

                    {/* Spotlight Products Selection */}
                    <div className="selected-products-wrap">
                      <div className="selected-products-header">
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: '#202223' }}>
                            Products in Spotlight Section
                          </strong>
                          <div style={{ fontSize: '0.8rem', color: '#6d7175' }}>
                            Choose specific products to spotlight on the homepage.
                          </div>
                        </div>
                        <button 
                          type="button" 
                          className="btn-primary" 
                          onClick={() => openProductPicker('spotlight_product_ids', 'Select Products for Spotlight Section', homepageCms.spotlight_product_ids)}
                        >
                          <ShoppingBag size={15} /> Choose Products ({(() => {
                            try {
                              const ids = JSON.parse(homepageCms.spotlight_product_ids || '[]');
                              return Array.isArray(ids) ? ids.length : 0;
                            } catch(e) { return 0; }
                          })()})
                        </button>
                      </div>

                      {(() => {
                        let selectedObjs = [];
                        try {
                          const ids = JSON.parse(homepageCms.spotlight_product_ids || '[]');
                          if (Array.isArray(ids)) {
                            selectedObjs = ids.map(id => products.find(p => String(p.id) === String(id))).filter(Boolean);
                          }
                        } catch(e) {}

                        if (selectedObjs.length === 0) {
                          return (
                            <div style={{ padding: '16px', background: '#fff', borderRadius: '4px', textAlign: 'center', fontSize: '0.85rem', color: '#6d7175' }}>
                              🌟 No specific products chosen — will feature items 5 through 8 from catalogue by default. Click &quot;Choose Products&quot; to pick exact items.
                            </div>
                          );
                        }

                        return (
                          <div className="selected-products-grid">
                            {selectedObjs.map(p => {
                              const coverImg = p.images?.[0]?.image_path || (typeof p.image === 'string' ? p.image : '/images/placeholder.jpg');
                              return (
                                <div key={p.id} className="selected-product-item">
                                  <img 
                                    src={formatAssetUrl(coverImg)} 
                                    alt={p.name} 
                                    className="selected-product-thumb" 
                                    onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                                  />
                                  <div className="selected-product-info">
                                    <h5 className="selected-product-name" title={p.name}>{p.name}</h5>
                                    <span className="selected-product-price">₹{Number(p.price || 0).toLocaleString('en-IN')}</span>
                                  </div>
                                  <button 
                                    type="button" 
                                    className="selected-product-remove" 
                                    title="Remove from Section"
                                    onClick={() => handleRemoveProductFromSection('spotlight_product_ids', p.id)}
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4: VALUE PROPOSITIONS BAR */}
              {(activeSectionTab === 'all' || activeSectionTab === 'features') && (
                <div className="section-card">
                  <div className="section-card-header">
                    <div className="section-card-title-group">
                      <span className="section-card-badge ruby">Section 04</span>
                      <h3 className="section-card-title">Value Propositions & Features Bar</h3>
                    </div>
                    <label className="section-toggle-label">
                      <input 
                        type="checkbox" 
                        checked={homepageCms.features_visible !== '0'} 
                        onChange={(e) => setHomepageCms({...homepageCms, features_visible: e.target.checked ? '1' : '0'})} 
                      />
                      <span>Display Features Bar</span>
                    </label>
                  </div>
                  <div className="section-card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      {/* Feature 1 */}
                      <div style={{ background: '#fafbfb', padding: '14px', borderRadius: '6px', border: '1px solid var(--polaris-border)' }}>
                        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: '#701325' }}>Feature 1 (Express Delivery)</h5>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Title" 
                          style={{ marginBottom: '8px' }}
                          value={homepageCms.features_1_title ?? 'Free Express Delivery'} 
                          onChange={(e) => setHomepageCms({...homepageCms, features_1_title: e.target.value})} 
                        />
                        <textarea 
                          className="form-control" 
                          rows={2} 
                          placeholder="Description"
                          value={homepageCms.features_1_desc ?? 'Free shipping on all prepaid orders across India.'} 
                          onChange={(e) => setHomepageCms({...homepageCms, features_1_desc: e.target.value})} 
                        />
                      </div>

                      {/* Feature 2 */}
                      <div style={{ background: '#fafbfb', padding: '14px', borderRadius: '6px', border: '1px solid var(--polaris-border)' }}>
                        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: '#701325' }}>Feature 2 (Pure Fabrics)</h5>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Title" 
                          style={{ marginBottom: '8px' }}
                          value={homepageCms.features_2_title ?? '100% Pure Fabrics'} 
                          onChange={(e) => setHomepageCms({...homepageCms, features_2_title: e.target.value})} 
                        />
                        <textarea 
                          className="form-control" 
                          rows={2} 
                          placeholder="Description"
                          value={homepageCms.features_2_desc ?? 'Handpicked breathable cotton, silk & georgette.'} 
                          onChange={(e) => setHomepageCms({...homepageCms, features_2_desc: e.target.value})} 
                        />
                      </div>

                      {/* Feature 3 */}
                      <div style={{ background: '#fafbfb', padding: '14px', borderRadius: '6px', border: '1px solid var(--polaris-border)' }}>
                        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: '#701325' }}>Feature 3 (Exchange Policy)</h5>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Title" 
                          style={{ marginBottom: '8px' }}
                          value={homepageCms.features_3_title ?? '7-Day Easy Exchange'} 
                          onChange={(e) => setHomepageCms({...homepageCms, features_3_title: e.target.value})} 
                        />
                        <textarea 
                          className="form-control" 
                          rows={2} 
                          placeholder="Description"
                          value={homepageCms.features_3_desc ?? 'Hassle-free doorstep exchanges & sizing assistance.'} 
                          onChange={(e) => setHomepageCms({...homepageCms, features_3_desc: e.target.value})} 
                        />
                      </div>

                      {/* Feature 4 */}
                      <div style={{ background: '#fafbfb', padding: '14px', borderRadius: '6px', border: '1px solid var(--polaris-border)' }}>
                        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: '#701325' }}>Feature 4 (Secure Checkout)</h5>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Title" 
                          style={{ marginBottom: '8px' }}
                          value={homepageCms.features_4_title ?? 'Secure Checkout'} 
                          onChange={(e) => setHomepageCms({...homepageCms, features_4_title: e.target.value})} 
                        />
                        <textarea 
                          className="form-control" 
                          rows={2} 
                          placeholder="Description"
                          value={homepageCms.features_4_desc ?? '256-bit encrypted UPI, Cards, NetBanking & COD.'} 
                          onChange={(e) => setHomepageCms({...homepageCms, features_4_desc: e.target.value})} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 5: INSTAGRAM & COMMUNITY SHOWCASE */}
              {(activeSectionTab === 'all' || activeSectionTab === 'insta') && (
                <div className="section-card">
                  <div className="section-card-header">
                    <div className="section-card-title-group">
                      <span className="section-card-badge ruby">Section 05</span>
                      <h3 className="section-card-title">Community & Instagram Showcase</h3>
                    </div>
                    <label className="section-toggle-label">
                      <input 
                        type="checkbox" 
                        checked={homepageCms.insta_visible !== '0'} 
                        onChange={(e) => setHomepageCms({...homepageCms, insta_visible: e.target.checked ? '1' : '0'})} 
                      />
                      <span>Display Instagram Showcase</span>
                    </label>
                  </div>
                  <div className="section-card-body">
                    <div className="form-row">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Community Title / Instagram Handle</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="@MaaDrobe" 
                          value={homepageCms.insta_handle ?? '@MaaDrobe'} 
                          onChange={(e) => setHomepageCms({...homepageCms, insta_handle: e.target.value})} 
                        />
                      </div>
                      <div className="form-group" style={{ width: '220px' }}>
                        <label className="form-label">Button CTA Text</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="SHOP THE LOOK →" 
                          value={homepageCms.insta_cta ?? 'SHOP THE LOOK →'} 
                          onChange={(e) => setHomepageCms({...homepageCms, insta_cta: e.target.value})} 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Section Subtitle / Description</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Real women. Real styles. Tag us to get featured!" 
                        value={homepageCms.insta_subtitle ?? 'Real women. Real styles. Tag us to get featured!'} 
                        onChange={(e) => setHomepageCms({...homepageCms, insta_subtitle: e.target.value})} 
                      />
                    </div>

                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginTop: '20px', marginBottom: '8px', color: '#202223' }}>
                      6 Showcase Look Images (Upload from Device or Paste Image URL)
                    </h4>
                    <div className="insta-manager-grid">
                      {[1, 2, 3, 4, 5, 6].map(num => {
                        const key = `insta_img_${num}`;
                        const currentVal = homepageCms[key] || `/images/ref_insta_${num}.jpg`;
                        return (
                          <div key={num} className="insta-item-card">
                            <img 
                              src={formatAssetUrl(currentVal)} 
                              alt={`Look ${num}`} 
                              className="insta-item-thumb" 
                              onError={(e) => { e.target.src = `/images/ref_insta_${num}.jpg`; }}
                            />
                            <div className="insta-item-inputs">
                              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#701325' }}>
                                Look Visual #{num}
                              </div>
                              <label className="btn-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'center' }}>
                                <Upload size={12} /> Upload File
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  style={{ display: 'none' }} 
                                  onChange={(e) => handleFileUpload(e, (path) => setHomepageCms({ ...homepageCms, [key]: path }))} 
                                />
                              </label>
                              <input 
                                type="text" 
                                className="form-control" 
                                style={{ fontSize: '0.75rem', padding: '4px 6px' }}
                                placeholder={`/images/ref_insta_${num}.jpg`}
                                value={homepageCms[key] || ''} 
                                onChange={(e) => setHomepageCms({...homepageCms, [key]: e.target.value})} 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 6: NEWSLETTER SUBSCRIPTION */}
              {(activeSectionTab === 'all' || activeSectionTab === 'newsletter') && (
                <div className="section-card">
                  <div className="section-card-header">
                    <div className="section-card-title-group">
                      <span className="section-card-badge ruby">Section 06</span>
                      <h3 className="section-card-title">Newsletter Subscription Banner</h3>
                    </div>
                    <label className="section-toggle-label">
                      <input 
                        type="checkbox" 
                        checked={homepageCms.newsletter_visible !== '0'} 
                        onChange={(e) => setHomepageCms({...homepageCms, newsletter_visible: e.target.checked ? '1' : '0'})} 
                      />
                      <span>Display Newsletter Banner</span>
                    </label>
                  </div>
                  <div className="section-card-body">
                    <div className="form-row">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Headline Title</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Be part of our journey" 
                          value={homepageCms.newsletter_title ?? 'Be part of our journey'} 
                          onChange={(e) => setHomepageCms({...homepageCms, newsletter_title: e.target.value})} 
                        />
                      </div>
                      <div className="form-group" style={{ width: '220px' }}>
                        <label className="form-label">Button CTA Text</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="SUBSCRIBE" 
                          value={homepageCms.newsletter_cta ?? 'SUBSCRIBE'} 
                          onChange={(e) => setHomepageCms({...homepageCms, newsletter_cta: e.target.value})} 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subtitle / Description</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Get exclusive updates, new arrivals and offers." 
                        value={homepageCms.newsletter_desc ?? 'Get exclusive updates, new arrivals and offers.'} 
                        onChange={(e) => setHomepageCms({...homepageCms, newsletter_desc: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Sticky Action Bar */}
              <div style={{ background: '#fff', border: '1px solid var(--polaris-border)', borderRadius: '8px', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginTop: '24px' }}>
                <div>
                  <strong style={{ fontSize: '0.95rem', color: '#202223' }}>Ready to publish your changes?</strong>
                  <div style={{ fontSize: '0.82rem', color: '#6d7175' }}>All section titles, images, and product selections will update live on your storefront.</div>
                </div>
                <button type="button" onClick={handleSaveHomepageCms} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
                  <Check size={16} /> Save All Sections
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: FOOTER NAVIGATION (CMS & LINKS MANAGER)
             ======================================================== */}
          {currentTab === 'footer' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Content &gt; Footer Navigation</span>
                  <h1 className="page-header-title">Footer Navigation Manager</h1>
                  <p className="page-header-subtitle">Create, update, reorder and delete website footer link columns and targets.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-secondary" onClick={handleAddFooterColumn}>
                    <Plus size={16} /> Add Column
                  </button>
                  <button className="btn-primary" onClick={handleSaveFooter} disabled={savingFooter}>
                    <Check size={16} /> {savingFooter ? 'Saving...' : 'Save Footer Navigation'}
                  </button>
                </div>
              </div>

              {/* Live Preview Bar */}
              <div className="footer-preview-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Eye size={16} style={{ color: '#D4AF37' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em' }}>Live Storefront Footer Preview</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#888' }}>Real-time preview of how visitors see your footer</span>
                </div>

                <div className="footer-preview-grid">
                  <div className="footer-preview-col">
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '4px' }}>
                      {settings.site_name || 'MaaDrobe'}
                    </h4>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: '#D4AF37', display: 'block', marginBottom: '10px' }}>
                      WEAR YOUR STORY
                    </span>
                    <p style={{ fontSize: '0.8rem', color: '#aaa', lineHeight: '1.4' }}>
                      {settings.footer_text || 'Premium handcrafted Indian ethnic clothing.'}
                    </p>
                  </div>

                  {footerSections.map((col, idx) => (
                    <div key={col.id || idx} className="footer-preview-col">
                      <h5>{col.title || 'Column'}</h5>
                      <ul>
                        {col.links && col.links.map((lnk, lIdx) => (
                          <li key={lIdx}>{lnk.label}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="footer-preview-col">
                    <h5>Connect</h5>
                    <p style={{ fontSize: '0.8rem', color: '#aaa' }}>{settings.contact_email || 'contact@maadrobe.com'}</p>
                    <p style={{ fontSize: '0.8rem', color: '#aaa' }}>{settings.contact_number || '+91 98765 43210'}</p>
                  </div>
                </div>
              </div>

              {/* Column Management Cards */}
              <div className="footer-cms-grid">
                {footerSections.map((col) => (
                  <div key={col.id} className="footer-col-card">
                    <div className="footer-col-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                        <Compass size={16} style={{ color: '#008060' }} />
                        <input
                          type="text"
                          className="footer-col-title-input"
                          value={col.title}
                          onChange={(e) => handleUpdateColumnTitle(col.id, e.target.value)}
                          placeholder="Column Title (e.g. Shop)"
                        />
                      </div>
                      <button 
                        className="btn-icon delete" 
                        onClick={() => handleDeleteFooterColumn(col.id)}
                        title="Delete Entire Column"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="footer-col-body">
                      {(!col.links || col.links.length === 0) && (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '16px 0' }}>
                          No links added yet. Click &quot;Add Link&quot; below.
                        </p>
                      )}

                      {col.links && col.links.map((link, lIdx) => (
                        <div key={lIdx} className="footer-link-row">
                          <input
                            type="text"
                            className="footer-link-input"
                            value={link.label}
                            onChange={(e) => handleUpdateFooterLink(col.id, lIdx, 'label', e.target.value)}
                            placeholder="Link Label (e.g. Kurtis)"
                          />
                          <select
                            className="footer-link-select"
                            value={['kurti', 'dresses', 'kurtasets', 'coords', 'sale', 'shop', 'home', 'tracking', 'about', 'terms'].includes(link.url) ? link.url : 'custom'}
                            onChange={(e) => {
                              const val = e.target.value;
                              handleUpdateFooterLink(col.id, lIdx, 'url', val === 'custom' ? 'https://' : val);
                            }}
                          >
                            <optgroup label="Store Views">
                              <option value="kurti">Kurtis</option>
                              <option value="dresses">Dresses</option>
                              <option value="kurtasets">Kurta Sets</option>
                              <option value="coords">Co-ords</option>
                              <option value="sale">Sale</option>
                              <option value="shop">All Products</option>
                              <option value="home">Home</option>
                            </optgroup>
                            <optgroup label="Dedicated Information Pages">
                              <option value="customercare">Customer Care</option>
                              <option value="tracking">Track Order</option>
                              <option value="returns">Returns & Exchanges</option>
                              <option value="shipping">Shipping Policy</option>
                              <option value="sizeguide">Size Guide</option>
                              <option value="faq">FAQs</option>
                              <option value="about">About MaaDrobe</option>
                              <option value="story">Our Story</option>
                              <option value="privacy">Privacy Policy</option>
                              <option value="terms">Terms & Conditions</option>
                            </optgroup>
                            <optgroup label="Custom / External">
                              <option value="custom">Custom URL...</option>
                            </optgroup>
                          </select>

                          {!['kurti', 'dresses', 'kurtasets', 'coords', 'sale', 'shop', 'home', 'customercare', 'tracking', 'returns', 'shipping', 'sizeguide', 'faq', 'about', 'story', 'privacy', 'terms'].includes(link.url) && (
                            <input
                              type="text"
                              className="footer-link-input"
                              placeholder="https://... or view-name"
                              value={link.url}
                              onChange={(e) => handleUpdateFooterLink(col.id, lIdx, 'url', e.target.value)}
                            />
                          )}

                          <div style={{ display: 'flex', gap: '2px' }}>
                            <button
                              className="btn-icon"
                              disabled={lIdx === 0}
                              onClick={() => handleMoveFooterLink(col.id, lIdx, 'up')}
                              title="Move Up"
                            >
                              <ArrowUp size={13} />
                            </button>
                            <button
                              className="btn-icon"
                              disabled={lIdx === col.links.length - 1}
                              onClick={() => handleMoveFooterLink(col.id, lIdx, 'down')}
                              title="Move Down"
                            >
                              <ArrowDown size={13} />
                            </button>
                            <button
                              className="btn-icon delete"
                              onClick={() => handleDeleteFooterLink(col.id, lIdx)}
                              title="Delete Link"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ marginTop: '8px', justifyContent: 'center', width: '100%', fontSize: '0.85rem' }}
                        onClick={() => handleAddFooterLink(col.id)}
                      >
                        <Plus size={14} /> Add Link to &quot;{col.title}&quot;
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn-secondary" onClick={handleAddFooterColumn}>
                  <Plus size={16} /> Add Another Column
                </button>
                <button className="btn-primary" onClick={handleSaveFooter} disabled={savingFooter}>
                  <Check size={16} /> {savingFooter ? 'Saving Changes...' : 'Save Footer Navigation'}
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: PAGES (CMS) MANAGER FOR DEDICATED STOREFRONT PAGES
             ======================================================== */}
          {currentTab === 'pages' && (() => {
            const activePageConfig = CMS_PAGE_LIST.find(p => p.id === selectedCmsPage) || CMS_PAGE_LIST[0];
            const activeKey = activePageConfig.key;
            const isFaq = activePageConfig.isFaq;
            const currentContent = settings[activeKey] !== undefined ? settings[activeKey] : (DEFAULT_PAGE_TEMPLATES[activeKey] || '');
            const charCount = typeof currentContent === 'string' ? currentContent.length : 0;
            const wordCount = typeof currentContent === 'string' ? (currentContent.trim() ? currentContent.trim().split(/\s+/).length : 0) : 0;

            return (
              <div>
                <div className="page-header-banner">
                  <div className="page-header-left">
                    <span className="page-header-breadcrumb">MaaDrobe &gt; Pages (CMS)</span>
                    <h1 className="page-header-title">Storefront Pages & Legal CMS</h1>
                    <p className="page-header-subtitle">
                      Manage dedicated content for Customer Care, Policies, Size Guide, FAQs, and Brand Narrative.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setCurrentTab('categories')}
                      title="Manage product categories & collections"
                    >
                      <Layers size={15} /> Manage Categories
                    </button>
                    <a
                      href={`${STOREFRONT_URL}/#${selectedCmsPage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      title="Open this page on live website"
                    >
                      <ExternalLink size={15} /> View Live Page
                    </a>
                    <button className="btn-primary" onClick={handleSaveCmsPages} disabled={savingPages}>
                      <Check size={16} /> {savingPages ? 'Saving...' : 'Save All Changes'}
                    </button>
                  </div>
                </div>

                {/* Sub-tab selection bar */}
                <div className="cms-pages-nav">
                  {CMS_PAGE_LIST.map((page) => (
                    <button
                      key={page.id}
                      type="button"
                      className={`cms-page-tab-btn ${selectedCmsPage === page.id ? 'active' : ''}`}
                      onClick={() => setSelectedCmsPage(page.id)}
                    >
                      <span>{page.title}</span>
                      {page.isFaq && (
                        <span style={{ fontSize: '0.72rem', background: selectedCmsPage === page.id ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)', padding: '1px 6px', borderRadius: '4px' }}>
                          Q&amp;A
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="polaris-card" style={{ padding: '24px' }}>
                  {/* Active Page Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--polaris-border)', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                          {settings[`${activeKey}_title`] !== undefined && settings[`${activeKey}_title`].trim() !== '' ? settings[`${activeKey}_title`] : activePageConfig.title}
                        </h2>
                        <span className="status-badge" style={{ fontSize: '0.75rem', background: '#f0fdf4', color: '#008060', border: '1px solid #bbf7d0' }}>
                          {activePageConfig.badge}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
                        Database Setting Key: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{activeKey}</code> &bull; Storefront URL: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>#{selectedCmsPage}</code>
                      </p>
                    </div>

                    {!isFaq && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                          onClick={() => {
                            if (window.confirm('Reset this page content to the standard curated template?')) {
                              setSettings({ ...settings, [activeKey]: DEFAULT_PAGE_TEMPLATES[activeKey] || '' });
                              showToast('Curated template loaded. Click "Save All Changes" to publish.');
                            }
                          }}
                        >
                          <Sparkles size={14} /> Load Curated Template
                        </button>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ fontSize: '0.82rem', padding: '6px 12px', color: '#b91c1c' }}
                          onClick={() => {
                            if (window.confirm('Clear all custom content for this page? (Website will use its default built-in view).')) {
                              setSettings({ ...settings, [activeKey]: '' });
                            }
                          }}
                        >
                          <Trash2 size={14} /> Clear
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Page Title Edit */}
                  <div className="form-group" style={{ marginBottom: '18px', background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label className="form-label" style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                        Storefront Page Title (CMS)
                      </label>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Custom title displayed in header and page banner
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={settings[`${activeKey}_title`] !== undefined ? settings[`${activeKey}_title`] : activePageConfig.title}
                      onChange={(e) => setSettings({ ...settings, [`${activeKey}_title`]: e.target.value })}
                      placeholder={`Custom title for ${activePageConfig.title}...`}
                      style={{ fontSize: '0.95rem', fontWeight: 600, padding: '9px 12px' }}
                    />
                  </div>

                  {/* Our Story Image Edit */}
                  {activeKey === 'page_story' && (
                    <div className="form-group" style={{ marginBottom: '18px', background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label className="form-label" style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                          Our Story Featured Image
                        </label>
                      </div>
                      
                      {settings.page_story_image && (
                        <div style={{ position: 'relative', width: '200px', marginBottom: '10px', borderRadius: '4px', overflow: 'hidden' }}>
                          <img src={formatAssetUrl(settings.page_story_image)} alt="Story" style={{ width: '100%', display: 'block' }} />
                          <button 
                            className="btn-icon delete" 
                            style={{ position: 'absolute', top: '4px', right: '4px', background: 'white' }}
                            onClick={() => setSettings({ ...settings, page_story_image: '' })}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          className="form-control"
                          value={settings.page_story_image || ''}
                          onChange={(e) => setSettings({ ...settings, page_story_image: e.target.value })}
                          placeholder="/images/story-banner.jpg or URL"
                        />
                        <button type="button" className="btn-secondary" onClick={() => document.getElementById('storyImageUpload').click()}>
                          <Upload size={14} /> Upload
                        </button>
                        <input 
                          type="file" 
                          id="storyImageUpload" 
                          style={{ display: 'none' }} 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(e, (path) => setSettings({ ...settings, page_story_image: path }))} 
                        />
                      </div>
                    </div>
                  )}

                  {/* FAQ Specialized Editor */}
                  {isFaq ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          Manage frequently asked questions that visitors can filter and browse.
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                            onClick={() => {
                              if (window.confirm('Reset FAQs to the complete standard 8 questions list?')) {
                                setSettings({ ...settings, page_faq: JSON.stringify(DEFAULT_FAQS_LIST) });
                                showToast('Default FAQs loaded. Click "Save All Changes" to publish.');
                              }
                            }}
                          >
                            <RefreshCw size={14} /> Reset to Defaults
                          </button>
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                            onClick={handleAddFaq}
                          >
                            <Plus size={14} /> Add New FAQ
                          </button>
                        </div>
                      </div>

                      <div className="cms-faqs-container">
                        {getFaqsList().map((faqItem, idx) => (
                          <div key={idx} className="cms-faq-card">
                            <div className="cms-faq-card-header">
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#008060', minWidth: '24px' }}>
                                  #{idx + 1}
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <label style={{ fontSize: '0.78rem', color: '#666', fontWeight: 600 }}>Category:</label>
                                  <select
                                    className="footer-link-select"
                                    style={{ width: '160px', padding: '4px 8px', fontSize: '0.82rem' }}
                                    value={faqItem.category || 'orders'}
                                    onChange={(e) => handleUpdateFaq(idx, 'category', e.target.value)}
                                  >
                                    <option value="orders">Orders &amp; Shipping</option>
                                    <option value="sizing">Sizing &amp; Tailoring</option>
                                    <option value="returns">Returns &amp; Exchanges</option>
                                    <option value="fabrics">Fabric &amp; Care</option>
                                    <option value="payments">Payments &amp; UPI</option>
                                  </select>
                                </div>
                              </div>

                              <div style={{ display: 'flex', gap: '4px' }}>
                                <button
                                  type="button"
                                  className="btn-icon"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveFaq(idx, 'up')}
                                  title="Move Up"
                                >
                                  <ArrowUp size={13} />
                                </button>
                                <button
                                  type="button"
                                  className="btn-icon"
                                  disabled={idx === getFaqsList().length - 1}
                                  onClick={() => handleMoveFaq(idx, 'down')}
                                  title="Move Down"
                                >
                                  <ArrowDown size={13} />
                                </button>
                                <button
                                  type="button"
                                  className="btn-icon delete"
                                  onClick={() => handleDeleteFaq(idx)}
                                  title="Delete Question"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                              <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>Question</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. What fabrics does MaaDrobe use?"
                                value={faqItem.q || ''}
                                onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                                style={{ fontSize: '0.9rem', fontWeight: 500 }}
                              />
                            </div>

                            <div>
                              <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>Answer</label>
                              <textarea
                                className="form-control"
                                rows={2}
                                placeholder="Clear, friendly answer for customers..."
                                value={faqItem.a || ''}
                                onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                                style={{ fontSize: '0.88rem', lineHeight: 1.5 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                        onClick={handleAddFaq}
                      >
                        <Plus size={15} /> Add Another Question
                      </button>
                    </div>
                  ) : (
                    /* MS Word Style Rich Text Page Editor */
                    <div>
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <label className="form-label" style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>
                            Page Content Editor (MS Word Style: Size, Color, Bold, Italic, Highlight)
                          </label>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-subdued)' }}>
                            {wordCount} words &bull; {charCount} characters
                          </span>
                        </div>
                        <WordRichEditor
                          value={currentContent}
                          onChange={(newVal) => setSettings({ ...settings, [activeKey]: newVal })}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <span>
                            &bull; Format text freely using the ribbon toolbar above (color, font size, bold, highlight).
                          </span>
                          <span>Changes update the live storefront automatically upon saving.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--polaris-border)', paddingTop: '16px' }}>
                    <button className="btn-primary" onClick={handleSaveCmsPages} disabled={savingPages}>
                      <Check size={16} /> {savingPages ? 'Saving Changes...' : 'Save All Page Changes'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ========================================================
              TAB H: DISCOUNTS & COUPONS (FULL CRUD)
             ======================================================== */}
          {currentTab === 'coupons' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Discounts</span>
                  <h1 className="page-header-title">Discounts & Coupons</h1>
                  <p className="page-header-subtitle">Create promotional coupon vouchers and percentage discounts.</p>
                </div>
                <div>
                  <button className="btn-primary" onClick={() => openModal('add_coupon')}>
                    <Plus size={16} /> Create Discount
                  </button>
                </div>
              </div>

              <div className="polaris-card">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Voucher Code</th>
                      <th>Discount Type</th>
                      <th>Value</th>
                      <th>Min Spend</th>
                      <th>Max Discount</th>
                      <th>Expiry</th>
                      <th>Redeemed</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map(cp => (
                      <tr key={cp.id}>
                        <td style={{ fontWeight: 700 }}><code>{cp.code}</code></td>
                        <td style={{ textTransform: 'capitalize' }}>{cp.type}</td>
                        <td style={{ fontWeight: 700 }}>
                          {cp.type === 'percentage' ? `${cp.value}% OFF` : `₹${cp.value} OFF`}
                        </td>
                        <td>₹{cp.min_order_amount}</td>
                        <td>{cp.max_discount ? `₹${cp.max_discount}` : 'No cap'}</td>
                        <td>{cp.expiry_date ? new Date(cp.expiry_date).toLocaleDateString() : 'No expiry'}</td>
                        <td>{cp.used_count} / {cp.usage_limit || 'Unlimited'}</td>
                        <td>
                          <span className={`status-badge ${cp.is_active ? 'success' : 'danger'}`}>
                            {cp.is_active ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button className="btn-icon" onClick={() => openModal('edit_coupon', cp)} title="Edit Voucher">
                              <Edit2 size={15} />
                            </button>
                            <button className="btn-icon delete" onClick={() => handleDeleteCoupon(cp.id)} title="Delete Voucher">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB I: APPEARANCE & TYPOGRAPHY (4 FONTS SIMILAR TO POPPINS)
             ======================================================== */}
          {currentTab === 'appearance' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Appearance</span>
                  <h1 className="page-header-title">Storefront Typography & Fonts</h1>
                  <p className="page-header-subtitle">
                    Select from 4 geometric modern fonts similar to Poppins. Changes update the whole website in real-time.
                  </p>
                </div>
                <div>
                  <button 
                    className="btn-primary" 
                    onClick={() => handleApplyFont(selectedFont)}
                    disabled={savingFont}
                  >
                    {savingFont ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    {savingFont ? 'Publishing...' : `Apply & Save Font (${selectedFont})`}
                  </button>
                </div>
              </div>

              {/* Font Choices Grid */}
              <div className="font-cards-grid">
                {FONT_OPTIONS.map(opt => {
                  const isSelected = selectedFont === opt.id;
                  return (
                    <div 
                      key={opt.id}
                      className={`font-choice-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedFont(opt.id)}
                    >
                      <div>
                        <div className="font-card-header">
                          <span className="font-name" style={{ fontFamily: `"${opt.id}", sans-serif` }}>
                            {opt.name}
                          </span>
                          {isSelected ? (
                            <span className="font-selected-indicator">
                              <Check size={14} />
                            </span>
                          ) : (
                            <span className="font-unselected-circle"></span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                          {opt.tagline}
                        </p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-subdued)', marginBottom: '14px', lineHeight: 1.4 }}>
                          {opt.desc}
                        </p>
                      </div>

                      {/* Live Preview Box rendered in this specific font */}
                      <div className="font-preview-box" style={{ fontFamily: `"${opt.id}", sans-serif` }}>
                        <div className="font-preview-heading">
                          {opt.previewHeading}
                        </div>
                        <div className="font-preview-price">
                          {opt.previewPrice}
                        </div>
                        <div className="font-preview-body">
                          {fontSandboxText}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Typography Sandbox */}
              <div className="font-sandbox-box">
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px' }}>
                  Interactive Typography Test Sandbox
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  Type any custom sentence below to see how it looks rendered in your active selection (<strong>{selectedFont}</strong>):
                </p>
                <input 
                  type="text" 
                  className="form-control" 
                  value={fontSandboxText} 
                  onChange={(e) => setFontSandboxText(e.target.value)}
                  placeholder="Type preview text here..."
                  style={{ marginBottom: '16px', fontSize: '0.95rem' }}
                />

                <div style={{
                  padding: '20px',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid var(--polaris-border)',
                  fontFamily: `"${selectedFont}", sans-serif`
                }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-ruby)', marginBottom: '8px' }}>
                    {fontSandboxText}
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 01234567489 ₹ $ € • Pure Organic Fibers & Lucknowi Craft
                  </p>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn-primary" onClick={() => handleApplyFont(selectedFont)}>
                    <Check size={16} /> Save & Apply {selectedFont} Globally
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB J: STORE SETTINGS
             ======================================================== */}
          {currentTab === 'settings' && (
            <div>
              <div className="page-header-banner">
                <div className="page-header-left">
                  <span className="page-header-breadcrumb">MaaDrobe &gt; Settings</span>
                  <h1 className="page-header-title">Store Settings</h1>
                  <p className="page-header-subtitle">Brand identity, contact numbers, and store policies.</p>
                </div>
              </div>

              <div className="polaris-card" style={{ padding: '24px' }}>
                <form onSubmit={handleSaveSettings}>
                  <div className="form-group">
                    <label className="form-label">Store Brand Name</label>
                    <input type="text" className="form-control" value={settings.site_name || ''} onChange={(e) => setSettings({...settings, site_name: e.target.value})} />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Brand Logo URL/Path</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="text" className="form-control" readOnly value={settings.site_logo || ''} />
                      <input 
                        type="file" 
                        id="upload_logo" 
                        style={{ display: 'none' }} 
                        onChange={(e) => handleFileUpload(e, (path) => setSettings({...settings, site_logo: path}))} 
                      />
                      <button type="button" className="btn-secondary" onClick={() => document.getElementById('upload_logo').click()}>
                        <Upload size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Contact Phone</label>
                      <input type="text" className="form-control" value={settings.contact_number || ''} onChange={(e) => setSettings({...settings, contact_number: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">WhatsApp Number (e.g. 919876543210)</label>
                      <input type="text" className="form-control" value={settings.whatsapp_number || ''} onChange={(e) => setSettings({...settings, whatsapp_number: e.target.value})} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Support Email Address</label>
                    <input type="email" className="form-control" value={settings.contact_email || ''} onChange={(e) => setSettings({...settings, contact_email: e.target.value})} />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Instagram Profile URL</label>
                      <input type="text" className="form-control" value={settings.instagram_url || ''} onChange={(e) => setSettings({...settings, instagram_url: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Facebook Profile URL</label>
                      <input type="text" className="form-control" value={settings.facebook_url || ''} onChange={(e) => setSettings({...settings, facebook_url: e.target.value})} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Footer Copyright / About Bio</label>
                    <textarea className="form-control" rows={2} value={settings.footer_text || ''} onChange={(e) => setSettings({...settings, footer_text: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Shipping & Delivery Terms</label>
                    <textarea className="form-control" rows={3} value={settings.shipping_info || ''} onChange={(e) => setSettings({...settings, shipping_info: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Returns & Alterations Policy</label>
                    <textarea className="form-control" rows={3} value={settings.return_policy || ''} onChange={(e) => setSettings({...settings, return_policy: e.target.value})} />
                  </div>

                  {/* Promotional Newsletter Popup Notification Settings */}
                  <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--polaris-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                          Promotional Newsletter Popup Notification
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                          Display the 10% discount subscription modal to visitors on the storefront.
                        </p>
                      </div>
                      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '8px', background: '#f4f6f8', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--polaris-border)' }}>
                        <input
                          type="checkbox"
                          checked={settings.popup_enabled !== '0' && settings.popup_enabled !== false && settings.popup_enabled !== 'false'}
                          onChange={(e) => setSettings({ ...settings, popup_enabled: e.target.checked ? '1' : '0' })}
                          style={{ width: '18px', height: '18px', accentColor: '#008060', cursor: 'pointer' }}
                        />
                        <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                          {settings.popup_enabled !== '0' && settings.popup_enabled !== false && settings.popup_enabled !== 'false' ? (
                            <span style={{ color: '#008060' }}>Popup Enabled</span>
                          ) : (
                            <span style={{ color: '#d72c0d' }}>Popup Disabled</span>
                          )}
                        </span>
                      </label>
                    </div>

                    {(settings.popup_enabled !== '0' && settings.popup_enabled !== false && settings.popup_enabled !== 'false') && (
                      <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid var(--polaris-border)', marginBottom: '16px' }}>
                        <div className="form-group" style={{ marginBottom: '12px' }}>
                          <label className="form-label">Popup Heading Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Unlock 10% Off"
                            value={settings.popup_title !== undefined ? settings.popup_title : 'Unlock 10% Off'}
                            onChange={(e) => setSettings({ ...settings, popup_title: e.target.value })}
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: '12px' }}>
                          <label className="form-label">Popup Description Text</label>
                          <textarea
                            className="form-control"
                            rows={2}
                            placeholder="Join the MaaDrobe Clan today. Subscribe to our newsletter to receive updates on new collections, private sales, and custom tailoring promotions."
                            value={settings.popup_desc !== undefined ? settings.popup_desc : 'Join the MaaDrobe Clan today. Subscribe to our newsletter to receive updates on new collections, private sales, and custom tailoring promotions.'}
                            onChange={(e) => setSettings({ ...settings, popup_desc: e.target.value })}
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Submit Button Label</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Subscribe & Claim 10% Off"
                            value={settings.popup_button_text !== undefined ? settings.popup_button_text : 'Subscribe & Claim 10% Off'}
                            onChange={(e) => setSettings({ ...settings, popup_button_text: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
                    Save Store Settings
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================
          POLARIS MODALS SYSTEM (ORDER, PRODUCT, CATEGORY, BANNER, COUPON)
         ======================================================== */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* A. VIEW ORDER DETAILS MODAL */}
            {modalType === 'view_order' && activeItem && (
              <>
                <div className="modal-header">
                  <h3 className="modal-title">Order Details #{activeItem.order_number}</h3>
                  <button type="button" className="btn-icon" onClick={closeModal}><X size={18} /></button>
                </div>
                <div className="modal-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Customer Contact</h4>
                      <p><strong>Name:</strong> {activeItem.customer_name}</p>
                      <p><strong>Email:</strong> {activeItem.customer_email || 'None'}</p>
                      <p><strong>Phone:</strong> {activeItem.customer_phone}</p>
                      <p><strong>Checkout Method:</strong> {activeItem.checkout_type}</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Shipping Address</h4>
                      <p>{activeItem.shipping_address}</p>
                      <p>{activeItem.city} - {activeItem.pincode}</p>
                      <p><strong>Placed Date:</strong> {new Date(activeItem.created_at).toLocaleString()}</p>
                    </div>
                  </div>

                  {activeItem.custom_tailoring_details && (
                    <div style={{ background: '#FAF6F0', border: '1px solid var(--primary-gold)', padding: '14px', borderRadius: '6px', marginBottom: '18px', fontSize: '0.88rem' }}>
                      <h4 style={{ color: 'var(--primary-ruby)', marginBottom: '6px' }}>Bespoke Custom Tailoring Specifications</h4>
                      <p style={{ whiteSpace: 'pre-line' }}>{activeItem.custom_tailoring_details}</p>
                    </div>
                  )}

                  <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Items in Order</h4>
                  <table className="premium-table" style={{ border: '1px solid var(--polaris-border)', marginBottom: '20px' }}>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Options</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeItem.items?.map(item => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 600 }}>{item.product_name}</td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {item.size && `Size: ${item.size}`}{item.color && `, Color: ${item.color}`}
                          </td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                      <tr style={{ background: '#f9fafb' }}>
                        <td colSpan="4" style={{ fontWeight: 700, textAlign: 'right' }}>Total Order Amount:</td>
                        <td style={{ fontWeight: 800, color: 'var(--primary-ruby)' }}>₹{activeItem.total_amount}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Order Lifecycle Status</label>
                      <select 
                        className="form-control"
                        defaultValue={activeItem.status}
                        onChange={(e) => handleUpdateOrderStatus(activeItem.id, e.target.value, activeItem.payment_status)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Payment Status</label>
                      <select 
                        className="form-control"
                        defaultValue={activeItem.payment_status}
                        onChange={(e) => handleUpdateOrderStatus(activeItem.id, activeItem.status, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="pending_confirmation">Pending Confirmation (WhatsApp)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* B. ADD / EDIT PRODUCT MODAL */}
            {(modalType === 'add_product' || modalType === 'edit_product') && (
              <ProductFormModal 
                categories={categories}
                activeItem={activeItem}
                onSave={handleSaveProduct}
                onClose={closeModal}
                handleFileUpload={handleFileUpload}
                formatAssetUrl={formatAssetUrl}
                isUploading={isUploading}
              />
            )}

            {/* C. ADD / EDIT CATEGORY MODAL */}
            {(modalType === 'add_category' || modalType === 'edit_category') && (
              <CategoryFormModal 
                activeItem={activeItem}
                onSave={handleSaveCategory}
                onClose={closeModal}
                handleFileUpload={handleFileUpload}
                formatAssetUrl={formatAssetUrl}
                isUploading={isUploading}
              />
            )}

            {/* D. ADD / EDIT BANNER MODAL */}
            {(modalType === 'add_banner' || modalType === 'edit_banner') && (
              <BannerFormModal 
                activeItem={activeItem}
                onSave={handleSaveBanner}
                onClose={closeModal}
                handleFileUpload={handleFileUpload}
                formatAssetUrl={formatAssetUrl}
                isUploading={isUploading}
              />
            )}

            {/* E. ADD / EDIT COUPON MODAL */}
            {(modalType === 'add_coupon' || modalType === 'edit_coupon') && (
              <CouponFormModal 
                activeItem={activeItem}
                onSave={handleSaveCoupon}
                onClose={closeModal}
              />
            )}

          </div>
        </div>
      )}

      {/* Product Picker Modal for Homepage Sections */}
      {productPickerState.isOpen && (
        <ProductPickerModal 
          isOpen={productPickerState.isOpen}
          title={productPickerState.title}
          initialSelectedIds={productPickerState.selectedIds}
          products={products}
          categories={categories}
          formatAssetUrl={formatAssetUrl}
          onClose={() => setProductPickerState(prev => ({ ...prev, isOpen: false }))}
          onConfirm={handleConfirmProductPicker}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// SUB-FORM COMPONENT MODALS
// -------------------------------------------------------------

function ProductFormModal({ categories, activeItem, onSave, onClose, handleFileUpload, formatAssetUrl, isUploading }) {
  const [name, setName] = useState(activeItem?.name || '');
  const [sku, setSku] = useState(activeItem?.sku || '');
  const [price, setPrice] = useState(activeItem?.price || '');
  const [originalPrice, setOriginalPrice] = useState(activeItem?.original_price || '');
  const [categoryId, setCategoryId] = useState(activeItem?.category_id || categories[0]?.id || '');
  const [tag, setTag] = useState(activeItem?.tag || '');
  const [stock, setStock] = useState(activeItem?.stock || 0);
  const [description, setDescription] = useState(activeItem?.description || '');
  const [isActive, setIsActive] = useState(activeItem ? activeItem.is_active : true);
  const [isFeatured, setIsFeatured] = useState(activeItem ? activeItem.is_featured : false);
  const [isNewArrival, setIsNewArrival] = useState(activeItem ? activeItem.is_new_arrival : false);
  const [ordering, setOrdering] = useState(activeItem?.ordering || 0);
  
  const defaultSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  const [selectedSizes, setSelectedSizes] = useState(activeItem?.sizes?.map(s => s.size) || ['M', 'L']);
  
  const [fabricDetails, setFabricDetails] = useState(activeItem?.fabric_details || '100% pure organic cotton and premium georgette linings. Features artisanal handblock printing and authentic hand-embroidered details. Color bleeding tested and reinforced seams.');
  const [shippingDetails, setShippingDetails] = useState(activeItem?.shipping_details || 'We offer free express shipping pan-India. Delivery takes 3 to 5 business days. Once shipped, live tracking details are sent automatically to your WhatsApp number.');
  const [exchangeDetails, setExchangeDetails] = useState(activeItem?.exchange_details || 'We offer a 7-day hassle-free exchange policy. Your garment will be picked up from your doorstep at no extra cost, and the replacement size will be dispatched immediately.');
  
  const [enableFabricDetails, setEnableFabricDetails] = useState(activeItem ? (activeItem.enable_fabric_details ?? true) : true);
  const [enableShippingDetails, setEnableShippingDetails] = useState(activeItem ? (activeItem.enable_shipping_details ?? true) : true);
  const [enableExchangeDetails, setEnableExchangeDetails] = useState(activeItem ? (activeItem.enable_exchange_details ?? true) : true);
  
  const [sizeGuideImage, setSizeGuideImage] = useState(activeItem?.size_guide_image || '');
  const [images, setImages] = useState(activeItem?.images?.map(img => ({ path: img.image_path, is_thumbnail: img.is_thumbnail })) || []);

  const handleToggleSize = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const addImageToProduct = (path) => {
    setImages(prev => [...prev, { path, is_thumbnail: prev.length === 0 }]);
  };

  const removeImageFromProduct = (index) => {
    setImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const setAsThumbnail = (index) => {
    setImages(prev => prev.map((img, idx) => ({ ...img, is_thumbnail: idx === index })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image for the product design.");
      return;
    }
    onSave({
      name, sku, price, original_price: originalPrice, category_id: categoryId,
      tag, stock, description, is_active: isActive, is_featured: isFeatured,
      is_new_arrival: isNewArrival, ordering, sizes: selectedSizes,
      fabric_details: fabricDetails, shipping_details: shippingDetails, exchange_details: exchangeDetails,
      enable_fabric_details: enableFabricDetails, enable_shipping_details: enableShippingDetails, enable_exchange_details: enableExchangeDetails,
      size_guide_image: sizeGuideImage,
      images
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h3 className="modal-title">{activeItem ? 'Edit Product Design' : 'Add New Product Design'}</h3>
        <button type="button" className="btn-icon" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label className="form-label">Product / Garment Name</label>
          <input type="text" required className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">SKU Identifier Code</label>
            <input type="text" className="form-control" placeholder="Auto-generated if blank" value={sku} onChange={(e) => setSku(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Retail Price (₹)</label>
            <input type="number" required className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Original Price (Strikeout - ₹)</label>
            <input type="number" className="form-control" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Inventory Stock Quantity</label>
            <input type="number" required className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Badge Tag (e.g. BEST SELLER)</label>
            <input type="text" className="form-control" value={tag} onChange={(e) => setTag(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* Sizes */}
        <div className="form-group">
          <label className="form-label">Available Sizes</label>
          <div className="checkbox-list">
            {defaultSizes.map(sz => (
              <label key={sz} className="checkbox-item">
                <input type="checkbox" checked={selectedSizes.includes(sz)} onChange={() => handleToggleSize(sz)} />
                <span>{sz}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Policies */}
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label">Fabric & Craftsmanship Details</label>
            <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input type="checkbox" checked={enableFabricDetails} onChange={e => setEnableFabricDetails(e.target.checked)} />
              Enable
            </label>
          </div>
          <textarea className="form-control" rows={2} value={fabricDetails} onChange={(e) => setFabricDetails(e.target.value)} disabled={!enableFabricDetails} />
        </div>
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label">Free Shipping & WhatsApp Tracking</label>
            <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input type="checkbox" checked={enableShippingDetails} onChange={e => setEnableShippingDetails(e.target.checked)} />
              Enable
            </label>
          </div>
          <textarea className="form-control" rows={2} value={shippingDetails} onChange={(e) => setShippingDetails(e.target.value)} disabled={!enableShippingDetails} />
        </div>
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label">Custom Exchanges</label>
            <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input type="checkbox" checked={enableExchangeDetails} onChange={e => setEnableExchangeDetails(e.target.checked)} />
              Enable
            </label>
          </div>
          <textarea className="form-control" rows={2} value={exchangeDetails} onChange={(e) => setExchangeDetails(e.target.value)} disabled={!enableExchangeDetails} />
        </div>

        {/* Size Guide Image */}
        <div className="form-group">
          <label className="form-label">Size Guide Image (Optional)</label>
          <div className="media-uploader" onClick={() => document.getElementById('size_guide_file_input').click()}>
            <Upload size={22} style={{ display: 'block', margin: '0 auto 8px auto', color: '#008060' }} />
            <p style={{ fontSize: '0.85rem' }}>{isUploading ? 'Uploading...' : 'Click to Upload Size Guide'}</p>
            <input 
              type="file" 
              id="size_guide_file_input" 
              style={{ display: 'none' }} 
              onChange={(e) => handleFileUpload(e, setSizeGuideImage)} 
            />
          </div>
          {sizeGuideImage && (
            <div className="media-preview-container" style={{ marginTop: 10 }}>
              <div className="media-preview-item" style={{ width: '100px', height: '100px' }}>
                <img src={formatAssetUrl(sizeGuideImage)} alt="Size Guide Preview" className="media-preview-img" style={{ objectFit: 'contain' }} />
                <button type="button" className="media-preview-remove" onClick={() => setSizeGuideImage('')}><X size={10} /></button>
              </div>
            </div>
          )}
        </div>

        {/* Image upload preview */}
        <div className="form-group">
          <label className="form-label">Product Visuals & Cover</label>
          <div className="media-uploader" onClick={() => document.getElementById('product_file_input').click()}>
            <Upload size={22} style={{ display: 'block', margin: '0 auto 8px auto', color: '#008060' }} />
            <p style={{ fontSize: '0.85rem' }}>{isUploading ? 'Uploading to Server...' : 'Click to Upload Image from Device'}</p>
            <input 
              type="file" 
              id="product_file_input" 
              style={{ display: 'none' }} 
              onChange={(e) => handleFileUpload(e, addImageToProduct)} 
            />
          </div>

          <div className="media-preview-container">
            {images.map((img, idx) => (
              <div key={idx} className="media-preview-item" style={{ border: img.is_thumbnail ? '2px solid #008060' : '1px solid #ddd' }}>
                <img src={formatAssetUrl(img.path)} alt="Preview" className="media-preview-img" />
                <button type="button" className="media-preview-remove" onClick={() => removeImageFromProduct(idx)}><X size={10} /></button>
                <button 
                  type="button" 
                  style={{
                    position: 'absolute', bottom: '2px', left: '2px', background: img.is_thumbnail ? '#008060' : 'rgba(0,0,0,0.6)',
                    color: 'white', border: 'none', fontSize: '8px', padding: '2px 4px', borderRadius: '2px', cursor: 'pointer'
                  }}
                  onClick={() => setAsThumbnail(idx)}
                >
                  {img.is_thumbnail ? 'Cover' : 'Set Cover'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="checkbox-list" style={{ marginTop: '16px' }}>
          <label className="checkbox-item">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            <span>Active on Storefront</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            <span>Featured in Recommendations</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)} />
            <span>New Arrival Badge</span>
          </label>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary">Save Product</button>
      </div>
    </form>
  );
}

function CategoryFormModal({ activeItem, onSave, onClose, handleFileUpload, formatAssetUrl, isUploading }) {
  const [name, setName] = useState(activeItem?.name || '');
  const [slug, setSlug] = useState(activeItem?.slug || '');
  const [description, setDescription] = useState(activeItem?.description || '');
  const [imagePath, setImagePath] = useState(activeItem?.image_path || '');
  const [isActive, setIsActive] = useState(activeItem ? activeItem.is_active : true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, slug, description, image_path: imagePath, is_active: isActive });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h3 className="modal-title">{activeItem ? 'Edit Collection' : 'Create New Collection'}</h3>
        <button type="button" className="btn-icon" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label className="form-label">Collection Title</label>
          <input type="text" required className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">URL Slug (e.g. chikankari-kurtis)</label>
          <input type="text" className="form-control" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Short Description</label>
          <textarea className="form-control" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Collection Banner Image</label>
          <div className="media-uploader" onClick={() => document.getElementById('category_file_input').click()}>
            <Upload size={22} style={{ display: 'block', margin: '0 auto 8px auto', color: '#008060' }} />
            <p style={{ fontSize: '0.85rem' }}>{isUploading ? 'Uploading...' : 'Click to Upload Image'}</p>
            <input type="file" id="category_file_input" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setImagePath)} />
          </div>
          {imagePath && (
            <div style={{ marginTop: '12px' }}>
              <img src={formatAssetUrl(imagePath)} alt="Category Preview" style={{ width: 100, height: 75, objectFit: 'cover', borderRadius: 4 }} />
            </div>
          )}
        </div>
        <label className="checkbox-item" style={{ marginTop: '14px' }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <span>Visible in Navigation</span>
        </label>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary">Save Collection</button>
      </div>
    </form>
  );
}

function BannerFormModal({ activeItem, onSave, onClose, handleFileUpload, formatAssetUrl, isUploading }) {
  const [title, setTitle] = useState(activeItem?.title || '');
  const [subtitle, setSubtitle] = useState(activeItem?.subtitle || '');
  const [tag, setTag] = useState(activeItem?.tag || '');
  const [ctaText, setCtaText] = useState(activeItem?.cta_text || 'SHOP NOW →');
  const [viewPath, setViewPath] = useState(activeItem?.view_path || 'coords');
  const [linkUrl, setLinkUrl] = useState(activeItem?.cta_link || activeItem?.link_url || '');
  const [imagePath, setImagePath] = useState(activeItem?.image_path || '');
  const [ordering, setOrdering] = useState(activeItem?.ordering ?? 1);
  const [isActive, setIsActive] = useState(activeItem ? activeItem.is_active : true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imagePath) {
      alert("Please upload an image for the carousel slide banner.");
      return;
    }
    onSave({ 
      title, 
      subtitle, 
      tag,
      cta_text: ctaText,
      view_path: viewPath,
      cta_link: linkUrl, 
      image_path: imagePath, 
      ordering: parseInt(ordering) || 1, 
      is_active: isActive 
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h3 className="modal-title">{activeItem ? 'Edit Hero Banner Slide' : 'Add New Hero Banner Slide'}</h3>
        <button type="button" className="btn-icon" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label className="form-label">Headline Title</label>
          <input type="text" required className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Handcrafted Anarkali Kurti Set" />
        </div>
        <div className="form-group">
          <label className="form-label">Subtitle Caption</label>
          <input type="text" className="form-control" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="e.g. Designed in a soft off-white base with refreshing motifs." />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label className="form-label">Badge Tag / Accent</label>
            <input type="text" className="form-control" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g. Festive Special or Premium" />
          </div>
          <div className="form-group">
            <label className="form-label">Button Text (CTA)</label>
            <input type="text" className="form-control" value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="e.g. SHOP NOW →" />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label className="form-label">Target Collection View</label>
            <select className="form-control" value={viewPath} onChange={(e) => setViewPath(e.target.value)}>
              <option value="kurti">Kurtis (kurti)</option>
              <option value="dresses">Dresses (dresses)</option>
              <option value="kurtasets">Kurta Sets (kurtasets)</option>
              <option value="coords">Co-ord Sets (coords)</option>
              <option value="sale">Sale / Offers (sale)</option>
              <option value="shop">All Collections (shop)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Slide Display Order</label>
            <input type="number" min="1" className="form-control" value={ordering} onChange={(e) => setOrdering(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Banner Visual (Desktop / Mobile High-Res)</label>
          <div className="media-uploader" onClick={() => document.getElementById('banner_file_input').click()}>
            <Upload size={22} style={{ display: 'block', margin: '0 auto 8px auto', color: '#008060' }} />
            <p style={{ fontSize: '0.85rem' }}>{isUploading ? 'Uploading to Server...' : 'Click to Upload Banner Image'}</p>
            <input type="file" id="banner_file_input" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setImagePath)} />
          </div>
          {imagePath && (
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={formatAssetUrl(imagePath)} alt="Banner Preview" style={{ width: 180, height: 90, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Active slide asset preview</span>
            </div>
          )}
        </div>
        <label className="checkbox-item" style={{ marginTop: '14px' }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <span>Active in Carousel (Will automatically cycle on website)</span>
        </label>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary">Save Banner Slide</button>
      </div>
    </form>
  );
}

function CouponFormModal({ activeItem, onSave, onClose }) {
  const [code, setCode] = useState(activeItem?.code || '');
  const [type, setType] = useState(activeItem?.type || 'percentage');
  const [value, setValue] = useState(activeItem?.value || '');
  const [minOrderAmount, setMinOrderAmount] = useState(activeItem?.min_order_amount || 0);
  const [maxDiscount, setMaxDiscount] = useState(activeItem?.max_discount || '');
  const [expiryDate, setExpiryDate] = useState(activeItem?.expiry_date ? activeItem.expiry_date.split('T')[0] : '');
  const [usageLimit, setUsageLimit] = useState(activeItem?.usage_limit || '');
  const [isActive, setIsActive] = useState(activeItem ? activeItem.is_active : true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      code: code.toUpperCase(),
      type,
      value,
      min_order_amount: minOrderAmount,
      max_discount: maxDiscount || null,
      expiry_date: expiryDate || null,
      usage_limit: usageLimit || null,
      is_active: isActive
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h3 className="modal-title">{activeItem ? 'Edit Discount Code' : 'Create Discount Voucher'}</h3>
        <button type="button" className="btn-icon" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label className="form-label">Coupon Code (Uppercase e.g. FESTIVE15)</label>
          <input type="text" required className="form-control" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Flat Amount (₹)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Discount Value ({type === 'percentage' ? '%' : '₹'})</label>
            <input type="number" required className="form-control" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Minimum Order Spend (₹)</label>
            <input type="number" className="form-control" value={minOrderAmount} onChange={(e) => setMinOrderAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Maximum Discount Cap (₹)</label>
            <input type="number" className="form-control" placeholder="Optional" value={maxDiscount} onChange={(e) => setMaxDiscount(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Expiry Date</label>
            <input type="date" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Usage Limit (Total Times)</label>
            <input type="number" className="form-control" placeholder="Leave empty for unlimited" value={usageLimit} onChange={(e) => setUsageLimit(e.target.value)} />
          </div>
        </div>
        <label className="checkbox-item" style={{ marginTop: '14px' }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <span>Active & Redeemable</span>
        </label>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary">Save Discount</button>
      </div>
    </form>
  );
}

// -------------------------------------------------------------
// PRODUCT PICKER MODAL FOR HOMEPAGE SECTIONS
// -------------------------------------------------------------
function ProductPickerModal({ isOpen, title, initialSelectedIds = [], products = [], categories = [], formatAssetUrl, onClose, onConfirm }) {
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds.map(String));
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  if (!isOpen) return null;

  const toggleSelect = (id) => {
    const sId = String(id);
    if (selectedIds.includes(sId)) {
      setSelectedIds(selectedIds.filter(i => i !== sId));
    } else {
      setSelectedIds([...selectedIds, sId]);
    }
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'ALL' || String(p.category_id) === String(categoryFilter);
    return matchesSearch && matchesCat;
  });

  const handleSelectAllFiltered = () => {
    const filteredIds = filtered.map(p => String(p.id));
    const combined = Array.from(new Set([...selectedIds, ...filteredIds]));
    setSelectedIds(combined);
  };

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  return (
    <div className="product-picker-overlay" onClick={onClose}>
      <div className="product-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="product-picker-header">
          <div>
            <h3 className="product-picker-title">{title || 'Select Products for Section'}</h3>
            <span style={{ fontSize: '0.82rem', color: '#6d7175' }}>
              Check items to feature them in this section on the storefront.
            </span>
          </div>
          <button type="button" className="btn-icon" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="product-picker-toolbar">
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by product name or SKU..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '32px' }}
            />
            <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#8c9196' }} />
          </div>

          <select 
            className="form-control" 
            style={{ width: 170 }} 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <button type="button" className="btn-secondary" onClick={handleSelectAllFiltered} style={{ fontSize: '0.82rem', padding: '7px 12px' }}>
            Select Filtered ({filtered.length})
          </button>
          {selectedIds.length > 0 && (
            <button type="button" className="btn-secondary" onClick={handleClearAll} style={{ fontSize: '0.82rem', padding: '7px 12px', color: '#d82c0d' }}>
              Clear All
            </button>
          )}
        </div>

        <div className="product-picker-list">
          {filtered.length === 0 ? (
            <div style={{ padding: '36px', textAlign: 'center', color: '#8c9196' }}>
              No products found matching your filter criteria.
            </div>
          ) : (
            filtered.map(p => {
              const isSelected = selectedIds.includes(String(p.id));
              const coverImg = p.images?.[0]?.image_path || (typeof p.image === 'string' ? p.image : '/images/placeholder.jpg');
              return (
                <div 
                  key={p.id} 
                  className={`product-picker-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleSelect(p.id)}
                >
                  <input 
                    type="checkbox" 
                    className="product-picker-row-checkbox"
                    checked={isSelected} 
                    onChange={() => {}} 
                  />
                  <img 
                    src={formatAssetUrl(coverImg)} 
                    alt={p.name} 
                    className="product-picker-row-thumb" 
                    onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                  />
                  <div className="product-picker-row-title">
                    <div>{p.name}</div>
                    {p.sku && <span style={{ fontSize: '0.74rem', color: '#8c9196' }}>SKU: {p.sku}</span>}
                  </div>
                  <span className="product-picker-row-category">
                    {p.category?.name || categories.find(c => String(c.id) === String(p.category_id))?.name || 'Category'}
                  </span>
                  <span className="product-picker-row-price">
                    ₹{Number(p.price || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="product-picker-footer">
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#202223' }}>
            <span style={{ color: '#008060', fontWeight: 700 }}>{selectedIds.length}</span> products selected
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={() => onConfirm(selectedIds)}
            >
              <Check size={15} /> Apply Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

