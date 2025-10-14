import { useMutation } from "@tanstack/react-query";
import apiClient from "@/shared/lib/api-client";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { showErrorAlert, showSuccessAlert } from "@/shared/lib/alert";
import type { IRoleSchema } from "../schemas/role.schema";
import { queryClient } from "@/shared/lib/query-client";
import { useModalStore } from "@/shared/store/modal-store";
import type { Method } from "../components/role.form";

export const useRoleMutation = (method: Method, id?: string) => {
  const { closeAll } = useModalStore();
  return useMutation({
    mutationFn: async (payload: IRoleSchema) => {
      if (method === "post") {
        await apiClient.post("/roles", payload);
      } else {
        await apiClient.put(`/roles/${id}`, payload);
      }
    },
    onSuccess: () => {
      closeAll();
      showSuccessAlert(
        `Role ${method === "post" ? "created" : "updated"} successfully`
      );
      queryClient.invalidateQueries({ queryKey: ["datatable", "/roles"] });
    },
    onError: (err) => {
      showErrorAlert(getErrorMessage(err));
    },
  });
};
