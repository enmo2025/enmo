import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '登録',
  description: '登録ページ',
  manifest: '/manifest.json',
  keywords: ['登録', 'Register', 'Enmo'],
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
