'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

export const LanguageContext = createContext(null);

const STORAGE_KEY = 'mb-solar-lang';

function readStoredLanguage() {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'en' || v === 'ar' ? v : null;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('ar');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored) setLanguageState(stored);
    setHydrated(true);
  }, []);

  const setLanguage = useCallback((lang) => {
    if (lang !== 'en' && lang !== 'ar') return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, hydrated]);

  const value = useMemo(
    () => ({ language: hydrated ? language : 'ar', setLanguage, hydrated }),
    [language, setLanguage, hydrated]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

/** يدمج ترجمات الصفحة (مثل header) مع اللغة المحفوظة */
export function LanguageTranslationsProvider({ translations, children }) {
  const base = useLanguage();
  const value = useMemo(
    () => ({ ...base, translations }),
    [base, translations]
  );
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
