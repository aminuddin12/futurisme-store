'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// Definisi Tipe Iklan
type AdType = 'image' | 'video' | 'custom';

interface AdItem {
  id: number;
  type: AdType;
  src?: string;
  link?: string;
  title?: string;
  description?: string;
  bgColor?: string;
}

// Data Dummy Iklan
const initialAdsData: AdItem[] = [
  {
    id: 1,
    type: 'custom',
    title: 'Bergabunglah dengan Klub Eksklusif!',
    description: 'Dapatkan akses prioritas ke produk baru dan diskon anggota.',
    link: '/membership',
    bgColor: 'bg-gradient-to-r from-pink-500 to-orange-400'
  },
  {
    id: 2,
    type: 'video',
    src: 'https://cdn.pixabay.com/video/2020/05/25/40138-424930040_large.mp4',
    link: '/travel-gear',
    title: 'Jelajahi Dunia',
    description: 'Perlengkapan travel terbaik untuk petualangan Anda selanjutnya.',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    link: '/sneaker-sale',
    title: 'Sneaker Fest',
    description: 'Diskon hingga 50% untuk semua sepatu olahraga.',
  },
  {
    id: 4,
    type: 'custom',
    title: 'Gratis Ongkir Se-Indonesia!',
    description: 'Tanpa minimum belanja khusus hari ini. Gunakan kode: FREESHIP',
    link: '/shipping-info',
    bgColor: 'bg-gradient-to-tr from-blue-400 to-cyan-300'
  },
  {
    id: 5,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    link: '/accessories',
  },
];

export default function CustomHomePopup() {
  const [activeAds, setActiveAds] = useState<AdItem[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [exitX, setExitX] = useState(0); 

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    // if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setActiveAds(initialAdsData);
      setHasMounted(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseTopAd = (direction: number = 0) => {
    setExitX(direction);
    setActiveAds((prev) => {
      const newAds = [...prev];
      newAds.pop();
      
      if (newAds.length === 0) {
        sessionStorage.setItem('hasSeenPopup', 'true');
        setTimeout(() => setHasMounted(false), 300); 
      }
      return newAds;
    });
  };

  const renderContent = (ad: AdItem) => {
    switch (ad.type) {
      case 'image':
        return (
          <Link href={ad.link || '#'} className="block w-full h-full relative group cursor-pointer">
            <img 
              src={ad.src} 
              alt={ad.title || "Promo"} 
              className="w-full h-full object-cover pointer-events-none select-none" 
              draggable={false}
            />
            {(ad.title || ad.description) && (
               <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white pointer-events-none">
                  {ad.title && <h3 className="text-2xl font-bold mb-1">{ad.title}</h3>}
                  {ad.description && <p className="text-sm opacity-90 line-clamp-2">{ad.description}</p>}
               </div>
            )}
            <div className={`absolute inset-0 transition-colors flex items-center justify-center ${ad.title ? 'bg-black/20 group-hover:bg-black/40' : 'bg-black/0 group-hover:bg-black/10'}`}>
                <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Lihat Promo <Icon icon="solar:arrow-right-linear" className="inline ml-1" />
                </span>
            </div>
          </Link>
        );

      case 'video':
        return (
          <div className="relative w-full h-full bg-black">
            <video 
              src={ad.src} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-80 pointer-events-none select-none"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent text-white pointer-events-none">
                <h3 className="text-2xl font-bold mb-1">{ad.title}</h3>
                <p className="text-sm opacity-80 mb-4 line-clamp-2">{ad.description}</p>
            </div>
             {ad.link && (
                <div className="absolute bottom-6 left-6 right-6 z-10">
                    <Link href={ad.link} className="block">
                        <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors w-full shadow-lg">
                            Tonton Selengkapnya
                        </button>
                    </Link>
                </div>
            )}
          </div>
        );

      case 'custom':
        return (
          <div className={`w-full h-full flex flex-col items-center justify-center p-8 text-center text-white ${ad.bgColor || 'bg-primary'}`}>
             <Icon icon="solar:gift-bold-duotone" className="text-8xl mb-4 animate-bounce" />
             <h3 className="text-3xl font-extrabold mb-2 select-none">{ad.title}</h3>
             <p className="text-lg opacity-90 mb-8 select-none">{ad.description}</p>
             {ad.link && (
                <Link href={ad.link} className="w-full relative z-10">
                    <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform w-full">
                        Lihat Detail
                    </button>
                </Link>
             )}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!hasMounted && activeAds.length === 0) return null;

  return (
    <AnimatePresence>
      {activeAds.length > 0 && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 pointer-events-none">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }} 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
            // UPDATE: Tutup satu iklan saat area luar diklik
            onClick={() => handleCloseTopAd(0)} 
          />

          {/* Stack Container */}
          {/* UPDATE: Ukuran Desktop lebih lebar dan tinggi */}
          <div className="relative w-full max-w-[340px] aspect-[3/4] md:max-w-[600px] md:aspect-[16/9] flex items-center justify-center pointer-events-none perspective-1000">
            
            {/* Tombol Panah Kiri (Hanya Desktop/Tablet) */}
            {activeAds.length > 0 && (
              <button
                onClick={() => handleCloseTopAd(-1)}
                className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full items-center justify-center text-white transition-all pointer-events-auto hover:scale-110 active:scale-95"
              >
                <Icon icon="solar:alt-arrow-left-linear" className="text-2xl" />
              </button>
            )}

            {/* Tombol Panah Kanan (Hanya Desktop/Tablet) */}
            {activeAds.length > 0 && (
              <button
                onClick={() => handleCloseTopAd(1)}
                className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full items-center justify-center text-white transition-all pointer-events-auto hover:scale-110 active:scale-95"
              >
                <Icon icon="solar:alt-arrow-right-linear" className="text-2xl" />
              </button>
            )}

            <AnimatePresence mode="popLayout">
              {activeAds.map((ad, index) => {
                const isFront = index === activeAds.length - 1;
                const offsetIndex = activeAds.length - 1 - index; 
                
                if (offsetIndex > 2) return null;

                // Kalkulasi transformasi
                const scale = 1 - offsetIndex * 0.05; 
                const y = offsetIndex * 40; 

                return (
                  <motion.div
                    key={ad.id}
                    layoutId={`card-${ad.id}`} 
                    initial={false} 
                    animate={{ 
                      scale: scale,
                      y: y,
                      zIndex: index,
                      opacity: 1 - offsetIndex * 0.1,   
                      rotateX: 0,
                      filter: isFront ? 'brightness(1)' : 'brightness(0.95) blur(1px)',
                    }}
                    exit={{ 
                      x: exitX !== 0 ? exitX * 300 : 0, 
                      y: exitX === 0 ? 150 : 0, 
                      opacity: 0, 
                      scale: 0.9,
                      rotate: exitX * 15, 
                      transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } 
                    }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30, 
                        mass: 1 
                    }}
                    drag={isFront ? "x" : false} 
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
                    dragElastic={0.6} 
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipeThreshold = 80; 
                        if (offset.x > swipeThreshold || velocity.x > 300) {
                            handleCloseTopAd(1); 
                        } else if (offset.x < -swipeThreshold || velocity.x < -300) {
                            handleCloseTopAd(-1); 
                        }
                    }}
                    className={`absolute top-0 w-full h-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 origin-top ${isFront ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
                    style={{
                        boxShadow: isFront 
                            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                        transformOrigin: "top center"
                    }}
                  >
                    {/* Close Button */}
                    {isFront && (
                      <button 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleCloseTopAd(0); 
                        }}
                        className="absolute top-4 right-4 z-50 w-9 h-9 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border border-white/20 shadow-sm"
                      >
                        <Icon icon="solar:close-circle-bold" className="text-xl" />
                      </button>
                    )}

                    <div className="w-full h-full relative">
                        {renderContent(ad)}
                    </div>

                    {activeAds.length > 1 && isFront && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 shadow-lg z-20 pointer-events-none">
                            +{activeAds.length - 1} Promo Lainnya
                        </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}