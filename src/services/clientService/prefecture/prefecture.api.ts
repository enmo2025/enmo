import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { apiClient } from '..';
import { Prefecture } from './prefecture.interface';
import { prefectureQueryKeys } from './prefecture.qkey';
import { Purchase } from '@prisma/client';
import queryClient from '../query-client';

export const invalidatePrefectureQuery = () => {
  queryClient.invalidateQueries({
    predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === prefectureQueryKeys.all[0],
  });
};

export const getPrefectures = async (): Promise<Prefecture[]> => {
  const response = await apiClient.get<Prefecture[]>('/prefecture');
  return response;
};

export const confirmPurchase = async (id: string) => {
  const response = await apiClient.post<Purchase>(`/purchase/confirm/${id}`);
  return response;
};

export const useGetPrefectures = () => {
  return useQuery({
    queryKey: prefectureQueryKeys.list(),
    queryFn: getPrefectures,
  });
};

export const useConfirmPurchase = (options: UseMutationOptions<Purchase, Error, string>) => {
  return useMutation({
    mutationFn: (id: string) => confirmPurchase(id),
    onSuccess: (data, variables, context) => {
      invalidatePrefectureQuery();
      options.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
