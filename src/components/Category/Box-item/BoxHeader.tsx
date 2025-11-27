'use client';

import { Icon } from '@iconify/react';

interface BoxHeaderProps {
  icon: string;
  name: string;
}

export default function BoxHeader({ icon, name }: BoxHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon icon={icon} className="text-lg" />
      </div>
      <h3 className="font-bold text-gray-800 dark:text-white text-sm md:text-base truncate">
        {name}
      </h3>
    </div>
  );
}