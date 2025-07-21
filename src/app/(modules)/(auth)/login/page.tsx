import { Metadata } from 'next';
import React from 'react';
import AuthPanel from '~/components/shared/auth-panel';

export const metadata: Metadata = {
  title: 'ログイン',
  description: 'ログインページ',
  manifest: '/manifest.json',
  keywords: ['ログイン', 'Login', 'ユーザー認証', 'Enmo'],
};

export default function LoginPage() {
  return <AuthPanel type="login" />;
}
