import { type User } from '@prisma/client';
import { z } from 'zod';

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export const settingsSchema = z.object({
  picture: z.string().url(),
  name: z
    .string({
      required_error: 'Please type your name.',
    })
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(50, {
      message: 'Name must be at most 50 characters.',
    }),
  email: z.string().email(),
  shortBio: z.string().optional(),
});

export type SettingsValues = z.infer<typeof settingsSchema>;

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId'> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };

export interface SendWelcomeEmailProps {
  toMail: string;
  userName: string;
}

export interface SendOTPProps extends SendWelcomeEmailProps {
  code: string;
}

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  eventBanner: string;
  content: string;
  participantFee: string;
  date: Date;
  location: string;
  companyName: string;
  companyProfile: string;
  companyLogo: string;
  hostName: string;
}
