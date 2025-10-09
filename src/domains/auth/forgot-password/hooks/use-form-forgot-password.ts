import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type IForgotPasswordSchema,
} from "../schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useFormForgotPassword = () => {
  const form = useForm<IForgotPasswordSchema>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  return form;
};
