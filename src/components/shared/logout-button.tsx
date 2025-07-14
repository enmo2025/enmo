'use client';
import { logout } from '~/app/(modules)/actions';
import { Button } from '../ui/button';
import Icons from './icons';

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Button
        type="submit"
        onClick={async () => {
          await logout();
        }}
        typeStyle="round"
        variant="outline"
        className="w-full"
        size="xl"
      >
        <Icons.logout />
        <span className="font-bold text-brown-700">ログアウト</span>
      </Button>
    </div>
  );
}
