'use client';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import HeaderSection from '@/components/Home/HeaderSection';
import CategoryWidget from '@/components/Widget/CategoryWidget'; // Import Baru

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <Navbar />
      
      {/* Spacer untuk Fixed Navbar */}
      <div className="h-[145px] md:h-[160px]"></div> 

      {/* 1. SECTION HEADER (Slider + Ads) */}
      <HeaderSection />

      {/* Spacer dengan Garis Ditengah */}
      <div className="container mx-auto px-4 mb-8">
         <div className="flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="h-px bg-gray-200 flex-1"></div>
         </div>
      </div>

      {/* 2. SECTION KATEGORI (Widget Baru) */}
      <CategoryWidget />

      {/* Konten Lainnya */}
      <div className="container mx-auto px-4 py-8 text-center text-gray-400">
        <p>Konten Produk lainnya akan dirender di sini...</p>
      </div>

      <Footer />
    </main>
  );
}