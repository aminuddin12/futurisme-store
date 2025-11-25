'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ads = [
  { id: 1, color: "bg-blue-100", text: "Promo Gajian Hemat", sub: "Cashback 90%", img: "https://dummyimage.com/150x150/dbeafe/1e40af&text=Gajian" },
  { id: 2, color: "bg-orange-100", text: "Flash Sale 12.12", sub: "Serba Rp10rb", img: "https://dummyimage.com/150x150/ffedd5/c2410c&text=Sale" }
];

export default function TopHeadAdsWidget() {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 4000); // Ganti setiap 4 detik
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl"></div>;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm border border-gray-100">
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 w-full h-full p-4 flex items-center justify-between ${ads[index].color}`}
        >
          <div className="z-10">
            <h3 className="font-bold text-lg text-gray-800">{ads[index].text}</h3>
            <p className="text-sm text-gray-600 mt-1">{ads[index].sub}</p>
            <button className="mt-3 text-xs font-bold bg-white px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-50 transition">Cek Sekarang</button>
          </div>
          <img src={ads[index].img} alt="Ads" className="w-24 h-24 object-contain mix-blend-multiply" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}