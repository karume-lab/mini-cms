import { BuilderElement } from "@/components/admin/block-builder/types";
import { RenderTree } from "./DynamicTemplateTree";

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
