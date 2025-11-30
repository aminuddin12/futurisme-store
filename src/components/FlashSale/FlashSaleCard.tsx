'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FlashSaleProduct {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  soldPercentage: number;
  stock: number;
  rating: number;
}

export default function FlashSaleCard({ product }: { product: FlashSaleProduct }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm group cursor-pointer h-full flex flex-col"
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Badge Diskon */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
          <Icon icon="solar:flame-bold-duotone" />
          {product.discountPercentage}% OFF
        </div>
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
             <button className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300">
                <Icon icon="solar:cart-plus-bold-duotone" className="text-xl" />
             </button>
             <button className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                <Icon icon="solar:heart-bold-duotone" className="text-xl" />
             </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-bold text-gray-800 dark:text-white line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 text-xs text-yellow-400 mb-3">
            <Icon icon="solar:star-bold" />
            <span className="text-gray-500 dark:text-gray-400 font-medium">{product.rating}</span>
        </div>

        <div className="mt-auto">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-extrabold text-primary">
                    Rp {product.discountedPrice.toLocaleString('id-ID')}
                </span>
            </div>
            <span className="text-xs text-gray-400 line-through block mb-3">
                Rp {product.originalPrice.toLocaleString('id-ID')}
            </span>

            {/* Progress Bar Stock */}
            <div className="relative w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                    style={{ width: `${product.soldPercentage}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md z-10">
                    {product.soldPercentage >= 90 ? 'Segera Habis!' : `Terjual ${product.soldPercentage}%`}
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}