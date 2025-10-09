import { Card, CardContent } from "@/components/ui/card";
import { FormSignIn } from "./components/form-signin";

export const SignInPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full md:w-1/3 mx-3">
        <CardContent>
          <img src="/vite.svg" className="mx-auto" />
          <h1 className="text-2xl font-bold text-center mb-5">Sign In</h1>
          <FormSignIn />
        </CardContent>
      </Card>
    </div>
  );
};
