'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import BoxCategory from './BoxCategory';
import categoryDataDummy from './Dummy/categoryData.json';

// Sesuaikan definisi tipe data dengan struktur JSON baru
interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image: string;
  itemCount: number;
  subCategories: string[];
}

export default function Main() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
        setTimeout(() => {
            // Casting tipe data karena JSON import mungkin perlu penyesuaian tipe strict
            setCategories(categoryDataDummy as unknown as Category[]);
            setIsLoading(false);
        }, 500);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        {/* Skeleton Loading Grid menyesuaikan layout BoxCategory */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 h-64 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400 dark:text-gray-500">
            <Icon icon="solar:box-minimalistic-line-duotone" className="text-6xl mb-4 opacity-50" />
            <p>Kategori tidak ditemukan</p>
        </div>
    );
  }

  return (
    <section className="container mx-auto px-6 py-8 pb-32">
      {/* Panggil BoxCategory menggantikan grid manual sebelumnya */}
      <BoxCategory data={categories} />
    </section>
  );
}