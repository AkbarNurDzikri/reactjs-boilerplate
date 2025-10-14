import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { roleSchema, type IRoleSchema } from "../schemas/role.schema";

export const useRoleForm = (defaultValues: IRoleSchema) => {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(roleSchema),
  });

  return form;
};
