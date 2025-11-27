'use client';

import { Icon } from '@iconify/react';
import Logo from '../../Logo'; // Import komponen Logo

interface CenterBarLeftProps {
  onSidebarClick?: () => void;
}

export default function CenterBarLeft({ onSidebarClick }: CenterBarLeftProps) {
  return (
    <div className="flex items-center">
      {/* Tombol Sidebar (Mobile/Tablet Only) */}
      {/* Muncul di layar kecil, hilang di layar besar (lg) */}
      <button 
        onClick={onSidebarClick}
        className="lg:hidden w-10 h-10 flex items-center justify-center text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group"
        aria-label="Menu"
      >
        {/* Icon Default (Line) - Hilang saat Hover */}
        <Icon 
          icon="solar:sidebar-minimalistic-line-duotone" 
          className="text-2xl block group-hover:hidden transition-transform" 
        />
        {/* Icon Active/Hover (Bold) - Muncul saat Hover */}
        <Icon 
          icon="solar:sidebar-minimalistic-bold-duotone" 
          className="text-2xl hidden group-hover:block transition-transform" 
        />
      </button>

      {/* Logo Link (Desktop Only) */}
      {/* Hilang di layar kecil, muncul di layar besar (lg) */}
      <div className="hidden lg:flex ml-2">
        <Logo />
      </div>
    </div>
  );
}