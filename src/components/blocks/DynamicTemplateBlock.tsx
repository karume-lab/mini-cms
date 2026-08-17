import { createReactBlockSpec } from "@blocknote/react";
import { useState, useEffect } from "react";
import { BuilderElement } from "@/components/admin/block-builder/types";
import { Button } from "@/components/ui/button";

function InlineEditText({ 
  node, 
  overrides, 
  onChange 
}: { 
  node: BuilderElement; 
  overrides: Record<string, string>;
  onChange: (id: string, val: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const textId = node.props.id || node.id;
  const content = overrides[textId] ?? node.props.content;
  const [tempValue, setTempValue] = useState(content);

  const Tag = (node.props.variant || "p") as any;

  if (isEditing) {
    return (
      <input
        autoFocus
        className="w-full bg-transparent outline-none ring-2 ring-primary border-none p-1 rounded font-inherit text-inherit"
        value={tempValue}
        onChange={e => setTempValue(e.target.value)}
        onBlur={() => {
          setIsEditing(false);
          onChange(textId, tempValue);
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            setIsEditing(false);
            onChange(textId, tempValue);
          }
        }}
      />
    );
  }

  return (
    <Tag 
      id={textId} 
      className="prose dark:prose-invert hover:ring-2 hover:ring-primary/50 hover:cursor-text rounded p-1 -m-1 transition-all"
      onDoubleClick={() => setIsEditing(true)}
    >
      {content}
    </Tag>
  );
}

function RenderTree({ 
  node, 
  overrides, 
  onChange 
}: { 
  node: BuilderElement; 
  overrides: Record<string, string>;
  onChange: (id: string, val: string) => void;
}) {
  const renderChildren = () => (
    <>
      {node.children.map(child => (
        <RenderTree key={child.id} node={child} overrides={overrides} onChange={onChange} />
      ))}
    </>
  );

  if (node.type === "Root") {
    return <div className="w-full">{renderChildren()}</div>;
  }

  if (node.type === "Grid") {
    const cols = node.props.columns || 2;
    const gap = node.props.gap || 4;
    return (
      <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: `${gap * 0.25}rem` }}>
        {renderChildren()}
      </div>
    );
  }

  if (node.type === "Flex") {
    const dir = node.props.direction === "col" ? "flex-col" : "flex-row";
    const gap = node.props.gap || 4;
    const alignMap: any = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" };
    const justifyMap: any = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" };
    return (
      <div className={`flex w-full ${dir} ${alignMap[node.props.align]} ${justifyMap[node.props.justify]}`} style={{ gap: `${gap * 0.25}rem` }}>
        {renderChildren()}
      </div>
    );
  }

  if (node.type === "Text") {
    return <InlineEditText node={node} overrides={overrides} onChange={onChange} />;
  }

  if (node.type === "Button") {
    return (
      <Button variant={node.props.variant} size={node.props.size}>
        {node.props.label}
      </Button>
    );
  }

  if (node.type === "Anchor") {
    return (
      <a href={node.props.href} className="text-primary underline hover:text-primary/80">
        {node.props.label}
      </a>
    );
  }

  return null;
}

export const DynamicTemplateBlock = createReactBlockSpec(
  {
    type: "dynamicTemplate",
    propSchema: {
      templateJson: { default: "" },
      overrides: { default: "{}" },
    },
    content: "none",
  },
  {
    render: (props) => {
      if (!props.block.props.templateJson) {
        return <div className="p-4 border border-dashed rounded bg-muted/20 text-muted-foreground text-sm">Empty Template</div>;
      }

      let tree: BuilderElement | null = null;
      let overrides: Record<string, string> = {};
      try {
        tree = JSON.parse(props.block.props.templateJson);
        overrides = JSON.parse(props.block.props.overrides);
      } catch (e) {
        return <div className="p-4 border border-red-500 rounded bg-red-50 text-red-500">Error parsing template</div>;
      }

      if (!tree) return null;

      const handleOverrideChange = (id: string, val: string) => {
        const newOverrides = { ...overrides, [id]: val };
        props.editor.updateBlock(props.block, {
          type: "dynamicTemplate",
          props: {
            ...props.block.props,
            overrides: JSON.stringify(newOverrides),
          }
        });
      };

      return (
        <div contentEditable={false} className="w-full my-4 select-none">
          <RenderTree node={tree} overrides={overrides} onChange={handleOverrideChange} />
        </div>
      );
    },
  },
);

export function DynamicTemplateRenderer({ block }: { block: { props: Record<string, unknown> } }) {
  if (!block.props.templateJson) {
    return null;
  }

  let tree: BuilderElement | null = null;
  let overrides: Record<string, string> = {};
  try {
    tree = JSON.parse(block.props.templateJson as string);
    overrides = JSON.parse((block.props.overrides as string) || "{}");
  } catch {
    return null;
  }

  if (!tree) return null;

  return (
    <div className="w-full my-4">
      <RenderTree node={tree} overrides={overrides} onChange={() => {}} />
    </div>
  );
}
