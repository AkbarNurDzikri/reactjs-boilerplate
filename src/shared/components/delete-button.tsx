import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/shared/store/modal-store";
import { Check, Trash2, X } from "lucide-react";
import { showErrorAlert, showSuccessAlert } from "../lib/alert";
import { getErrorMessage } from "../utils/get-error-message";
import apiClient from "../lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";

type DeleteButtonProps = {
  endpoint: string;
  target: string;
  queryKey?: string[];
};

export const DeleteButton = ({
  endpoint,
  target,
  queryKey,
}: DeleteButtonProps) => {
  const { openModal, closeAll } = useModalStore();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete(endpoint);

      if (!res.success) {
        throw new Error(res.message || "Failed to delete data");
      }

      queryClient.invalidateQueries({ queryKey });
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        closeAll();
        showSuccessAlert(String(data.message));
      }
    },
    onError: (err) => {
      closeAll();
      showErrorAlert(getErrorMessage(err));
    },
  });

  return (
    <Badge
      className="cursor-pointer bg-red-100 text-red-500 hover:opacity-75"
      onClick={() =>
        openModal({
          title: (
            <div className="flex items-center justify-start gap-1">
              <Trash2 size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Delete Confirmation
              </span>
            </div>
          ),
          content: (
            <>
              <p className="text-center">
                Are you sure to delete{" "}
                <span className="font-bold">{target}</span> ?
              </p>
              <div className=" mt-5 flex items-center justify-end gap-1">
                <Button
                  size="sm"
                  variant="destructive"
                  className="cursor-pointer hover:opacity-75"
                  disabled={isPending}
                  onClick={() => mutate()}
                >
                  <Check />
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => closeAll()}
                >
                  <X />
                  Cancel
                </Button>
              </div>
            </>
          ),
        })
      }
    >
      <Trash2 /> Delete
    </Badge>
  );
};
