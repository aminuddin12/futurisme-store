'use client';

import { useEffect, useState } from 'react';
import { service } from '@/services/ServiceFetcher';
import Maintenance from '@/app/maintenance/page';
import { Icon } from '@iconify/react';

interface WebConfigResponse {
  isMaintenance: boolean;
  // Kita bisa menambahkan tipe data lain sesuai json jika perlu
}

export default function AppConfigWrapper({ children }: { children: React.ReactNode }) {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConfig = async () => {
      try {
        // Menggunakan ServiceFetcher yang sudah aman (header otomatis, dll)
        const config = await service.get<WebConfigResponse>('/web-config');
        setIsMaintenance(config.isMaintenance);
      } catch (error) {
        console.error("Gagal memuat konfigurasi web:", error);
        // Fallback: Jika gagal fetch (misal api mati), default ke normal atau maintenance?
        // Di sini kita default ke normal agar aplikasi tetap bisa dibuka
        setIsMaintenance(false);
      } finally {
        // Beri sedikit delay agar loading tidak kedip terlalu cepat (opsional, untuk estetik)
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    checkConfig();
  }, []);

  // 1. Tampilan Loading Awal (Splash Screen)
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white dark:bg-gray-950 flex flex-col items-center justify-center">
        <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-gray-100 dark:border-gray-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-primary">
                <Icon icon="solar:shop-2-bold-duotone" className="text-2xl" />
            </div>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
            Memuat Toko...
        </p>
      </div>
    );
  }

  // 2. Tampilan Maintenance Mode
  if (isMaintenance) {
    return <Maintenance />;
  }

  // 3. Tampilan Aplikasi Normal
  return <>{children}</>;
}