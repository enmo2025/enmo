import { Event } from '@prisma/client';
import { apiClient } from '..';

interface CreateCheckoutSessionInput {
  amount: number;
  userId: string;
  event: Event;
}

export const createCheckoutSession = async (data: CreateCheckoutSessionInput) => {
  const response = await apiClient.post<{ url: string }>('/stripe/checkout', data);
  return response;
};
