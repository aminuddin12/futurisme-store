'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FlashSaleDocsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-sm text-primary font-bold mb-2">
          <Icon icon="solar:bolt-bold-duotone" className="text-lg" />
          <span>Fitur Aplikasi</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Halaman Flash Sale
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          Dokumentasi teknis dan desain untuk fitur Flash Sale, termasuk struktur data, komponen UI, dan integrasi API.
        </p>
      </div>

      {/* Data Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Icon icon="solar:database-bold-duotone" className="text-primary" />
            Struktur Data JSON
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
            Data flash sale disimpan di <code>src/data/flash-sale.json</code> dan disajikan melalui endpoint <code>/api/flash-sale</code> oleh MSW.
        </p>
        <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto shadow-lg border border-gray-800">
<pre className="text-sm font-mono text-blue-300">
{`{
  "endTime": "ISO_DATE_STRING",
  "products": [
    {
      "id": 101,
      "name": "Product Name",
      "slug": "product-slug",
      "image": "url_image",
      "originalPrice": 500000,
      "discountedPrice": 250000,
      "discountPercentage": 50,
      "soldPercentage": 85,
      "stock": 15,
      "rating": 4.9,
      "reviews": 320
    }
  ]
}`}
</pre>
        </div>
      </section>

      {/* Components */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Icon icon="solar:widget-5-bold-duotone" className="text-primary" />
            Komponen UI
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Icon icon="solar:stopwatch-bold-duotone" className="text-orange-500" />
                    FlashSaleHeader
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Menampilkan judul campaign dan countdown timer real-time yang menghitung mundur hingga <code>endTime</code>.
                </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Icon icon="solar:card-bold-duotone" className="text-purple-500" />
                    FlashSaleCard
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Kartu produk dengan badge diskon, harga coret, dan progress bar stok yang dinamis (berubah warna gradient).
                </p>
            </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
        <Link href="/flash-sale" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-primary/30">
            <Icon icon="solar:eye-bold" className="text-xl" />
            Lihat Halaman Flash Sale
        </Link>
      </div>

    </motion.div>
  );
}