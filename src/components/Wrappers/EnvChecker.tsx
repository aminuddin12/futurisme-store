'use client';

import { useEffect, useState } from 'react';
import EnvErrorPage from '@/app/env-error/page';
// Import data authenticator dummy
import webAuth from '@/data/web-authenticator.json';

export default function EnvChecker({ children }: { children: React.ReactNode }) {
  const [isEnvValid, setIsEnvValid] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Simulasi Pengecekan Kunci API
    // Dalam skenario nyata, ini mungkin memanggil endpoint /health atau /config
    // Di sini kita cek apakah variabel environment ada dan sesuai dengan nilai dummy yang diharapkan
    const publicKey = process.env.NEXT_PUBLIC_API_PUBLIC_KEY;
    const secretKey = process.env.NEXT_PUBLIC_API_SECRET_KEY;

    // Nilai yang dianggap "BENAR" oleh sistem (Simulasi Database) diambil dari JSON
    const { VALID_PUBLIC_KEY, VALID_SECRET_KEY } = webAuth;

    // 1. Cek Keberadaan: Pastikan variabel tidak kosong/undefined
    if (!publicKey || !secretKey) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsEnvValid(false);
    } 
    // 2. Cek Validitas Isi (Content): Pastikan nilainya cocok dengan server
    // Jika Anda mengubah nilai di .env menjadi sesuatu yang lain, kondisi ini akan true dan menampilkan error page
    else if (publicKey !== VALID_PUBLIC_KEY || secretKey !== VALID_SECRET_KEY) { 
       setIsEnvValid(false); 
    }

    setIsChecking(false);
  }, []);

  if (isChecking) return null; // Atau loading spinner

  if (!isEnvValid) {
    return <EnvErrorPage />;
  }

  return <>{children}</>;
}