export type IRoleList = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  permissions: {
    id: string;
    name: string;
    description: string | null;
  }[];
};
