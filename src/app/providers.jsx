'use client';

import { LanguageProvider } from '@/app/contexts/LanguageContext';

export default function Providers({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
