import { getCurrentSession } from '~/lib/server/auth/session';
import Navbar from './navbar';
import { PATH } from '~/constants/routes';

export default async function Header() {
  const { session } = await getCurrentSession();

  const listMenuAuth = [
    {
      name: 'ホーム',
      href: PATH.HOME,
    },
    {
      name: 'くらしの窓口 一覧',
      href: PATH.PROFILE,
    },
    {
      name: 'プロフィール',
      href: PATH.PROFILE_INFO,
    },
  ];

  const listMenuUnAuth = [
    {
      name: 'ログイン',
      href: PATH.LOGIN,
    },
    {
      name: '新規登録',
      href: PATH.REGISTER,
    },
  ];

  const listMenu = session ? listMenuAuth : listMenuUnAuth;

  return <Navbar listMenu={listMenu} session={session!} />;
}
