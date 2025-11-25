'use client';

interface CategoryHeaderProps {
  totalPages: number;
  currentPage: number;
}

export default function CategoryHeader({ totalPages, currentPage }: CategoryHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">Kategori Pilihan</h2>
      
      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${currentPage === idx ? 'w-4 bg-primary' : 'w-1.5 bg-gray-300 dark:bg-gray-600'}`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}