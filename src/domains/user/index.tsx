import { DataTable } from "@/shared/components/datatable";
import { PageContent } from "@/shared/components/page-content";
import { useMemo } from "react";
import { userColumns } from "./components/user.columns";

export const ListOfUser = () => {
  const columns = useMemo(() => userColumns(), []);

  return (
    <PageContent description="List of Users" title="Master User">
      <DataTable columns={columns} endpoint="/users" />
    </PageContent>
  );
};
