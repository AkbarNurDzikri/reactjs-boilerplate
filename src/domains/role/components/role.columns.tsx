import type { ColumnDef } from "@/shared/types/datatable.type";
import type { IRoleList } from "../types/role-list.type";
import { AssignPermissionToggle } from "./role.assign-permission-toggle";
import { RoleEditButton } from "./role.edit-button";
import { DeleteButton } from "@/shared/components/delete-button";

export const roleColumns = () => {
  const columns: ColumnDef<IRoleList>[] = [
    {
      id: "no",
      header: "No.",
      accessorKey: "no",
      cell: (_, __, globalIndex) => globalIndex,
    },
    {
      id: "name",
      header: "Role Name",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
    },
    {
      id: "permissions",
      header: "Manage Permissions",
      accessorKey: "permissions",
      cell: (row) => {
        return (
          <div className="flex items-center justify-start gap-3">
            <AssignPermissionToggle roleId={row.id} roleName={row.name} />
            {row.permissions.length} Permissions
          </div>
        );
      },
    },
    {
      id: "options",
      header: "Options",
      accessorKey: "options",
      cell: (row) => {
        const defaultValues = { name: row.name, description: row.description };

        return (
          <div className="flex items-center justify-center gap-1">
            <RoleEditButton defaultValues={defaultValues} id={row.id} />
            <DeleteButton
              endpoint={`/roles/${row.id}`}
              target={row.name}
              queryKey={["datatable", "/roles"]}
            />
          </div>
        );
      },
    },
  ];

  return columns;
};
