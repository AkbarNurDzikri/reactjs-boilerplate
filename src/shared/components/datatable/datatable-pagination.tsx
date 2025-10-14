import type { PaginationMeta } from "@/shared/types/datatable.type";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps {
  meta: PaginationMeta;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTablePagination({
  meta,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const pageSizeOptions = [5, 10, 25, 50, 100];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-600">Rows /page</p>
        <select
          value={String(pageSize)}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={String(size)}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-600">
          Page {meta.page} of {meta.totalPages} ({meta.total} total)
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={!meta.hasPrevPage}
          className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPrevPage}
          className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!meta.hasNextPage}
          className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(meta.totalPages)}
          disabled={!meta.hasNextPage}
          className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
