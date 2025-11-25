'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { id: 1, img: "https://dummyimage.com/900x380/00AA5B/fff&text=Mega+Sale+12.12", title: "Pesta Belanja Akhir Tahun", desc: "Diskon Spesial Hari Ini" },
  { id: 2, img: "https://dummyimage.com/900x380/1F2937/fff&text=Gadget+Baru", title: "Upgrade Gadgetmu", desc: "Teknologi Terbaru 2025" },
  { id: 3, img: "https://dummyimage.com/900x380/EE4D2D/fff&text=Gratis+Ongkir", title: "Kirim ke Seluruh Indonesia", desc: "Tanpa Minimum Belanja" }
];

export default function SliderHeadWidget() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Skeleton Loading
  if (!loaded) return <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl min-h-[200px] md:min-h-[300px]"></div>;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl group shadow-sm">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={slides[current].img} alt={slides[current].title} className="w-full h-full object-cover" />
          
          {/* Text Overlay dengan Animasi */}
          <div className="absolute bottom-8 left-8 text-white z-10 max-w-md">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-4xl font-bold mb-2 shadow-sm"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="text-sm md:text-lg font-medium shadow-sm"
            >
              {slides[current].desc}
            </motion.p>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-8 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${current === idx ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-white hover:text-primary transition opacity-0 group-hover:opacity-100 z-20">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button onClick={() => setCurrent((current + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-white hover:text-primary transition opacity-0 group-hover:opacity-100 z-20">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}