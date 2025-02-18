"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState, useRef } from "react";

interface CardFormProps {
  onSubmit: (content: string) => void;
}

const CardForm = ({ onSubmit }: CardFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = textareaRef.current?.value.trim();

    if (!content) return;

    onSubmit(content);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (isEditing)
    return (
      <form onSubmit={handleSubmit} className="p-2">
        <Textarea
          autoFocus
          className="resize-none bg-muted"
          placeholder="Enter a title for this card"
          ref={textareaRef}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center gap-x-1 mt-3">
          <Button size="sm" type="submit">
            Add Card
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
            <X size={20} />
          </Button>
        </div>
      </form>
    );

  return (
    <div className="p-2">
      <Button
        variant="ghost"
        className="text-muted-foreground w-full justify-start font-semibold"
        onClick={() => setIsEditing(true)}
      >
        <PlusIcon />
        Add a card
      </Button>
    </div>
  );
};

export default CardForm;
