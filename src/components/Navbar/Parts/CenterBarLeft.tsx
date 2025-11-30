'use client';

import { Icon } from '@iconify/react';
import LogoDefault from '../../LogoDefault';

interface CenterBarLeftProps {
  onSidebarClick?: () => void;
}

export default function CenterBarLeft({ onSidebarClick }: CenterBarLeftProps) {
  return (
    <div className="flex items-center gap-3 static md:relative"> 
      {/* Note: Mengubah 'lg:relative' menjadi 'md:relative' agar layout stabil mulai dari Tablet */}
      
      {/* Tombol Sidebar (Mobile/Tablet Only) */}
      <button 
        onClick={onSidebarClick}
        className="lg:hidden w-10 h-10 flex items-center justify-center text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group z-20"
        aria-label="Menu"
      >
        <Icon 
          icon="solar:sidebar-minimalistic-line-duotone" 
          className="text-2xl block group-hover:hidden transition-transform" 
        />
        <Icon 
          icon="solar:sidebar-minimalistic-bold-duotone" 
          className="text-2xl hidden group-hover:block transition-transform" 
        />
      </button>

      {/* Logo Aplikasi */}
      <div className={`
        /* Mode Mobile (< 768px): Absolute Center */
        absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
        
        /* Mode Tablet & Desktop (>= 768px): Static (Kiri) */
        /* Perbaikan: Menggunakan 'md:' alih-alih 'lg:' agar logo pindah ke kiri saat di Tablet, 
           mencegah tabrakan dengan tombol kanan yang banyak */
        md:static md:translate-x-0 md:translate-y-0 
        
        /* Visibility Rules */
        flex items-center
        
        /* Z-Index agar tidak tertutup */
        z-10
      `}>
        <LogoDefault />
      </div>
    </div>
  );
}