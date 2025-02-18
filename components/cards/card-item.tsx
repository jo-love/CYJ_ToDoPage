import { Card as CardType } from "@/types/boards";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Minus } from "lucide-react";
import { useEditable } from "@/hooks/use-editable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardItemProps {
  card: CardType;
  onDelete: () => void;
  onUpdate: (content: string) => void;
}

const CardItem = ({ card, onDelete, onUpdate }: CardItemProps) => {
  const { isEditing, textareaRef, setIsEditing, handleSubmit, handleKeyDown } =
    useEditable({
      initialValue: card.content,
      onSubmit: onUpdate,
    });
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { type: "card", card },
    disabled: isEditing,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="flex-1border-2 border-background"
      >
        <CardContent className="flex">
          <div
            className="flex-1 text-sm cursor-pointer py-2"
            onClick={() => setIsEditing(true)}
          >
            {card.content}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-auto p-0"
          >
            <Minus size={16} />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {isEditing ? (
        <Textarea
          ref={textareaRef}
          defaultValue={card.content}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm resize-none min-h-14 px-1 border-transparent focus:bg-muted"
          rows={1}
        />
      ) : (
        <CardContent className="flex">
          <div
            className="flex-1 text-sm cursor-pointer py-2"
            onClick={() => setIsEditing(true)}
          >
            {card.content}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-auto p-0"
          >
            <Minus size={16} />
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default CardItem;
