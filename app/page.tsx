"use client";

import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Board } from "@/components/boards/board";
import { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import AddBoard from "@/components/boards/add-board";
import { Board as BoardType, Card as CardType } from "@/types/boards";
import { createPortal } from "react-dom";
import CardItem from "@/components/cards/card-item";
import { useBoard } from "@/hooks/use-board";

const Home = () => {
  const {
    boards,
    setBoards,
    handleAddBoard,
    handleUpdateBoard,
    handleDeleteBoard,
    handleAddCard,
    handleUpdateCard,
    handleDeleteCard,
  } = useBoard();

  const [activeBoard, setActiveBoard] = useState<BoardType | null>(null);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const boardsId = boards.map((board: BoardType) => board.id);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // px
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === "board") {
      return setActiveBoard(active.data.current.board);
    }

    if (active.data.current?.type === "card") {
      return setActiveCard(active.data.current.card);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveBoard(null);
    setActiveCard(null);

    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    setBoards((boards) => {
      const activeBoardId = boards.findIndex((board) => board.id === active.id);
      const overBoardId = boards.findIndex((board) => board.id === over.id);

      return arrayMove(boards, activeBoardId, overBoardId);
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const isActiveCard = active.data.current?.type === "card";
    const isOverCard = over.data.current?.type === "card";

    const isOverBoard =
      over.data.current?.type === "board" ||
      (over.data.current?.sortable?.containerId && !isOverCard);

    if (!isActiveCard) return;

    // 같은 보드 내에서 카드 이동
    if (isActiveCard && isOverCard) {
      setBoards((boards) => {
        const activeBoardIndex = boards.findIndex((board) =>
          board.cards?.some((card) => card.id === active.id),
        );

        const overBoardIndex = boards.findIndex((board) =>
          board.cards?.some((card) => card.id === over.id),
        );

        if (activeBoardIndex === overBoardIndex) {
          const board = boards[activeBoardIndex];
          const activeCardIndex =
            board.cards?.findIndex((card) => card.id === active.id) ?? -1;
          const overCardIndex =
            board.cards?.findIndex((card) => card.id === over.id) ?? -1;

          const newBoards = [...boards];
          newBoards[activeBoardIndex] = {
            ...board,
            cards: arrayMove(board.cards || [], activeCardIndex, overCardIndex),
          };

          return newBoards;
        }

        return boards;
      });
    }

    // 카드를 다른 보드로 이동하는 경우
    if (isActiveCard && isOverBoard) {
      setBoards((boards) => {
        const activeBoardIndex = boards.findIndex((board) =>
          board.cards?.some((card) => card.id === active.id),
        );

        const overBoardIndex = boards.findIndex(
          (board) => board.id === over.id,
        );

        if (activeBoardIndex !== overBoardIndex) {
          const activeBoard = boards[activeBoardIndex];
          const overBoard = boards[overBoardIndex];
          const activeCard = activeBoard.cards?.find(
            (card) => card.id === active.id,
          );

          if (!activeCard) return boards;

          const newBoards = [...boards];

          newBoards[activeBoardIndex] = {
            ...activeBoard,
            cards: activeBoard.cards?.filter((card) => card.id !== active.id),
          };

          const overCardId = over.data.current?.sortable?.items?.[0];
          const overCardIndex =
            overBoard.cards?.findIndex((card) => card.id === overCardId) ?? 0;

          newBoards[overBoardIndex] = {
            ...overBoard,
            cards: [
              ...(overBoard.cards || []).slice(0, overCardIndex),
              activeCard,
              ...(overBoard.cards || []).slice(overCardIndex),
            ],
          };

          return newBoards;
        }

        return boards;
      });
    }
  };

  return (
    <main className="p-4 h-screen">
      <div className="overflow-x-auto h-full">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <section className="flex items-start space-x-4">
            <SortableContext items={boardsId}>
              {boards.map((board) => (
                <Board
                  key={board.id}
                  board={board}
                  onDelete={() => handleDeleteBoard(board.id)}
                  onUpdateTitle={(newTitle) =>
                    handleUpdateBoard(board.id, newTitle)
                  }
                  onAddCard={(cardTitle) => handleAddCard(board.id, cardTitle)}
                  onUpdateCard={(cardId, content) =>
                    handleUpdateCard(board.id, cardId, content)
                  }
                  onDeleteCard={(cardId) => handleDeleteCard(board.id, cardId)}
                />
              ))}
            </SortableContext>
            <AddBoard handleAddBoard={handleAddBoard} />
          </section>
          {createPortal(
            <DragOverlay>
              {activeBoard && (
                <Board
                  board={activeBoard}
                  onDelete={() => {}}
                  onUpdateTitle={() => {}}
                  onAddCard={() => {}}
                  onUpdateCard={() => {}}
                  onDeleteCard={() => {}}
                />
              )}
              {activeCard && (
                <CardItem
                  card={activeCard}
                  onDelete={() => {}}
                  onUpdate={() => {}}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </div>
    </main>
  );
};

export default Home;
