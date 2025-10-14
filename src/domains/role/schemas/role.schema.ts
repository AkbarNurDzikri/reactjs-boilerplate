import z from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable().optional(),
});

export type IRoleSchema = z.infer<typeof roleSchema>;
