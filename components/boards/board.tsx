import { X } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ConfirmDialog from "../common/confirm-dialog";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { Board as BoardType } from "@/types/boards";
import CardItem from "../cards/card-item";
import CardForm from "../cards/card-form";
import { useEditable } from "@/hooks/use-editable";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface BoardProps {
  board: BoardType;
  onDelete: () => void;
  onUpdateTitle: (newTitle: string) => void;
  onAddCard: (cardTitle: string) => void;
  onUpdateCard: (cardId: string, content: string) => void;
  onDeleteCard: (cardId: string) => void;
}

export function Board({
  board,
  onDelete,
  onUpdateTitle,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
}: BoardProps) {
  const cardIds = board.cards?.map((card) => card.id) ?? [];
  const { isEditing, textareaRef, setIsEditing, handleSubmit, handleKeyDown } =
    useEditable({
      initialValue: board.title,
      onSubmit: onUpdateTitle,
    });
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.id,
    data: { type: "board", board },
    disabled: isEditing,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const deleteDialog = useConfirmDialog({
    onConfirm: onDelete,
  });

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        className="w-64 flex-shrink-0 bg-white/60 "
        style={style}
      >
        <CardContent className="flex justify-between items-start gap-x-2 pt-6">
          <CardTitle
            className="text-sm flex-1 cursor-pointer whitespace-pre-wrap py-[9px] px-[5px]"
            onClick={() => setIsEditing(true)}
          >
            {board.title}
          </CardTitle>
          <Button onClick={deleteDialog.open} variant="ghost" className="p-0">
            <X size={20} className="flex-shrink-0" />
          </Button>
        </CardContent>
        <div className="flex flex-col gap-y-2 px-2 mt-2">
          {board.cards?.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onDelete={() => onDeleteCard(card.id)}
              onUpdate={(content) => onUpdateCard(card.id, content)}
            />
          ))}
        </div>
        <CardForm onSubmit={onAddCard} />
      </Card>
    );
  }
  return (
    <>
      <Card ref={setNodeRef} className="w-64 flex-shrink-0" style={style}>
        <CardContent
          className="flex justify-between items-start gap-x-2 pt-6"
          {...attributes}
          {...listeners}
        >
          {isEditing ? (
            <Textarea
              ref={textareaRef}
              defaultValue={board.title}
              onBlur={handleSubmit}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm font-semibold border-transparent focus:bg-muted resize-none min-h-[38px] block w-full px-1"
              rows={1}
            />
          ) : (
            <CardTitle
              className="text-sm flex-1 cursor-pointer whitespace-pre-wrap py-[9px] px-[5px]"
              onClick={() => setIsEditing(true)}
            >
              {board.title}
            </CardTitle>
          )}
          <Button onClick={deleteDialog.open} variant="ghost" className="p-0">
            <X size={20} className="flex-shrink-0" />
          </Button>
        </CardContent>
        <div
          className="flex flex-col gap-y-2 px-2 mt-2 min-h-[50px]"
          data-type="board"
          data-board-id={board.id}
        >
          <SortableContext items={cardIds}>
            {board.cards?.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onDelete={() => onDeleteCard(card.id)}
                onUpdate={(content) => onUpdateCard(card.id, content)}
              />
            ))}
          </SortableContext>
        </div>
        <CardForm onSubmit={onAddCard} />
      </Card>
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        title="Delete Board"
        description="Are you sure you want to delete this board?"
        cancelText="Cancel"
        confirmText="Delete"
        onConfirm={deleteDialog.onConfirm}
      />
    </>
  );
}
