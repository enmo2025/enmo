import { apiClient } from '~/services/clientService';
import { SuccessResponse } from '../interface';
import { User } from '@prisma/client';

export const getUser = async (id?: string) => {
  const response = await apiClient.get<SuccessResponse<User>>(`/user/${id}`);
  return response;
};
