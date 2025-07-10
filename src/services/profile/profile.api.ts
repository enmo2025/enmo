import { apiClient } from '..';
import { useMutation } from '@tanstack/react-query';
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
