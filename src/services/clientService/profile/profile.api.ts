import { apiClient } from '..';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateProfileRequest } from './profile.interface';

const updateProfile = async (profile: UpdateProfileRequest) => {
  const response = await apiClient.put('/profile', profile);
  return response;
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      // TODO: handle refetch session
    },
  });
};

const deleteProfile = async () => {
  const response = await apiClient.delete('/profile');
  return response;
};

export const useDeleteProfile = (options: UseMutationOptions<unknown, Error, void>) => {
  return useMutation({
    mutationFn: deleteProfile,
    ...options,
  });
};
