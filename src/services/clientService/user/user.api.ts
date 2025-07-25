import { apiClient } from '~/services/clientService';
import { CustomHookQueryOptionParams, SuccessResponse } from '../interface';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { userQueryKeys } from './user.qkey';

export const getUser = async (id?: string) => {
  const response = await apiClient.get<SuccessResponse<User>>(`/user/${id}`);
  return response;
};

export const useGetUser = (id?: string, options?: CustomHookQueryOptionParams) => {
  return useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => getUser(id),
    ...options,
  });
};
