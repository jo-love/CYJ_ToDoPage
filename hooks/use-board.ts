import { useState, useEffect } from "react";
import { Board as BoardType } from "@/types/boards";
import { INITIAL_BOARDS } from "@/lib/constants/boards";
import { v4 as uuidv4 } from "uuid";

export const useBoard = () => {
  const [boards, setBoards] = useState<BoardType[]>(INITIAL_BOARDS);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
      setBoards(JSON.parse(savedBoards));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("boards", JSON.stringify(boards));
    }
  }, [boards, isClient]);

  const handleAddBoard = (newBoard: { id: string; title: string }) => {
    setBoards([...boards, newBoard]);
  };

  const handleUpdateBoard = (boardId: string, newTitle: string) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId ? { ...board, title: newTitle } : board,
      ),
    );
  };

  const handleDeleteBoard = (boardId: string) => {
    setBoards(boards.filter((board) => board.id !== boardId));
  };

  const handleAddCard = (boardId: string, cardTitle: string) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            cards: [
              ...(board.cards || []),
              { id: uuidv4(), content: cardTitle },
            ],
          };
        }
        return board;
      }),
    );
  };

  const handleUpdateCard = (
    boardId: string,
    cardId: string,
    content: string,
  ) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            cards: board.cards?.map((card) =>
              card.id === cardId ? { ...card, content } : card,
            ),
          };
        }
        return board;
      }),
    );
  };

  const handleDeleteCard = (boardId: string, cardId: string) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            cards: board.cards?.filter((card) => card.id !== cardId),
          };
        }
        return board;
      }),
    );
  };

  return {
    boards,
    setBoards,
    handleAddBoard,
    handleUpdateBoard,
    handleDeleteBoard,
    handleAddCard,
    handleUpdateCard,
    handleDeleteCard,
  };
};
