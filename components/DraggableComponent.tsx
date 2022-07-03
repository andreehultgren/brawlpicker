import { useEffect } from "react";
import { useDrag } from "react-dnd";

export default function Draggable({ children, type, onPickup }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  }));
  useEffect(() => {
    if (!!isDragging) {
      onPickup();
    }
  }, [isDragging, onPickup]);

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="draggable"
    >
      {children}
    </div>
  );
}
