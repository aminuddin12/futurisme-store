'use client';

import SliderHeadWidget from '../Widget/SliderHeadWidget';
import TopHeadAdsWidget from '../Widget/TopHeadAdsWidget';
import BottomHeadAdditionalWidget from '../Widget/BottomHeadAdditionalWidget';

export default function HeaderSection() {
  return (
    <section className="container mx-auto px-4 mb-8 mt-4">
      {/* Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[380px]">
        
        {/* Kolom Kiri (Slider) - 65% di Desktop (8/12 cols approx ~66%) */}
        <div className="lg:col-span-8 h-[200px] md:h-[300px] lg:h-full">
          <SliderHeadWidget />
        </div>

        {/* Kolom Kanan (Ads & Info) - 35% di Desktop (4/12 cols approx ~33%) */}
        <div className="lg:col-span-4 flex flex-col md:flex-row lg:flex-col gap-4 h-full">
          
          {/* Baris Atas Kanan (Desktop) / Kiri Bawah (Mobile/Tablet) */}
          <div className="flex-1 h-[150px] lg:h-auto">
            <TopHeadAdsWidget />
          </div>
          
          {/* Baris Bawah Kanan (Desktop) / Kanan Bawah (Mobile/Tablet) */}
          <div className="flex-1 h-[150px] lg:h-auto">
            <BottomHeadAdditionalWidget />
          </div>
          
        </div>
      </div>
    </section>
  );
}