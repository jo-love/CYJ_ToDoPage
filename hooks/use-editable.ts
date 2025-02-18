import { useRef, useState, useEffect } from "react";

interface UseEditableProps {
  initialValue: string;
  onSubmit: (value: string) => void;
}

export const useEditable = ({ initialValue, onSubmit }: UseEditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
      textareaRef.current?.select();
      setTimeout(adjustTextareaHeight, 0);
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const newValue = textareaRef.current?.value.trim();
    if (newValue && newValue !== initialValue) {
      onSubmit(newValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return {
    isEditing,
    textareaRef,
    setIsEditing,
    handleSubmit,
    handleKeyDown,
  };
};
