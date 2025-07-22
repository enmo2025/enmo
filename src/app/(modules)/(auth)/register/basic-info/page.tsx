'use client';

import React from 'react';
import UpdateProfile from '~/components/shared/update-profile';
import { PATH } from '~/constants/routes';

export default function BasicInfo() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="space-y-2 text-center">
        <h1 className="mb-5 mt-10 text-headline-lg font-bold text-primary">基本情報を入力してください</h1>
      </div>
      <UpdateProfile
        titleSubmitButton="次へ"
        successCallback={() => {
          window.location.href = PATH.HOME;
        }}
      />
    </div>
  );
}
