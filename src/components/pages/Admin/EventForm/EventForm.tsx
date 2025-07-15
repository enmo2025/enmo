'use client';

import { Controller, useForm } from 'react-hook-form';
import React from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import Icons from '~/components/shared/icons';
import dynamic from 'next/dynamic';
import { Textarea } from '~/components/ui/textarea';
import { apiClient } from '~/services/clientService';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});
import 'react-quill-new/dist/quill.snow.css';
import '~/assets/css/react-quill.css';
import { REACT_QUILL_TOOLBAR_OPTIONS } from '~/constants';
import { ImageUpload } from '~/components/ui/image-upload';

export default function EventForm() {
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      eventDetailBanner: '',
      content: '',
      participantFee: '',
      date: '',
      location: '',
      hostName: '',
      companyName: '',
      companyLogo: '',
      companyProfile: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        date: new Date(data.date),
      };
      const res = await apiClient.post<{ success: boolean; event?: any; error?: string }>('/event', payload);
      if (res.success) {
        alert('Create event success');
      } else {
        alert('Create event failed: ' + (res.error || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Create event failed: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <div className="flex flex-col gap-15 px-20 pb-30 pt-10">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-10 rounded-xl border border-brown-700 p-10">
            <span className="flex justify-center text-title-lg font-bold text-brown-900">
              ライフスタイルウィンドウについて
            </span>
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => <Textarea {...field} label="らしの窓口名" rows={1} maxLength={100} />}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field }) => <Textarea {...field} label="らしの窓口の説明" rows={3} maxLength={100} />}
            />
            <Controller
              control={form.control}
              name="eventDetailBanner"
              render={({ field }) => (
                <ImageUpload
                  {...field}
                  onFilesAccepted={(files) => {
                    const file = files[0];
                    if (file) {
                      field.onChange(file.name);
                    }
                  }}
                  className="h-72 w-[512px]"
                />
              )}
            />
            <Controller
              control={form.control}
              name="content"
              render={({ field }) => (
                <div>
                  <ReactQuill
                    value={field.value}
                    onChange={field.onChange}
                    theme="snow"
                    modules={{
                      toolbar: REACT_QUILL_TOOLBAR_OPTIONS,
                    }}
                  />
                </div>
              )}
            />
            <div className="flex w-full justify-between gap-5">
              <Controller
                control={form.control}
                name="participantFee"
                render={({ field }) => (
                  <Input {...field} variant="outline" label="価格" trailingIcon={Icons.tagLine({ size: 20 })} />
                )}
              />
              <Controller
                control={form.control}
                name="date"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="outline"
                    label="イベントの日付"
                    trailingIcon={Icons.calendarLine({ size: 20 })}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="location"
                render={({ field }) => (
                  <Input {...field} variant="outline" label="位置" trailingIcon={Icons.locationLine({ size: 20 })} />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-10 rounded-xl border border-brown-700 p-10">
            <span className="flex justify-center text-title-lg font-bold text-brown-900">くらしパートナーについて</span>
            <Controller
              control={form.control}
              name="companyName"
              render={({ field }) => <Input {...field} variant="outline" label="会社名" />}
            />
            <Controller
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <ImageUpload
                  {...field}
                  onFilesAccepted={(files) => {
                    const file = files[0];
                    if (file) {
                      field.onChange(file.name);
                    }
                  }}
                  className="aspect-square"
                />
              )}
            />
            <Controller
              control={form.control}
              name="companyProfile"
              render={({ field }) => <Textarea {...field} label="会社概要" rows={3} maxLength={100} />}
            />
            <Controller
              control={form.control}
              name="hostName"
              render={({ field }) => <Input {...field} variant="outline" label="担当者名" orientation="horizontal" />}
            />
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <Button type="button" variant="outline" className="w-1/2" typeStyle="round" size="xl">
            キャンセル
          </Button>
          <Button type="submit" className="w-1/2" typeStyle="round" size="xl">
            作成する
          </Button>
        </div>
      </form>
    </div>
  );
}
