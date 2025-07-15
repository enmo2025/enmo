'use client';
import { logoutClient } from '~/app/(modules)/actions';
import { Button } from '../ui/button';
import { LogoutIcon } from './icons';

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Button
        type="submit"
        onClick={() => {
          logoutClient();
        }}
        typeStyle="round"
        variant="outline"
        className="w-full"
        size="xl"
      >
        <LogoutIcon />
        <span className="font-bold text-brown-700">ログアウト</span>
      </Button>
    </div>
  );
}
