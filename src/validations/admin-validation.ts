import { z } from 'zod';

export const eventValidationSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'タイトルを入力してください' })
    .max(100, { message: 'タイトルは100文字以内で入力してください' }),
  description: z
    .string()
    .min(1, { message: '説明を入力してください' })
    .max(1000, { message: '説明は1000文字以内で入力してください' }),
  content: z
    .string()
    .min(1, { message: '内容を入力してください' })
    .refine((val) => val.trim() !== '<p><br></p>', {
      message: '内容を入力してください',
    }),
  eventBanner: z.string().min(1, { message: 'バナーを入力してください' }),
  participantFee: z.coerce
    .number()
    .min(1, { message: '価格を入力してください' })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: '価格は数字で入力してください',
    })
    .refine((val) => val > 100, {
      message: '価格は100円以上で入力してください',
    }),
  date: z
    .string()
    .min(1, '日付を入力してください')
    .refine((val) => !isNaN(Date.parse(val)), {
      message: '日付が不正です',
    })
    .refine((val) => new Date(val) >= new Date(), {
      message: '日付は未来の日付で入力してください',
    }),
  location: z.string().min(1, { message: '場所を入力してください' }),
  partnerId: z.string().min(1, { message: 'パートナーを選択してください' }),
});

export const partnerValidationSchema = z.object({
  companyName: z.string().min(1, { message: '会社名を入力してください' }),
  companyLogo: z.string().min(1, { message: 'ロゴを入力してください' }),
  companyProfile: z
    .string()
    .min(1, { message: '会社概要を入力してください' })
    .max(100, { message: '会社概要は100文字以内で入力してください' }),
  companyField: z.string().min(1, { message: '会社分野を入力してください' }),
  hostName: z.string().min(1, { message: '担当者名を入力してください' }),
});

export type EventValidationType = z.infer<typeof eventValidationSchema>;
export type PartnerValidationType = z.infer<typeof partnerValidationSchema>;
