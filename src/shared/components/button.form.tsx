import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { ReactNode } from "react";

interface FormButtonProps {
  label: string;
  loading: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "submit" | "button";
}

export const FormButton = ({
  label,
  loading,
  icon,
  type = "submit",
  onClick,
}: FormButtonProps) => (
  <Button
    className="w-full cursor-pointer mt-3"
    disabled={loading}
    type={type}
    onClick={onClick}
  >
    {loading ? (
      <Spinner />
    ) : icon ? (
      <>
        {icon} {label}
      </>
    ) : (
      label
    )}
  </Button>
);
