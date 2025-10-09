import { Card, CardContent } from "@/components/ui/card";
import { FormForgotPassword } from "./components/form-forgot-password";
import { Fingerprint } from "lucide-react";

export const ForgotPasswordPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full md:w-1/3 mx-3">
        <CardContent>
          <Fingerprint
            size={50}
            className="text-muted-foreground mx-auto mb-3 border-1 p-2 rounded-lg"
          />
          <h1 className="text-2xl font-bold text-center mb-1">
            Forgot Password?
          </h1>
          <p className="text-muted-foreground text-center mb-5 text-sm">
            No worries, we'll send you reset instructions.
          </p>

          <FormForgotPassword />
        </CardContent>
      </Card>
    </div>
  );
};
