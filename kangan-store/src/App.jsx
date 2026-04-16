import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Search, ShoppingCart, User, MapPin, Phone, Mail, 
  Menu, ChevronRight, CheckCircle, Star, Heart, 
  ArrowRight, ShoppingBag, ShieldCheck, Truck, RefreshCw, 
  Clock, X, Zap, Eye, Smartphone, CreditCard
} from 'lucide-react';

// --- DATA: BANGLES & COSMETICS (20+ ITEMS) ---
const PRODUCTS = [
  { id: 1, name: "Bridal Velvet Chura", price: 4500, category: "Bangles", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800" },
  { id: 2, name: "Gold Plated Kangan", price: 3200, category: "Bangles", image: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=800" },
  { id: 3, name: "Matte Finish Red Lipstick", price: 950, category: "Cosmetics", image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=800" },
  { id: 4, name: "Waterproof Foundation", price: 1850, category: "Cosmetics", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800" },
  { id: 5, name: "Designer Party Clutch", price: 5500, category: "Bags", image: "https://images.unsplash.com/photo-1566150905458-1bf1fd113961?w=800" },
  { id: 6, name: "Crystal Stone Chura", price: 2800, category: "Bangles", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800" },
  { id: 7, name: "Luxe Eye Shadow Palette", price: 2400, category: "Cosmetics", image: "https://images.unsplash.com/photo-1583241475879-da37a861a3c1?w=800" },
  { id: 8, name: "Silk Thread Bangles", price: 850, category: "Bangles", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800" },
  // ... Adding more items for 20+ count
  ...Array.from({ length: 14 }, (_, i) => ({
    id: i + 9,
    name: i % 2 === 0 ? `Fancy Bangles Set ${i}` : `Premium Makeup Kit ${i}`,
    price: 1200 + (i * 150),
    category: i % 2 === 0 ? "Bangles" : "Cosmetics",
    image: i % 2 === 0 
      ? `https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&sig=${i}` 
      : `https://images.unsplash.com/photo-1512496011931-d21d88e35203?w=800&sig=${i}`
  }))
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCheckout, setShowCheckout] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [phone, setPhone] = useState('');

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
  const total = cart.reduce((s, item) => s + item.price, 0);

  return (
    <div className="min-h-screen bg-[#FDF5E6] selection:bg-[#800000] selection:text-[#D4AF37]">
      
      {/* --- 3D FLOATING BACKGROUND DECOR --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ rotate: 360, y: [0, 100, 0] }} 
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] border-[40px] border-[#800000]/5 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360, x: [0, 50, 0] }} 
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-1/2 -right-20 w-[300px] h-[300px] border-[20px] border-[#D4AF37]/10 rounded-full"
        />
      </div>

      {/* --- MOBILE RESPONSIVE NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-[#D4AF37]/30 z-[100] px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#800000] p-1.5 rounded-lg shadow-lg rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <ShoppingBag className="text-[#D4AF37]" size={22} />
            </div>
            <h1 className="text-lg md:text-2xl font-black text-[#800000] tracking-tighter">KANGAN FANCY</h1>
          </div>

          <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest text-[#800000]">
            {['All', 'Bangles', 'Cosmetics'].map(c => (
              <span key={c} onClick={() => setActiveCategory(c)} className={`cursor-pointer hover:text-[#D4AF37] ${activeCategory === c ? 'underline underline-offset-8' : ''}`}>{c}</span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Search className="text-[#800000] hidden sm:block" size={20} />
            <div className="relative cursor-pointer group" onClick={() => setShowCheckout(true)}>
              <ShoppingCart className="text-[#800000]" size={24} />
              <span className="absolute -top-2 -right-2 bg-[#800000] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border border-white">{cart.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO: 3D ROTATING EFFECT --- */}
      <header className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="z-10 relative">
          <span className="bg-[#800000] text-[#D4AF37] px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 inline-block shadow-2xl">Siraha Bazaar, Nepal</span>
          <h2 className="text-5xl md:text-9xl font-black text-[#800000] mb-6 leading-[0.9] italic">ULTRA <br /><span className="text-[#D4AF37] drop-shadow-lg">GLAMOUR</span></h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <button className="bg-[#800000] text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl">SHOP NOW</button>
            <button className="bg-white text-[#800000] border-2 border-[#800000] px-12 py-5 rounded-2xl font-black text-lg">NEW ARRIVALS</button>
          </div>
        </motion.div>
      </header>

      {/* --- PRODUCT GRID (MOBILE OPTIMIZED) --- */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
          {['All', 'Bangles', 'Cosmetics'].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-[#800000] text-white shadow-xl scale-110' : 'bg-white text-[#800000]'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
          {filtered.map((p) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={p.id} 
              className="bg-white rounded-3xl p-3 shadow-sm hover:shadow-2xl transition-all border border-[#D4AF37]/10 group"
            >
              <div 
                className="h-40 md:h-72 rounded-2xl overflow-hidden relative cursor-pointer"
                onClick={() => setSelectedProduct(p)}
              >
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg"><Heart size={14} className="text-[#800000]" /></div>
              </div>
              <div className="mt-4 px-1">
                <h4 className="font-black text-[#800000] text-xs md:text-lg uppercase truncate">{p.name}</h4>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm md:text-xl font-black">NPR {p.price}</span>
                  <button onClick={() => setCart([...cart, p])} className="bg-[#D4AF37] text-[#800000] p-2 md:p-3 rounded-xl hover:bg-[#800000] hover:text-white transition-all"><ShoppingBag size={18} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* --- 3D MODAL: CLICK-TO-EXPAND --- */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedProduct(null)} />
            <motion.div 
              initial={{ scale: 0.3, rotateY: 90, z: -500 }}
              animate={{ scale: 1, rotateY: 0, z: 0 }}
              exit={{ scale: 0.3, rotateY: -90, z: -500 }}
              className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 relative z-10 shadow-[0_0_100px_rgba(212,175,55,0.3)]"
            >
              <div className="h-[300px] md:h-full relative overflow-hidden group">
                <img src={selectedProduct.image} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[5s]" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center bg-[#FDF5E6]">
                <X onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 cursor-pointer text-[#800000] hover:scale-125 transition-all" size={32} />
                <h3 className="text-3xl md:text-5xl font-black text-[#800000] mb-6 tracking-tighter italic">{selectedProduct.name}</h3>
                <p className="text-gray-500 mb-10 font-medium leading-relaxed uppercase text-xs tracking-widest">Premium quality {selectedProduct.category} imported for the people of Siraha. Elegant and Royal finish.</p>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-[#800000]">NPR {selectedProduct.price}</span>
                  <button onClick={() => {setCart([...cart, selectedProduct]); setSelectedProduct(null);}} className="bg-[#800000] text-[#D4AF37] px-10 py-5 rounded-full font-black text-xl shadow-2xl">ADD TO CART</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FULL CHECKOUT PAGE (MOBILE FIRST) --- */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 20 }} className="fixed inset-0 z-[300] bg-[#FDF5E6] overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 lg:p-20">
              <div className="flex justify-between items-center mb-16">
                <button onClick={() => setShowCheckout(false)} className="bg-[#800000] text-white p-4 rounded-full shadow-2xl"><X /></button>
                <h2 className="text-3xl font-black text-[#800000] tracking-tighter uppercase italic underline decoration-[#D4AF37]">Checkout</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-[2rem] shadow-xl border-t-8 border-[#800000]">
                    <h4 className="font-black mb-6 text-[#800000] text-xl flex items-center gap-3"><Smartphone size={20}/> MOBILE VERIFICATION</h4>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Nepal Number (98XXXXXXXX)" className="w-full bg-[#FDF5E6] p-5 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-[#D4AF37]" />
                  </div>

                  <div className="bg-white p-8 rounded-[2rem] shadow-xl border-t-8 border-[#D4AF37]">
                    <h4 className="font-black mb-6 text-[#800000] text-xl flex items-center gap-3"><CreditCard size={20}/> NEPALI PAYMENT</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {['eSewa', 'Khalti', 'Banking', 'COD'].map(m => (
                        <div key={m} className="p-5 border-2 border-gray-100 rounded-2xl text-center font-black hover:border-[#800000] cursor-pointer bg-gray-50 uppercase text-[10px] tracking-widest">{m}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#800000] p-10 rounded-[3rem] text-white shadow-2xl h-fit">
                  <h4 className="text-xl font-black text-[#D4AF37] mb-8 uppercase tracking-widest italic border-b border-[#D4AF37]/30 pb-4">Order Summary</h4>
                  <div className="space-y-6 max-h-64 overflow-y-auto pr-2 mb-10">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-xs font-bold uppercase">{item.name}</span>
                        <span className="font-black text-[#D4AF37]">NPR {item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-3xl font-black border-t-4 border-[#D4AF37] pt-6">
                    <span>TOTAL:</span>
                    <span>NPR {total}</span>
                  </div>
                  <button onClick={() => setOtpSent(true)} className="w-full bg-[#D4AF37] text-[#800000] py-6 rounded-2xl font-black text-2xl mt-10 hover:scale-105 transition-transform shadow-[0_0_50px_rgba(212,175,55,0.3)]">CONFIRM ORDER</button>
                </div>
              </div>
            </div>

            {/* OTP VERIFICATION */}
            {otpSent && !isOrdered && (
              <div className="fixed inset-0 bg-[#800000] z-[400] flex items-center justify-center p-6 text-center text-white">
                <div className="max-w-md w-full">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }}><ShieldCheck size={100} className="mx-auto mb-8 text-[#D4AF37]" /></motion.div>
                  <h3 className="text-5xl font-black italic mb-4">OTP SENT!</h3>
                  <p className="text-[#D4AF37] font-bold mb-10">Check SMS on your phone number {phone}</p>
                  <input maxLength="4" placeholder="••••" className="w-full bg-white/10 border-4 border-[#D4AF37] p-8 rounded-[2rem] text-center text-6xl font-black outline-none mb-10 tracking-[10px]" />
                  <button onClick={() => setIsOrdered(true)} className="w-full bg-white text-[#800000] py-6 rounded-2xl font-black text-2xl">VERIFY & ORDER</button>
                </div>
              </div>
            )}

            {/* SUCCESS OVERLAY */}
            {isOrdered && (
              <div className="fixed inset-0 bg-white z-[500] flex items-center justify-center text-center p-6">
                <div>
                  <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                    <CheckCircle size={80} className="text-white" />
                  </div>
                  <h2 className="text-6xl font-black text-[#800000] mb-4 italic tracking-tighter uppercase">Order Success!</h2>
                  <p className="text-2xl font-bold text-[#D4AF37] mb-12 uppercase tracking-widest italic">Kangan Fancy Store, Siraha Bazaar</p>
                  <button onClick={() => window.location.reload()} className="bg-[#800000] text-white px-20 py-6 rounded-full font-black text-2xl shadow-xl">THANK YOU!</button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER: WITH YOUR PHONE NUMBERS --- */}
      <footer className="bg-black text-white pt-24 pb-12 px-6 border-t-8 border-[#D4AF37] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20 relative z-10">
          <div>
            <h2 className="text-4xl font-black text-[#D4AF37] italic mb-8">KANGAN FANCY</h2>
            <p className="text-gray-500 font-medium leading-relaxed">Nepal's most premium destination for Bangles, Jewelry, and International Cosmetics. Quality is our identity in Siraha.</p>
          </div>
          <div>
            <h4 className="text-[#D4AF37] font-black uppercase tracking-[0.3em] mb-8 text-sm">Official Contact</h4>
            <div className="space-y-6">
              <p className="flex items-center gap-4 text-gray-400 font-bold hover:text-white transition-colors cursor-pointer">
                <Phone className="text-[#800000]" /> +977-9815708999
              </p>
              <p className="flex items-center gap-4 text-gray-400 font-bold hover:text-white transition-colors cursor-pointer">
                <Phone className="text-[#800000]" /> +977-9766359871
              </p>
              <p className="flex items-center gap-4 text-gray-400 font-bold">
                <MapPin className="text-[#800000]" /> Siraha Bazaar, Siraha, Nepal
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-[#D4AF37] font-black uppercase tracking-[0.3em] mb-8 text-sm">Store Timings</h4>
            <div className="space-y-4 border-l-2 border-[#800000] pl-6">
              <p className="flex justify-between font-bold italic"><span>SUN - FRI:</span> <span className="text-[#D4AF37]">10 AM - 8 PM</span></p>
              <p className="flex justify-between font-black text-red-500 italic uppercase"><span>SATURDAY:</span> <span>CLOSED</span></p>
            </div>
          </div>
        </div>
        <div className="text-center mt-24 text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] border-t border-white/5 pt-10">
          © 2026 KANGAN FANCY STORE | MADE IN SIRAHA FOR NEPAL
        </div>
      </footer>
    </div>
  );
}