'use client';

import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-110 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 flex flex-col max-h-[90vh] ${isOpen ? 'scale-100' : 'scale-95'}`}>
        
        <div className="p-4 border-b border-gray-100 flex justify-between items-center shrink-0">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition p-1">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed grow scrollbar-hide">
          {children}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl shrink-0">
          <button onClick={onClose} className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-green-600 transition shadow-lg shadow-green-100">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}