import { Card, CardContent } from "@/components/ui/card";
import { FormButton } from "@/shared/components/button.form";
import { useResendEmailMutation } from "./hooks/use-resend-email-mutation";
import { CircleArrowRight, Send } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";

export const ResendVerificationPage = () => {
  const { mutate, isPending } = useResendEmailMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  if (!email) {
    Swal.fire({
      title: "Oops",
      icon: "error",
      text: "Query params for email not found!",
    }).then(() => navigate("/signin"));

    return;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full md:w-1/3 mx-3">
        <CardContent>
          <h1 className="text-xl text-muted-foreground text-center mb-5">
            Didn't receive the verification email?
          </h1>

          <FormButton
            label="Resend Email Verification"
            icon={<Send />}
            loading={isPending}
            type="button"
            onClick={() => mutate({ email })}
          />

          <div className="flex items-center justify-center mt-5">
            <span
              className="mx-2 cursor-pointer text-sm flex items-center justify-between gap-2 text-muted-foreground"
              onClick={() => navigate("/signin")}
            >
              <CircleArrowRight size={20} /> Sign In
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
