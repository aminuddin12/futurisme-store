'use client';

import { useState, useEffect } from 'react';

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Logika sama seperti TopBar: Hanya muncul di paling atas (< 50px)
      if (window.scrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // PERBAIKAN:
    // 1. Tinggi dikurangi menjadi h-10 (40px) dari h-12 (48px) untuk tampilan lebih ramping.
    // 2. Margin negatif disesuaikan (-mt-10).
    <div 
      className={`hidden md:block border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out origin-top relative z-40 ${
        isVisible 
          ? 'h-10 mt-0 opacity-100' 
          : 'h-10 -mt-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        {/* Nav Links - Rata Tengah (justify-center) */}
        {/* PERBAIKAN:
            1. Ukuran font dikurangi menjadi 'text-[11px]' (sebelumnya xs/12px).
            2. Font weight diubah menjadi 'font-bold' (tetap tegas).
            3. Padding vertikal dihapus/dikurangi karena container sudah h-10 & flex items-center.
            4. Gap antar menu disesuaikan (gap-6) agar tidak terlalu lebar tapi tetap lega.
        */}
        <nav className="flex justify-center items-center h-full gap-6 text-[9px] font-bold text-gray-500 dark:text-gray-400 overflow-x-auto scrollbar-hide">
          {['Rekomendasi', 'Gadget', 'Fashion Pria', 'Fashion Wanita', 'Elektronik', 'Rumah Tangga', 'Kecantikan', 'Otomotif', 'Hobi & Koleksi'].map((item) => (
            <a 
              key={item} 
              href={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`} 
              className="hover:text-primary whitespace-nowrap transition-all pb-0.5 border-b-2 border-transparent hover:border-primary uppercase tracking-wide"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}