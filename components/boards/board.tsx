"use client";

import { X } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface BoardProps {
  title: string;
  onDelete: () => void;
  onUpdateTitle: (newTitle: string) => void;
}

export function Board({ title, onDelete, onUpdateTitle }: BoardProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "0px";
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
      setTimeout(adjustTextareaHeight, 0);
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const newTitle = editedTitle.trim();
    if (newTitle && newTitle !== title) {
      onUpdateTitle(newTitle);
    } else {
      setEditedTitle(title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTitle(e.target.value);
  };

  useEffect(() => {
    if (isEditing) {
      adjustTextareaHeight();
    }
  }, [editedTitle, isEditing]);

  return (
    <Card className="w-64 min-h-[106px] flex-shrink-0">
      <CardContent className="flex justify-between items-start gap-x-2 pt-6">
        {isEditing ? (
          <Textarea
            ref={inputRef}
            value={editedTitle}
            onChange={handleChange}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm font-semibold border-transparent focus:bg-muted resize-none min-h-[24px] block w-full px-1"
            rows={1}
          />
        ) : (
          <CardTitle
            className="text-sm flex-1 cursor-pointer whitespace-pre-wrap py-[9px] px-[5px]"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </CardTitle>
        )}
        <Button onClick={onDelete} variant="ghost" className="p-0">
          <X size={20} className="flex-shrink-0" />
        </Button>
      </CardContent>
    </Card>
  );
}
