'use client';

import { ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Icon } from '@iconify/react';

// Menu sidebar dashboard (bisa dipisah ke json jika mau)
const menuItems = [
  { label: 'Ringkasan', icon: 'solar:pie-chart-2-bold-duotone', active: true },
  { label: 'Pesanan', icon: 'solar:bag-check-bold-duotone', active: false },
  { label: 'Wishlist', icon: 'solar:heart-bold-duotone', active: false },
  { label: 'Ulasan', icon: 'solar:star-circle-bold-duotone', active: false },
  { label: 'Alamat', icon: 'solar:map-point-bold-duotone', active: false },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    // UPDATE: Menambah pt-32 (sekitar 128px) untuk desktop agar aman dari navbar fixed
    // Menambah pb-24 untuk mobile agar tidak tertutup bottom navbar
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-30 md:pt-50 pb-24 md:pb-10 transition-colors">
      
      {/* Navbar Desktop (Hidden di mobile via CSS internal Navbar jika diperlukan, tapi biasanya Navbar muncul di semua) */}
      <div className="hidden md:block">
          <Navbar />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar Menu (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            {/* UPDATE: Top sticky disesuaikan agar tidak tertutup header */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-32">
              <div className="space-y-1">
                <h3 className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu Utama</h3>
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                      ${item.active 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    <Icon icon={item.icon} className="text-xl" />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                 <div className="bg-gradient-to-br from-primary to-green-400 rounded-xl p-4 text-white text-center relative overflow-hidden">
                    <Icon icon="solar:crown-star-bold-duotone" className="text-6xl absolute -bottom-4 -right-4 opacity-20" />
                    <p className="font-bold text-sm mb-1">Upgrade Member</p>
                    <p className="text-xs opacity-90 mb-3">Dapatkan diskon spesial</p>
                    <button className="w-full py-2 bg-white text-primary text-xs font-bold rounded-lg shadow-sm">Lihat Paket</button>
                 </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}