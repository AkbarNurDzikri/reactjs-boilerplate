import z from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6)
      .refine((val) => !/\s/.test(val), {
        message: "Password cannot contain spaces",
      }),
    confirmNewPassword: z.string().min(6),
  })
  .superRefine((data, ctx) => {
    const { confirmNewPassword, newPassword } = data;
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Confirm password not match",
        path: ["confirmNewPassword"],
      });
    }
  });

export type IResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
