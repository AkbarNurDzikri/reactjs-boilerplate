import { Form } from "@/components/ui/form";
import { useRoleForm } from "../hooks/use-role.form";
import { FormInput } from "@/shared/components/input.form";
import { FormTextarea } from "@/shared/components/datatable/text-area.form";
import { FormButton } from "@/shared/components/button.form";
import { useRoleMutation } from "../hooks/use-role.mutation";
import type { IRoleSchema } from "../schemas/role.schema";
import { CloudUpload } from "lucide-react";

export type Method = "post" | "put";

type RoleFormProps = {
  defaultValues: IRoleSchema;
  method: Method;
  id?: string;
};

export const RoleForm = ({ defaultValues, method, id }: RoleFormProps) => {
  const form = useRoleForm(defaultValues);
  const { mutate, isPending } = useRoleMutation(method, id);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <FormInput
          form={form}
          name="name"
          placeholder="Supervisor"
          label="Name"
        />
        <FormTextarea
          form={form}
          name="description"
          placeholder="Describe about this role"
          label="Description"
        />
        <FormButton
          label={method === "post" ? "Save" : "Update"}
          loading={isPending}
          icon={<CloudUpload />}
        />
      </form>
    </Form>
  );
};
