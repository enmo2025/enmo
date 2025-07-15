'use client';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { PATH } from '~/constants/routes';
import { toast } from '~/hooks/use-toast';
import { useDeleteProfile } from '~/services/clientService/profile/profile.api';
import { logoutClient } from '~/app/(modules)/actions';
import { SpinnerSection } from '~/components/ui/spinner';

interface DeleteAccountProps {
  user: User;
}

export default function DeleteAccount({ user }: DeleteAccountProps) {
  const router = useRouter();
  const { mutate: deleteProfile, isPending } = useDeleteProfile({
    onSuccess: async () => {
      router.push(PATH.DELETE_ACCOUNT_SUCCESS);
      toast({
        title: 'Success',
        description: 'アカウントが削除されました',
      });
      logoutClient();
    },
  });
  return (
    <div className="absolute left-1/2 top-1/2 mx-auto flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-10 px-6 text-center md:max-w-[600px]">
      <SpinnerSection show={isPending}>
        <div className="space-y-10">
          <h1 className="text-display-sm font-bold text-red">アカウントを削除しますか？</h1>
          <Card className="w-full">
            <CardContent className="py-10">
              <h1 className="mb-2 text-body-xl">User</h1>
              <p className="text-headline-md font-bold text-red-700">{user.fullName}</p>
            </CardContent>
          </Card>
          <p className="font-medium text-red">
            アカウントを削除すると、すべてのデータが失われます。この操作は取り消せません。
          </p>
          <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
            <Button onClick={() => router.back()} typeStyle="round" className="w-full" size="xl" variant="outline">
              キャンセル
            </Button>
            <Button
              onClick={() => deleteProfile()}
              typeStyle="round"
              className="w-full"
              size="xl"
              variant="outline"
              disabled={isPending}
            >
              削除する
            </Button>
          </div>
        </div>
      </SpinnerSection>
    </div>
  );
}

export function SuccessDeleteAccount() {
  const router = useRouter();
  return (
    <div className="absolute left-1/2 top-1/2 mx-auto flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-10 px-6 text-center">
      <h1 className="mb-5 text-display-sm font-bold text-red-900">アカウントが無効化されました</h1>
      <Button onClick={() => router.push(PATH.HOME)} typeStyle="round" size="xl" variant="outline">
        ホームに戻る
      </Button>
    </div>
  );
}
