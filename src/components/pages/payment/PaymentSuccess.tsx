import React from 'react';
import { Card, CardContent } from '~/components/ui/card';
import Image from 'next/image';
import Divider from '~/components/ui/divider';
import { Button } from '~/components/ui/button';
import eventBanner from '~/assets/images/event-banner.png';
import CheckCircle from '~/components/shared/icons/check-circle';

interface EventDetailProps {
  label: string;
  value: string;
}

function EventDetail({ label, value }: EventDetailProps) {
  return (
    <div className="text-body-sm">
      <span className="text-brown-700">{label}:</span>
      <span className="ml-3 text-body-lg font-medium">{value}</span>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="mx-auto mt-14 flex max-w-screen-md flex-col text-center">
      {/* Success Icon */}
      <div className="mx-auto mb-8 text-center">
        <CheckCircle />
      </div>

      {/* Thank you message */}
      <h1 className="mb-4 text-headline-lg font-bold text-red-700">お支払いありがとうございます。</h1>
      <p className="mb-10 text-body-lg text-brown-700">
        みまもり窓口の参加方法について、LINEにてご連絡いたします。
        <br />
        しばらくお待ち下さい。
      </p>

      {/* Event Details Card */}
      <Card className="mb-8 bg-white">
        <CardContent className="p-6">
          <div className="flex gap-10">
            <Image
              width={1000}
              height={1000}
              className="h-[160px] w-[260px] rounded-sm object-cover"
              src={eventBanner}
              alt="event banner"
            />
            <div className="w-full text-left text-brown-900">
              <div className="text-headline-sm font-bold text-brown-700">くらしの窓口詳細名</div>
              <div className="mt-2 text-body-md">オンラインアクティビティ</div>
              <Divider />
              <div className="mt-3 w-full space-y-2 text-body-sm">
                <EventDetail label="時間" value="2025/02/25" />
                <EventDetail label="地域" value="オンライン" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Information */}
      <div className="mb-8 text-left">
        <div className="mb-2 flex justify-between text-body-md text-brown-700">
          <span>注文番号:</span>
          <span className="text-title-lg font-medium">1890</span>
        </div>
        <div className="flex justify-between text-body-md text-brown-700">
          <span>注文日:</span>
          <span className="text-title-lg font-medium">2025/01/02</span>
        </div>
      </div>

      {/* Home Button */}
      <Button className="w-full" size="xl" typeStyle="round" variant="outline">
        ホームに戻る
      </Button>

      <div className="my-20 mt-10 text-body-sm text-brown-700">
        <span>利用規約</span>
        <span className="ml-2"> プライバシーポリシー</span>
      </div>
    </div>
  );
}
