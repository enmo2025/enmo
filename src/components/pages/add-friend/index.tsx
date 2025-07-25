'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetUser } from '~/services/clientService/user/user.api';
import { User } from '@prisma/client';
import { PATH } from '~/constants/routes';

interface AddFriendProps {
  user: User | null;
}

export default function AddFriend({ user }: AddFriendProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevPath = searchParams.get('prevPath');

  const { data: userData } = useGetUser(user?.id, {
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (userData?.data?.isFriend) {
      window.location.href = prevPath ?? PATH.HOME;
    }
  }, [userData?.data?.isFriend, prevPath, router]);

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
