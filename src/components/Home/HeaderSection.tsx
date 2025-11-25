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
        {/* Height diatur responsif: h-[200px] di HP, h-[380px] di Desktop */}
        <div className="lg:col-span-8 h-[200px] md:h-[280px] lg:h-full relative z-10">
          <SliderHeadWidget />
        </div>

        {/* Kolom Kanan (Ads & Info) - 35% di Desktop */}
        {/* Flex Row di Mobile/Tablet (Kiri-Kanan), Flex Col di Desktop (Atas-Bawah) */}
        {/* Height auto di mobile agar mengikuti konten, full di desktop */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 h-[160px] md:h-[180px] lg:h-full">
          
          {/* Widget Atas (Kiri di Mobile) */}
          <div className="flex-1 h-full lg:h-1/2 min-w-0">
            <TopHeadAdsWidget />
          </div>
          
          {/* Widget Bawah (Kanan di Mobile) */}
          <div className="flex-1 h-full lg:h-1/2 min-w-0">
            <BottomHeadAdditionalWidget />
          </div>
          
        </div>
      </div>
    </section>
  );
}