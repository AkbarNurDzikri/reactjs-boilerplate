interface Role {
  id: string;
  name: string;
}

export interface IUserList {
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  otp: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
}
