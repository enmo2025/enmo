'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

export default function BasicInfo() {
  const form = useForm({
    defaultValues: {
      name: '',
    },
  });

  return (
    <div>
      <h1>基本情報を入力してください</h1>
      <p>アカウントに必要な情報を入力してください（非公開)</p>
    </div>
  );
}
