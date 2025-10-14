import { Spinner } from "@/components/ui/spinner";

export const hydrateFallback = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner className="w-10 h-10 text-blue-500" />
    </div>
  );
};
