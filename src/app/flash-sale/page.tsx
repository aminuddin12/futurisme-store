'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import FlashSaleHeader from '@/components/FlashSale/FlashSaleHeader';
import FlashSaleList from '@/components/FlashSale/FlashSaleList';
import { service } from '@/services/ServiceFetcher';
import { Icon } from '@iconify/react';

export default function FlashSalePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await service.get('/flash-sale');
        if (res.success) {
            setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch flash sale data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Navbar Desktop */}
      <div className="hidden md:block">
        <Navbar />
        <div className="h-24"></div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10 pb-24">
        {loading ? (
          // Skeleton Loading
          <div className="animate-pulse">
            <div className="h-48 md:h-60 bg-gray-200 dark:bg-gray-800 rounded-3xl mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                ))}
            </div>
          </div>
        ) : data ? (
          <>
            <FlashSaleHeader endTime={data.endTime} />
            
            {/* Filter Tabs (Optional UI Enhancement) */}
            <div className="flex overflow-x-auto scrollbar-hide gap-3 mb-6 pb-2">
                {['Semua', 'Gadget', 'Fashion', 'Elektronik', 'Rumah Tangga'].map((cat, i) => (
                    <button key={i} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                        {cat}
                    </button>
                ))}
            </div>

            <FlashSaleList products={data.products} />
          </>
        ) : (
            <div className="text-center py-20">
                <Icon icon="solar:confounded-square-bold-duotone" className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Gagal memuat data Flash Sale.</p>
            </div>
        )}
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
    </main>
  );
}