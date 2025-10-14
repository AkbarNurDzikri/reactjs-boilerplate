import { Button } from "@/components/ui/button";
import { useModalStore } from "@/shared/store/modal-store";
import { Settings } from "lucide-react";
import { RoleList } from "./user.role-list";
import { stringTruncate } from "@/shared/utils/string-truncate";

type AssignRoleToggleProps = {
  userId: string;
  userName: string;
};

export const AssignRoleToggle = ({
  userId,
  userName,
}: AssignRoleToggleProps) => {
  const { openModal } = useModalStore();

  return (
    <Button
      className="cursor-pointer"
      size="icon-sm"
      onClick={() =>
        openModal({
          title: `Manage Roles for ${stringTruncate(userName, 10)}`,
          content: <RoleList userId={userId} />,
        })
      }
    >
      <Settings />
    </Button>
  );
};
