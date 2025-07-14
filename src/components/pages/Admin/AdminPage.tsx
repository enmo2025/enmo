'use client';

import EventForm from '~/components/pages/Admin/EventForm/EventForm';
import React from 'react';
import Sidenav from '~/components/layout/header/sidenav';
import Icons from '~/components/shared/icons';

export default function page() {
  return (
    <div className="flex w-full justify-start bg-white">
      <div>
        <Sidenav
          title="Event"
          listNav={[{ name: 'くらしの窓口追加', href: '/admin/create-event', icon: Icons.filePlusLine }]}
          className="bg-red-100 text-red-900"
        />
      </div>
      <div>
        <EventForm />
      </div>
    </div>
  );
}
