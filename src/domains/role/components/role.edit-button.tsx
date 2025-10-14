import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import type { IRoleSchema } from "../schemas/role.schema";
import { useModalStore } from "@/shared/store/modal-store";
import { RoleForm } from "./role.form";

type RoleEditButtonProps = {
  defaultValues: IRoleSchema;
  id: string;
};

export const RoleEditButton = ({ defaultValues, id }: RoleEditButtonProps) => {
  const { openModal } = useModalStore();
  return (
    <Badge
      className="cursor-pointer bg-blue-100 text-blue-500 hover:opacity-75"
      onClick={() =>
        openModal({
          title: "Edit Role",
          content: (
            <RoleForm defaultValues={defaultValues} method="put" id={id} />
          ),
        })
      }
    >
      <Edit /> Edit
    </Badge>
  );
};
