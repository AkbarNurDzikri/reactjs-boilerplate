export type ISignInResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      roles: string[];
      permissions: string[];
      access_token: string;
      refresh_token: string;
    };
  };
};
