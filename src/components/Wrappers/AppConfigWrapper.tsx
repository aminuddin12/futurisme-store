/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { service } from '@/services/ServiceFetcher';
import Maintenance from '@/app/maintenance/page';
import { Icon } from '@iconify/react';
import { WebConfigProvider } from '@/context/WebConfigContext'; // Import Provider baru

// Sesuaikan tipe data dengan respon API
interface WebConfigResponse {
  status: number;
  success: boolean;
  isMaintenance: boolean;
  data: any[];
}

export default function AppConfigWrapper({ children }: { children: React.ReactNode }) {
  const [configData, setConfigData] = useState<WebConfigResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConfig = async () => {
      try {
        // Fetch ke Mock API /web-config
        const response = await service.get<WebConfigResponse>('/web-config');
        setConfigData(response);
      } catch (error) {
        console.error("Gagal memuat konfigurasi web:", error);
        // Fallback minimal jika gagal
        setConfigData({
            status: 500,
            success: false,
            isMaintenance: false, // Default agar app tetap jalan
            data: []
        });
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    checkConfig();
  }, []);

  // 1. Loading Screen
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
  if (configData?.isMaintenance) {
    return <Maintenance />;
  }

  // 3. Tampilan Aplikasi Normal (Dibungkus Context Provider)
  return (
    <WebConfigProvider config={configData}>
      {children}
    </WebConfigProvider>
  );
}