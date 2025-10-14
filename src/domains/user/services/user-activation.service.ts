import { showSuccessAlert } from "@/shared/lib/alert";
import apiClient from "@/shared/lib/api-client";
import { getErrorMessage } from "@/shared/utils/get-error-message";

export const userActivationService = async (
  userId: string,
  currentStatus: boolean
) => {
  try {
    await apiClient.patch(`/users/${userId}`, {
      isActive: !currentStatus,
    });
    showSuccessAlert("Status user berhasil diubah!");
  } catch (err) {
    getErrorMessage(err);
  }
};
