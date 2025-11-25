'use client';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import HeaderSection from '@/components/Home/HeaderSection'; // Import komponen baru

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <Navbar />
      
      {/* Spacer untuk Fixed Navbar */}
      <div className="h-[145px] md:h-[160px]"></div> 

      {/* SECTION HEADER BARU */}
      <HeaderSection />

      {/* Konten Lainnya (Kategori, Produk, dll bisa ditambahkan di sini nanti) */}
      <div className="container mx-auto px-4 py-8 text-center text-gray-400">
        <p>Konten Kategori & Produk akan dirender di sini...</p>
      </div>

      <Footer />
    </main>
  );
}