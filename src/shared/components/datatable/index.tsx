import { useDataTable } from "@/shared/hooks/use-datatable";
import type { ColumnDef } from "@/shared/types/datatable.type";
import { DataTableSearch } from "./datatable-search";
import { DataTableHeader } from "./datatable-header";
import { Loader2 } from "lucide-react";
import { DataTableRow } from "./datatable-row";
import { DataTablePagination } from "./datatable-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ReactNode } from "react";

interface DataTableProps<T> {
  endpoint: string;
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  initialPageSize?: number;
  otherTools?: ReactNode;
}

export function DataTable<T>({
  endpoint,
  columns,
  searchPlaceholder = "Search...",
  initialPageSize = 10,
  otherTools,
}: DataTableProps<T>) {
  const {
    data,
    meta,
    isLoading,
    error,
    page,
    pageSize,
    search,
    sortConfig,
    setPage,
    setPageSize,
    setSearch,
    setSortConfig,
  } = useDataTable<T>({
    endpoint,
    initialPageSize,
  });

  const handleSort = (columnId: string) => {
    if (!sortConfig || sortConfig.column !== columnId) {
      setSortConfig({ column: columnId, direction: "asc" });
    } else if (sortConfig.direction === "asc") {
      setSortConfig({ column: columnId, direction: "desc" });
    } else {
      setSortConfig(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <DataTableSearch
          value={search}
          onChange={setSearch}
          placeholder={searchPlaceholder}
        />
        {otherTools}
      </div>

      <div className="rounded-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full caption-bottom text-sm">
            <TableHeader className="border-b bg-gray-50">
              <TableRow>
                {columns.map((column) => (
                  <DataTableHeader
                    key={column.id}
                    column={column}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  />
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center"
                  >
                    <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600">{error.message}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <p className="text-lg font-medium">No data found</p>
                      <p className="text-sm">
                        {search
                          ? "Try adjusting your search"
                          : "No records available"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => {
                  const globalIndex = (page - 1) * pageSize + index + 1;
                  return (
                    <DataTableRow
                      key={index}
                      row={row}
                      columns={columns}
                      globalIndex={globalIndex}
                      index={index}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {meta && !isLoading && !error && data.length > 0 && (
        <DataTablePagination
          meta={meta}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
