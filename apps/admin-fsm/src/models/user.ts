export interface UserModel {
  email: string;
  firstName: string;
  lastName: string;
}

export interface AdminUserModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  isVerified: boolean;
  enabled: boolean;
  role: string;
}
