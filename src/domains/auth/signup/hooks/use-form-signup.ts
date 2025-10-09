import { useForm } from "react-hook-form";
import { signUpSchema, type ISignUpSchema } from "../schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const useFormSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ISignUpSchema>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  return { form, showPassword, setShowPassword };
};
