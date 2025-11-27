'use client';

import Navbar from '@/components/Navbar/Navbar';
import MobileHeader from '@/components/Category/MobileHeader';
import Header from '@/components/Category/Header';
import Main from '@/components/Category/Main';

export default function MobileCategory() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-24 pt-safe">
      
      {/* Navbar Global - Disembunyikan di Mobile */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Spacer untuk Fixed Navbar (Hanya tampil di Desktop/Tablet) */}
      <div className="hidden md:block h-40"></div>

      {/* Header Desktop (Tablet ke atas) */}
      <Header />

      {/* Header Mobile (Hanya tampil di HP) */}
      <div className="block md:hidden">
        <MobileHeader />
      </div>

      {/* Konten Utama */}
      <Main />
    </main>
  );
}