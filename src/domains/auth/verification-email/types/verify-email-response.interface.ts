export type IVerifyEmailResponse = {
  success: boolean;
  message: string;
  data: {
    userId: string;
  };
};
