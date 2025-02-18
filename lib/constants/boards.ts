import { Board } from "@/types/boards";
import { v4 as uuidv4 } from "uuid";

export const INITIAL_BOARDS: Board[] = [
  { id: uuidv4(), title: "To-Do" },
  { id: uuidv4(), title: "DONE" },
];
