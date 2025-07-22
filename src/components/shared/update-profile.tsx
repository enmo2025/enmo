'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userValidationSchema, type UserValidationType } from '~/validations/user-validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select } from '~/components/ui/select';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Button } from '~/components/ui/button';
import { useUpdateProfile } from '~/services/clientService/profile/profile.api';
import { toast } from '~/hooks/use-toast';
import { useGetPrefectures } from '~/services/clientService/prefecture/prefecture.api';
import { User } from '@prisma/client';
import dayjs from 'dayjs';
import { EGender } from '~/services/clientService/profile/profile.enum';
import { Spinner } from '../ui/spinner';
import { useRouter } from 'next/navigation';

interface UpdateProfileProps {
  user?: User;
  titleSubmitButton?: string;
  successCallback?: () => void;
  hasCancelButton?: boolean;
}

const defaultValues = {
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  prefecture: '',
  gender: undefined,
};

export default function UpdateProfile({
  user,
  titleSubmitButton = '変更する',
  successCallback,
  hasCancelButton = false,
}: UpdateProfileProps) {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { data: prefectures } = useGetPrefectures();
  const router = useRouter();

  const transformData = (data: UserValidationType) => {
    return {
      fullName: `${data.lastName} ${data.firstName}`,
      fullNameKana: `${data.lastNameKana} ${data.firstNameKana}`,
      dateOfBirth: `${data.birthYear}-${data.birthMonth.padStart(2, '0')}-${data.birthDay.padStart(2, '0')}`,
      gender: data.gender as unknown as EGender,
      prefectures: data.prefecture,
    };
  };

  const form = useForm<UserValidationType>({
    resolver: zodResolver(userValidationSchema),
    defaultValues,
  });

  const watchedYear = form.watch('birthYear');
  const watchedMonth = form.watch('birthMonth');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const getDaysInMonth = (year: string, month: string) => {
    if (!year || !month) return 31;

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);

    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    return daysInMonth;
  };

  const daysInSelectedMonth = getDaysInMonth(watchedYear, watchedMonth);
  const days = Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);

  const onSubmit = async (data: UserValidationType) => {
    updateProfile(transformData(data), {
      onSuccess: () => {
        toast({
          title: '更新しました',
          description: 'プロフィールを更新しました',
        });
        if (successCallback) {
          successCallback();
        }
      },
    });
  };

  useEffect(() => {
    const currentDay = form.getValues('birthDay');
    if (currentDay && parseInt(currentDay) > daysInSelectedMonth) {
      form.setValue('birthDay', '');
    }
  }, [daysInSelectedMonth, form]);

  useEffect(() => {
    const dateOfBirth = dayjs(user?.dateOfBirth);
    if (user) {
      form.reset({
        lastName: user.fullName?.split(' ')[0] ?? '',
        firstName: user.fullName?.split(' ')[1] ?? '',
        lastNameKana: user.fullNameKana?.split(' ')[0] ?? '',
        firstNameKana: user.fullNameKana?.split(' ')[1] ?? '',
        birthYear: dateOfBirth.year().toString() ?? '',
        birthMonth: (dateOfBirth.month() + 1).toString() ?? '',
        birthDay: dateOfBirth.date().toString() ?? '',
        prefecture: user.prefectures ?? '',
        gender: user.gender?.toString() ?? '',
      });
    }
  }, [form, user]);

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center">
          <Spinner className="size-10" show={isPending} />
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* 氏名 (Name) */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        label="氏名"
                        placeholder="山田"
                        variant={form.formState.errors.lastName ? 'warning' : 'default'}
                      />
                    </FormControl>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="太郎"
                        variant={form.formState.errors.firstName ? 'warning' : 'default'}
                      />
                    </FormControl>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* 氏名（カナ） (Name in Katakana) */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="lastNameKana"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        label="氏名(カナ)"
                        placeholder="ヤマダ"
                        variant={form.formState.errors.lastNameKana ? 'warning' : 'default'}
                      />
                    </FormControl>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstNameKana"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="タロウ"
                        variant={form.formState.errors.firstNameKana ? 'warning' : 'default'}
                      />
                    </FormControl>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* 生年月日 (Date of Birth) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">生年月日</h3>
            <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
              <div className="flex w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="birthYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select {...field} variant={form.formState.errors.birthYear ? 'warning' : 'default'}>
                          <option value="">-</option>
                          {years.map((year) => (
                            <option key={year} value={year.toString()}>
                              {year}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormMessage className="min-h-[20px]" />
                    </FormItem>
                  )}
                />
                <div>年</div>
              </div>
              <div className="flex w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="birthMonth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select {...field} variant={form.formState.errors.birthMonth ? 'warning' : 'default'}>
                          <option value="">-</option>
                          {months.map((month) => (
                            <option key={month} value={month.toString()}>
                              {month}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormMessage className="min-h-[20px]" />
                    </FormItem>
                  )}
                />
                <div>月</div>
              </div>

              <div className="flex w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="birthDay"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select {...field} variant={form.formState.errors.birthDay ? 'warning' : 'default'}>
                          <option value="">-</option>
                          {days.map((day) => (
                            <option key={day} value={day.toString()}>
                              {day}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormMessage className="min-h-[20px]" />
                    </FormItem>
                  )}
                />
                <div>日</div>
              </div>
            </div>
          </div>

          {/* 都道府県 (Prefecture) */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="prefecture"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Select
                      {...field}
                      label="都道府県"
                      placeholder="選択してくださ"
                      variant={form.formState.errors.prefecture ? 'warning' : 'default'}
                    >
                      {prefectures?.map((prefecture) => (
                        <option key={prefecture.id} value={prefecture.nameJP}>
                          {prefecture.nameJP}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage className="min-h-[20px]" />
                </FormItem>
              )}
            />
          </div>

          {/* 性別 (Gender) */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-900">性別</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-row flex-wrap space-x-6"
                    >
                      <RadioGroupItem value={EGender.MALE} id="male" title="男性" />
                      <RadioGroupItem value={EGender.FEMALE} id="female" title="女性" />
                      <RadioGroupItem value={EGender.OTHER} id="other" title="その他" />
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="min-h-[20px]" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-wrap justify-center gap-6">
            {hasCancelButton && (
              <Button
                className="w-full lg:w-auto"
                disabled={isPending}
                onClick={() => router.back()}
                typeStyle="round"
                variant="outline"
                size="xl"
              >
                キャンセル
              </Button>
            )}
            <Button className="w-full lg:w-auto" disabled={isPending} typeStyle="round" type="submit" size="xl">
              {titleSubmitButton}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
