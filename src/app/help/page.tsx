'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';

// Data Kategori Bantuan
const helpCategories = [
  { id: 1, title: 'Pesanan & Pengiriman', icon: 'solar:box-minimalistic-bold-duotone', desc: 'Lacak paket, biaya kirim, dan estimasi.' },
  { id: 2, title: 'Pembayaran', icon: 'solar:card-bold-duotone', desc: 'Metode bayar, konfirmasi, dan refund.' },
  { id: 3, title: 'Pengembalian', icon: 'solar:history-bold-duotone', desc: 'Syarat retur barang dan garansi.' },
  { id: 4, title: 'Akun & Keamanan', icon: 'solar:shield-keyhole-bold-duotone', desc: 'Ubah password, alamat, dan privasi.' },
  { id: 5, title: 'Voucher & Promo', icon: 'solar:ticket-sale-bold-duotone', desc: 'Cara pakai kupon dan syarat promo.' },
  { id: 6, title: 'Mitra Penjual', icon: 'solar:shop-2-bold-duotone', desc: 'Panduan berjualan di Futurisme Store.' },
];

// Data FAQ
const faqs = [
  { q: 'Bagaimana cara melacak pesanan saya?', a: 'Anda dapat melacak pesanan melalui menu "Pesanan Saya" di dashboard akun Anda. Klik pada nomor pesanan untuk melihat detail status pengiriman secara real-time.' },
  { q: 'Apakah bisa membatalkan pesanan yang sudah dibayar?', a: 'Pembatalan bisa dilakukan selama status pesanan masih "Menunggu Konfirmasi". Jika sudah diproses penjual, Anda perlu mengajukan permohonan pembatalan kepada penjual.' },
  { q: 'Berapa lama proses pengembalian dana (refund)?', a: 'Proses refund biasanya memakan waktu 1-3 hari kerja untuk saldo dompet digital, dan 3-14 hari kerja untuk kartu kredit, tergantung kebijakan bank penerbit.' },
  { q: 'Bagaimana cara menggunakan voucher diskon?', a: 'Masukkan kode voucher pada halaman Checkout di kolom "Gunakan Voucher". Pastikan total belanja Anda memenuhi syarat minimum pembelian.' },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      {/* Navbar (Desktop Only) */}
      <div className="hidden md:block">
        <Navbar />
        <div className="h-28"></div>
      </div>

      {/* --- HERO SEARCH SECTION --- */}
      <section className="relative px-6 py-12 md:py-20 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6 border border-blue-100 dark:border-blue-800">
              <Icon icon="solar:help-bold-duotone" />
              <span>Pusat Bantuan</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              Apa yang bisa kami <span className="text-primary">bantu?</span>
            </h1>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto group">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all opacity-50"></div>
              <div className="relative flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden p-2 focus-within:border-primary transition-colors">
                <div className="pl-4 text-gray-400">
                   <Icon icon="solar:magnifer-linear" className="text-2xl" />
                </div>
                <input 
                  type="text" 
                  placeholder="Cari topik bantuan (misal: refund, pengiriman)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400"
                />
                <button className="bg-primary hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-md">
                  Cari
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CATEGORIES GRID --- */}
      <section className="px-6 pb-16">
        <div className="container mx-auto max-w-5xl">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-8 text-center">Topik Populer</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {helpCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all group cursor-pointer text-center md:text-left"
              >
                <div className="w-12 h-12 mx-auto md:mx-0 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon icon={cat.icon} className="text-2xl" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">{cat.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed hidden md:block">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ ACCORDION --- */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Pertanyaan Umum</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className={`font-bold ${openFaqIndex === idx ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}`}>
                    {faq.q}
                  </span>
                  <Icon 
                    icon="solar:alt-arrow-down-linear" 
                    className={`text-gray-400 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180 text-primary' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800/50 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SUPPORT CTA --- */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                <Icon icon="solar:headset-mic-bold-duotone" className="text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Masih butuh bantuan?</h2>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                Tim support kami siap membantu Anda 24/7 untuk menyelesaikan masalah apapun yang Anda hadapi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://wa.me/6281234567890" target="_blank">
                    <button className="flex items-center justify-center gap-2 bg-primary hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 transition-all w-full sm:w-auto">
                    <Icon icon="logos:whatsapp-icon" className="text-xl" />
                    Chat WhatsApp
                    </button>
                </Link>
                <button className="flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-xl font-bold transition-all w-full sm:w-auto">
                  <Icon icon="solar:letter-bold-duotone" className="text-xl text-gray-500" />
                  Kirim Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden md:block">
        <Footer />
      </div>
      <div className="block md:hidden h-24"></div>
    </main>
  );
}