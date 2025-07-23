'use client';

import { Controller, useForm } from 'react-hook-form';
import React from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';

import { ImageUpload } from '~/components/ui/image-upload';
import { useCreatePartner } from '~/services/clientService/partner/partner.api';
import { toast } from '~/hooks/use-toast';
import { PATH } from '~/constants/routes';
import { useRouter } from 'next/navigation';
import { partnerValidationSchema, PartnerValidationType } from '~/validations/admin-validation';

export default function PartnerForm() {
  const router = useRouter();
  const { mutate: createPartner } = useCreatePartner(() => {
    toast({
      title: '作成しました',
      description: 'イベントを作成しました',
    });
    router.push(PATH.ADMIN.CREATE_EVENT);
  });
  const form = useForm<PartnerValidationType>({
    resolver: zodResolver(partnerValidationSchema),
    defaultValues: {
      hostName: '',
      companyName: '',
      companyLogo: '',
      companyField: '',
      companyProfile: '',
    },
  });

  const onSubmit = async (data: PartnerValidationType) => {
    const payload = {
      ...data,
    };
    createPartner(payload);
  };

  const isSubmitting = false;

  return (
    <div className="flex flex-col gap-8 overflow-x-hidden sm:gap-10 md:gap-15">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-[900px] flex-col gap-8 sm:gap-12 md:gap-20"
      >
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
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
                    errorMessage={form.formState.errors.companyLogo?.message as string}
                  />
                </div>
              )}
            />
            <Controller
              control={form.control}
              name="companyField"
              render={({ field }) => (
                <Input
                  {...field}
                  variant={form.formState.errors.companyField ? 'warning' : 'outline'}
                  label="分野"
                  helperText={form.formState.errors.companyField?.message}
                  className="w-full"
                />
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
