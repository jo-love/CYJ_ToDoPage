"use client";

import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface AddBoardProps {
  handleAddBoard: (board: { id: string; title: string }) => void;
}

const AddBoard = ({ handleAddBoard }: AddBoardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = inputRef.current?.value.trim();

    if (!title) return;

    const newBoard = {
      id: uuidv4(),
      title,
    };

    handleAddBoard(newBoard);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <Card className="w-64 flex-shrink-0">
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter a board title"
            name="board-title"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Add Board</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddBoard;
