import { TableCell, TableRow } from "@/components/ui/table";
import type { ColumnDef } from "@/shared/types/datatable.type";

interface DataTableRowProps<T> {
  row: T;
  columns: ColumnDef<T>[];
  index: number;
  globalIndex: number;
}

function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

export function DataTableRow<T>({
  row,
  columns,
  index,
  globalIndex,
}: DataTableRowProps<T>) {
  const getCellValue = (column: ColumnDef<T>, rowData: T) => {
    if (column.cell) {
      return column.cell(rowData, index, globalIndex);
    }

    if (column.accessorKey) {
      const key = column.accessorKey as string;
      const value = getNestedValue(rowData, key);

      if (Array.isArray(value)) {
        return value
          .map((item: Record<string, unknown>) => item.name)
          .join(", ");
      }

      return value !== null && value !== undefined ? String(value) : "-";
    }

    return "-";
  };

  return (
    <TableRow className="hover:bg-gray-200">
      {columns.map((column) => (
        <TableCell
          key={column.id}
          className={`align-middle ${column.className || ""}`}
        >
          {getCellValue(column, row)}
        </TableCell>
      ))}
    </TableRow>
  );
}
