import { Metadata } from 'next';
import React from 'react';
import SidenavAdmin from '~/components/layout/sidenav-admin';

export const metadata: Metadata = {
  title: '管理者',
  description: '管理者ページ',
  manifest: '/manifest.json',
  keywords: ['管理者', 'Admin', 'Enmo'],
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <SidenavAdmin>{children}</SidenavAdmin>;
}
