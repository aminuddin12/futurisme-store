'use client';

interface CategoryNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  show: boolean;
}

export default function CategoryNavigation({ onNext, onPrev, show }: CategoryNavigationProps) {
  if (!show) return null;

  return (
    <>
      <button 
        onClick={onPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 md:-ml-4 w-8 h-8 md:w-10 md:h-10 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
        aria-label="Previous page"
      >
        <i className="fas fa-chevron-left text-xs md:text-sm"></i>
      </button>
      <button 
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 md:-mr-4 w-8 h-8 md:w-10 md:h-10 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
        aria-label="Next page"
      >
        <i className="fas fa-chevron-right text-xs md:text-sm"></i>
      </button>
    </>
  );
}