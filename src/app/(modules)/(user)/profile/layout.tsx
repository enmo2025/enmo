'use client';

import React from 'react';
import Sidenav from '~/components/layout/header/sidenav';
import Icons from '~/components/shared/icons';
import { PATH } from '~/constants/routes';

const listNav = [
  {
    name: '個人情報',
    href: PATH.PROFILE_INFO,
    icon: Icons.user,
  },
  {
    name: 'パスワード',
    href: PATH.PROFILE_SETTING,
    icon: Icons.setting,
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidenav title="プロフィール" listNav={listNav} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
