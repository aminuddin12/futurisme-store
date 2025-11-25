'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../UI/Modal';

export default function ProductInfo() {
  const [selectedVariant, setSelectedVariant] = useState('82Pcs Hijau');
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  return (
    <motion.div 
      className="w-full lg:w-[43%] flex-grow flex-1"
      initial={{ opacity: 0, y: 50 }} // Mulai dari bawah
      whileInView={{ opacity: 1, y: 0 }} // Naik ke posisi asli
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} // Delay sedikit agar muncul setelah galeri
    >
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-800 leading-snug mb-2">ISKU Tool Kit Set 82pcs Kunci Shock Termasuk Kunci Ring Pas</h1>
      
      {/* Stats */}
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
        <span className="font-bold text-gray-800">Terjual 3 rb+</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <div className="flex items-center gap-1 px-2 py-0.5 border border-gray-200 rounded">
            <i className="fas fa-star text-yellow-400 text-xs"></i>
            <span className="text-gray-800 font-bold">4.9</span>
        </div>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <div>Diskusi (56)</div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="text-3xl font-extrabold text-gray-800 mb-1">Rp499.000</div>
        <div className="flex items-center gap-2 text-sm">
            <span className="bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded text-xs">58%</span>
            <span className="text-gray-400 line-through">Rp1.200.000</span>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <h3 className="font-bold text-gray-700 text-sm mb-3">Pilih Varian: <span className="font-normal text-gray-500">{selectedVariant}</span></h3>
        <div className="flex flex-wrap gap-3">
            {['82Pcs Hijau', '53Pcs Hitam'].map((v) => (
                <button 
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`relative border px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                        selectedVariant === v ? 'border-primary bg-green-50 text-primary' : 'border-gray-200 text-gray-600'
                    }`}
                >
                    <span>{v}</span>
                    {selectedVariant === v && <i className="fas fa-check absolute top-0 right-0 bg-primary text-white text-[8px] p-0.5 rounded-bl"></i>}
                </button>
            ))}
        </div>
      </div>

      {/* Tabs & Desc */}
      <div className="border-b border-gray-100 mb-6">
        <div className="flex gap-8 text-sm font-bold text-primary border-b-2 border-primary w-fit pb-3 px-1">
            Detail
        </div>
      </div>

      <div className="relative border-b border-gray-100 pb-4 mb-6">
        {/* Menggunakan motion.div untuk animasi expand/collapse deskripsi */}
        <motion.div 
            className="text-sm text-gray-700 leading-relaxed mb-2 overflow-hidden"
            initial={false}
            animate={{ height: isDescExpanded ? 'auto' : 150 }}
            transition={{ duration: 0.4 }}
        >
            <p><b>ISKU Tool Kit Set 82pcs...</b></p>
            <p>Kelengkapan yang sangat presisi dan material yang kuat...</p>
            <ul className="list-disc pl-5">
                <li>Material Chrome Vanadium (Anti Karat)</li>
                <li>Box Penyimpanan Kokoh</li>
            </ul>
            <br />
            <p>Isi lebih lengkap bla bla bla...</p>
        </motion.div>
        
        {!isDescExpanded && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"
            ></motion.div>
        )}
        
        <div className="absolute bottom-0 left-0 w-full flex justify-center z-10 transform translate-y-1/2">
            <button 
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="bg-white border border-gray-200 text-primary px-8 py-2 rounded-full font-bold text-sm hover:bg-green-50 shadow-lg flex items-center gap-2 transition-all"
            >
                {isDescExpanded ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya'}
                <motion.i 
                    className="fas fa-chevron-down"
                    animate={{ rotate: isDescExpanded ? 180 : 0 }}
                ></motion.i>
            </button>
        </div>
      </div>
      
      <div className="h-6"></div>

      {/* Store Info Placeholder */}
      <div className="py-4 border-t border-b border-gray-100">
         <div className="flex items-center gap-4">
            <img src="https://images.tokopedia.net/img/official_store_badge_2.png" className="w-12 h-12" alt="Store" />
            <div>
                <h3 className="font-bold">ISKU Tools Official</h3>
                <p className="text-xs text-green-600">Online</p>
            </div>
         </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={modalContent.title}>
        <div dangerouslySetInnerHTML={{ __html: modalContent.body }}></div>
      </Modal>
    </motion.div>
  );
}