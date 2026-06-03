'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InvertersPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/products?cat=inverters');
  }, [router]);
  return null;
}
