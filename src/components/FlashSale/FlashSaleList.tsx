/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FlashSaleCard from './FlashSaleCard';
import { motion } from 'framer-motion';

export default function FlashSaleList({ products }: { products: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {products.map((product, idx) => (
        <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
        >
            <FlashSaleCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}