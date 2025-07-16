'use client';

import React from 'react';
import Sidenav from '~/components/layout/sidenav';
import { FilePlusLineIcon, JobIcon, SettingIcon } from '~/components/shared/icons';
import { PATH } from '~/constants/routes';

const listNav = [
  {
    name: '課金ユーザー一覧',
    href: PATH.ADMIN.LIST_USER_PAID,
    icon: FilePlusLineIcon,
  },
  {
    name: 'イベント一覧',
    href: PATH.ADMIN.LIST_EVENT,
    icon: JobIcon,
  },
  {
    name: 'くらしの窓口追加',
    href: PATH.ADMIN.EVENT,
    icon: SettingIcon,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sidenav title="管理者" className="bg-red-100" listNav={listNav}>
      {children}
    </Sidenav>
  );
}
