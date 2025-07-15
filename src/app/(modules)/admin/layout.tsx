'use client';

import React from 'react';
import Sidenav from '~/components/layout/sidenav';
import { FilePlusLineIcon } from '~/components/shared/icons';

const listNav = [
  {
    name: 'くらしの窓口追加',
    href: '/admin/create-event',
    icon: FilePlusLineIcon,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-start bg-white">
      <div className="w-100">
        <Sidenav title="Event" listNav={listNav} className="w-100 bg-red-100 text-red-900" />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
