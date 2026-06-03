'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PanelsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/products?cat=panels');
  }, [router]);
  return null;
}
