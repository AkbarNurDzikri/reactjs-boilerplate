import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.email().min(1),
    name: z.string().min(1),
    password: z
      .string()
      .min(6)
      .refine((val) => !/\s/.test(val), {
        message: "Password cannot contain spaces",
      }),
    confirmPassword: z.string().min(6),
  })
  .superRefine((data, ctx) => {
    const { confirmPassword, password } = data;
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Confirm password not match",
        path: ["confirmPassword"],
      });
    }
  });

export type ISignUpSchema = z.infer<typeof signUpSchema>;
