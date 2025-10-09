import { Form } from "@/components/ui/form";
import { useFormSignIn } from "../hooks/use-form-signin";
import { FormInput } from "@/shared/components/input.form";
import { CircleArrowLeft, Eye, EyeClosed, Key } from "lucide-react";
import { FormButton } from "@/shared/components/button.form";
import { useSignInMutation } from "../hooks/use-signin-mutation";
import { useNavigate } from "react-router";

export const FormSignIn = () => {
  const { form, showPassword, setShowPassword } = useFormSignIn();
  const navigate = useNavigate();
  const { mutate, isPending } = useSignInMutation();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
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
          placeholder="your secret password"
          type={showPassword ? "text" : "password"}
          onIconClick={() => setShowPassword((prev) => !prev)}
        />
        <span
          className="text-xs text-muted-foreground -mt-1 flex justify-end cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password
        </span>
        <FormButton label="Sign In" loading={isPending} icon={<Key />} />
        <div className="flex items-center justify-center mt-5">
          <span
            className="mx-2 cursor-pointer text-sm flex items-center justify-between gap-2 text-muted-foreground"
            onClick={() => navigate("/signup")}
          >
            <CircleArrowLeft size={20} /> Sign Up
          </span>
        </div>
      </form>
    </Form>
  );
};
