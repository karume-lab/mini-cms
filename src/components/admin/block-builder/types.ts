export type ElementType = "Grid" | "Flex" | "Button" | "Text" | "Anchor" | "Root";

export interface BuilderElement {
  id: string;
  type: ElementType;
  props: Record<string, any>;
  children: BuilderElement[];
}

export const INITIAL_TREE: BuilderElement = {
  id: "root",
  type: "Root",
  props: {},
  children: [],
};
