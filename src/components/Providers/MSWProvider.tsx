'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    // Hanya aktifkan di development dan jika mocking diaktifkan via env
    const init = async () => {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        const { worker } = await import('@/mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass', // Jangan warning request yang tidak di-handle (seperti gambar/next assets)
        });
      }
      setMswReady(true);
    };

    init();
  }, []);

  // Opsional: Tampilkan loading atau null sampai MSW siap
  // Agar tidak terjadi race condition saat fetch data awal
  if (!mswReady) return null;

  return <>{children}</>;
}