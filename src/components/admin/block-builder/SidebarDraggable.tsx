"use client";

import { useDraggable } from "@dnd-kit/core";
import { PRIMITIVES } from "./primitives";

export function SidebarDraggable({ primitive }: { primitive: typeof PRIMITIVES[0] }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: primitive.type,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex flex-col items-center justify-center rounded-lg border bg-background p-4 text-center hover:border-primary cursor-grab active:cursor-grabbing transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <primitive.icon className="mb-2 h-6 w-6 text-muted-foreground" />
      <span className="text-xs font-medium text-foreground">{primitive.label}</span>
    </div>
  );
}
