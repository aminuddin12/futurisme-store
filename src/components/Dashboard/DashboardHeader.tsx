'use client';

import { Icon } from '@iconify/react';
import { useTranslation } from '@/context/LanguageContext';

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
      
      {/* Welcome Section */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gray-50 dark:border-gray-700 shadow-md">
            <img 
              src={user?.avatar || 'https://i.pravatar.cc/150?u=default'} 
              alt={user?.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" title="Online"></div>
        </div>
        
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Halo, {user?.name}! 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Member <span className="font-bold text-primary capitalize">{user?.role || 'User'}</span>
          </p>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative group">
          <Icon icon="solar:bell-bold-duotone" className="text-xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <Icon icon="solar:settings-bold-duotone" className="text-xl" />
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm"
        >
          <Icon icon="solar:logout-2-bold-duotone" className="text-lg" />
          <span>Keluar</span>
        </button>
      </div>
    </header>
  );
}