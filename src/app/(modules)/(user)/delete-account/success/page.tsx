import { Metadata } from 'next';
import React from 'react';
import { SuccessDeleteAccount } from '~/components/pages/profile/setting/DeleteAccount';

export const metadata: Metadata = {
  title: 'アカウントを削除',
  description: 'アカウントを削除',
  manifest: '/manifest.json',
  keywords: ['アカウント', '削除', 'Enmo'],
};

export default function page() {
  return <SuccessDeleteAccount />;
}
