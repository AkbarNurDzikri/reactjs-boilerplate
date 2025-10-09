import { useForm } from "react-hook-form";
import { signInSchema, type ISignInSchema } from "../schemas/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const useFormSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ISignInSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  return { form, showPassword, setShowPassword };
};
