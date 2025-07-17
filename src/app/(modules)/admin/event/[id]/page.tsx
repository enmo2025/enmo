import React from 'react';
import EditEvent from '~/components/pages/Admin/EditEvent/EditEvent';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <EditEvent id={id} />;
}
