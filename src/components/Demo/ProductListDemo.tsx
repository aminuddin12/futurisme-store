'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { service } from '@/services/ServiceFetcher'; // Import Service

// Tipe Data Response (sesuai struktur JSON mock)
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  sold: number;
}

interface ProductResponse {
  success: boolean;
  data: Product[];
}

export default function ProductListDemo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // PEMANGGILAN KODE SINGKAT
        // Tidak perlu memikirkan header, token, atau base URL
        const response = await service.get<ProductResponse>('/products');
        setProducts(response.data);
      } catch (err: any) {
        // Error handling terpusat
        setError(err.message);
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return (
    <div className="p-8 text-center animate-pulse flex flex-col items-center gap-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="h-4 bg-gray-200 w-32 rounded"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 text-center border border-red-200 bg-red-50 rounded-xl m-4">
      <Icon icon="solar:shield-warning-bold-duotone" className="text-4xl text-red-500 mx-auto mb-2" />
      <p className="text-red-600 font-bold">Gagal Memuat Data</p>
      <p className="text-xs text-red-400 mt-1">{error}</p>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Icon icon="solar:database-bold-duotone" className="text-primary" />
        Produk (Via ServiceFetcher)
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="relative aspect-square mb-2 rounded-md overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
            <p className="text-primary font-bold text-sm mt-1">
                Rp {product.price.toLocaleString('id-ID')}
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Icon icon="solar:star-bold" className="text-yellow-400" />
                <span>{product.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}