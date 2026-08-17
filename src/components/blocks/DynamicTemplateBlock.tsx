"use client";

import { createReactBlockSpec } from "@blocknote/react";
import { BuilderElement } from "@/components/admin/block-builder/types";
import { RenderTree } from "./DynamicTemplateTree";

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
      } catch {
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
