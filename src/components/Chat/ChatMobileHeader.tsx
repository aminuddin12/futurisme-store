'use client';

import { Icon } from '@iconify/react';

interface ChatMobileHeaderProps {
  onSettingsClick?: () => void;
}

export default function ChatMobileHeader({ onSettingsClick }: ChatMobileHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-950 px-6 py-4 shadow-sm sticky top-0 z-10 flex justify-between items-center md:hidden shrink-0">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <Icon icon="solar:chat-round-bold-duotone" className="text-primary" />
        Percakapan
      </h1>
      <button 
        onClick={onSettingsClick}
        className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
          <Icon icon="solar:settings-bold-duotone" className="text-xl" />
      </button>
    </div>
  );
}