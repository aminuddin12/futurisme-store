/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import MobileHeader from '@/components/Category/MobileHeader';
import Header from '@/components/Category/Header';
import BoxCategory from '@/components/Category/BoxCategory'; // "Popular" view (default)
import CategoryFilterAll from '@/components/Category/Filter/CategoryFilterAll';
import CategoryFilterAlphabet from '@/components/Category/Filter/CategoryFilterAlphabet';
import CategoryFilterGroup from '@/components/Category/Filter/CategoryFilterGroup';

// Import Data
import categoryDataDummy from '@/components/Category/Dummy/categoryData.json';
import filterData from '@/data/categoryFilterData.json';

export default function MobileCategory() {
  const [activeFilter, setActiveFilter] = useState('popular');

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-24 pt-safe">
      
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="hidden md:block h-40"></div>

      {/* Pass state ke Header */}
      <Header activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="block md:hidden">
        <MobileHeader />
      </div>

      {/* Konten Utama (Conditional Rendering) */}
      <section className="container mx-auto px-6 py-8 pb-32 min-h-[500px]">
        {activeFilter === 'popular' && (
           <BoxCategory data={categoryDataDummy as any} />
        )}
        
        {activeFilter === 'all' && (
           <CategoryFilterAll data={filterData.all} />
        )}

        {activeFilter === 'alphabet' && (
           <CategoryFilterAlphabet data={filterData.all} />
        )}

        {activeFilter === 'group' && (
           <CategoryFilterGroup data={filterData.groups} />
        )}
      </section>
    </main>
  );
}