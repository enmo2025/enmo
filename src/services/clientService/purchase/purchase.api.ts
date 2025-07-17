import { apiClient } from '~/services/clientService';
import { CustomHookQueryOptionParams, SuccessResponse } from '../interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { purchaseQueryKeys } from './purchase.qkey';
import { PurchaseExtend } from './interface.api';

const getPurchases = async (page: number, limit: number) => {
  const response = await apiClient.get<SuccessResponse<PurchaseExtend[]>>(`/purchase?page=${page}&limit=${limit}`);
  return response;
};

const getPurchase = async (id: string) => {
  const response = await apiClient.get<SuccessResponse<PurchaseExtend>>(`/purchase/${id}`);
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
  const response = await apiClient.post<SuccessResponse<PurchaseExtend>>(`/purchase`, { userId, eventId });
  return response;
};

export const useCreatePurchase = (userId: string, eventId: string, options?: CustomHookQueryOptionParams) => {
  return useMutation({
    mutationFn: () => createPurchase(userId, eventId),
    ...options,
  });
};
