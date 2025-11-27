'use client';

import { Icon } from '@iconify/react';

interface ChatPageSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSettingsClick: () => void;
  userAvatar?: string;
}

export default function ChatPageSidebar({ 
  activeTab = 'chat', 
  onTabChange,
  onSettingsClick,
  userAvatar = 'https://i.pravatar.cc/150?u=me' // Default avatar placeholder
}: ChatPageSidebarProps) {
  return (
    <div className="hidden md:flex flex-col items-center justify-between w-[70px] h-full bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 py-6 shrink-0">
      
      {/* Top Section: Profile & Navigation */}
      <div className="flex flex-col items-center gap-6 w-full">
        {/* User Profile */}
        <div className="relative group cursor-pointer mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-primary transition-all">
            <img 
              src={userAvatar} 
              alt="User Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online Status */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-950 rounded-full"></div>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-col gap-4 w-full items-center">
          {/* Chat Tab (Active) */}
          <button 
            onClick={() => onTabChange?.('chat')}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all relative group
              ${activeTab === 'chat' 
                ? 'bg-white dark:bg-gray-800 text-primary shadow-sm' 
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }`}
          >
            <Icon icon="solar:chat-round-bold-duotone" className="text-2xl" />
            
            {/* Tooltip */}
            <span className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
              Percakapan
            </span>
          </button>

          {/* Contacts Tab (Example) */}
          <button 
            onClick={() => onTabChange?.('contacts')}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all relative group
              ${activeTab === 'contacts' 
                ? 'bg-white dark:bg-gray-800 text-primary shadow-sm' 
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }`}
          >
            <Icon icon="solar:users-group-rounded-bold-duotone" className="text-2xl" />
             <span className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
              Kontak
            </span>
          </button>

           {/* Archive Tab (Example) */}
           <button 
            onClick={() => onTabChange?.('archive')}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all relative group
              ${activeTab === 'archive' 
                ? 'bg-white dark:bg-gray-800 text-primary shadow-sm' 
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }`}
          >
            <Icon icon="solar:archive-down-minimlistic-bold-duotone" className="text-2xl" />
             <span className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
              Arsip
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Settings & Logout */}
      <div className="flex flex-col gap-4 w-full items-center">
        <button 
          onClick={onSettingsClick}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-primary hover:bg-green-50 dark:hover:bg-green-900/20 transition-all relative group"
        >
          <Icon icon="solar:settings-bold-duotone" className="text-2xl" />
          <span className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
              Pengaturan
          </span>
        </button>

        {/* Logout (Opsional) */}
        <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all relative group">
          <Icon icon="solar:logout-2-bold-duotone" className="text-2xl" />
           <span className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
              Keluar
          </span>
        </button>
      </div>

    </div>
  );
}