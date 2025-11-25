'use client';

import { useState, useEffect } from 'react';
import CategoryHeader from './Category/CategoryHeader';
import CategoryList from './Category/CategoryList';
import CategoryNavigation from './Category/CategoryNavigation';

// Data Kategori (20 Item)
// Saya menggunakan ikon 'fluent:' yang umum dan memberikan warna via class text
const categories = [
  { id: 1, name: 'Gadget', icon: 'fluent:device-phone-mobile-24-filled', color: 'text-blue-500' },
  { id: 2, name: 'Laptop', icon: 'fluent:laptop-24-filled', color: 'text-indigo-500' },
  { id: 3, name: 'Fashion Pria', icon: 'fluent:shirt-24-filled', color: 'text-orange-500' },
  { id: 4, name: 'Fashion Wanita', icon: 'fluent:person-dress-24-filled', color: 'text-pink-500' },
  { id: 5, name: 'Kecantikan', icon: 'fluent:person-sparkle-24-filled', color: 'text-rose-400' },
  { id: 6, name: 'Makanan', icon: 'fluent:food-pizza-24-filled', color: 'text-yellow-500' },
  { id: 7, name: 'Minuman', icon: 'fluent:drink-coffee-24-filled', color: 'text-amber-700' },
  { id: 8, name: 'Rumah Tangga', icon: 'fluent:home-24-filled', color: 'text-teal-500' },
  { id: 9, name: 'Elektronik', icon: 'fluent:tv-24-filled', color: 'text-cyan-500' },
  { id: 10, name: 'Hobi & Game', icon: 'fluent:games-24-filled', color: 'text-purple-500' },
  { id: 11, name: 'Otomotif', icon: 'fluent:vehicle-car-24-filled', color: 'text-slate-600' },
  { id: 12, name: 'Olahraga', icon: 'fluent:sport-soccer-24-filled', color: 'text-green-600' },
  { id: 13, name: 'Buku', icon: 'fluent:book-24-filled', color: 'text-blue-800' },
  { id: 14, name: 'Mainan', icon: 'fluent:cube-24-filled', color: 'text-red-500' },
  { id: 15, name: 'Kesehatan', icon: 'fluent:heart-pulse-24-filled', color: 'text-red-600' },
  { id: 16, name: 'Ibu & Bayi', icon: 'fluent:emoji-smile-slight-24-filled', color: 'text-yellow-400' },
  { id: 17, name: 'Musik', icon: 'fluent:music-note-2-24-filled', color: 'text-fuchsia-500' },
  { id: 18, name: 'Kamera', icon: 'fluent:camera-24-filled', color: 'text-zinc-700' },
  { id: 19, name: 'Voucher', icon: 'fluent:ticket-24-filled', color: 'text-emerald-500' },
  { id: 20, name: 'Lainnya', icon: 'fluent:apps-24-filled', color: 'text-gray-500' },
];

export default function CategoryWidget() {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerPage(20); // Desktop (10x2)
      else if (width >= 640) setItemsPerPage(16); // Tablet (8x2)
      else setItemsPerPage(10); // Mobile (5x2)
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Jangan memanggil setState() secara sinkron di dalam efek.
  // Sebagai gantinya, kita 'clamp' currentPage saat digunakan sehingga
  // tidak perlu mereset state setiap kali itemsPerPage berubah.
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentPageClamped = Math.max(0, Math.min(currentPage, totalPages - 1));

  if (!loaded) {
    return (
        <div className="container mx-auto px-4 mb-8">
           <div className="h-52 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
        </div>
    )
  }

  const currentData = categories.slice(
    currentPageClamped * itemsPerPage,
    (currentPageClamped + 1) * itemsPerPage
  );

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section className="container mx-auto px-4 mb-8">
      <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 relative group">
        
        <CategoryHeader 
          totalPages={totalPages} 
          currentPage={currentPageClamped} 
        />

        <CategoryList 
          data={currentData} 
          pageKey={currentPageClamped} 
        />

        <CategoryNavigation 
          show={totalPages > 1} 
          onNext={nextPage} 
          onPrev={prevPage} 
        />

      </div>
    </section>
  );
}