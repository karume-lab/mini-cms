import { Type, LayoutGrid, Type as TextIcon, AlignLeft, MousePointerClick, Link as LinkIcon } from "lucide-react";
import { ElementType } from "./types";

export const PRIMITIVES: { type: ElementType; label: string; icon: React.ElementType; defaultProps: Record<string, any> }[] = [
  {
    type: "Grid",
    label: "Grid Layout",
    icon: LayoutGrid,
    defaultProps: { columns: 2, gap: 4 },
  },
  {
    type: "Flex",
    label: "Flex Box",
    icon: AlignLeft,
    defaultProps: { direction: "col", gap: 4, align: "start", justify: "start" },
  },
  {
    type: "Text",
    label: "Text Block",
    icon: TextIcon,
    defaultProps: { id: "text-1", content: "Double-click to edit text...", variant: "p" },
  },
  {
    type: "Button",
    label: "Button",
    icon: MousePointerClick,
    defaultProps: { label: "Click Me", variant: "default", size: "default", href: "#" },
  },
  {
    type: "Anchor",
    label: "Link",
    icon: LinkIcon,
    defaultProps: { label: "Learn more", href: "#" },
  },
];
