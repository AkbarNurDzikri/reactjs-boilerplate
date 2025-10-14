export type IGetOneUserResponse = {
  id: string;
  email: string;
  name: string;
  photoUrl: string | null;
  isActive: boolean;
  roles: {
    id: string;
    name: string;
    description: string;
  }[];
};
