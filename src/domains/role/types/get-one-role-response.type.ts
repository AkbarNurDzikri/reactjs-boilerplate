export type IGetOneRoleResponse = {
  id: string;
  name: string;
  permissions: {
    id: string;
    name: string;
    description: string;
  }[];
};
