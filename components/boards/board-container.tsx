"use client";

import { DndContext, DndContextProps } from "@dnd-kit/core";
import { ReactNode } from "react";

interface BoardContainerProps extends DndContextProps {
  children: ReactNode;
}

const BoardContainer = ({ children, ...props }: BoardContainerProps) => {
  return <DndContext {...props}>{children}</DndContext>;
};

export default BoardContainer;
