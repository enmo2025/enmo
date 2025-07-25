'use client';

import { PATH } from '~/constants/routes';
import Navbar from './navbar';
import { Session } from '@prisma/client';
import { usePathname } from 'next/navigation';

export default function Header({ session }: { session: Session }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');
  const listMenuAuth = [
    {
      name: 'ホーム',
      href: PATH.HOME,
    },
    {
      name: 'くらしの窓口 一覧',
      href: PATH.EVENT.LIST,
    },
    {
      name: 'プロフィール',
      href: PATH.PROFILE.INFO,
    },
  ];

  const listMenuUnAuth = [
    {
      name: 'ログイン',
      href: PATH.AUTH.LOGIN,
    },
    {
      name: '新規登録',
      href: PATH.AUTH.REGISTER,
    },
  ];

  const listMenu = session ? listMenuAuth : listMenuUnAuth;

  return <Navbar listMenu={isAdmin ? [] : listMenu} session={session!} />;
}
