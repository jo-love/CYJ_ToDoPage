import { useConfirmDialog } from "./use-confirm-dialog";

interface UseDeletableProps {
  title: string;
  description: string;
  onDelete: () => void;
}

export const useDeletable = ({
  title,
  description,
  onDelete,
}: UseDeletableProps) => {
  const deleteDialog = useConfirmDialog({
    onConfirm: onDelete,
  });

  return {
    isOpen: deleteDialog.isOpen,
    onClose: deleteDialog.close,
    onOpen: deleteDialog.open,
    dialogProps: {
      title,
      description,
      cancelText: "Cancel",
      confirmText: "Delete",
      onConfirm: deleteDialog.onConfirm,
    },
  };
};
