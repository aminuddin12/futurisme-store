'use client';

import Navbar from '@/components/Navbar/Navbar';
import ProductHeader from '@/components/Product/ProductHeader';
import ProductGallery from '@/components/Product/ProductGallery';
import ProductInfo from '@/components/Product/ProductInfo';
import CartWidget from '@/components/Widget/CartWidget';
import Footer from '@/components/Footer/Footer';
import { motion } from 'framer-motion';

export default function ProductPage() {
  // Konfigurasi animasi standar (Fade Up)
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <ProductHeader />
      
      <div className="h-30 md:h-1 sm:h-0.5 lg:h-3 xl:h-4"></div>

      <div className="container mx-auto px-6 py-4 text-xs text-primary">
        Breadcrumb / Pertukangan / ISKU...
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 relative">
            
            <div className="w-full lg:w-[73%] flex flex-col gap-10">
                <section id="section-detail" className="scroll-mt-36">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Komponen Gallery & Info akan punya animasi internal sendiri */}
                        <ProductGallery />
                        <ProductInfo />
                    </div>
                </section>

                <motion.section 
                  id="section-ulasan" 
                  className="scroll-mt-48 border-t border-gray-100 pt-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  animate={fadeUp}
                >
                    <h2 className="font-bold text-lg text-gray-800 mb-6">Ulasan Pembeli</h2>
                    <div className="h-40 bg-gray-50 rounded text-center pt-10">Review Component Here</div>
                </motion.section>

                <motion.section 
                  id="section-etalase" 
                  className="scroll-mt-48 border-t border-gray-100 pt-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  animate={fadeUp}
                >
                    <h2 className="font-bold text-lg text-gray-800 mb-4">Lainnya di toko ini</h2>
                    {/* Masukkan komponen Etalase di sini */}
                    <div className="h-40 bg-gray-50 rounded text-center pt-10">Etalase Component Here</div>
                </motion.section>
            </div>

            {/* Cart Widget - Sticky, mungkin tidak perlu animasi masuk berlebihan agar UX cepat */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hidden lg:block w-[27%] shrink-0 relative"
            >
               <CartWidget />
            </motion.div>
            
        </div>
      </div>

      <Footer />
    </main>
  );
}