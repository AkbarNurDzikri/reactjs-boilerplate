import { showErrorAlert } from "@/shared/lib/alert";
import apiClient from "@/shared/lib/api-client";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import type { IGetOneRoleResponse } from "../types/get-one-role-response.type";

export const getOneRole = async (id: string) => {
  try {
    return await apiClient.get<IGetOneRoleResponse>(`/roles/${id}`);
  } catch (err) {
    showErrorAlert(getErrorMessage(err));
  }
};
