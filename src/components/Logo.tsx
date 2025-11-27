'use client';

import Link from 'next/link';
import { useWebConfig } from '@/context/WebConfigContext';

export default function Logo() {
  const { getConfig } = useWebConfig();
  const appInfo = getConfig('app_info');

  return (
    <Link 
      href="/" 
      className="text-2xl font-extrabold text-primary tracking-tighter flex items-center gap-1 group"
    >
      <i className="fas fa-shopping-bag group-hover:rotate-12 transition-transform"></i>
      {/* Menggunakan nama dari config, fallback ke 'SHOP' jika loading/error */}
      <span>{appInfo?.name || 'SHOP'}</span>
    </Link>
  );
}