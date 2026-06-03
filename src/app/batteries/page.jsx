'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BatteriesPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/products?cat=batteries');
  }, [router]);
  return null;
}
