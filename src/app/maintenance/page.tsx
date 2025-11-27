'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 text-center px-6 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] bg-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Animasi Icon */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 relative z-10"
      >
        <div className="relative w-48 h-48 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-100 dark:border-gray-800 mx-auto">
            {/* Rocket Icon */}
            <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <Icon 
                    icon="solar:rocket-2-bold-duotone" 
                    className="text-[100px] text-primary drop-shadow-lg" 
                />
            </motion.div>

            {/* Tools Floating */}
            <motion.div 
                animate={{ rotate: [0, 10, 0], x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-2 top-4 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
                <Icon icon="solar:settings-bold-duotone" className="text-2xl text-blue-500" />
            </motion.div>
            
            <motion.div 
                animate={{ rotate: [0, -10, 0], y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -left-4 bottom-8 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
                <Icon icon="solar:wrench-bold-duotone" className="text-2xl text-orange-500" />
            </motion.div>
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 max-w-lg"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          Sedang Dalam Perbaikan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
          Kami sedang meningkatkan performa roket kami untuk pengalaman belanja yang lebih cepat di masa depan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Button Refresh */}
            <button 
                onClick={() => window.location.reload()}
                className="group flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all"
            >
                <Icon icon="solar:refresh-bold-duotone" className="text-xl group-hover:rotate-180 transition-transform duration-500" />
                <span>Coba Lagi</span>
            </button>

            {/* Button Contact Support */}
            <Link href="https://wa.me/6281234567890" target="_blank">
                <button className="group flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-green-600 hover:shadow-xl transition-all">
                    <Icon icon="solar:chat-round-dots-bold-duotone" className="text-xl" />
                    <span>Hubungi Kami</span>
                </button>
            </Link>
        </div>

        <div className="mt-12 text-xs text-gray-400 dark:text-gray-600 font-medium">
            Perkiraan selesai: <span className="text-gray-600 dark:text-gray-400">Segera</span>
        </div>
      </motion.div>

    </div>
  );
}