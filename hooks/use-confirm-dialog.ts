import { useState } from "react";

interface UseConfirmDialogProps {
  onConfirm: () => void;
}

export function useConfirmDialog({ onConfirm }: UseConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    onConfirm,
  };
}
