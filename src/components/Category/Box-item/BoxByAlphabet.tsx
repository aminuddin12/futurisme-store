'use client';

import BoxItem from './BoxItem';

interface BoxByAlphabetProps {
  letter: string;
  items: string[];
  categorySlug: string;
}

export default function BoxByAlphabet({ letter, items, categorySlug }: BoxByAlphabetProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-4 break-inside-avoid">
      {/* Header Abjad */}
      <h4 className="text-md font-bold text-gray-800 dark:text-gray-200 mb-2 sticky top-0 bg-white dark:bg-gray-900 py-1 z-10">
        # {letter}
      </h4>
      
      {/* Daftar Item */}
      <div className="flex flex-col gap-1 mb-3">
        {items.map((item, index) => (
          <BoxItem 
            key={`${letter}-${index}`}
            name={item} 
            href={`/category/${categorySlug}/${item.toLowerCase().replace(/\s+/g, '-')}`} 
          />
        ))}
      </div>

      {/* Garis Pemisah */}
      <div className="h-px bg-gray-100 dark:bg-gray-800 w-full"></div>
    </div>
  );
}