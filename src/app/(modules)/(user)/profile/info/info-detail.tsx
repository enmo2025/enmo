'use client';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Icons from '~/components/shared/icons';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { formatDate, genderList } from '~/lib/utils';

interface InfoDetailProps {
  user: User;
}

export default function InfoDetail({ user }: InfoDetailProps) {
  const router = useRouter();
  const listField = [
    {
      label: '生年月日',
      key: 'birthday',
      value: formatDate(user?.dateOfBirth ?? ''),
    },
    {
      label: '都道府県',
      key: 'prefecture',
      value: user?.prefectures,
    },
    {
      label: '性別',
      key: 'gender',
      value: genderList[user?.gender ?? 'FEMALE'],
    },
  ];
  return (
    <div className="w-full">
      <Card className="w-full border-black">
        <CardContent>
          <div className="flex items-center justify-between">
            <h1 className="text-body-xl font-bold text-red-700 md:text-headline-lg">鈴木 美月</h1>
            <Button
              leadingIcon={<Icons.edit />}
              variant="outline"
              typeStyle="round"
              size="lg"
              onClick={() => router.push('/profile/info/edit')}
            >
              編集
            </Button>
          </div>
          <Card className="mt-6">
            <CardContent className="space-y-3">
              {listField.map((item) => (
                <div key={item.key} className="flex items-center">
                  <span className="min-w-16 text-body-sm text-gray-500">{item.label}:</span>
                  <span className="text-body-lg font-bold text-brown-900">{item.value?.toString() ?? ''}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
