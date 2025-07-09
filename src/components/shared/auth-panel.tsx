'use client';
import React from 'react';
import { Button } from '../ui/button';
import Icons from './icons';
import Divider from '../ui/divider';
import { useRouter } from 'next/navigation';

interface AuthPanelProps {
  type: 'login' | 'register';
}

export default function AuthPanel({ type }: AuthPanelProps) {
  const navigate = useRouter();
  const redirectUrl = `api/auth/line`;

  const text = {
    login: {
      title: 'ログイン',
      button: 'LINEでログインする',
      question: 'アカウントをお持ちでないですか？',
      link: '会員登録',
      linkPath: '/register',
    },
    register: {
      title: '会員登録',
      button: 'LINEで登録する',
      question: 'すでにアカウントをお持ちですか？',
      link: 'ログイン',
      linkPath: '/login',
    },
  };

  const redirectToLine = () => {
    navigate.push(redirectUrl);
  };

  const handleNavigate = () => {
    navigate.push(text[type].linkPath);
  };

  return (
    <div>
      <div className="h-[48px]"></div>
      <div className="mx-auto mt-28 flex w-full flex-col items-center justify-center">
        <h1 className="text-headline-lg font-bold text-primary">{text[type].title}</h1>
        <Button
          onClick={redirectToLine}
          typeStyle={'round'}
          className="my-20 w-[70%] bg-green-400 px-2 text-white md:w-[30%]"
        >
          <div className="relative flex w-full items-center justify-start">
            <span className="">{Icons.line(40)}</span>
            <span className="absolute left-1/2 -translate-x-1/2 text-body-lg font-bold">{text[type].button}</span>
          </div>
        </Button>
        <div className="text-center text-body-sm">
          <div className="text-blue">
            <span>利用規約</span>
            <span className="ml-3">プライバシーポリシー</span>
          </div>
          <div className="mt-2">に同意の上ご登録ください</div>
          <Divider className="my-4" />
          <div>
            <span>{text[type].question}</span>
            <span onClick={handleNavigate} className="ml-3 cursor-pointer text-primary hover:underline">
              {text[type].link}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
