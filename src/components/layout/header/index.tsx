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

  return <Navbar listMenu={listMenu} session={session!} />;
}
