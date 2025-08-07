'use client';

import React from 'react';
import Sidenav from '~/components/layout/sidenav';
import { BuildingLineIcon, FilePlusLineIcon, HouseLineIcon, JobIcon } from '~/components/shared/icons';
import { PATH } from '~/constants/routes';

const listNav = [
  {
    name: '課金ユーザー一覧',
    href: PATH.ADMIN.LIST_USER_PAID,
    icon: HouseLineIcon,
  },
  {
    name: 'イベント一覧',
    href: PATH.ADMIN.LIST_EVENT,
    icon: JobIcon,
  },
  {
    name: 'くらしの窓口追加',
    href: PATH.ADMIN.CREATE_EVENT,
    icon: FilePlusLineIcon,
  },
  {
    name: 'パートナー追加',
    href: PATH.ADMIN.CREATE_PARTNER,
    icon: BuildingLineIcon,
  },
];

export default function SidenavAdmin({ children }: { children: React.ReactNode }) {
  return (
    <Sidenav title="管理者" className="bg-red-100" listNav={listNav} linkTermOfUse={PATH.ADMIN.TERM_OF_USE}>
      <div>{children}</div>
    </Sidenav>
  );
}
