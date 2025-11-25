'use client';

import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export default function BottomHeadAdditionalWidget() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 animate-pulse bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 background-animate" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm group cursor-pointer bg-linear-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center justify-between">
      
      <div className="relative z-10 flex-1 pr-2">
        <div className="bg-white/20 backdrop-blur-sm w-fit px-2 py-0.5 rounded text-[10px] font-bold mb-2 uppercase tracking-wider shadow-sm">
          Member Only
        </div>
        <h3 className="font-bold text-base md:text-lg leading-tight mb-0.5">Kupon Spesial</h3>
        <p className="text-xs opacity-90 mb-3">Diskon Tambahan 50%</p>
        
        <button className="bg-white text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md group-hover:scale-105 active:scale-95 transition-all flex items-center gap-1">
            Klaim <Icon icon="fluent:checkmark-12-filled" />
        </button>
      </div>

      <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 shrink-0 flex items-center justify-center bg-white/10 rounded-full border border-white/20 group-hover:rotate-12 transition-transform duration-500">
        <Icon icon="fluent:ticket-diagonal-24-filled" className="text-3xl md:text-4xl text-yellow-300 drop-shadow-md" />
      </div>

      {/* Background Decor */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-10 -mt-10 blur-3xl"
      />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
    </div>
  );
}