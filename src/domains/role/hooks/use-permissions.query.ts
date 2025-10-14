import { useQuery } from "@tanstack/react-query";
import apiClient from "@/shared/lib/api-client";
import type { IPermissionList } from "../types/permission-list.type";

export const usePermissions = (roleId: string) => {
  return useQuery({
    queryKey: ["permissions", roleId],
    queryFn: async () => {
      const [allPerm, assignedPerm] = await Promise.all([
        apiClient.get<IPermissionList[]>("/permissions"),
        apiClient.get<
          IPermissionList & {
            permissions: {
              id: string;
              name: string;
              description: string | null;
            }[];
          }
        >(`/role-permissions/${roleId}`),
      ]);
      return {
        all: allPerm.data,
        assigned: assignedPerm.data?.permissions.map((p) => p.id),
      };
    },
    enabled: !!roleId, // hanya jalan kalau roleId ada
  });
};
