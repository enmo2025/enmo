import { apiClient } from '..';
import { SuccessResponse } from '../interface';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const uniqueFilename = `${Date.now()}_${file.name}`;
  formData.append('filename', uniqueFilename);
  const res = await apiClient.post<any>(`/upload`, formData);
  return res;
};

export const deleteImage = async (filename: string) => {
  const res = await apiClient.delete<SuccessResponse<string>>(`/upload?filename=${filename}`);
  return res.data;
};
