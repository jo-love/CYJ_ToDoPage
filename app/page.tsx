"use client";

import { DndContext } from "@dnd-kit/core";
import { Board } from "@/components/boards/board";
import { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddBoard from "@/components/boards/add-board";

const INITIAL_BOARDS = [
  { id: uuidv4(), title: "To-Do" },
  { id: uuidv4(), title: "DONE" },
];

const Home = () => {
  const [boards, setBoards] = useState(INITIAL_BOARDS);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  };

  const handleAddBoard = (newBoard: { id: string; title: string }) => {
    setBoards([...boards, newBoard]);
  };

  const handleUpdateBoardTitle = (boardId: string, newTitle: string) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId ? { ...board, title: newTitle } : board,
      ),
    );
  };

  const handleDeleteBoard = (boardId: string) => {
    setBoards(boards.filter((board) => board.id !== boardId));
  };

  return (
    <main className="p-4 h-screen">
      <div className="overflow-x-auto h-full">
        <DndContext onDragEnd={handleDragEnd}>
          <section className="flex space-x-4">
            {boards.map((board) => (
              <Board
                key={board.id}
                {...board}
                onDelete={() => handleDeleteBoard(board.id)}
                onUpdateTitle={(newTitle) =>
                  handleUpdateBoardTitle(board.id, newTitle)
                }
              />
            ))}
            <AddBoard handleAddBoard={handleAddBoard} />
          </section>
        </DndContext>
      </div>
    </main>
  );
};

export default Home;
