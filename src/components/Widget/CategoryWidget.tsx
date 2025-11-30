/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import categoryWidgetData from '@/data/categoryWidgetData.json';
import CategoryTypeDefault from '@/components/Widget/Category/CategoryTypeDefault';
import CategoryTypeTwo from '@/components/Widget/Category/CategoryTypeTwo';
import CategoryTypeThree from '@/components/Widget/Category/CategoryTypeThree';

export default function CategoryWidget() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
        setData(categoryWidgetData);
        setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            <div className="h-60 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
        </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 space-y-12">
      {data.map((section) => {
        return (
            <div key={section.id} className="space-y-4">
                {/* Section Title (Optional, if needed globally) */}
                {/* <h2 className="text-xl font-bold text-gray-900 dark:text-white px-2">{section.title}</h2> */}
                
                {/* Render berdasarkan Type */}
                {section.type === 'default' && (
                    <CategoryTypeDefault data={section.items} />
                )}

                {section.type === 'type2' && (
                    <CategoryTypeTwo data={section} />
                )}

                {section.type === 'type3' && (
                    <CategoryTypeThree data={section} />
                )}
            </div>
        );
      })}
    </section>
  );
}