'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useAuthModal } from '@/context/AuthModalContext';
import LoginForm from './LoginForm';
import { useWebConfig } from '@/context/WebConfigContext';

export default function LoginPopup() {
  const { isLoginOpen, closeLogin } = useAuthModal();
  const { getFeature } = useWebConfig();

  // Cek konfigurasi apakah fitur popup diaktifkan
  if (!getFeature('enableLoginPopup')) return null;

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLogin}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-[400px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={closeLogin}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Icon icon="solar:close-circle-bold" className="text-xl" />
            </button>

            {/* Dekorasi Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-green-300"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Render Form */}
            <LoginForm isPopup={true} onSuccess={closeLogin} />
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}