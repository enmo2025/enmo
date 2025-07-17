'use client';

import { Controller, useForm } from 'react-hook-form';
import React from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { CalendarLineIcon, LocationLineIcon, TagLineIcon } from '~/components/shared/icons';
import dynamic from 'next/dynamic';
import { Textarea } from '~/components/ui/textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});
import 'react-quill-new/dist/quill.snow.css';
import '~/assets/css/react-quill.css';
import { REACT_QUILL_TOOLBAR_OPTIONS } from '~/constants';
import { ImageUpload } from '~/components/ui/image-upload';
import { useRouter } from 'next/navigation';
import { toast } from '~/hooks/use-toast';
import { useCreateEvent, useUpdateEvent } from '~/services/clientService/event/event.api';
import { Event } from '@prisma/client';
import { PATH } from '~/constants/routes';

const eventFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(100, 'Description must be less than 100 characters'),
  eventBanner: z.string().min(1, 'Event banner is required'),
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

export default function EventForm({ event }: { event?: Event }) {
  const { mutate: createEvent, isPending: isCreating } = useCreateEvent(() => {
    toast({
      title: '作成しました',
      description: 'イベントを作成しました',
    });
    router.push(PATH.ADMIN.LIST_EVENT);
  });
  const { mutate: updateEvent, isPending: isUpdating } = useUpdateEvent(() => {
    toast({
      title: '更新しました',
      description: 'イベントを更新しました',
    });
    router.push(PATH.ADMIN.LIST_EVENT);
  });

  const router = useRouter();
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: event?.title || '',
      description: event?.description || '',
      eventBanner: event?.eventBanner || '',
      content: event?.content || '',
      participantFee: event?.participantFee.toString() || '',
      date: event?.date?.toString() || '',
      location: event?.location || '',
      hostName: event?.hostName || '',
      companyName: event?.companyName || '',
      companyLogo: event?.companyLogo || '',
      companyProfile: event?.companyProfile || '',
    },
  });

  const onSubmit = async (data: EventFormData) => {
    const payload = {
      ...data,
      participantFee: Number(data.participantFee),
      date: new Date(data.date),
    };
    if (event) {
      updateEvent({ event: payload, id: event.id });
    } else {
      createEvent(payload);
    }
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <div className="flex flex-col gap-8 overflow-x-hidden sm:gap-10 md:gap-15">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-[900px] flex-col gap-8 sm:gap-12 md:gap-20"
      >
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
          <div className="flex flex-col gap-6 rounded-xl border border-brown-700 p-4 sm:gap-8 sm:p-8 md:gap-10 md:p-10">
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
                  className="w-full"
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
                  className="w-full"
                />
              )}
            />
            <Controller
              control={form.control}
              name="eventBanner"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <ImageUpload
                    {...field}
                    preview={field.value}
                    onFilesAccepted={(_, url) => {
                      if (url) {
                        field.onChange(url);
                      } else {
                        field.onChange('');
                      }
                    }}
                    className="mx-auto h-40 w-full max-w-[512px] sm:h-60 md:h-72"
                  />
                  {form.formState.errors.eventBanner && (
                    <span className="text-sm text-warning">{form.formState.errors.eventBanner.message}</span>
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
                      className="min-h-[120px] w-full sm:min-h-[180px] md:min-h-[220px]"
                    />
                  </div>
                  {form.formState.errors.content && (
                    <span className="text-sm text-warning">{form.formState.errors.content.message}</span>
                  )}
                </div>
              )}
            />
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-5">
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
                    className="w-full"
                  />
                )}
              />
              <Controller
                control={form.control}
                name="date"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    ref={dateInputRef}
                    variant={form.formState.errors.date ? 'warning' : 'outline'}
                    label="イベントの日付"
                    trailingIcon={<CalendarLineIcon />}
                    helperText={form.formState.errors.date?.message}
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dateInputRef.current?.showPicker?.();
                      dateInputRef.current?.focus();
                    }}
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
                    className="w-full"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-xl border border-brown-700 p-4 sm:gap-8 sm:p-8 md:gap-10 md:p-10">
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
                  className="w-full"
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
                    preview={field.value}
                    onFilesAccepted={(_, url) => {
                      if (url) {
                        field.onChange(url);
                      } else {
                        field.onChange('');
                      }
                    }}
                    className="mx-auto aspect-square w-full max-w-[180px]"
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
                  className="w-full"
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
                  className="w-full"
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-5">
          <Button type="button" variant="outline" className="w-full sm:w-1/2" typeStyle="round" size="xl">
            キャンセル
          </Button>
          <Button type="submit" className="w-full sm:w-1/2" typeStyle="round" size="xl" disabled={isSubmitting}>
            {isSubmitting ? '作成中...' : '作成する'}
          </Button>
        </div>
      </form>
    </div>
  );
}
