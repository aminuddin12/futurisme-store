'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import HeaderFilter from './HeaderFilter'; // Import komponen baru

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ambang batas scroll sedikit dinaikkan agar transisi tidak terlalu sensitif
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // PERBAIKAN: Mengubah top-[60px] menjadi top-[105px] agar sesuai dengan tinggi Navbar Desktop yang fixed.
    // Ini mencegah teks judul tertutup oleh navbar saat discroll.
    <header 
      className={`hidden md:block w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-[80px] z-20 transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-sm' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        
        {/* Breadcrumbs - Disembunyikan total saat scroll untuk menghemat ruang */}
        <nav 
          className={`flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 transition-all duration-300 overflow-hidden ${
            isScrolled ? 'h-0 opacity-0 mb-0' : 'h-auto opacity-100 mb-3'
          }`}
        >
          <Link 
            href="/" 
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Icon icon="solar:home-2-line-duotone" className="text-sm" />
            <span>Beranda</span>
          </Link>
          <Icon icon="solar:alt-arrow-right-linear" className="text-gray-300 dark:text-gray-600" />
          <span className="text-primary">Kategori</span>
        </nav>

        {/* Title Section */}
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'mb-1' : 'mb-6'}`}>
          <div className="flex-1">
            <h1 className={`font-extrabold text-gray-800 dark:text-white tracking-tight transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-3xl md:text-4xl mb-2'
            }`}>
              Jelajahi Kategori
            </h1>
            
            {/* Deskripsi: Disembunyikan saat discroll dengan transisi max-height dan opacity */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isScrolled ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'
              }`}
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg leading-relaxed">
                Temukan berbagai koleksi produk pilihan terbaik yang telah kami kurasi khusus untuk kebutuhan Anda.
              </p>
            </div>
          </div>

          {/* Decorative Icon - Hilang saat scroll */}
          <div className={`hidden lg:flex items-center justify-center bg-primary/5 rounded-2xl text-primary/80 transition-all duration-300 ${
            isScrolled ? 'w-0 h-0 opacity-0 scale-0 overflow-hidden' : 'w-16 h-16 opacity-100 scale-100'
          }`}>
             <Icon icon="solar:layers-minimalistic-bold-duotone" className="text-3xl" />
          </div>
        </div>

        {/* Filter Menu Section - Margin disesuaikan saat scroll */}
        <div className={`transition-all duration-300 ${isScrolled ? 'mt-0' : 'mt-2'}`}>
            <HeaderFilter />
        </div>

      </div>
    </header>
  );
}