'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek status login dari localStorage (Simulasi Session)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('currentUser');

    if (!isLoggedIn || !userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Icon icon="svg-spinners:ring-resize" className="text-4xl text-primary" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      
      {/* Header Dashboard */}
      <DashboardHeader user={user} onLogout={handleLogout} />

      {/* Dashboard Content Widgets */}
      <div className="space-y-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: 'Pesanan Saya', icon: 'solar:bag-check-bold-duotone', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', count: 5 },
                { label: 'Wishlist', icon: 'solar:heart-bold-duotone', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20', count: 12 },
                { label: 'Voucher', icon: 'solar:ticket-sale-bold-duotone', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', count: 3 },
                { label: 'Poin', icon: 'solar:star-circle-bold-duotone', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', count: 1500 },
            ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-colors cursor-pointer group">
                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                        <Icon icon={item.icon} className={`text-2xl ${item.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{item.count}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.label}</p>
                </div>
            ))}
        </div>

        {/* Recent Activity & Account Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Pesanan Terakhir */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                        <Icon icon="solar:history-bold-duotone" className="text-primary" />
                        Pesanan Terakhir
                    </h3>
                    <Link href="#" className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                        Lihat Semua <Icon icon="solar:alt-arrow-right-linear" />
                    </Link>
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 group">
                            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                                <Icon icon="solar:box-minimalistic-bold-duotone" className="text-2xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-800 dark:text-white text-sm truncate">ISKU Tool Kit Set 82pcs Professional</h4>
                                <p className="text-xs text-gray-500 mt-0.5">INV/20250101/XX/123{i} • 2 Barang</p>
                            </div>
                            <div className="text-right">
                                <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full block mb-1">Selesai</span>
                                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Rp 450.000</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Info Akun Singkat */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-fit">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                     <Icon icon="solar:card-recive-bold-duotone" className="text-primary" />
                     Detail Akun
                </h3>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500">
                            <Icon icon="solar:letter-bold-duotone" />
                        </div>
                        <div className="overflow-hidden">
                            <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Email</label>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500">
                            <Icon icon="solar:calendar-bold-duotone" />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Bergabung</label>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{user?.role === 'member' ? 'Januari 2025' : 'Member Lama'}</p>
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <button className="w-full py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                            <Icon icon="solar:pen-new-square-bold-duotone" />
                            Edit Profil
                        </button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </DashboardLayout>
  );
}