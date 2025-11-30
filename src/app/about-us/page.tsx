'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';

// Variasi Animasi
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function AboutUsPage() {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      {/* Navbar (Hidden on Mobile based on your layout logic) */}
      <div className="hidden md:block">
        <Navbar />
        <div className="h-32"></div> {/* Spacer */}
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative px-6 py-12 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 mb-6">
              <Icon icon="solar:star-bold-duotone" className="text-primary" />
              <span>Tentang Futurisme Store</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
              Membangun Masa Depan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
                E-Commerce Indonesia
              </span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Kami lebih dari sekadar toko online. Kami adalah jembatan yang menghubungkan Anda dengan teknologi dan gaya hidup masa depan melalui pengalaman belanja yang mulus dan inovatif.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { label: 'Pengguna Aktif', value: '50K+', icon: 'solar:users-group-rounded-bold-duotone' },
              { label: 'Produk Terjual', value: '120K+', icon: 'solar:bag-check-bold-duotone' },
              { label: 'Mitra Brand', value: '500+', icon: 'solar:shop-2-bold-duotone' },
              { label: 'Kepuasan', value: '4.9/5', icon: 'solar:stars-bold-duotone' },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center text-primary text-2xl mb-3">
                  <Icon icon={stat.icon} />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Image Area */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop" 
                  alt="Our Office" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-4 rounded-2xl shadow-lg max-w-[200px]">
                  <p className="text-xs font-bold text-gray-400 mb-1">ESTABLISHED</p>
                  <p className="text-xl font-extrabold text-gray-900 dark:text-white">2023</p>
                </div>
              </div>
              
              {/* Decor */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-gray-200 dark:border-gray-700 rounded-3xl"></div>
            </motion.div>

            {/* Text Area */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Visi Kami Untuk <span className="text-primary">Masa Depan</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Futurisme Store lahir dari sebuah ide sederhana: bagaimana jika belanja online tidak hanya sekadar transaksi, tetapi sebuah pengalaman yang personal dan futuristik?
                </p>
                <p>
                  Kami memulai perjalanan ini di sebuah garasi kecil dengan tim yang terdiri dari 3 orang visioner. Hari ini, kami telah berkembang menjadi platform yang melayani ribuan pelanggan setiap harinya, namun semangat kami tetap sama.
                </p>
                <p>
                  Kami percaya bahwa teknologi harus memudahkan, bukan menyulitkan. Oleh karena itu, kami terus berinovasi dengan fitur-fitur seperti AI Recommendation dan Instant Delivery untuk memastikan kepuasan Anda.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-green-600 transition-all">
                  Lihat Karir
                </button>
                <button className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                  Hubungi Kami
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nilai Inti Kami</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Prinsip yang kami pegang teguh dalam melayani Anda setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Inovasi Tanpa Henti', desc: 'Selalu mencari cara baru untuk meningkatkan pengalaman belanja Anda.', icon: 'solar:rocket-2-bold-duotone', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { title: 'Pelanggan Adalah Raja', desc: 'Kepuasan Anda adalah prioritas utama dan tolok ukur keberhasilan kami.', icon: 'solar:crown-star-bold-duotone', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
              { title: 'Transparansi & Jujur', desc: 'Tidak ada biaya tersembunyi. Apa yang Anda lihat adalah apa yang Anda bayar.', icon: 'solar:shield-check-bold-duotone', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group"
              >
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon icon={item.icon} className={`text-3xl ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Tim Hebat Kami</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/400?img=${i + 10}`} 
                    alt="Team Member" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h4 className="text-white font-bold text-lg">Nama Anggota {i}</h4>
                  <p className="text-gray-300 text-xs">Posisi Jabatan</p>
                  <div className="flex gap-2 mt-3">
                    <button className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <Icon icon="mdi:linkedin" />
                    </button>
                    <button className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <Icon icon="mdi:twitter" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Abstract Pattern */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
               <Icon icon="solar:cart-large-minimalistic-bold-duotone" className="absolute -top-10 -left-10 text-9xl text-white" />
               <Icon icon="solar:bag-heart-bold-duotone" className="absolute -bottom-10 -right-10 text-9xl text-white" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                Siap Menjelajahi Masa Depan?
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pelanggan puas lainnya dan nikmati pengalaman belanja yang belum pernah Anda rasakan sebelumnya.
              </p>
              <Link href="/">
                <button className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-full shadow-xl hover:bg-gray-100 hover:scale-105 transition-all">
                  Mulai Belanja Sekarang
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden md:block">
        <Footer />
      </div>
      <div className="block md:hidden h-24"></div> {/* Spacer for mobile bottom nav */}
    </main>
  );
}