import { redirect } from "react-router";
import { userContext } from "../shared/contexts/user-context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authLoader = async ({ context }: { context: any }) => {
  const user = context.get(userContext);

  if (!user) {
    throw redirect("/signin");
  }

  return user;
};
