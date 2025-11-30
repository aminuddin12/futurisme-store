/* eslint-disable react-hooks/static-components */
'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function FlashSaleHeader({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const TimeBox = ({ val, label }: { val: number, label: string }) => (
    <div className="flex flex-col items-center">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700">
            <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {val.toString().padStart(2, '0')}
            </span>
        </div>
        <span className="text-[10px] uppercase font-bold text-white mt-1 opacity-80">{label}</span>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl mb-8">
      {/* Background Patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <Icon icon="solar:bolt-bold-duotone" className="text-2xl text-yellow-300" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider opacity-90">Limited Time Offer</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-sm">Flash Sale Super</h1>
            <p className="text-white/90 text-sm md:text-base max-w-md">
                Dapatkan produk impianmu dengan harga miring sebelum waktu habis. Stok sangat terbatas!
            </p>
        </div>

        <div className="flex items-center gap-2 md:gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <TimeBox val={timeLeft.hours} label="Jam" />
            <span className="text-2xl font-bold -mt-4">:</span>
            <TimeBox val={timeLeft.minutes} label="Menit" />
            <span className="text-2xl font-bold -mt-4">:</span>
            <TimeBox val={timeLeft.seconds} label="Detik" />
        </div>
      </div>
    </div>
  );
}