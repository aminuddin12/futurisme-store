'use client';

import SliderHeadWidget from '../Widget/SliderHeadWidget';
import TopHeadAdsWidget from '../Widget/TopHeadAdsWidget';
import BottomHeadAdditionalWidget from '../Widget/BottomHeadAdditionalWidget';

export default function HeaderSection() {
  return (
    <section className="container mx-auto px-4 mb-8 mt-4">
      {/* Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[380px]">
        
        {/* Kolom Kiri (Slider) - 65% di Desktop */}
        <div className="lg:col-span-8 h-[200px] md:h-[300px] lg:h-full">
          <SliderHeadWidget />
        </div>

        {/* Kolom Kanan (Ads & Info) - 35% di Desktop */}
        {/* PERBAIKAN: Menggunakan 'flex-row' agar Mobile & Tablet tetap berdampingan (Kiri-Kanan) */}
        {/* lg:flex-col membuatnya kembali tumpuk (Atas-Bawah) saat di Desktop */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 h-[140px] md:h-[180px] lg:h-full">
          
          {/* Baris Atas Kanan (Desktop) / Kiri Bawah (Mobile/Tablet) */}
          <div className="flex-1 h-full lg:h-1/2">
            <TopHeadAdsWidget />
          </div>
          
          {/* Baris Bawah Kanan (Desktop) / Kanan Bawah (Mobile/Tablet) */}
          <div className="flex-1 h-full lg:h-1/2">
            <BottomHeadAdditionalWidget />
          </div>
          
        </div>
      </div>
    </section>
  );
}