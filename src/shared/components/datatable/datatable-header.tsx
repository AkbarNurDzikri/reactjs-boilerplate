import { TableHead } from "@/components/ui/table";
import type { ColumnDef, SortConfig } from "@/shared/types/datatable.type";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface DataTableHeaderProps<T> {
  column: ColumnDef<T>;
  sortConfig: SortConfig | null;
  onSort: (column: string) => void;
}

export function DataTableHeader<T>({
  column,
  sortConfig,
  onSort,
}: DataTableHeaderProps<T>) {
  const isSorted = sortConfig?.column === column.id;
  const sortDirection = isSorted ? sortConfig.direction : null;

  const handleClick = () => {
    if (column.sortable) {
      onSort(column.id);
    }
  };

  const getSortIcon = () => {
    if (!column.sortable) return null;

    if (!isSorted) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }

    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <TableHead
      className={`h-12 px-4 text-left align-middle font-medium text-gray-600 ${
        column.className || ""
      }`}
    >
      {column.sortable ? (
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center hover:text-gray-900 transition-colors cursor-pointer"
        >
          {column.header}
          {getSortIcon()}
        </button>
      ) : (
        column.header
      )}
    </TableHead>
  );
}
