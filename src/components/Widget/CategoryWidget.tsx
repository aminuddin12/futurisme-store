'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

// 20 Data Kategori Dummy dengan Icon Fluent Color
const categories = [
  { id: 1, name: 'Gadget', icon: 'fluent-color:phone-mobile-24' },
  { id: 2, name: 'Laptop', icon: 'fluent-color:laptop-24' },
  { id: 3, name: 'Fashion Pria', icon: 'fluent-color:t-shirt-24' },
  { id: 4, name: 'Fashion Wanita', icon: 'fluent-color:dress-24' },
  { id: 5, name: 'Kecantikan', icon: 'fluent-color:person-star-24' },
  { id: 6, name: 'Makanan', icon: 'fluent-color:food-pizza-24' },
  { id: 7, name: 'Minuman', icon: 'fluent-color:drink-coffee-24' },
  { id: 8, name: 'Rumah Tangga', icon: 'fluent-color:home-24' },
  { id: 9, name: 'Elektronik', icon: 'fluent-color:tv-24' },
  { id: 10, name: 'Hobi', icon: 'fluent-color:game-controller-24' },
  { id: 11, name: 'Otomotif', icon: 'fluent-color:vehicle-car-24' },
  { id: 12, name: 'Olahraga', icon: 'fluent-color:sport-soccer-24' },
  { id: 13, name: 'Buku', icon: 'fluent-color:book-24' },
  { id: 14, name: 'Mainan', icon: 'fluent-color:cube-24' },
  { id: 15, name: 'Kesehatan', icon: 'fluent-color:heart-pulse-24' },
  { id: 16, name: 'Bayi & Anak', icon: 'fluent-color:emoji-smile-slight-24' },
  { id: 17, name: 'Musik', icon: 'fluent-color:music-note-2-24' },
  { id: 18, name: 'Fotografi', icon: 'fluent-color:camera-24' },
  { id: 19, name: 'Voucher', icon: 'fluent-color:ticket-24' },
  { id: 20, name: 'Lainnya', icon: 'fluent-color:apps-24' },
];

export default function CategoryWidget() {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Hitung jumlah halaman
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Responsive Logic untuk menentukan jumlah item per halaman
  useEffect(() => {
    setLoaded(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(20); // Desktop: 10 kolom x 2 baris = 20 item
      } else if (width >= 640) {
        setItemsPerPage(16); // Tablet: 8 kolom x 2 baris = 16 item
      } else {
        setItemsPerPage(10); // Mobile: 5 kolom x 2 baris = 10 item
      }
    };

    // Init & Listen
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page jika resize window mengubah jumlah halaman
  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  // Skeleton Loading
  if (!loaded) {
    return (
        <div className="container mx-auto px-4 mb-8">
           <div className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
    )
  }

  // Slice data berdasarkan halaman aktif
  const currentData = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section className="container mx-auto px-4 mb-8">
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 relative group">
        
        <div className="flex justify-between items-center mb-4">
             <h2 className="font-bold text-lg text-gray-800">Kategori Pilihan</h2>
             
             {/* Pagination Dots (Hanya muncul jika ada > 1 halaman) */}
             {totalPages > 1 && (
               <div className="flex gap-1">
                 {Array.from({ length: totalPages }).map((_, idx) => (
                   <div 
                     key={idx} 
                     className={`h-1.5 rounded-full transition-all duration-300 ${currentPage === idx ? 'w-4 bg-primary' : 'w-1.5 bg-gray-300'}`}
                   ></div>
                 ))}
               </div>
             )}
        </div>

        <div className="relative overflow-hidden min-h-[180px]">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              // Grid Responsif: 
              // Mobile: grid-cols-5 (5 kolom)
              // Tablet: grid-cols-8 (8 kolom)
              // Desktop: grid-cols-10 (10 kolom)
              className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-y-6 gap-x-2"
            >
              {currentData.map((cat) => (
                <div key={cat.id} className="flex flex-col items-center gap-2 cursor-pointer group/item">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover/item:border-primary/30 group-hover/item:bg-green-50 transition-all duration-300 shadow-sm group-hover/item:shadow-md group-hover/item:-translate-y-1">
                    <Icon icon={cat.icon} className="text-2xl md:text-3xl transition-transform duration-300 group-hover/item:scale-110" />
                  </div>
                  <span className="text-[10px] md:text-xs font-medium text-gray-600 text-center leading-tight line-clamp-2 group-hover/item:text-primary transition-colors">
                    {cat.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows (Hanya jika > 1 halaman) */}
        {totalPages > 1 && (
            <>
                <button 
                    onClick={prevPage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 md:-ml-4 w-8 h-8 md:w-10 md:h-10 bg-white shadow-lg border border-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-primary hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                    <i className="fas fa-chevron-left text-xs md:text-sm"></i>
                </button>
                <button 
                    onClick={nextPage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 md:-mr-4 w-8 h-8 md:w-10 md:h-10 bg-white shadow-lg border border-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-primary hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                    <i className="fas fa-chevron-right text-xs md:text-sm"></i>
                </button>
            </>
        )}

      </div>
    </section>
  );
}