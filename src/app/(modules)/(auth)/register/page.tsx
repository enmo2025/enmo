import { Metadata } from 'next';
import React from 'react';
import AuthPanel from '~/components/shared/auth-panel';

export const metadata: Metadata = {
  title: '登録',
  description: '登録ページ',
  manifest: '/manifest.json',
  keywords: ['登録', 'Register', 'Enmo'],
};

export default function page() {
  return <AuthPanel type="register" />;
}
