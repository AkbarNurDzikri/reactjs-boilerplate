import { showErrorAlert } from "@/shared/lib/alert";
import apiClient from "@/shared/lib/api-client";
import { queryClient } from "@/shared/lib/query-client";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { useMutation } from "@tanstack/react-query";

export const useRolesToggle = (userId: string) => {
  return useMutation({
    mutationFn: async (roleId: string) => {
      const res = await apiClient.post("/user-roles", {
        userId,
        roleId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "/users"] });
      queryClient.invalidateQueries({ queryKey: ["roles", userId] });
    },
    onError: (err) => {
      showErrorAlert(getErrorMessage(err));
    },
  });
};
