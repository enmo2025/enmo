import { apiClient } from '~/services/clientService';
import { CustomHookQueryOptionParams, SuccessResponse } from '../interface';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { purchaseQueryKeys } from './purchase.qkey';
import { PurchaseExtend } from './interface.api';
import { Purchase } from '@prisma/client';
import queryClient from '../query-client';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const invalidatePurchaseQuery = () => {
  queryClient.invalidateQueries({
    predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === purchaseQueryKeys.all[0],
  });
};

const getPurchases = async (page: number, limit: number) => {
  const response = await apiClient.get<SuccessResponse<PurchaseExtend[]>>(`/purchases?page=${page}&limit=${limit}`);
  return response;
};

const getPurchase = async (id: string) => {
  const response = await apiClient.get<SuccessResponse<PurchaseExtend>>(`/purchases/${id}`);
  return response;
};

export const confirmPurchase = async ({ id, lineId, message }: { id: string; lineId: string; message: string }) => {
  const response = await apiClient.post<Purchase>(`/purchases/confirm/${id}`, { lineId, message });
  return response;
};

export const useGetPurchases = (page: number, limit: number, options?: CustomHookQueryOptionParams) => {
  return useQuery({
    queryKey: purchaseQueryKeys.list(page, limit),
    queryFn: () => getPurchases(page, limit),
    ...options,
  });
};

export const useGetPurchase = (id: string, options?: CustomHookQueryOptionParams) => {
  return useQuery({
    queryKey: purchaseQueryKeys.detail(id),
    queryFn: () => getPurchase(id),
    ...options,
  });
};

const createPurchase = async (userId: string, eventId: string) => {
  const response = await apiClient.post<SuccessResponse<PurchaseExtend>>(`/purchases`, { userId, eventId });
  return response;
};

export const useCreatePurchase = (userId: string, eventId: string, options?: CustomHookQueryOptionParams) => {
  return useMutation({
    mutationFn: () => createPurchase(userId, eventId),
    ...options,
  });
};

export const getPurchaseByStripeSessionId = async (sessionId: string, cookie?: ReadonlyRequestCookies) => {
  const response = await apiClient.get<SuccessResponse<PurchaseExtend>>(`/purchases/stripe-session/${sessionId}`, {
    headers: {
      Cookie: cookie?.toString()!,
    },
  });
  return response;
};

export const useGetPurchaseByStripeSessionId = (sessionId: string, options?: CustomHookQueryOptionParams) => {
  return useQuery({
    queryKey: purchaseQueryKeys.stripeSession(sessionId),
    queryFn: () => getPurchaseByStripeSessionId(sessionId),
    ...options,
  });
};

export const useConfirmPurchase = (
  options: UseMutationOptions<Purchase, Error, { id: string; lineId: string; message: string }>
) => {
  return useMutation({
    mutationFn: ({ id, lineId, message }) => confirmPurchase({ id, lineId, message }),
    ...options,
    onSuccess: (data, variables, context) => {
      invalidatePurchaseQuery();
      options.onSuccess?.(data, variables, context);
    },
  });
};
