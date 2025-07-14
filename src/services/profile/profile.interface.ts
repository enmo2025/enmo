import { EGender } from './profile.enum';

export interface UpdateProfileRequest {
  fullName: string;
  fullNameKana: string;
  dateOfBirth: string;
  gender: EGender;
  prefectures: string;
}
