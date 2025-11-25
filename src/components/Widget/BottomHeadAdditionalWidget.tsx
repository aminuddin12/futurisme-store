'use client';

import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';

export default function BottomHeadAdditionalWidget() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded)
    return (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"></div>
    );

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm group cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white p-4 flex items-center justify-between">
      
      <div className="relative z-10 flex-1">
        <div className="bg-white/20 backdrop-blur-sm w-fit px-2 py-0.5 rounded text-[10px] font-bold mb-2 uppercase tracking-wider">
          Member Only
        </div>
        <h3 className="font-bold text-lg leading-tight mb-1">Kupon Spesial</h3>
        <p className="text-xs opacity-90 mb-3">Diskon Tambahan 50%</p>
        <button className="bg-white text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
            Klaim
        </button>
      </div>

      <div className="relative z-10 w-16 h-16 flex items-center justify-center bg-white/20 rounded-full rotate-12 group-hover:rotate-0 transition-transform duration-300">
        <Icon icon="fluent:ticket-diagonal-24-filled" className="text-4xl text-white" />
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
    </div>
  );
}