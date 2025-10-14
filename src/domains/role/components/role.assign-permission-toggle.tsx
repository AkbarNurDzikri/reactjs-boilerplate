import { Button } from "@/components/ui/button";
import { useModalStore } from "@/shared/store/modal-store";
import { Settings } from "lucide-react";
import { PermissionList } from "./role.permission-list";

type AssignPermissionToggleProps = {
  roleId: string;
  roleName: string;
};

export const AssignPermissionToggle = ({
  roleId,
  roleName,
}: AssignPermissionToggleProps) => {
  const { openModal } = useModalStore();

  return (
    <Button
      className="cursor-pointer"
      size="icon-sm"
      onClick={() =>
        openModal({
          title: `Manage Permissions for ${roleName}`,
          content: <PermissionList roleId={roleId} />,
        })
      }
    >
      <Settings />
    </Button>
  );
};
