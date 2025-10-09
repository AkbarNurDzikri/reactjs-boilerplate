import { Form } from "@/components/ui/form";
import { FormInput } from "@/shared/components/input.form";
import { CloudUpload, Eye, EyeClosed } from "lucide-react";
import { FormButton } from "@/shared/components/button.form";
import { useFormResetPassword } from "../hooks/use-form-reset-password";
import { useResetPasswordMutation } from "../hooks/use-reset-password-mutation";

interface FormResetPasswordProps {
  token: string;
}

export const FormResetPassword = ({ token }: FormResetPasswordProps) => {
  const { form, showPassword, setShowPassword } = useFormResetPassword();
  const { mutate, isPending } = useResetPasswordMutation();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          mutate({ newPassword: data.newPassword, token })
        )}
      >
        <FormInput
          form={form}
          name="newPassword"
          label="New Password"
          icon={showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          placeholder="type your password"
          type={showPassword ? "text" : "password"}
          onIconClick={() => setShowPassword((prev) => !prev)}
        />
        <FormInput
          form={form}
          name="confirmNewPassword"
          label="Confirm New Password"
          placeholder="retype your password"
          type="password"
        />
        <FormButton
          label="Update Password"
          loading={isPending}
          icon={<CloudUpload />}
        />
      </form>
    </Form>
  );
};
