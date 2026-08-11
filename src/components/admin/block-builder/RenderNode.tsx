"use client";

import { useDroppable } from "@dnd-kit/core";
import { BuilderElement } from "./types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

interface RenderNodeProps {
  node: BuilderElement;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isPreview?: boolean;
}

export function RenderNode({ node, selectedId, onSelect, onDelete, isPreview = false }: RenderNodeProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: node.id,
    disabled: isPreview || node.type === "Text" || node.type === "Button" || node.type === "Anchor",
  });

  const isSelected = selectedId === node.id;

  const handleClick = (e: React.MouseEvent) => {
    if (isPreview) return;
    e.stopPropagation();
    onSelect(node.id);
  };

  const renderChildren = () => (
    <>
      {node.children.map((child) => (
        <RenderNode 
          key={child.id} 
          node={child} 
          selectedId={selectedId} 
          onSelect={onSelect} 
          onDelete={onDelete}
          isPreview={isPreview}
        />
      ))}
      {!isPreview && node.children.length === 0 && (node.type === "Root" || node.type === "Grid" || node.type === "Flex") && (
        <div className="flex h-20 items-center justify-center rounded border-2 border-dashed border-muted-foreground/20 bg-muted/10 text-xs text-muted-foreground">
          Drag blocks here
        </div>
      )}
    </>
  );

  const wrapperClass = isPreview
    ? ""
    : `relative border-2 ${isSelected ? "border-primary" : isOver ? "border-blue-400 bg-blue-50/50" : "border-transparent hover:border-muted-foreground/30"} transition-colors ${node.type === 'Root' ? 'p-4 min-h-[400px]' : 'p-2'}`;

  const Controls = () => {
    if (isPreview || !isSelected || node.type === "Root") return null;
    return (
      <div className="absolute -top-3 -right-3 z-10 flex gap-1">
        <Button size="icon-xs" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    );
  };

  if (node.type === "Root") {
    return (
      <div ref={setNodeRef} onClick={handleClick} className={wrapperClass}>
        <Controls />
        {renderChildren()}
      </div>
    );
  }

  if (node.type === "Grid") {
    const cols = node.props.columns || 2;
    const gap = node.props.gap || 4;
    return (
      <div ref={setNodeRef} onClick={handleClick} className={wrapperClass}>
        <Controls />
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: `${gap * 0.25}rem` }}>
          {renderChildren()}
        </div>
      </div>
    );
  }

  if (node.type === "Flex") {
    const dir = node.props.direction === "col" ? "flex-col" : "flex-row";
    const gap = node.props.gap || 4;
    const alignMap: any = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" };
    const justifyMap: any = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" };
    
    return (
      <div ref={setNodeRef} onClick={handleClick} className={wrapperClass}>
        <Controls />
        <div className={`flex ${dir} ${alignMap[node.props.align]} ${justifyMap[node.props.justify]}`} style={{ gap: `${gap * 0.25}rem` }}>
          {renderChildren()}
        </div>
      </div>
    );
  }

  if (node.type === "Text") {
    const Tag = (node.props.variant || "p") as any;
    return (
      <div ref={setNodeRef} onClick={handleClick} className={wrapperClass}>
        <Controls />
        <Tag id={node.props.id} className="prose dark:prose-invert">
          {node.props.content}
        </Tag>
      </div>
    );
  }

  if (node.type === "Button") {
    return (
      <div ref={setNodeRef} onClick={handleClick} className={wrapperClass}>
        <Controls />
        <Button variant={node.props.variant} size={node.props.size}>
          {node.props.label}
        </Button>
      </div>
    );
  }

  if (node.type === "Anchor") {
    return (
      <div ref={setNodeRef} onClick={handleClick} className={wrapperClass}>
        <Controls />
        <a href={node.props.href} className="text-primary underline hover:text-primary/80">
          {node.props.label}
        </a>
      </div>
    );
  }

  return null;
}
