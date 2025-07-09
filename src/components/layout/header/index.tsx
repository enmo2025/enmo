import { getCurrentSession } from '~/lib/server/auth/session';
import Navbar from './navbar';

export default async function Header() {
  const { session } = await getCurrentSession();
  const headerText = {
    changelog: 'Changelog',
    about: 'About',
    login: 'Login',
    dashboard: 'Dashboard',
  };

  return (
    <header className="h-20 w-full">
      <div className="container h-full">
        <Navbar headerText={headerText} session={session!} />
      </div>
    </header>
  );
}
