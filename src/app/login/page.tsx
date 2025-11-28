'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import LoginForm from '@/components/Login/LoginForm';
import { useWebConfig } from '@/context/WebConfigContext';
import { notFound } from 'next/navigation';

export default function LoginPage() {
  const { getFeature } = useWebConfig();

  // LOGIKA BARU: Jika Popup aktif, halaman ini menjadi 404 (Tidak Dapat Diakses)
  if (getFeature('enableLoginPopup')) {
    notFound();
    return null; // Mencegah render konten selanjutnya
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[60vh] h-[60vh] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Back to Home */}
      <Link href="/" className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors z-20">
        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-sm">
            <Icon icon="solar:arrow-left-linear" className="text-xl" />
        </div>
        <span className="text-sm font-medium hidden md:block">Kembali ke Beranda</span>
      </Link>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-[1000px] bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex min-h-[600px]">
        
        {/* Left Side: Illustration (Desktop Only) */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary/10 to-green-100/10 items-center justify-center relative p-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            
            <div className="text-center relative z-10">
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center text-primary transform -rotate-6">
                        <Icon icon="solar:shop-2-bold-duotone" className="text-5xl" />
                    </div>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4">Futurisme Store</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Nikmati pengalaman belanja masa depan dengan teknologi terkini dan penawaran eksklusif.
                </p>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex items-center justify-center">
            <LoginForm />
        </div>

      </div>
    </main>
  );
}