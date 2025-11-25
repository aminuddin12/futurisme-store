"use client";

import { useState, useEffect } from "react";

export default function BottomHeadAdditionalWidget() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded)
    return (
      <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl"></div>
    );

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm group cursor-pointer">
      <img
        src="https://dummyimage.com/600x200/f3f4f6/9ca3af&text=Special+Offer"
        alt="Special Offer"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
    </div>
  );
}
