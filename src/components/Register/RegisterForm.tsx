'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from '@/context/LanguageContext';
import { useWebConfig } from '@/context/WebConfigContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { service } from '@/services/ServiceFetcher'; // Gunakan Service

interface RegisterFormProps {
  isPopup?: boolean;
  onSuccess?: () => void;
}

export default function RegisterForm({ isPopup = false, onSuccess }: RegisterFormProps) {
  const { t } = useTranslation();
  const { getFeature } = useWebConfig();
  const router = useRouter();
  const enableSocialLogin = getFeature ? getFeature('enableSocialLogin') : true;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Panggil API Mock
    const doRegister = async () => {
        try {
            // Gunakan service.post. 
            // Catatan: ServiceFetcher kita saat ini otomatis inject header auth.
            // Untuk register, kita mungkin perlu mematikan inject token Bearer jika belum login, 
            // tapi MSW handler kita sudah handle key check.
            
            // Kita panggil endpoint register
            const response: any = await service.post('/auth/register', formData);
            
            console.log("Register API Response:", response);

            if (response.success) {
                // Auto login setelah register (Simpan ke localStorage client)
                localStorage.setItem('currentUser', JSON.stringify(response.data));
                localStorage.setItem('isLoggedIn', 'true');

                if (onSuccess) onSuccess();
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error("Register Error:", err);
            // Tampilkan pesan error dari API (misal: Email sudah ada)
            setError(err.data?.message || 'Gagal mendaftar. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    doRegister();
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('register.title')}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('register.subtitle')}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2 animate-pulse">
            <Icon icon="solar:danger-circle-bold-duotone" className="text-lg shrink-0" />
            {error}
        </div>
      )}

      {/* Form Fields tetap sama seperti sebelumnya */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">{t('register.name_label')}</label>
          <div className="relative">
            <Icon icon="solar:user-bold-duotone" className="absolute left-3.5 top-3 text-gray-400 text-xl" />
            <input 
              name="name"
              type="text" 
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={t('register.name_placeholder')}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">{t('register.email_label')}</label>
          <div className="relative">
            <Icon icon="solar:letter-bold-duotone" className="absolute left-3.5 top-3 text-gray-400 text-xl" />
            <input 
              name="email"
              type="email" 
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t('register.email_placeholder')}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">{t('register.password_label')}</label>
          <div className="relative">
            <Icon icon="solar:lock-password-bold-duotone" className="absolute left-3.5 top-3 text-gray-400 text-xl" />
            <input 
              name="password"
              type={showPassword ? "text" : "password"} 
              required
              value={formData.password}
              onChange={handleChange}
              placeholder={t('register.password_placeholder')}
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

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/30 hover:bg-green-600 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
        >
          {loading ? (
            <Icon icon="svg-spinners:ring-resize" className="text-xl" />
          ) : (
            <>
              <span>{t('register.submit')}</span>
              <Icon icon="solar:arrow-right-bold-duotone" className="text-xl" />
            </>
          )}
        </button>
      </form>

      {/* Bagian Social Login & Link ke Login tetap sama ... */}
       {enableSocialLogin && (
        <>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-400 font-medium">{t('register.or_register_with')}</span>
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

      <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
        {t('register.login_prompt').split('?')[0]}?{' '}
        <Link href="/login" className="text-primary font-bold hover:underline">
          {t('register.login_prompt').split('?')[1]}
        </Link>
      </p>
    </div>
  );
}