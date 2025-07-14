import { generateRandomString, type RandomReader } from '@oslojs/crypto/random';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EGender } from '~/services/profile/profile.enum';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return '0';
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  // eslint-disable-next-line sonarjs/concise-regex
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item ? (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol : '0';
}

export function hasFileNameSpaces(fileName: string) {
  return /\s/.test(fileName);
}

export const isOurCdnUrl = (url: string) => url?.includes('utfs.io') || url?.includes('uploadthing.com');

export const getImageKeyFromUrl = (url: string) => {
  const parts = url.split('/');
  return parts.at(-1);
};

export class FreePlanLimitError extends Error {
  constructor(message = 'Upgrade your plan!') {
    super(message);
  }
}

export function isRedirectError(error: unknown): boolean {
  return (
    error !== null &&
    typeof error === 'object' &&
    'digest' in error &&
    typeof error.digest === 'string' &&
    error.digest.includes('NEXT_REDIRECT')
  );
}

const alphanumeric = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateId(length = 10): string {
  const random: RandomReader = {
    read(bytes) {
      crypto.getRandomValues(bytes);
    },
  };
  return generateRandomString(random, alphanumeric, length);
}

export function formatDate(input: string | Date): string {
  const date = new Date(input);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

export const genderList = {
  [EGender.FEMALE]: '男性',
  [EGender.MALE]: '女性',
  [EGender.OTHER]: 'その他',
};
