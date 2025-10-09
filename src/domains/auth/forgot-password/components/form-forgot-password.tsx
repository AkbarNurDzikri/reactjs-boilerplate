import { Form } from "@/components/ui/form";
import { useFormForgotPassword } from "../hooks/use-form-forgot-password";
import { useForgotPasswordMutation } from "../hooks/use-forgot-password-mutation";
import { FormInput } from "@/shared/components/input.form";
import { FormButton } from "@/shared/components/button.form";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export const FormForgotPassword = () => {
  const form = useFormForgotPassword();
  const navigate = useNavigate();
  const { mutate, isPending } = useForgotPasswordMutation();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <FormInput
          form={form}
          name="email"
          placeholder="registered email"
          label="Email"
        />
        <FormButton label="Reset Password" loading={isPending} />
        <div className="flex items-center justify-center mt-5">
          <span
            className="mx-2 cursor-pointer text-sm flex items-center justify-between gap-2 text-muted-foreground"
            onClick={() => navigate("/signin")}
          >
            <CircleArrowLeft size={20} /> Back to sign in
          </span>
        </div>
      </form>
    </Form>
  );
};
