'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Sub-components (bisa dipisah ke file lain jika mau, disini digabung untuk ringkas)
const NavTop = () => (
  <div className="bg-gray-100/50 text-[11px] text-gray-500 py-1 hidden md:block">
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
  <div className="container mx-auto px-4 py-3 md:py-4 flex items-center gap-4 md:gap-8 bg-white z-20 relative">
    <Link href="/" className="text-2xl font-extrabold text-primary tracking-tighter flex items-center gap-1 group">
      <i className="fas fa-shopping-bag group-hover:rotate-12 transition-transform"></i>
      <span>SHOP</span>
    </Link>
    <div className="flex-1 relative group z-50">
      <div className="relative">
        <input type="text" placeholder="Cari di ShopModern..." className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 focus:bg-white transition-all shadow-sm" />
        <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"></i>
      </div>
    </div>
    <div className="flex items-center gap-3 md:gap-6">
      <div className="hidden md:flex gap-2">
        <button className="px-4 py-1.5 rounded-md border border-gray-200 font-bold text-sm text-gray-600 hover:border-primary hover:text-primary hover:bg-green-50 transition-all">Masuk</button>
        <button className="px-4 py-1.5 rounded-md bg-primary font-bold text-sm text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-0.5">Daftar</button>
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
    <header className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 transition-all duration-300" id="navbar">
      <NavTop />
      <NavCenter />
      
      {/* Nav Bottom dengan Animasi */}
      <div 
        className={`border-t border-gray-100 bg-white transition-all duration-300 origin-top overflow-hidden ${
          showNavBottom ? 'max-h-[100px] opacity-100 mt-0' : 'max-h-0 opacity-0 -mt-2'
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex gap-6 text-sm font-medium text-gray-500 overflow-x-auto py-3 scrollbar-hide">
            {['Rekomendasi', 'Gadget', 'Fashion Pria', 'Fashion Wanita', 'Elektronik', 'Rumah Tangga'].map((item) => (
              <a key={item} href="#" className="hover:text-primary whitespace-nowrap transition pb-1 hover:border-b-2 hover:border-gray-200">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}