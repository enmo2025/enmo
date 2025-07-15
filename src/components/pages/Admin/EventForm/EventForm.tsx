'use client';

import { Controller, useForm } from 'react-hook-form';
import React from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { CalendarLineIcon, LocationLineIcon, TagLineIcon } from '~/components/shared/icons';
import dynamic from 'next/dynamic';
import { Textarea } from '~/components/ui/textarea';
import { apiClient } from '~/services/clientService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});
import 'react-quill-new/dist/quill.snow.css';
import '~/assets/css/react-quill.css';
import { REACT_QUILL_TOOLBAR_OPTIONS } from '~/constants';
import { ImageUpload } from '~/components/ui/image-upload';

const eventFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(100, 'Description must be less than 100 characters'),
  eventDetailBanner: z.string().min(1, 'Event detail banner is required'),
  content: z.string().min(1, 'Content is required'),
  participantFee: z.string().min(1, 'Participant fee is required'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(1, 'Location is required'),
  hostName: z.string().min(1, 'Host name is required'),
  companyName: z.string().min(1, 'Please enter company name'),
  companyLogo: z.string().min(1, 'Please select company logo'),
  companyProfile: z
    .string()
    .min(1, 'Please enter company profile')
    .max(100, 'Company profile must be less than 100 characters'),
});

type EventFormData = z.infer<typeof eventFormSchema>;

export default function EventForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
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

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        date: new Date(data.date),
      };
      const res = await apiClient.post<{ success: boolean; event?: any; error?: string }>('/event', payload);
      if (res.success) {
        alert('Create event success');
        // Reset form after successful submission
        form.reset();
      } else {
        alert('Create event failed: ' + (res.error || 'Unknown error'));
      }
    } catch (err: any) {
      console.error('Error submitting form:', err);
      alert('Create event failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSubmitting(false);
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
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="らしの窓口名"
                  rows={1}
                  maxLength={100}
                  helperText={form.formState.errors.title?.message}
                  variant={form.formState.errors.title ? 'warning' : 'default'}
                />
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="らしの窓口の説明"
                  rows={3}
                  maxLength={100}
                  helperText={form.formState.errors.description?.message}
                  variant={form.formState.errors.description ? 'warning' : 'default'}
                />
              )}
            />
            <Controller
              control={form.control}
              name="eventDetailBanner"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
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
                  {form.formState.errors.eventDetailBanner && (
                    <span className="text-sm text-warning">{form.formState.errors.eventDetailBanner.message}</span>
                  )}
                </div>
              )}
            />
            <Controller
              control={form.control}
              name="content"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
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
                  {form.formState.errors.content && (
                    <span className="text-sm text-warning">{form.formState.errors.content.message}</span>
                  )}
                </div>
              )}
            />
            <div className="flex w-full justify-between gap-5">
              <Controller
                control={form.control}
                name="participantFee"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant={form.formState.errors.participantFee ? 'warning' : 'outline'}
                    label="価格"
                    trailingIcon={<TagLineIcon />}
                    helperText={form.formState.errors.participantFee?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="date"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant={form.formState.errors.date ? 'warning' : 'outline'}
                    label="イベントの日付"
                    trailingIcon={<CalendarLineIcon />}
                    helperText={form.formState.errors.date?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="location"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant={form.formState.errors.location ? 'warning' : 'outline'}
                    label="位置"
                    trailingIcon={<LocationLineIcon />}
                    helperText={form.formState.errors.location?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-10 rounded-xl border border-brown-700 p-10">
            <span className="flex justify-center text-title-lg font-bold text-brown-900">くらしパートナーについて</span>
            <Controller
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <Input
                  {...field}
                  variant={form.formState.errors.companyName ? 'warning' : 'outline'}
                  label="会社名"
                  helperText={form.formState.errors.companyName?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
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
                  {form.formState.errors.companyLogo && (
                    <span className="text-sm text-warning">{form.formState.errors.companyLogo.message}</span>
                  )}
                </div>
              )}
            />
            <Controller
              control={form.control}
              name="companyProfile"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="会社概要"
                  rows={3}
                  maxLength={100}
                  helperText={form.formState.errors.companyProfile?.message}
                  variant={form.formState.errors.companyProfile ? 'warning' : 'default'}
                />
              )}
            />
            <Controller
              control={form.control}
              name="hostName"
              render={({ field }) => (
                <Input
                  {...field}
                  variant={form.formState.errors.hostName ? 'warning' : 'outline'}
                  label="担当者名"
                  orientation="horizontal"
                  helperText={form.formState.errors.hostName?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <Button type="button" variant="outline" className="w-1/2" typeStyle="round" size="xl">
            キャンセル
          </Button>
          <Button type="submit" className="w-1/2" typeStyle="round" size="xl" disabled={isSubmitting}>
            {isSubmitting ? '作成中...' : '作成する'}
          </Button>
        </div>
      </form>
    </div>
  );
}
