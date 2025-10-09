import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  resetPasswordSchema,
  type IResetPasswordSchema,
} from "../schemas/reset-password.schema";

export const useFormResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<IResetPasswordSchema>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  return { form, showPassword, setShowPassword };
};
