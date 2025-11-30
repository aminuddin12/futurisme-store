'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import LogoDefault from '@/components/LogoDefault'; // Gunakan LogoDefault yang baru

interface DocsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuGroups = [
  {
    title: 'Pengenalan',
    items: [
      { title: 'Tentang Futurisme', href: '/documentation' },
      { title: 'Visi & Misi', href: '/documentation/vision' },
    ]
  },
  {
    title: 'Panduan Pengguna',
    items: [
      { title: 'Memulai', href: '/documentation/getting-started' },
      { title: 'Akun & Keamanan', href: '/documentation/account' },
      { title: 'Pemesanan', href: '/documentation/orders' },
    ]
  },
  {
    title: 'Pengembang',
    items: [
      { title: 'Struktur Proyek', href: '/documentation/structure' },
      { title: 'Komponen UI', href: '/documentation/components' },
      { title: 'API Reference', href: '/documentation/api' },
    ]
  }
];

export default function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-auto lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Header Sidebar */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800">
            {/* Logo Default digunakan di sini */}
            <LogoDefault className="scale-90 origin-left" />
            <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary rounded-full border border-primary/20">DOCS</span>
          </div>

          {/* Menu List */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
            {menuGroups.map((group, idx) => (
              <div key={idx}>
                <h4 className="px-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  {group.title}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        onClick={onClose}
                        className="block"
                      >
                        <div className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                          ${isActive 
                            ? 'text-primary bg-primary/5' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                          }
                        `}>
                          {isActive && (
                            <motion.div
                              layoutId="activeDocMenu"
                              className="absolute left-0 w-1 h-4 bg-primary rounded-r-full"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            />
                          )}
                          <span className={isActive ? 'translate-x-1.5 transition-transform' : ''}>
                            {item.title}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <Link href="/" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Icon icon="solar:arrow-left-linear" className="text-lg" />
              Kembali ke Aplikasi
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}