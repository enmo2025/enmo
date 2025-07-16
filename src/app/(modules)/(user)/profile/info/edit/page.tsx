import React from 'react';
import EditProfile from '~/components/pages/profile/my-profile/edit-profile';
import { getCurrentSession } from '~/lib/server/auth/session';

export default async function EditPage() {
  const { user } = await getCurrentSession();
  if (!user) {
    return <div>ユーザーが見つかりません</div>;
  }
  return <EditProfile user={user} />;
}
