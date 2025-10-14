import { DataTable } from "@/shared/components/datatable";
import { PageContent } from "@/shared/components/page-content";
import { roleColumns } from "./components/role.columns";
import { RoleCreateButton } from "./components/role.create-button";

export const ListOfRole = () => {
  return (
    <PageContent title="Master Role" description="List of Roles">
      <DataTable
        columns={roleColumns()}
        endpoint="/roles"
        otherTools={<RoleCreateButton />}
      />
    </PageContent>
  );
};
