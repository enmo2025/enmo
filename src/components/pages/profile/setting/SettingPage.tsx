'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { PATH } from '~/constants/routes';

export default function SettingPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <h1 className="text-headline-sm font-bold">お支払いに関するサポートへのお問い合わせ</h1>
          <Button
            onClick={() => window.open('https://docs.stripe.com/customer-management', '_blank', 'noopener')}
            typeStyle="round"
            className="w-full min-w-[300px] lg:w-auto"
            size="xl"
          >
            サポートに連絡する
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div>
            <h1 className="text-headline-sm font-bold">アカウントを削除する</h1>
            <p className="mt-2 text-body-lg">
              この操作は元に戻せません。アカウントが完全に削除され、復元できません。よろしいですか？
            </p>
          </div>
          <Button
            onClick={() => router.push(PATH.PROFILE.DELETE_ACCOUNT)}
            typeStyle="round"
            className="w-full min-w-[300px] lg:w-auto"
            size="xl"
            variant="outline"
          >
            削除
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
