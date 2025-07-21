'use client';

import React from 'react';
import Sidenav from '~/components/layout/sidenav';
import { SettingIcon, UserIcon } from '~/components/shared/icons';
import { PATH } from '~/constants/routes';

const listNav = [
  {
    name: '個人情報',
    href: PATH.PROFILE.INFO,
    icon: UserIcon,
  },
  {
    name: '設定',
    href: PATH.PROFILE.SETTING,
    icon: SettingIcon,
  },
];

export default function SidenavProfile({ children }: { children: React.ReactNode }) {
  return (
    <Sidenav title="プロフィール" listNav={listNav}>
      {children}
    </Sidenav>
  );
}
