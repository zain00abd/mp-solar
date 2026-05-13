import { initializeApp, getApps, getApp } from 'firebase/app';

/**
 * إعداد تطبيق الويب Firebase (للعميل فقط).
 * القيم تأتي من متغيرات البيئة NEXT_PUBLIC_* — لا تضع مفاتيح حساب الخدمة هنا.
 * @see https://firebase.google.com/docs/web/setup
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * يعيد تطبيق Firebase الافتراضي في المتصفح، أو undefined على الخادم / إن لم تُضبط المتغيرات.
 */
export function getFirebaseClientApp() {
  if (typeof window === 'undefined') return undefined;
  if (!firebaseConfig.apiKey) return undefined;
  if (getApps().length > 0) return getApp();
  return initializeApp(firebaseConfig);
}
