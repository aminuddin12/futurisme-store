'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useAuthModal } from '@/context/AuthModalContext';
import RegisterForm from './RegisterForm';
import { useWebConfig } from '@/context/WebConfigContext';

export default function RegisterPopup() {
  const { isRegisterOpen, closeRegister } = useAuthModal();
  const { getFeature } = useWebConfig();

  // Cek konfigurasi apakah fitur popup register diaktifkan
  if (!getFeature('enableRegisterPopup')) return null;

  return (
    <AnimatePresence>
      {isRegisterOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeRegister}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-[400px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide"
          >
            {/* Close Button */}
            <button 
              onClick={closeRegister}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors z-10"
            >
              <Icon icon="solar:close-circle-bold" className="text-xl" />
            </button>

            {/* Dekorasi Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-primary"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Render Form */}
            <RegisterForm isPopup={true} onSuccess={closeRegister} />
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}