import React from "react";

type Styles = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  code?: boolean;
  textColor?: string;
  backgroundColor?: string;
};

type TextContent = {
  type: "text";
  text: string;
  styles: Styles;
};

type LinkContent = {
  type: "link";
  href: string;
  content: BlockNoteContent[];
};

type BlockNoteContent = TextContent | LinkContent;

interface Block {
  id: string;
  type: string;
  props: Record<string, string | number | boolean | undefined>;
  content: BlockNoteContent[];
  children: Block[];
}

interface BlockRendererProps {
  content: string;
}

const renderInlineContent = (content: BlockNoteContent[]) => {
  if (!content) return null;
  return content.map((c, i) => {
    const k = `${c.type}-${i}`;
    if (c.type === "text") {
      let text: React.ReactNode = c.text;
      if (c.styles.bold) text = <strong key={k}>{text}</strong>;
      if (c.styles.italic) text = <em key={k}>{text}</em>;
      if (c.styles.underline) text = <u key={k}>{text}</u>;
      if (c.styles.strike) text = <s key={k}>{text}</s>;
      if (c.styles.code)
        text = (
          <code
            key={k}
            className="bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-sm"
          >
            {text}
          </code>
        );
      if (c.styles.textColor) {
        text = (
          <span key={k} style={{ color: c.styles.textColor }}>
            {text}
          </span>
        );
      }
      return <React.Fragment key={k}>{text}</React.Fragment>;
    }
    if (c.type === "link") {
      return (
        <a
          key={k}
          href={c.href}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {renderInlineContent(c.content)}
        </a>
      );
    }
    return null;
  });
};

const renderBlock = (block: Block) => {
  switch (block.type) {
    case "paragraph":
      if (!block.content || block.content.length === 0)
        return <br key={block.id} />;
      return (
        <p key={block.id} className="leading-7 not-first:mt-6">
          {renderInlineContent(block.content)}
        </p>
      );
    case "heading": {
      const level = block.props.level;
      if (level === 1) {
        return (
          <h1
            key={block.id}
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-12 mb-4"
          >
            {renderInlineContent(block.content)}
          </h1>
        );
      }
      if (level === 2) {
        return (
          <h2
            key={block.id}
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4"
          >
            {renderInlineContent(block.content)}
          </h2>
        );
      }
      if (level === 3) {
        return (
          <h3
            key={block.id}
            className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4"
          >
            {renderInlineContent(block.content)}
          </h3>
        );
      }
      return (
        <h4
          key={block.id}
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-4"
        >
          {renderInlineContent(block.content)}
        </h4>
      );
    }

    case "bulletListItem":
      return (
        <li key={block.id} className="mt-2">
          {renderInlineContent(block.content)}
          {block.children.length > 0 && (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {block.children.map(renderBlock)}
            </ul>
          )}
        </li>
      );

    case "numberedListItem":
      return (
        <li key={block.id} className="mt-2">
          {renderInlineContent(block.content)}
          {block.children.length > 0 && (
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
              {block.children.map(renderBlock)}
            </ol>
          )}
        </li>
      );

    default:
      console.warn(`Unsupported block type: ${block.type}`);
      return null;
  }
};

export default function BlockRenderer({ content }: BlockRendererProps) {
  if (!content) return null;

  let blocks: Block[] = [];
  try {
    blocks = JSON.parse(content);
  } catch (e) {
    console.error("Failed to parse block content", e);
    return null;
  }

  // Handle grouping lists together
  const renderedBlocks: React.ReactNode[] = [];
  let currentList: {
    type: "bullet" | "numbered";
    items: React.ReactNode[];
  } | null = null;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    if (block.type === "bulletListItem" || block.type === "numberedListItem") {
      const listType = block.type === "bulletListItem" ? "bullet" : "numbered";

      if (!currentList) {
        currentList = { type: listType, items: [] };
      } else if (currentList.type !== listType) {
        // Flush previous list
        if (currentList.type === "bullet") {
          renderedBlocks.push(
            <ul key={`ul-${i}`} className="my-6 ml-6 list-disc [&>li]:mt-2">
              {currentList.items}
            </ul>,
          );
        } else {
          renderedBlocks.push(
            <ol key={`ol-${i}`} className="my-6 ml-6 list-decimal [&>li]:mt-2">
              {currentList.items}
            </ol>,
          );
        }
        currentList = { type: listType, items: [] };
      }

      currentList.items.push(renderBlock(block));
    } else {
      // Flush current list if any
      if (currentList) {
        if (currentList.type === "bullet") {
          renderedBlocks.push(
            <ul key={`ul-${i}`} className="my-6 ml-6 list-disc [&>li]:mt-2">
              {currentList.items}
            </ul>,
          );
        } else {
          renderedBlocks.push(
            <ol key={`ol-${i}`} className="my-6 ml-6 list-decimal [&>li]:mt-2">
              {currentList.items}
            </ol>,
          );
        }
        currentList = null;
      }

      renderedBlocks.push(renderBlock(block));
    }
  }

  // Flush remaining list
  if (currentList) {
    if (currentList.type === "bullet") {
      renderedBlocks.push(
        <ul key="ul-end" className="my-6 ml-6 list-disc [&>li]:mt-2">
          {currentList.items}
        </ul>,
      );
    } else {
      renderedBlocks.push(
        <ol key="ol-end" className="my-6 ml-6 list-decimal [&>li]:mt-2">
          {currentList.items}
        </ol>,
      );
    }
  }

  return <>{renderedBlocks}</>;
}
