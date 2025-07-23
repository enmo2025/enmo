import { Partner } from '@prisma/client';
import { apiClient } from '..';
import { SuccessResponse } from '../interface';
import { queryClient } from '../query-client';
import { partnerQueryKeys } from './partner.qkey';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PartnerValidationType } from '~/validations/admin-validation';

export const invalidatePartnerQuery = () => {
  queryClient.invalidateQueries({
    predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === partnerQueryKeys.all[0],
  });
};

export const getPartners = async () => {
  const partners = await apiClient.get<SuccessResponse<Partner[]>>(`/partner`);
  return partners;
};

export const createPartner = async (partner: PartnerValidationType) => {
  const newPartner = await apiClient.post<SuccessResponse<Partner>>('/partner', partner);
  return newPartner;
};

export const useGetPartners = () => {
  return useQuery({
    queryKey: partnerQueryKeys.all,
    queryFn: () => getPartners(),
  });
};

export const useCreatePartner = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: createPartner,
    onSuccess: () => {
      onSuccess();
      invalidatePartnerQuery();
    },
  });
};
