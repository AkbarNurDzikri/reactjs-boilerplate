import { showErrorAlert } from "@/shared/lib/alert";
import apiClient from "@/shared/lib/api-client";
import { queryClient } from "@/shared/lib/query-client";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { useMutation } from "@tanstack/react-query";

export const usePermissionsToggle = (roleId: string) => {
  return useMutation({
    mutationFn: async (permissionId: string) => {
      const res = await apiClient.post("/role-permissions", {
        roleId,
        permissionId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "/roles"] });
      queryClient.invalidateQueries({ queryKey: ["permissions", roleId] });
    },
    onError: (err) => {
      showErrorAlert(getErrorMessage(err));
    },
  });
};
