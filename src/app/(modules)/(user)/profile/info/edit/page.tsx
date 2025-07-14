import React from 'react';
import { getCurrentSession } from '~/lib/server/auth/session';
import PageClient from './page-client';

export default async function EditPage() {
  const { user } = await getCurrentSession();
  if (!user) {
    return <div>ユーザーが見つかりません</div>;
  }
  return <PageClient user={user} />;
}
