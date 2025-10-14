import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useMemo } from "react";
import type {
  DataTableParams,
  PaginationMeta,
  SortConfig,
} from "../types/datatable.type";
import apiClient from "../lib/api-client";

interface UseDataTableOptions {
  endpoint: string;
  initialPageSize?: number;
  searchField?: string;
}

interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

interface UseDataTableReturn<T> {
  data: T[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  error: Error | null;
  page: number;
  pageSize: number;
  search: string;
  sortConfig: SortConfig | null;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearch: (search: string) => void;
  setSortConfig: (config: SortConfig | null) => void;
  refresh: () => Promise<void>;
}

export function useDataTable<T>({
  endpoint,
  initialPageSize = 10,
  searchField,
}: UseDataTableOptions): UseDataTableReturn<T> {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // 🔧 Build query params
  const queryParams: DataTableParams = useMemo(() => {
    const params: DataTableParams = {
      page,
      limit: pageSize,
    };

    if (search) {
      params.search = search;
      if (searchField) params.searchField = searchField;
    }

    if (sortConfig) {
      params.sortBy = sortConfig.column;
      params.sortOrder = sortConfig.direction;
    }

    return params;
  }, [page, pageSize, search, searchField, sortConfig]);

  // 🧠 React Query v5
  const query = useQuery<PaginationResponse<T>, Error>({
    queryKey: ["datatable", endpoint, queryParams],
    queryFn: async () => {
      const response = await apiClient.getPagination<T>(endpoint, queryParams);
      return response;
    },
    placeholderData: (prev) => prev, // pengganti `keepPreviousData` di v5
    staleTime: 10_000,
  });

  const data = query.data?.data ?? [];
  const meta = query.data?.meta ?? null;

  // ⚡ Helper setter
  const handleSetSearch = useCallback((newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  }, []);

  const handleSetPageSize = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  const refresh = useCallback(async () => {
    await query.refetch();
  }, [query]);

  return {
    data,
    meta,
    isLoading: query.isPending || query.isFetching,
    error: query.error ?? null,
    page,
    pageSize,
    search,
    sortConfig,
    setPage,
    setPageSize: handleSetPageSize,
    setSearch: handleSetSearch,
    setSortConfig,
    refresh,
  };
}
