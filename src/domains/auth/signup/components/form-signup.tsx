import { Form } from "@/components/ui/form";
import { useFormSignUp } from "../hooks/use-form-signup";
import { FormInput } from "@/shared/components/input.form";
import { CircleArrowRight, CloudUpload, Eye, EyeClosed } from "lucide-react";
import { FormButton } from "@/shared/components/button.form";
import { useSignUpMutation } from "../hooks/use-signup-mutation";
import { useNavigate } from "react-router";

export const FormSignUp = () => {
  const { form, showPassword, setShowPassword } = useFormSignUp();
  const navigate = useNavigate();
  const { mutate, isPending } = useSignUpMutation();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <FormInput
          form={form}
          name="name"
          label="Name"
          placeholder="Muhammad Al Fatih"
        />
        <FormInput
          form={form}
          name="email"
          label="Email"
          placeholder="example@mail.com"
        />
        <FormInput
          form={form}
          name="password"
          label="Password"
          icon={showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          placeholder="type your password"
          type={showPassword ? "text" : "password"}
          onIconClick={() => setShowPassword((prev) => !prev)}
        />
        <FormInput
          form={form}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="retype your password"
          type="password"
        />
        <FormButton
          label="Create Account"
          loading={isPending}
          icon={<CloudUpload />}
        />
        <div className="flex items-center justify-center mt-5">
          <span
            className="mx-2 cursor-pointer text-sm flex items-center justify-between gap-2 text-muted-foreground"
            onClick={() => navigate("/signin")}
          >
            <CircleArrowRight size={20} /> Sign In
          </span>
        </div>
      </form>
    </Form>
  );
};
