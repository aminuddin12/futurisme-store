'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflinePage() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Fungsi untuk update state
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Cek status awal saat mount
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOffline(!navigator.onLine);
    }

    // Pasang event listener
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fungsi reload
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-white dark:bg-gray-950 flex flex-col items-center justify-center px-6 text-center"
        >
          {/* Icon Animasi */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="w-32 h-32 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center relative z-10 border border-red-100 dark:border-red-800">
              <Icon 
                icon="solar:wi-fi-router-minimalistic-broken-line-duotone" 
                className="text-6xl text-red-500 animate-pulse" 
              />
            </div>
            
            {/* Floating Elements */}
            <Icon icon="solar:cloud-broken-line-duotone" className="absolute -top-4 -right-4 text-4xl text-gray-400 animate-bounce" />
            <Icon icon="solar:satellite-bold-duotone" className="absolute bottom-0 -left-8 text-3xl text-gray-300 animate-spin-slow" style={{ animationDuration: '10s' }} />
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            Koneksi Terputus
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-8 leading-relaxed">
            Ups! Sepertinya Anda kehilangan koneksi internet. Periksa jaringan WiFi atau data seluler Anda.
          </p>

          <button 
            onClick={handleRetry}
            className="group flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-green-600 hover:shadow-xl active:scale-95 transition-all"
          >
            <Icon icon="solar:refresh-circle-bold-duotone" className="text-xl group-hover:rotate-180 transition-transform duration-500" />
            <span>Coba Lagi</span>
          </button>

          <div className="absolute bottom-10 text-xs text-gray-400">
            Kode Error: ERR_INTERNET_DISCONNECTED
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}