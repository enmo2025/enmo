import { Metadata } from 'next';
import React from 'react';
import SidenavProfile from '~/components/layout/sidenav-profile';

export const metadata: Metadata = {
  title: 'プロフィール',
  description: 'プロフィールページ',
  manifest: '/manifest.json',
  keywords: ['プロフィール', 'Profile', 'Enmo'],
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <SidenavProfile>{children}</SidenavProfile>;
}
