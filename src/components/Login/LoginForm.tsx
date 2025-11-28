'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from '@/context/LanguageContext';
import { useWebConfig } from '@/context/WebConfigContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { service } from '@/services/ServiceFetcher'; // Import ServiceFetcher

interface LoginFormProps {
  isPopup?: boolean;
  onSuccess?: () => void;
}

export default function LoginForm({ isPopup = false, onSuccess }: LoginFormProps) {
  const { t } = useTranslation();
  const { getFeature } = useWebConfig();
  const router = useRouter();
  const enableSocialLogin = getFeature ? getFeature('enableSocialLogin') : true;

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Menggunakan ServiceFetcher untuk melakukan POST request ke endpoint login
      // Pastikan handler MSW untuk '/auth/login' sudah disiapkan untuk menangani ini
      const response: any = await service.post('/auth/login', formData);

      console.log("Login Berhasil:", response);

      if (response.success) {
        // Simpan token dan data user ke localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        localStorage.setItem('isLoggedIn', 'true');

        if (onSuccess) {
          onSuccess();
        }

        // Redirect ke dashboard
        router.push('/dashboard');
      } else {
          // Fallback jika success false tapi tidak throw error (tergantung implementasi service)
          setError(response.message || 'Login gagal');
      }

    } catch (err: any) {
      console.error("Login Error:", err);
      // Menampilkan pesan error dari server (MSW) atau error jaringan
      // err.data biasanya berisi body response error dari ServiceFetcher
      setError(err.data?.message || 'Email atau kata sandi salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Header Form */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('auth.login')}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Selamat datang kembali! Silakan masukkan detail akun Anda.
        </p>
      </div>

      {/* Menampilkan pesan error jika ada */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg flex items-center gap-2 animate-pulse">
            <Icon icon="solar:danger-circle-bold-duotone" className="text-lg shrink-0" />
            {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Email</label>
          <div className="relative">
            <Icon icon="solar:letter-bold-duotone" className="absolute left-3.5 top-3 text-gray-400 text-xl" />
            <input 
              name="email"
              type="email" 
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t('login.email_placeholder')}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Password</label>
          <div className="relative">
            <Icon icon="solar:lock-password-bold-duotone" className="absolute left-3.5 top-3 text-gray-400 text-xl" />
            <input 
              name="password"
              type={showPassword ? "text" : "password"} 
              required
              value={formData.password}
              onChange={handleChange}
              placeholder={t('login.password_placeholder')}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <Icon icon={showPassword ? "solar:eye-bold-duotone" : "solar:eye-closed-bold-duotone"} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
            Lupa Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/30 hover:bg-green-600 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Icon icon="svg-spinners:ring-resize" className="text-xl" />
          ) : (
            <>
              <span>{t('auth.login')}</span>
              <Icon icon="solar:login-3-bold-duotone" className="text-xl" />
            </>
          )}
        </button>
      </form>

      {/* Social Login Divider */}
      {enableSocialLogin && (
        <>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-400 font-medium">Atau masuk dengan</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300 group">
              <Icon icon="logos:google-icon" className="text-lg group-hover:scale-110 transition-transform" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300 group">
              <Icon icon="logos:facebook" className="text-lg group-hover:scale-110 transition-transform" />
              Facebook
            </button>
          </div>
        </>
      )}

      {/* Register Link */}
      <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
        Belum punya akun?{' '}
        <Link href="/register" className="text-primary font-bold hover:underline">
          {t('auth.register')}
        </Link>
      </p>
    </div>
  );
}