'use client';
import { useState } from 'react';

export default function CartWidget() {
  const [qty, setQty] = useState(1);
  const price = 499000;

  const handleQty = (change: number) => {
    const newVal = qty + change;
    if (newVal >= 1) setQty(newVal);
  };

  return (
    <div className="hidden lg:block w-[27%] shrink-0 relative">
      <div className="sticky top-[130px] border border-gray-200 rounded-xl p-4 shadow-sm bg-white z-30">
        <h3 className="font-bold text-gray-800 text-sm mb-4">Atur jumlah</h3>
        <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg h-8">
                <button className="w-8 h-full hover:text-primary" onClick={() => handleQty(-1)}><i className="fas fa-minus text-xs"></i></button>
                <input type="text" value={qty} readOnly className="w-10 text-center text-sm font-bold outline-none" />
                <button className="w-8 h-full text-primary" onClick={() => handleQty(1)}><i className="fas fa-plus text-xs"></i></button>
            </div>
            <div className="text-xs text-gray-500">Stok: <b>975</b></div>
        </div>
        <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 text-sm">Subtotal</span>
            <span className="font-bold text-lg text-gray-800">Rp{(qty * price).toLocaleString('id-ID')}</span>
        </div>
        <div className="flex flex-col gap-2.5">
            <button className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-green-600 shadow-lg">+ Keranjang</button>
            <button className="w-full border border-primary text-primary font-bold py-2.5 rounded-lg">Beli Langsung</button>
        </div>
      </div>
    </div>
  );
}