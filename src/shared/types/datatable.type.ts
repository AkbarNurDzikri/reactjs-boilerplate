export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

type SortDirection = "asc" | "desc";

export interface SortConfig {
  column: string;
  direction: SortDirection;
}

export interface DataTableParams {
  page?: number;
  limit?: number;
  search?: string;
  searchField?: string;
  sortBy?: string;
  sortOrder?: SortDirection;
}

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T | string;
  cell?: (row: T, index?: number, globalIndex?: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}
