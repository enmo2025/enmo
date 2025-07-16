'use client';

import React from 'react';
import Sidenav from '~/components/layout/sidenav';
import { FilePlusLineIcon } from '~/components/shared/icons';

const listNav = [
  {
    name: 'イベント一覧',
    href: '/admin/list-event',
    icon: FilePlusLineIcon,
  },
  {
    name: 'くらしの窓口追加',
    href: '/admin/event',
    icon: FilePlusLineIcon,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sidenav title="Admin" listNav={listNav}>
      {children}
    </Sidenav>
  );
}
