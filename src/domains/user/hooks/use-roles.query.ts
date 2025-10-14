import { useQuery } from "@tanstack/react-query";
import apiClient from "@/shared/lib/api-client";
import type { IRoleList } from "../types/role-list.type";

export const useRoles = (userId: string) => {
  return useQuery({
    queryKey: ["roles", userId],
    queryFn: async () => {
      const [allRole, assignedRole] = await Promise.all([
        apiClient.get<IRoleList[]>("/roles"),
        apiClient.get<
          IRoleList & {
            roles: {
              id: string;
              name: string;
              description: string | null;
            }[];
          }
        >(`/user-roles/${userId}`),
      ]);
      return {
        all: allRole.data,
        assigned: assignedRole.data?.roles.map((p) => p.id),
      };
    },
    enabled: !!userId, // hanya jalan kalau userId ada
  });
};
