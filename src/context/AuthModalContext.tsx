'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthModalContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  
  isRegisterOpen: boolean; // State baru
  openRegister: () => void;
  closeRegister: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsRegisterOpen(false); // Tutup register jika login dibuka
    setIsLoginOpen(true);
  };
  const closeLogin = () => setIsLoginOpen(false);

  const openRegister = () => {
    setIsLoginOpen(false); // Tutup login jika register dibuka
    setIsRegisterOpen(true);
  };
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <AuthModalContext.Provider value={{ 
      isLoginOpen, openLogin, closeLogin,
      isRegisterOpen, openRegister, closeRegister 
    }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within a AuthModalProvider');
  }
  return context;
}