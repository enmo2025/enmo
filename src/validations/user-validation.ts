import { z } from 'zod';
import { EGender } from '~/services/clientService/profile/profile.enum';

export const userValidationSchema = z.object({
  // Name fields (氏名)
  lastName: z
    .string()
    .min(1, { message: '姓を入力してください' })
    .max(50, { message: '姓は50文字以内で入力してください' }),
  firstName: z
    .string()
    .min(1, { message: '名を入力してください' })
    .max(50, { message: '名は50文字以内で入力してください' }),

  // Name in Katakana (氏名(カナ))
  lastNameKana: z
    .string()
    .min(1, { message: '姓（カナ）を入力してください' })
    .max(50, { message: '姓（カナ）は50文字以内で入力してください' }),
  // .regex(/^[ァ-ヶー]+$/, { message: 'カタカナで入力してください' }),
  firstNameKana: z
    .string()
    .min(1, { message: '名（カナ）を入力してください' })
    .max(50, { message: '名（カナ）は50文字以内で入力してください' }),
  // .regex(/^[ァ-ヶー]+$/, { message: 'カタカナで入力してください' }),

  // Date of birth (生年月日)
  birthYear: z.string().min(1, { message: '生年を選択してください' }),
  birthMonth: z.string().min(1, { message: '生月を選択してください' }),
  birthDay: z.string().min(1, { message: '生日を選択してください' }),

  // Prefecture (都道府県)
  prefecture: z.string().min(1, { message: '都道府県を選択してください' }),

  // Gender (性別)
  gender: z.enum(Object.values(EGender) as [string, ...string[]], {
    required_error: '性別を選択してください',
  }),
});

export type UserValidationType = z.infer<typeof userValidationSchema>;
