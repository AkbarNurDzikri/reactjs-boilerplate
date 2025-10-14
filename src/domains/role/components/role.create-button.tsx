import { Button } from "@/components/ui/button";
import { useModalStore } from "@/shared/store/modal-store";
import { BadgePlus } from "lucide-react";
import { RoleForm } from "./role.form";

export const RoleCreateButton = () => {
  const { openModal } = useModalStore();
  const defaultValues = { name: "", description: "" };
  return (
    <Button
      size="sm"
      className="cursor-pointer"
      onClick={() =>
        openModal({
          title: "Add Role",
          content: <RoleForm defaultValues={defaultValues} method="post" />,
        })
      }
    >
      <BadgePlus /> New
    </Button>
  );
};
