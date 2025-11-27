'use client';

import CenterBarLeft from './CenterBarLeft';
import CenterBarMiddle from './CenterBarMiddle';
import CenterBarRight from './CenterBarRight';

interface CenterBarProps {
  onSidebarClick: () => void;
}

export default function CenterBar({ onSidebarClick }: CenterBarProps) {
  return (
    <div className="container mx-auto px-4 py-3 md:py-4 flex items-center gap-4 md:gap-8 bg-white dark:bg-gray-900 z-20 relative transition-colors duration-300">
      <CenterBarLeft onSidebarClick={onSidebarClick} />
      <CenterBarMiddle />
      <CenterBarRight />
    </div>
  );
}