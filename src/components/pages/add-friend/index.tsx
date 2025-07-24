'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '~/services/clientService/user/user.api';
import { User } from '@prisma/client';

interface AddFriendProps {
  user: User | null;
}

export default function AddFriend({ user }: AddFriendProps) {
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      const userData = await getUser(user?.id ?? '');
      const isFriend = userData?.data?.isFriend;
      if (isFriend) {
        window.location.reload();
      }
    };
    fetchUser();
    const interval = setInterval(fetchUser, 3000);
    return () => clearInterval(interval);
  }, [user, router]);
  return (
    <>
      <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center px-4 text-center">
        <img src="https://qr-official.line.me/gs/M_699blgjo_GW.png?oat_content=qr" alt="QR Code" />
        <h1 className="mt-6 text-headline-lg font-bold">LINEで私たちと友だちになりましょう</h1>
        <p className="mt-3 text-body-md">サービスをご利用いただくには、LINEで私たちと友だちになってください</p>
      </div>
    </>
  );
}
