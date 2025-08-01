import React from 'react';
import InfoDetail from '../../../../../components/pages/profile/my-profile/InfoDetail';
import { getCurrentSession } from '~/lib/server/auth/session';

export default async function InfoPage() {
  const { user } = await getCurrentSession();
  if (!user) {
    return <div>ユーザーが見つかりません</div>;
  }
  return <InfoDetail user={user} />;
}
