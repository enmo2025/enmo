export interface UpdateProfileRequest {
  fullName: string;
  fullNameKana: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  prefectures: string;
}
