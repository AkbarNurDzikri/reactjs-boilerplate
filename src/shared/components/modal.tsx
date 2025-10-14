import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ModalProps } from "@/shared/store/modal-store";
import { useModalStore } from "@/shared/store/modal-store";
import clsx from "clsx";

function Modal({ id, title, content, onClose }: ModalProps) {
  const { closeModal } = useModalStore();

  const handleClose = () => {
    closeModal(id);
    onClose?.();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()} modal={false}>
      <DialogContent
        className={clsx(
          "min-w-[320px] max-w-[90vw] p-6 max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl",
          "break-words [word-break:break-word]",
          // agar lebar konten tetap fleksibel
          "sm:w-auto sm:max-w-fit md:max-w-[80vw]"
        )}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {title && (
          <DialogHeader className="mb-2">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        )}
        <div className="mt-1">{content}</div>
      </DialogContent>
    </Dialog>
  );
}

export function ModalContainer() {
  const { modals } = useModalStore();

  return (
    <>
      {modals.map((modal) => (
        <Modal key={modal.id} {...modal} />
      ))}
    </>
  );
}
