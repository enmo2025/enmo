import { apiClient } from '..';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateProfileRequest } from './profile.interface';

const updateProfile = async (profile: UpdateProfileRequest) => {
  const response = await apiClient.put('/profiles', profile);
  return response;
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};

const deleteProfile = async () => {
  const response = await apiClient.delete('/profiles');
  return response;
};

export const useDeleteProfile = (options: UseMutationOptions<unknown, Error, void>) => {
  return useMutation({
    mutationFn: deleteProfile,
    ...options,
  });
};
