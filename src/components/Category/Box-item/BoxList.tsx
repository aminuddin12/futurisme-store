'use client';

import BoxByAlphabet from './BoxByAlphabet';

interface BoxListProps {
  items: string[];
  categorySlug: string;
}

export default function BoxList({ items, categorySlug }: BoxListProps) {
  // Mengelompokkan item berdasarkan huruf pertama
  const groupedItems = items.reduce((acc, item) => {
    const firstLetter = item.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, string[]>);

  // Membuat array alfabet A-Z
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="mt-4">
      {/* Menggunakan CSS Columns untuk layout masonry yang natural untuk direktori abjad */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
        {alphabet.map((letter) => {
          const itemsForLetter = groupedItems[letter] || [];
          
          if (itemsForLetter.length === 0) return null;

          return (
            <BoxByAlphabet 
              key={letter}
              letter={letter}
              items={itemsForLetter}
              categorySlug={categorySlug}
            />
          );
        })}
      </div>
      
      {/* Fallback jika item dimulai dengan angka/simbol (Opsional, bisa ditambahkan jika perlu) */}
      {/* logic untuk non-alphabet bisa ditambahkan di sini jika data dummy memilikinya */}
    </div>
  );
}