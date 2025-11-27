'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export default function BottomNavbar() {
  const pathname = usePathname();

  const menus = [
    { 
      name: 'Home', 
      href: '/', 
      activeIcon: 'solar:home-2-bold-duotone', 
      inactiveIcon: 'solar:home-2-line-duotone' 
    },
    { 
      name: 'Category', 
      href: '/category', // Mengarah ke src/app/category/page.tsx
      activeIcon: 'solar:server-2-bold-duotone', 
      inactiveIcon: 'solar:server-2-line-duotone' 
    },
    { 
      name: 'Cart', 
      href: '/cart', // Mengarah ke src/app/cart/page.tsx
      activeIcon: 'solar:cart-3-bold-duotone', 
      inactiveIcon: 'solar:cart-3-line-duotone',
      isFloating: true 
    },
    { 
      name: 'Chat', 
      href: '/chat', // Mengarah ke src/app/chat/page.tsx
      activeIcon: 'solar:chat-round-bold-duotone', 
      inactiveIcon: 'solar:chat-round-line-duotone'
    },
    { 
      name: 'Profile', 
      href: '/profile', // Mengarah ke src/app/profile/page.tsx
      activeIcon: 'solar:user-rounded-bold-duotone', 
      inactiveIcon: 'solar:user-rounded-line-duotone' 
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-[40] lg:hidden pb-safe">
      <div className="bg-white dark:bg-gray-900 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] rounded-t-[24px] border-t border-gray-100 dark:border-gray-800 px-6 h-[70px] flex items-center justify-between relative">
        
        {menus.map((menu, index) => {
          const isActive = pathname === menu.href;

          // Render Tombol Floating (Cart)
          if (menu.isFloating) {
            return (
              <div key={index} className="relative -top-6 group">
                <Link href={menu.href}>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 transition-all duration-300 bg-primary text-white ring-4 ring-white dark:ring-gray-900`}
                  >
                    <Icon 
                      icon={isActive ? menu.activeIcon : menu.inactiveIcon} 
                      className="text-2xl" 
                    />
                    
                    {isActive && (
                        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white border-2 border-primary rounded-full"></span>
                    )}
                  </motion.div>
                </Link>
              </div>
            );
          }

          // Render Tombol Biasa
          return (
            <Link key={index} href={menu.href} className="relative">
              <motion.div
                className="flex flex-col items-center justify-center gap-1 w-12 h-full"
                whileTap={{ scale: 0.9 }}
              >
                <div className={`relative flex flex-col items-center transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}>
                  <Icon 
                    icon={isActive ? menu.activeIcon : menu.inactiveIcon} 
                    className={`text-2xl transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} 
                  />
                  
                  <span className={`text-[10px] font-medium mt-1 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}>
                    {menu.name}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}