import { showErrorAlert } from "@/shared/lib/alert";
import apiClient from "@/shared/lib/api-client";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import type { IGetOneUserResponse } from "../types/get-one-user-response.type";

export const getOneUser = async (id: string) => {
  try {
    return await apiClient.get<IGetOneUserResponse>(`/users/${id}`);
  } catch (err) {
    showErrorAlert(getErrorMessage(err));
  }
};
