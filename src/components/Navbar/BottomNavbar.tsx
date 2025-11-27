'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';

export default function BottomNavbar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const menus = [
    { 
      name: t('sidebar.home') || 'Home', 
      href: '/', 
      activeIcon: 'solar:home-2-bold-duotone', 
      inactiveIcon: 'solar:home-2-line-duotone' 
    },
    { 
      name: t('sidebar.category') || 'Category', 
      href: '/category', 
      activeIcon: 'solar:server-2-bold-duotone', 
      inactiveIcon: 'solar:server-2-line-duotone' 
    },
    { 
      name: 'Feed', 
      href: '/feed', 
      activeIcon: 'solar:feed-bold-duotone', 
      inactiveIcon: 'solar:feed-line-duotone'
    },
    { 
      name: t('sidebar.cart') || 'Cart', 
      href: '/cart', 
      activeIcon: 'solar:cart-3-bold-duotone', 
      inactiveIcon: 'solar:cart-3-line-duotone',
      badge: 3
    },
    { 
      name: t('sidebar.chat') || 'Chat', 
      href: '/chat', 
      activeIcon: 'solar:chat-round-bold-duotone', 
      inactiveIcon: 'solar:chat-round-line-duotone',
      badge: 5
    },
    { 
      name: t('sidebar.profile') || 'Profile', 
      href: '/profile', 
      activeIcon: 'solar:user-rounded-bold-duotone', 
      inactiveIcon: 'solar:user-rounded-line-duotone' 
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-[40] lg:hidden pb-safe">
      <div className="bg-white dark:bg-gray-900 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] rounded-t-[24px] border-t border-gray-100 dark:border-gray-800 px-2 h-[70px] flex items-end justify-around relative">
        
        {menus.map((menu, index) => {
          const isActive = pathname === menu.href;
          const isLongText = menu.name.length > 8;

          return (
            <Link key={index} href={menu.href} className="w-full group relative">
              <div className="flex flex-col items-center justify-center h-[70px] w-full relative">
                
                <motion.div
                  layoutId={`nav-icon-${index}`}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex items-center justify-center z-20 relative transition-all duration-300
                    ${isActive 
                      ? '-translate-y-1 scale-105' 
                      : 'translate-y-0 scale-100'
                    }
                  `}
                >
                  <div className={`relative ${isActive ? 'drop-shadow-md' : ''}`}>
                    <Icon 
                        icon={isActive ? menu.activeIcon : menu.inactiveIcon} 
                        className={`transition-all duration-300 
                            ${isActive 
                                ? 'text-3xl text-primary'
                                : 'text-2xl text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                            }
                        `} 
                    />
                  </div>
                  
                  {menu.badge && (
                     <span className={`absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-bold rounded-full border border-white dark:border-gray-900 shadow-sm
                        dark:bg-red-500 dark:text-white
                        bg-primary text-black
                     `}>
                        {menu.badge}
                     </span>
                  )}
                </motion.div>

                <div 
                    className={`overflow-hidden w-full max-w-[64px] text-center transition-all duration-300 ease-out mt-1`}
                >
                   {isActive && isLongText ? (
                     <div className="relative w-full overflow-hidden h-[14px] flex justify-center">
                        {/* UPDATE: Menggunakan container flex row untuk elemen marquee agar alignment pas */}
                        <motion.div
                          className="flex gap-4 whitespace-nowrap text-[10px] font-bold text-primary"
                          // Animasi dari 0% ke -50% (setengah panjang total container yang berisi 2 set teks)
                          // Pastikan elemen diduplikasi agar seamless
                          animate={{ x: ["0%", "-50%"] }}
                          transition={{ 
                            repeat: Infinity, 
                            ease: "linear", 
                            duration: 3, // Durasi 3 detik sesuai permintaan
                          }}
                          // Menggunakan style w-fit agar lebar container mengikuti konten
                          style={{ width: "fit-content" }}
                        >
                           {/* Set Teks Pertama */}
                           <div className="flex gap-4">
                              <span>· {menu.name} ·</span>
                           </div>
                           {/* Set Teks Kedua (Duplikat untuk looping) */}
                           <div className="flex gap-4">
                              <span>· {menu.name} ·</span>
                           </div>
                        </motion.div>
                     </div>
                   ) : (
                     <span className={`text-[10px] font-medium truncate block px-1 transition-colors duration-300
                        ${isActive ? 'text-primary font-bold' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'}
                     `}>
                        {menu.name}
                     </span>
                   )}
                </div>

                {isActive && (
                    <motion.div
                        layoutId="active-indicator"
                        className="absolute bottom-1.5 w-1/2 h-[3px] bg-primary rounded-full shadow-sm shadow-primary/30"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}