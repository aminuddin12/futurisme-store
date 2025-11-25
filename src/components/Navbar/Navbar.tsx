'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitcher from '../Theme/ThemeSwitcher';

// Sub-components
const NavTop = () => (
  // Tambahkan dark:bg-gray-900, dark:text-gray-400, dark:border-gray-800
  <div className="bg-gray-100/50 dark:bg-gray-900 text-[11px] text-gray-500 dark:text-gray-400 py-1 hidden md:block border-b border-transparent dark:border-gray-800 transition-colors duration-300">
    <div className="container mx-auto px-4 flex justify-between">
      <div className="flex gap-4">
        <a href="#" className="hover:text-primary transition">Download App</a>
        <a href="#" className="hover:text-primary transition">Tentang Kami</a>
      </div>
      <div>Bantuan & Layanan Pelanggan</div>
    </div>
  </div>
);

const NavCenter = () => (
  // Tambahkan dark:bg-gray-900 pada container utama
  <div className="container mx-auto px-4 py-3 md:py-4 flex items-center gap-4 md:gap-8 bg-white dark:bg-gray-900 z-20 relative transition-colors duration-300">
    <Link href="/" className="text-2xl font-extrabold text-primary tracking-tighter flex items-center gap-1 group">
      <i className="fas fa-shopping-bag group-hover:rotate-12 transition-transform"></i>
      <span>SHOP</span>
    </Link>
    <div className="flex-1 relative group z-50">
      <div className="relative">
        {/* Input Search: dark:bg-gray-800, dark:text-gray-100, dark:border-gray-700 */}
        <input 
          type="text" 
          placeholder="Cari di ShopModern..." 
          className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/30 focus:bg-white dark:focus:bg-gray-900 transition-all shadow-sm placeholder-gray-400 dark:placeholder-gray-500" 
        />
        {/* Icon Search: dark:text-gray-500 */}
        <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-primary transition-colors"></i>
      </div>
    </div>
    
    <div className="flex items-center gap-3 md:gap-6">
      
      {/* Theme Switcher */}
      <ThemeSwitcher />

      <div className="hidden md:flex gap-2">
        {/* Button Masuk: dark:text-gray-300, dark:border-gray-700, dark:hover:bg-green-900/20 */}
        <button className="px-4 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 font-bold text-sm text-gray-600 dark:text-gray-300 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">Masuk</button>
        {/* Button Daftar: dark:hover:shadow-green-900/20 */}
        <button className="px-4 py-1.5 rounded-md bg-primary font-bold text-sm text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900/20 transition-all transform hover:-translate-y-0.5">Daftar</button>
      </div>
    </div>
  </div>
);

export default function Navbar() {
  const [showNavBottom, setShowNavBottom] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY < 50;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (isAtTop) {
        setShowNavBottom(true);
      } else if (isScrollingDown) {
        setShowNavBottom(false);
      } else {
        setShowNavBottom(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    // Header Utama: dark:bg-gray-900/95, dark:border-gray-800
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 fixed w-full top-0 z-50 transition-all duration-300" id="navbar">
      <NavTop />
      <NavCenter />
      
      {/* Nav Bottom: dark:bg-gray-900, dark:border-gray-800 */}
      <div 
        className={`border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 origin-top overflow-hidden ${
          showNavBottom ? 'max-h-[100px] opacity-100 mt-0' : 'max-h-0 opacity-0 -mt-2'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Nav Links: dark:text-gray-400, dark:hover:border-gray-700 */}
          <nav className="flex gap-6 text-xs font-medium text-gray-500 dark:text-gray-400 overflow-x-auto py-2 scrollbar-hide">
            {['Rekomendasi', 'Gadget', 'Fashion Pria', 'Fashion Wanita', 'Elektronik', 'Rumah Tangga'].map((item) => (
              <a key={item} href="#" className="hover:text-primary whitespace-nowrap transition pb-1 hover:border-b-2 hover:border-gray-200 dark:hover:border-gray-700">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}