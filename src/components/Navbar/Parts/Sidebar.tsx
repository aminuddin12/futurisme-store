'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainMenus = [
  { name: 'Beranda', href: '/', icon: 'solar:home-2-bold-duotone' },
  { name: 'Kategori', href: '/category', icon: 'solar:server-2-bold-duotone' },
  { name: 'Keranjang', href: '/cart', icon: 'solar:cart-3-bold-duotone' },
  { name: 'Pesan', href: '/chat', icon: 'solar:chat-round-bold-duotone' },
  { name: 'Profil', href: '/profile', icon: 'solar:user-rounded-bold-duotone' },
];

const secondaryMenus = [
  { name: 'Pengaturan', href: '/settings', icon: 'solar:settings-bold-duotone' },
  { name: 'Bantuan', href: '/help', icon: 'solar:question-circle-bold-duotone' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Kunci scroll body saat sidebar terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Variasi Animasi Sidebar
  const sidebarVariants = {
    closed: { 
      x: "-100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    open: { 
      x: "0%",
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  // Variasi Animasi Item Menu (Stagger Effect)
  const containerVariants = {
    open: {
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop / Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar Container */}
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col rounded-r-2xl border-r border-gray-100 dark:border-gray-800"
          >
            
            {/* Header Sidebar */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 text-primary">
                <Icon icon="solar:shop-2-bold-duotone" className="text-2xl" />
                <span className="font-extrabold text-xl tracking-tight">Menu</span>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Icon icon="solar:close-circle-bold-duotone" className="text-xl" />
              </button>
            </div>

            {/* Menu List */}
            <motion.div 
              className="flex-1 overflow-y-auto py-6 px-4 space-y-6"
              variants={containerVariants}
            >
              {/* Main Navigation */}
              <div className="space-y-1">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Navigasi</p>
                {mainMenus.map((menu) => {
                  const isActive = pathname === menu.href;
                  return (
                    <motion.div key={menu.name} variants={itemVariants}>
                      <Link 
                        href={menu.href}
                        onClick={onClose} // Tutup sidebar saat link diklik
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                          ${isActive 
                            ? 'bg-primary/10 text-primary font-bold' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                          }
                        `}
                      >
                        <Icon 
                          icon={menu.icon} 
                          className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 group-hover:text-primary'}`} 
                        />
                        <span>{menu.name}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="sidebar-active"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-gray-800 mx-2" />

              {/* Secondary Navigation */}
              <div className="space-y-1">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lainnya</p>
                {secondaryMenus.map((menu) => (
                  <motion.div key={menu.name} variants={itemVariants}>
                    <Link 
                      href={menu.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    >
                      <Icon 
                        icon={menu.icon} 
                        className="text-xl text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-transform group-hover:rotate-12" 
                      />
                      <span className="font-medium">{menu.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Footer Sidebar */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-br-2xl">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-green-400 flex items-center justify-center text-white shadow-lg shadow-primary/30">
                  <Icon icon="solar:user-bold" className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 dark:text-white truncate">Tamu</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Selamat Datang!</p>
                </div>
                <Link href="/login" onClick={onClose} className="p-2 text-gray-400 hover:text-primary transition-colors">
                  <Icon icon="solar:login-3-bold-duotone" className="text-xl" />
                </Link>
              </div>
            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}