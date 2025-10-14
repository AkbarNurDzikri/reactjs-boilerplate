import type { ColumnDef } from "@/shared/types/datatable.type";
import type { IUserList } from "../types/user-list.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserActivationToggle } from "./user.activation-toggle";
import { AssignRoleToggle } from "./user.assign-role-toggle";

export const userColumns = () => {
  const columns: ColumnDef<IUserList>[] = [
    {
      id: "no",
      header: "No.",
      accessorKey: "no",
      cell: (_, __, globalIndex) => globalIndex,
    },
    {
      id: "photo",
      header: "Photo",
      accessorKey: "photoUrl",
      cell: (row) => (
        <Avatar>
          <AvatarImage
            src={
              row.photoUrl
                ? import.meta.env.BASE_URL + "/" + row.photoUrl
                : "/user-default.svg"
            }
          />
        </Avatar>
      ),
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      sortable: true,
    },
    {
      id: "roles",
      header: "Manage Roles",
      accessorKey: "roles",
      cell: (row) => (
        <div className="flex items-center justify-start gap-3">
          <AssignRoleToggle userId={row.id} userName={row.name} />
          {row.roles.length} Roles
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        return <UserActivationToggle isActive={row.isActive} userId={row.id} />;
      },
    },
  ];

  return columns;
};
