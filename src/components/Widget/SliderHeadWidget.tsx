'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const slides = [
  { id: 1, img: "https://dummyimage.com/900x380/00AA5B/fff&text=Mega+Sale+12.12", title: "Pesta Belanja Akhir Tahun", desc: "Diskon Spesial Hari Ini", icon: "fluent:gift-24-filled" },
  { id: 2, img: "https://dummyimage.com/900x380/1F2937/fff&text=Gadget+Baru", title: "Upgrade Gadgetmu", desc: "Teknologi Terbaru 2025", icon: "fluent:phone-laptop-24-filled" },
  { id: 3, img: "https://dummyimage.com/900x380/EE4D2D/fff&text=Gratis+Ongkir", title: "Kirim ke Seluruh Indonesia", desc: "Tanpa Minimum Belanja", icon: "fluent:vehicle-truck-profile-24-filled" }
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

  if (!loaded) return <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl min-h-[200px]"></div>;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl group shadow-sm bg-gray-100 dark:bg-gray-800">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={slides[current].img} alt={slides[current].title} className="w-full h-full object-cover" />
          
          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white z-10 flex flex-col justify-end h-3/4 md:h-1/2">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1.5 md:gap-2 mb-1"
            >
                {/* Ukuran Icon dikurangi untuk mobile */}
                <Icon icon={slides[current].icon} className="text-yellow-400 text-base md:text-xl" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-sm">Featured</span>
            </motion.div>

            <motion.h2 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.3 }}
              // Ukuran Font Judul dikurangi untuk mobile (text-lg -> text-3xl di desktop)
              className="text-lg md:text-3xl lg:text-4xl font-bold mb-0.5 md:mb-2 shadow-sm line-clamp-2 leading-tight"
            >
              {slides[current].title}
            </motion.h2>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.4 }}
              // Ukuran Font Deskripsi dikurangi
              className="text-[10px] md:text-base font-medium text-gray-200 line-clamp-1"
            >
              {slides[current].desc}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-8 flex gap-1 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            // Ukuran dots disesuaikan
            className={`h-1 md:h-2 rounded-full transition-all duration-300 ${current === idx ? 'w-4 md:w-8 bg-primary' : 'w-1 md:w-2 bg-white/50 hover:bg-white'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Arrows (Hidden on mobile intentionally to save space, Show on desktop) */}
      <div className="hidden md:block">
          <button 
            onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-white hover:text-primary transition opacity-0 group-hover:opacity-100 z-20 border border-white/20"
          >
            <Icon icon="fluent:chevron-left-24-regular" className="text-xl" />
          </button>
          <button 
            onClick={() => setCurrent((current + 1) % slides.length)} 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-white hover:text-primary transition opacity-0 group-hover:opacity-100 z-20 border border-white/20"
          >
             <Icon icon="fluent:chevron-right-24-regular" className="text-xl" />
          </button>
      </div>
    </div>
  );
}