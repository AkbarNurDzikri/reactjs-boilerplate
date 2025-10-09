import { Card, CardContent } from "@/components/ui/card";
import { FormResetPassword } from "./components/form-reset-password";
import { RotateCcwKey } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  if (!token) {
    Swal.fire({
      title: "Oops..",
      icon: "error",
      text: "Query params for token not found!",
    }).then(() => navigate("/forgot-password"));

    return;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full md:w-1/3 mx-3">
        <CardContent>
          <RotateCcwKey
            size={50}
            className="text-muted-foreground mx-auto mb-3 border-1 p-2 rounded-lg"
          />
          <h1 className="text-2xl font-bold text-center mb-5">
            Reset Password
          </h1>
          <FormResetPassword token={token} />
        </CardContent>
      </Card>
    </div>
  );
};
