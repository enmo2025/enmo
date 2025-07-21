import { useQuery } from '@tanstack/react-query';
import { apiClient } from '..';
import { Prefecture } from './prefecture.interface';
import { prefectureQueryKeys } from './prefecture.qkey';

export const getPrefectures = async (): Promise<Prefecture[]> => {
  const response = await apiClient.get<Prefecture[]>('/prefectures');
  return response;
};

export const useGetPrefectures = () => {
  return useQuery({
    queryKey: prefectureQueryKeys.list(),
    queryFn: getPrefectures,
  });
};
