import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Trash2, Plus, Minus, QrCode, X, Search, 
  CheckCircle, Printer, Share2, Coffee, Leaf, Info, MapPin
} from 'lucide-react';


const LogoSenja = ({ className }) => (
  <motion.div
    className={className}
    whileHover={{ 
      filter: "drop-shadow(0px 8px 15px rgba(255, 143, 0, 0.3))",
      scale: 1.05 
    }}
    transition={{ duration: 0.3 }}
  >
    <svg 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path d="M165.5 105C130 110 100 150 100 200C100 250 130 290 165.5 295V105Z" fill="#3E2723"/>
      <path d="M165.5 105C150 120 145 150 150 200C155 250 160 280 165.5 295" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      
      <path d="M234.5 105C270 110 300 150 300 200C300 250 270 290 234.5 295V105Z" fill="#3E2723" transform="scale(-1 1) translate(-400 0)"/>
      <path d="M250 105C265 120 270 150 265 200C260 250 255 280 250 295" stroke="white" strokeWidth="4" strokeLinecap="round"/>

      <circle cx="200" cy="180" r="35" fill="#FF8F00"/>
      <rect x="160" y="200" width="80" height="4" fill="white"/>

      <text x="200" y="340" textAnchor="middle" fill="#FF8F00" fontSize="55" fontWeight="900" fontFamily="sans-serif">Senja</text>
      <text x="200" y="385" textAnchor="middle" fill="#3E2723" fontSize="28" fontWeight="bold" fontFamily="sans-serif">Coffee</text>
    </svg>
  </motion.div>
);

const LOCAL_MENU = {
  "Coffee": [
    { id: 1, name: "Senja Latte", price: 28000, photo: "/senja.avif" },
    { id: 2, name: "Creamy Americano", price: 22000, photo: "/amer.jpg" },
    { id: 3, name: "Caramel Cappuccino", price: 25000, photo: "/kopi.jpg"},
    { id: 4, name: "Maciatho Caramel", price: 22000, photo: "/kopi.jpg" }
  ],
  "Non-Coffee": [
    { id: 5, name: "Matcha Latte", price: 30000, photo: "/matcha.jpg" },
    { id: 6, name: "Es Coklat", price: 32000, photo: "/es coklat.jpg" },
    { id: 7, name: "Red Velvet Ice", price: 29000, photo: "/red-velvet.webp" }
  ],
  "Snack": [
    { id: 8, name: "Sate Taichan", price: 25000, photo: "/sate.jpg" },
    { id: 9, name: "Butter Croissant", price: 22000, photo: "/ceoisant.png" }
  ],
  "Dessert": [
    { id: 10, name: "Waffle Ice Cream", price: 30000, photo: "/waffle.jpg" }
  ],
  "Food": [
    { id: 12, name: "Nasi Goreng Senja", price: 35000, photo: "/nasigoreng.png" },
    { id: 13, name: "Mie Goreng Jawa", price: 32000, photo: "/miejawa.png" }
]
};

const Navigation = () => {
  const location = useLocation();
  const navLinks = [
    { path: '/', label: 'Sejarah Senja', icon: <Info size={18} /> },
    { path: '/ingredients', label: 'Bahan Baku', icon: <Leaf size={18} /> },
    { path: '/menu', label: 'Kasir & Menu', icon: <Coffee size={18} /> },
    { path: '/space', label: 'Senja Space', icon: <MapPin size={18} /> }
  ];

  return (
    <nav className="bg-coffee-dark text-white p-4 shadow-xl flex justify-center gap-6 z-50 relative">
      {navLinks.map((link) => (
        <Link 
          key={link.path} 
          to={link.path}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            location.pathname === link.path ? 'bg-coffee-accent text-white font-bold' : 'hover:bg-coffee-medium text-coffee-cream'
          }`}
        >
          {link.icon}
          <span className="hidden md:inline">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
};

const Home = () => {
  const [wpData, setWpData] = useState(null);

  useEffect(() => {
    fetch('http://localhost/wordpress/wp-json/wp/v2/posts?slug=sejarah-senja')
      .then(res => res.json())
      .then(data => setWpData(data[0]))
      .catch(err => console.log(err));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-coffee-cream p-10 flex flex-col items-center"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl bg-white p-12 rounded-[40px] shadow-2xl mt-10 text-center flex flex-col items-center"
      >
        <LogoSenja className="w-48 h-48 mb-8" />
        
        <h1 className="text-5xl font-serif italic text-coffee-dark mb-6">Cerita di Balik Senja</h1>
        
        <div className="border-t border-coffee-light/20 pt-8 w-full">
          {wpData ? (
            <div 
              dangerouslySetInnerHTML={{ __html: wpData.content.rendered }} 
              className="text-coffee-medium leading-relaxed prose prose-coffee max-w-none" 
            />
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-coffee-medium leading-relaxed">
                Berdiri pada tahun 2026, Senja Coffee lahir dari sebuah ide sederhana di Pangkalan Bun. 
                Kami percaya bahwa setiap cangkir kopi memiliki ceritanya sendiri.
              </p>
              <p className="text-lg text-coffee-medium leading-relaxed font-serif italic">
                "Senja Coffee bukan sekadar tempat singgah, melainkan ruang di mana ide, tawa, dan ketenangan menyatu bersama aroma kopi pilihan."
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex gap-4">
          <div className="h-1 w-12 bg-coffee-accent rounded-full"></div>
          <div className="h-1 w-4 bg-coffee-dark rounded-full"></div>
          <div className="h-1 w-12 bg-coffee-accent rounded-full"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Ingredients = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardData = [
    {
      title: "Biji Kopi Arabika Pilihan",
      icon: <Leaf className="text-coffee-accent w-12 h-12 mb-4" />,
      desc: "Dipanen langsung dari dataran tinggi dengan proses pemanggangan (roasting) medium-dark untuk menjaga keseimbangan rasa asam dan pahit.",
      borderColor: "border-coffee-accent"
    },
    {
      title: "Susu Sapi Segar",
      icon: <Coffee className="text-coffee-dark w-12 h-12 mb-4" />,
      desc: "Kami menggunakan susu segar yang dipasteurisasi setiap pagi untuk memberikan tekstur creamy yang sempurna pada setiap gelas Latte.",
      borderColor: "border-coffee-dark"
    },
    {
      title: "Pemanis Alami",
      icon: <ShoppingCart className="text-pink-700 w-12 h-12 mb-4" />,
      desc: "Menggunakan gula aren cair organik dan madu murni tanpa pengawet untuk sentuhan manis yang tidak merusak cita rasa asli minuman.",
      borderColor: "border-pink-700"
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-coffee-cream p-10"
    >
      <motion.h1 
        variants={cardVariants}
        className="text-4xl font-serif italic text-coffee-dark mb-10 text-center"
      >
        Material Kualitas Tinggi Kami
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cardData.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -15, 
              scale: 1.02,
              boxShadow: "0px 20px 30px rgba(62, 39, 35, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
            className={`bg-white p-8 rounded-[40px] shadow-lg border-t-8 ${item.borderColor} cursor-pointer transition-shadow`}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.icon}
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-3 text-coffee-dark">{item.title}</h2>
            <p className="text-coffee-medium leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ContactSpace = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="min-h-screen bg-coffee-dark text-white p-10 flex flex-col items-center justify-center relative overflow-hidden"
  >
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
        x: [0, 30, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 -left-20 w-80 h-80 bg-coffee-accent rounded-full blur-[100px] pointer-events-none"
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.05, 0.15, 0.05],
        x: [0, -40, 0],
        y: [0, 40, 0]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/4 -right-20 w-96 h-96 bg-coffee-cream rounded-full blur-[120px] pointer-events-none"
    />

    <div className="max-w-3xl text-center space-y-6 relative z-10">
      <h1 className="text-5xl font-serif italic mb-4">Temukan Ruang Senjamu</h1>
      <p className="text-coffee-cream text-lg">Buka setiap hari mulai pukul 08:00 - 23:00 WIB.</p>
      
      <motion.div 
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0px 0px 50px 10px rgba(255, 143, 0, 0.15)",
          borderColor: "rgba(255, 143, 0, 0.4)"
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white/10 p-8 rounded-[40px] backdrop-blur-md mt-8 border border-white/20 shadow-2xl transition-colors duration-300"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <MapPin className="mx-auto w-16 h-16 text-coffee-accent mb-4" />
        </motion.div>
        
        <h3 className="text-2xl font-bold mb-2">Pangkalan Bun, Kotawaringin Barat</h3>
        <p className="text-gray-300 mb-6">Jl. bahari, Pangkalan Bun, Kalimantan Tengah</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.a 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://instagram.com/bryant_adk" 
            target="_blank" 
            className="bg-linear-to-tr from-yellow-400 to-pink-600 px-8 py-3 rounded-full font-bold shadow-lg shadow-pink-600/20 transition"
          >
            Instagram Kami
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/6282244888041" 
            target="_blank" 
            className="bg-green-500 px-8 py-3 rounded-full font-bold shadow-lg shadow-green-500/20 transition"
          >
            Reservasi via WA
          </motion.a>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const PosMenu = () => {
  const [activeCategory, setActiveCategory] = useState("Coffee");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const allItems = Object.values(LOCAL_MENU).flat();
  const displayedMenu = searchTerm 
    ? allItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : LOCAL_MENU[activeCategory];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const handleConfirmPayment = () => {
    if (cart.length === 0) return;
    
    const orderNo = Math.floor(100000 + Math.random() * 900000);
    const today = new Date();
    
    setReceiptData({
      items: [...cart],
      subtotal: totalPrice,
      total: totalPrice,
      orderNo: orderNo,
      dateTime: today.toLocaleString('id-ID'),
      posId: "0919288129121"
    });
    
    setCart([]);
    setShowReceipt(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-68px)] overflow-hidden bg-coffee-cream">
      {/* KIRI: MENU */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif italic text-coffee-dark">Kasir Digital</h1>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari menu..." 
              className="pl-10 pr-4 py-2 bg-white rounded-full text-sm w-48 outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar">
          {Object.keys(LOCAL_MENU).map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSearchTerm(""); }}
              className={`px-5 py-2 rounded-full font-bold text-xs uppercase transition-all ${
                activeCategory === cat && !searchTerm ? 'bg-coffee-dark text-white' : 'bg-white text-coffee-medium hover:bg-coffee-light/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {displayedMenu.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => addToCart(item)}
                className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-coffee-accent flex flex-col"
              >
                <div className="aspect-square rounded-[20px] overflow-hidden mb-4 bg-gray-100">
                  <img src={item.photo} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-sm text-coffee-dark grow">{item.name}</h3>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <p className="text-coffee-light font-black text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                  <div className="bg-coffee-cream p-1.5 rounded-lg text-coffee-dark"><Plus size={14}/></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full md:w-96 bg-white border-l border-gray-200 p-6 flex flex-col h-full shadow-2xl">
        <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2 text-coffee-dark">
          <ShoppingCart size={20} /> Pesanan
        </h2>

        <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl relative group">
              <button onClick={() => removeFromCart(item.id)} className="absolute -left-2 -top-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"><Trash2 size={12}/></button>
              <div className="flex gap-3">
                <img src={item.photo} className="w-10 h-10 object-cover rounded-xl" alt="" />
                <div>
                  <h4 className="font-bold text-xs">{item.name}</h4>
                  <p className="text-[10px] text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-sm">
                <button onClick={() => updateQty(item.id, -1)} className="text-red-400"><Minus size={12}/></button>
                <span className="font-bold text-xs w-3 text-center">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="text-green-500"><Plus size={12}/></button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200">
          <div className="flex justify-between mb-4 text-xl font-black text-coffee-dark">
            <span>Total</span>
            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
          <button 
            onClick={handleConfirmPayment} 
            disabled={cart.length === 0} 
            className="w-full bg-coffee-dark text-white py-4 rounded-2xl font-bold hover:bg-coffee-medium transition disabled:opacity-50"
          >
            BAYAR SEKARANG
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showReceipt && receiptData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-300 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-sm rounded-[30px] overflow-hidden flex flex-col">
              <div className="bg-gray-100 pt-8 pb-6 px-6 flex flex-col items-center border-b">
                <CheckCircle size={40} className="text-green-500 mb-3" />
                <h2 className="text-xl font-bold mb-1">Pembayaran Berhasil!</h2>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total</p>
                <h1 className="text-3xl font-black">Rp {receiptData.total.toLocaleString('id-ID')}</h1>
              </div>
              <div className="p-6 text-sm">
                <div className="text-center mb-4">
                   <h3 className="font-serif font-bold text-lg italic text-coffee-dark">Senja Coffee</h3>
                   <p className="text-xs text-gray-500">Pangkalan Bun</p>
                </div>
                <div className="space-y-2 mb-4 border-b border-dashed pb-4">
                  {receiptData.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span>{item.qty}x {item.name}</span>
                      <span className="font-medium">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-gray-400 space-y-1">
                  <div className="flex justify-between"><span>Order No:</span><span>{receiptData.orderNo}</span></div>
                  <div className="flex justify-between"><span>Date:</span><span>{receiptData.dateTime}</span></div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex gap-2 border-t">
                <button onClick={() => setShowReceipt(false)} className="px-4 py-2 bg-white border rounded-xl"><X size={18} /></button>
                <button className="flex-1 bg-coffee-dark text-white py-2 rounded-xl font-bold flex justify-center items-center gap-2"><Share2 size={16}/> Bagikan</button>
                <button className="flex-1 bg-white border border-coffee-dark text-coffee-dark py-2 rounded-xl font-bold flex justify-center items-center gap-2"><Printer size={16}/> Cetak</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="font-sans text-coffee-dark flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/menu" element={<PosMenu />} />
            <Route path="/space" element={<ContactSpace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}