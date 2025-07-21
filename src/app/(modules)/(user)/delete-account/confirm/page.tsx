import { Metadata } from 'next';
import React from 'react';
import DeleteAccount from '~/components/pages/profile/setting/DeleteAccount';
import { getCurrentSession } from '~/lib/server/auth/session';

export const metadata: Metadata = {
  title: 'アカウントを削除',
  description: 'アカウントを削除',
  manifest: '/manifest.json',
  keywords: ['アカウント', '削除', 'Enmo'],
};

export default async function DeleteAccountPage() {
  const { user } = await getCurrentSession();
  if (!user) {
    return <div>ユーザーが見つかりません</div>;
  }
  return <DeleteAccount user={user} />;
}
