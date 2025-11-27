'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 text-center px-6">
      
      {/* Animasi Icon */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 relative"
      >
        {/* Background Circle Decor */}
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl transform scale-150"></div>
        
        <div className="relative z-10 w-40 h-40 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-800">
            <Icon 
                icon="solar:ufo-3-bold-duotone" 
                className="text-8xl text-primary animate-bounce-slow" 
            />
        </div>
        
        {/* Decor Stars */}
        <Icon icon="solar:star-bold-duotone" className="absolute -top-4 -right-4 text-yellow-400 text-4xl animate-pulse" />
        <Icon icon="solar:asteroid-bold-duotone" className="absolute bottom-0 -left-8 text-gray-400 text-3xl animate-spin-slow" />
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
          Halaman Hilang di Angkasa
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
        </p>

        {/* Button Home */}
        <Link href="/" className="inline-block">
            <button className="group flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-green-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Icon icon="solar:home-2-bold-duotone" className="text-xl" />
                <span>Kembali ke Beranda</span>
                <Icon icon="solar:arrow-right-line-duotone" className="text-lg opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </button>
        </Link>
      </motion.div>

    </div>
  );
}