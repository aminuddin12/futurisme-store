'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductGallery() {
  const images = [
    "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/9/22/e7e8c156-324c-4734-9e32-0453c513e9a0.jpg",
    "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/6/6c07a012-6a6c-48c0-8b1b-9e451152a657.jpg",
    "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/9/22/8e3906a5-397c-472b-8a9d-16017b203874.jpg",
    "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/9/22/924719e5-9c23-4411-9a73-9a3c6c06a8f1.jpg"
  ];
  
  const [activeImg, setActiveImg] = useState(images[0]);

  return (
    <motion.div 
      className="w-full lg:w-[40%] flex-shrink-0"
      initial={{ opacity: 0, x: -50 }} // Mulai dari kiri & transparan
      whileInView={{ opacity: 1, x: 0 }} // Bergerak ke posisi asli
      viewport={{ once: true }} // Animasi hanya sekali
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="sticky top-[170px]">
        <div className="rounded-lg overflow-hidden border border-gray-100 mb-3 relative group">
          <img src={activeImg} className="w-full aspect-square object-contain bg-white transition-transform duration-500 group-hover:scale-105 cursor-zoom-in" alt="Product" />
          <div className="absolute top-0 left-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-br-lg">Grosir</div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveImg(img)}
              className={`w-16 h-16 rounded border-2 cursor-pointer overflow-hidden flex-shrink-0 ${activeImg === img ? 'border-primary' : 'border-gray-200 hover:border-primary'}`}
            >
              <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}