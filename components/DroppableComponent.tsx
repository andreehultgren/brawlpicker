import React, { useEffect } from "react";
import { useDrop } from "react-dnd";

export default function DroppableComponent({ children, accept, onDrop }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept,
      drop: () => onDrop(),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [onDrop]
  );

  return <div ref={drop}>{children}</div>;
}
