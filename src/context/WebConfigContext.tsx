/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createContext, useContext, ReactNode } from 'react';

// Tipe data untuk struktur JSON kita
interface ConfigItem {
  id: string;
  key: string;
  value: any;
  description?: string;
}

interface WebConfig {
  status: number;
  success: boolean;
  isMaintenance: boolean;
  data: ConfigItem[];
}

interface WebConfigContextType {
  config: WebConfig | null;
  getConfig: (key: string) => any;
  getFeature: (featureKey: string) => boolean;
}

const WebConfigContext = createContext<WebConfigContextType | undefined>(undefined);

export function WebConfigProvider({ 
  children, 
  config 
}: { 
  children: ReactNode; 
  config: WebConfig | null;
}) {
  
  // Helper untuk mengambil value berdasarkan key utama (misal: 'app_info')
  const getConfig = (key: string) => {
    if (!config || !config.data) return null;
    const item = config.data.find((d) => d.key === key);
    return item ? item.value : null;
  };

  // Helper khusus untuk mengambil status fitur (misal: 'enableChat')
  const getFeature = (featureKey: string) => {
    const features = getConfig('feature_flags');
    if (!features) return false;
    return features[featureKey] === true;
  };

  return (
    <WebConfigContext.Provider value={{ config, getConfig, getFeature }}>
      {children}
    </WebConfigContext.Provider>
  );
}

export function useWebConfig() {
  const context = useContext(WebConfigContext);
  if (context === undefined) {
    throw new Error('useWebConfig must be used within a WebConfigProvider');
  }
  return context;
}