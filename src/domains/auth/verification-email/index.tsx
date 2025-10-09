import { Spinner } from "@/components/ui/spinner";
import { useVerifyEmailMutation } from "./hooks/use-verify-email-mutation";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";

export const VerificationEmailPage = () => {
  const { mutate, isPending, isError } = useVerifyEmailMutation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  if (!token) {
    Swal.fire({
      title: "Oopss..",
      icon: "error",
      text: "Query params for token not found!",
    }).then(() => navigate("/signin"));
  }

  useEffect(() => {
    if (token) mutate({ token });
  }, [token, mutate]);

  useEffect(() => {
    if (isError) navigate("/signin");
  }, [isError, navigate]);

  return (
    isPending && (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-14 h-screen" />
      </div>
    )
  );
};
