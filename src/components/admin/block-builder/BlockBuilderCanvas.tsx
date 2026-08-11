"use client";

import { useState } from "react";
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { ElementType, BuilderElement, INITIAL_TREE } from "./types";
import { PRIMITIVES } from "./primitives";
import { SidebarDraggable } from "./SidebarDraggable";
import { RenderNode } from "./RenderNode";
import { PropertiesPanel } from "./PropertiesPanel";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { saveTemplate } from "./actions";

export default function BlockBuilderCanvas() {
  const [tree, setTree] = useState<BuilderElement>(INITIAL_TREE);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState("New Template");
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activePrimitive = PRIMITIVES.find(p => p.type === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { over, active } = event;
    
    if (!over) return;
    
    const parentId = over.id as string;
    const primitiveType = active.id as ElementType;
    
    const primitive = PRIMITIVES.find(p => p.type === primitiveType);
    if (!primitive) return;

    const newElement: BuilderElement = {
      id: `${primitiveType}-${Math.random().toString(36).substr(2, 9)}`,
      type: primitiveType,
      props: { ...primitive.defaultProps },
      children: [],
    };

    setTree(prevTree => insertNode(prevTree, parentId, newElement));
    setSelectedElementId(newElement.id);
  };

  const insertNode = (node: BuilderElement, parentId: string, newNode: BuilderElement): BuilderElement => {
    if (node.id === parentId) {
      return { ...node, children: [...node.children, newNode] };
    }
    return {
      ...node,
      children: node.children.map(child => insertNode(child, parentId, newNode))
    };
  };

  const updateNodeProps = (nodeId: string, newProps: Record<string, any>) => {
    setTree(prev => updateNodeRecursive(prev, nodeId, newProps));
  };

  const updateNodeRecursive = (node: BuilderElement, id: string, newProps: Record<string, any>): BuilderElement => {
    if (node.id === id) {
      return { ...node, props: { ...node.props, ...newProps } };
    }
    return {
      ...node,
      children: node.children.map(c => updateNodeRecursive(c, id, newProps))
    };
  };

  const deleteNode = (nodeId: string) => {
    setTree(prev => deleteNodeRecursive(prev, nodeId));
    if (selectedElementId === nodeId) setSelectedElementId(null);
  };

  const deleteNodeRecursive = (node: BuilderElement, id: string): BuilderElement => {
    return {
      ...node,
      children: node.children.filter(c => c.id !== id).map(c => deleteNodeRecursive(c, id))
    };
  };

  const getSelectedNode = (node: BuilderElement, id: string | null): BuilderElement | null => {
    if (!id) return null;
    if (node.id === id) return node;
    for (const child of node.children) {
      const found = getSelectedNode(child, id);
      if (found) return found;
    }
    return null;
  };

  const selectedNode = getSelectedNode(tree, selectedElementId);

  const handleSave = async () => {
    try {
      await saveTemplate(templateName, JSON.stringify(tree));
      toast.success("Template saved!");
    } catch (e) {
      toast.error("Failed to save template");
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-full divide-x">
        {/* Left Sidebar - Palette */}
        <div className="w-64 flex-shrink-0 bg-muted/30 p-4 overflow-y-auto space-y-6">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Blocks</h3>
            <div className="grid grid-cols-2 gap-2">
              {PRIMITIVES.map(prim => (
                <SidebarDraggable key={prim.type} primitive={prim} />
              ))}
            </div>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-zinc-950">
          <div className="flex items-center justify-between p-3 border-b bg-background">
            <Input 
              value={templateName} 
              onChange={e => setTemplateName(e.target.value)} 
              className="max-w-xs font-semibold"
            />
            <Button onClick={handleSave} size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-8">
            <div className="mx-auto max-w-4xl bg-background rounded-lg shadow-sm border min-h-[500px]">
              <RenderNode 
                node={tree} 
                selectedId={selectedElementId} 
                onSelect={setSelectedElementId}
                onDelete={deleteNode}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 flex-shrink-0 bg-muted/30 p-4 overflow-y-auto">
          {selectedNode ? (
            <PropertiesPanel node={selectedNode} onChange={(newProps) => updateNodeProps(selectedNode.id, newProps)} />
          ) : (
            <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
              Select an element on the canvas<br/>to edit its properties.
            </div>
          )}
        </div>
      </div>

      <DragOverlay>
        {activePrimitive ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-primary bg-background p-4 shadow-xl cursor-grabbing opacity-80">
            <activePrimitive.icon className="mb-2 h-8 w-8 text-primary" />
            <span className="text-xs font-medium">{activePrimitive.label}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
