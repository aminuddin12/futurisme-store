'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const ads = [
  // Gunakan hex code atau pastikan class lengkap tertulis
  { id: 1, bgClass: "bg-blue-100", text: "Promo Gajian Hemat", sub: "Cashback 90%", icon: "fluent:money-hand-20-filled", iconColor: "text-blue-600" },
  { id: 2, bgClass: "bg-orange-100", text: "Flash Sale 12.12", sub: "Serba Rp10rb", icon: "fluent:flash-24-filled", iconColor: "text-orange-600" }
];

export default function TopHeadAdsWidget() {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl"></div>;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 group cursor-pointer">
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          // Pastikan class statis terbaca
          className={`absolute inset-0 w-full h-full p-4 flex flex-row items-center justify-between ${ads[index].bgClass} dark:bg-opacity-20`}
        >
          <div className="z-10 flex-1 pr-2">
            <h3 className="font-bold text-sm md:text-lg text-gray-800 dark:text-gray-200 leading-tight">{ads[index].text}</h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{ads[index].sub}</p>
            <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-sm text-gray-700 dark:text-gray-300">
              Cek Sekarang <Icon icon="fluent:arrow-right-16-regular" />
            </div>
          </div>
          
          <div className={`w-12 h-12 md:w-16 md:h-16 bg-white/50 dark:bg-white/10 rounded-full flex items-center justify-center ${ads[index].iconColor}`}>
             <Icon icon={ads[index].icon} className="text-2xl md:text-4xl" />
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Progress Bar Kecil di Bawah */}
      <motion.div 
        key={`progress-${index}`}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 4, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-primary/50 z-20"
      />
    </div>
  );
}