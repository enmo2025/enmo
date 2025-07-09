'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userValidationSchema, type UserValidationType } from '~/validations/user-validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select } from '~/components/ui/select';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Button } from '~/components/ui/button';

interface Prefecture {
  id: number;
  name: string;
  nameJP: string;
  region: string;
}

interface BasicInfoFormData {
  fullName: string;
  fullNameKana: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  prefectures: string;
}

export default function BasicInfo() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserValidationType>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      lastNameKana: '',
      firstNameKana: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      prefecture: '',
      gender: undefined,
    },
  });

  // Fetch prefectures data
  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await fetch('/api/prefectures');
        const data = await response.json();
        setPrefectures(data);
      } catch (error) {
        console.error('Failed to fetch prefectures:', error);
      }
    };

    fetchPrefectures();
  }, []);

  // Generate years (current year back to 100 years ago)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Generate months
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Generate days (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const onSubmit = async (data: UserValidationType) => {
    setIsLoading(true);

    try {
      // Transform data to match the required JSON format
      const transformedData: BasicInfoFormData = {
        fullName: `${data.lastName} ${data.firstName}`,
        fullNameKana: `${data.lastNameKana} ${data.firstNameKana}`,
        dateOfBirth: `${data.birthYear}-${data.birthMonth.padStart(2, '0')}-${data.birthDay.padStart(2, '0')}`,
        gender: data.gender,
        prefectures: data.prefecture,
      };

      console.log('Form data to submit:', transformedData);

      // Here you would typically send the data to your server
      // await submitBasicInfo(transformedData);

      alert('フォームが正常に送信されました');
    } catch (error) {
      console.error('Submit error:', error);
      alert('送信中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="space-y-2 text-center">
        <h1 className="mb-5 mt-10 text-headline-lg font-bold text-primary">基本情報を入力してください</h1>
        <p className="text-gray-600">アカウントに必要な情報を入力してください（非公開)</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* 生年月日 (Date of Birth) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">生年月日</h3>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>年</div>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>月</div>

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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>日</div>
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
                      variant={form.formState.errors.prefecture ? 'warning' : 'default'}
                    >
                      <option value="">選択してください</option>
                      {prefectures.map((prefecture) => (
                        <option key={prefecture.id} value={prefecture.nameJP}>
                          {prefecture.nameJP}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
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
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-row space-x-6">
                      <RadioGroupItem value="male" id="male" title="男性" />
                      <RadioGroupItem value="female" id="female" title="女性" />
                      <RadioGroupItem value="other" id="other" title="その他" />
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button className="min-w-[250px]" type="submit" size="xl" disabled={isLoading}>
              {isLoading ? '送信中...' : '次へ'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
