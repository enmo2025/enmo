import React from 'react';
import DeleteAccount from '~/components/pages/profile/setting/delete-account';
import { getCurrentSession } from '~/lib/server/auth/session';

export default async function DeleteAccountPage() {
  const { user } = await getCurrentSession();
  if (!user) {
    return <div>ユーザーが見つかりません</div>;
  }
  return <DeleteAccount user={user} />;
}
