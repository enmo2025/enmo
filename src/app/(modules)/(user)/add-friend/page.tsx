import React from 'react';
import AddFriend from '~/components/pages/add-friend';
import { getCurrentSession } from '~/lib/server/auth/session';

export default async function page() {
  const { user } = await getCurrentSession();
  return <AddFriend user={user} />;
}
