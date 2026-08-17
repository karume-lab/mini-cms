import React from "react";
import { DynamicTemplateRenderer } from "./blocks/DynamicTemplateRenderer";
import { getSiteSetting, getDepartments, getCardCentreServices, getCardCentreReplacements, getNews, getHeroSlides } from "@/actions/content";
import Hero from "@/components/directorates/ict/Hero";
import MissionSection from "@/components/directorates/ict/MissionStatement";
import ApplyCTA from "@/components/directorates/ict/ApplyCta";
import DepartmentsSection from "@/components/directorates/ict/DepartmentsSection";
import CardCentre from "@/components/directorates/ict/CardCentre";
import NewsSection from "@/components/directorates/ict/NewsSection";
import DepartmentsListPage from "@/components/directorates/ict/DepartmentsListPage";
import NewsListPage from "@/components/directorates/ict/NewsListPage";

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

export interface Block {
  id: string;
  type: string;
  props: Record<string, string | number | boolean | undefined>;
  content: BlockNoteContent[];
  children: Block[];
}

interface BlockRendererProps {
  content: string;
}

type AppData = {
  heroSlides: Awaited<ReturnType<typeof getHeroSlides>>;
  missionText: string | null;
  applyTitle: string | null;
  applyDescription: string | null;
  departments: Awaited<ReturnType<typeof getDepartments>>;
  cardServices: Awaited<ReturnType<typeof getCardCentreServices>>;
  cardReplacements: Awaited<ReturnType<typeof getCardCentreReplacements>>;
  news: Awaited<ReturnType<typeof getNews>>;
};

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
      if (c.styles.backgroundColor) {
        text = (
          <mark key={k} style={{ backgroundColor: c.styles.backgroundColor }}>
            {text}
          </mark>
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

const renderBlock = (block: Block, data: AppData) => {
  if (block.type === "dynamicTemplate") {
    return <DynamicTemplateRenderer key={block.id} block={block} />;
  }

  switch (block.type) {
    case "hero":
      return <Hero key={block.id} initialSlides={data.heroSlides} />;
    case "missionSection":
      return <MissionSection key={block.id} initialMissionText={data.missionText} />;
    case "applyCTA":
      return <ApplyCTA key={block.id} initialTitle={data.applyTitle} initialDescription={data.applyDescription} />;
    case "departmentsSection":
      return <DepartmentsSection key={block.id} initialDepartments={data.departments} />;
    case "departmentsListPage":
      return <DepartmentsListPage key={block.id} initialDepartments={data.departments} />;
    case "cardCentre":
      return <CardCentre key={block.id} initialServices={data.cardServices} initialReplacements={data.cardReplacements} />;
    case "newsSection":
      return <NewsSection key={block.id} initialNews={data.news} />;
    case "newsListPage":
      return <NewsListPage key={block.id} initialNews={data.news} />;

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
          {block.children?.length > 0 && (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {block.children.map((child) => renderBlock(child, data))}
            </ul>
          )}
        </li>
      );

    case "numberedListItem":
      return (
        <li key={block.id} className="mt-2">
          {renderInlineContent(block.content)}
          {block.children?.length > 0 && (
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
              {block.children.map((child) => renderBlock(child, data))}
            </ol>
          )}
        </li>
      );

    case "checkListItem":
      return (
        <li key={block.id} className="mt-2 flex items-start gap-2">
          <input
            type="checkbox"
            checked={block.props.checked as boolean}
            readOnly
            className="mt-1 accent-primary"
          />
          <span>{renderInlineContent(block.content)}</span>
        </li>
      );

    case "toggleListItem":
      return (
        <details key={block.id} className="mt-2 group">
          <summary className="cursor-pointer font-medium list-none [&::marker]:text-muted-foreground">
            {renderInlineContent(block.content)}
          </summary>
          {block.children?.length > 0 && (
            <div className="ml-6 mt-2">
              {block.children.map((child) => renderBlock(child, data))}
            </div>
          )}
        </details>
      );

    case "image":
      return (
        <figure key={block.id} className="my-6">
          <img
            src={block.props.url as string}
            alt={(block.props.caption as string) || ""}
            className="rounded-lg border w-full object-cover"
          />
          {block.props.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {block.props.caption as string}
            </figcaption>
          )}
        </figure>
      );

    case "table": {
      const rows = block.children || [];
      return (
        <div key={block.id} className="my-6 overflow-x-auto">
          <table className="w-full border-collapse border">
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.children?.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border px-4 py-2"
                    >
                      {renderInlineContent(cell.content)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "codeBlock":
      return (
        <pre
          key={block.id}
          className="my-6 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm"
        >
          <code>{(block.content as unknown as TextContent[])?.map(c => c.type === "text" ? c.text : "").join("")}</code>
        </pre>
      );

    case "blockquote":
      return (
        <blockquote
          key={block.id}
          className="my-6 border-l-4 border-border pl-6 text-muted-foreground italic"
        >
          {renderInlineContent(block.content)}
        </blockquote>
      );

    case "hr":
      return <hr key={block.id} className="my-8 border-border" />;

    default:
      console.warn(`Unsupported block type: ${block.type}`);
      return null;
  }
};

export default async function BlockRenderer({ content }: BlockRendererProps) {
  if (!content) return null;

  let blocks: Block[] = [];
  try {
    blocks = JSON.parse(content);
  } catch (e) {
    console.error("Failed to parse block content", e);
    return null;
  }

  const blockTypes = new Set(blocks.map((b) => b.type));
  const needs = {
    hero: blockTypes.has("hero"),
    mission: blockTypes.has("missionSection"),
    apply: blockTypes.has("applyCTA"),
    depts: blockTypes.has("departmentsSection") || blockTypes.has("departmentsListPage"),
    card: blockTypes.has("cardCentre"),
    news: blockTypes.has("newsSection") || blockTypes.has("newsListPage"),
  };

  const [heroSlides, missionText, applyTitle, applyDescription, departments, cardServices, cardReplacements, news] =
    await Promise.all([
      needs.hero ? getHeroSlides() : [],
      needs.mission ? getSiteSetting("mission_statement") : null,
      needs.apply ? getSiteSetting("apply_cta_title") : null,
      needs.apply ? getSiteSetting("apply_cta_description") : null,
      needs.depts ? getDepartments() : [],
      needs.card ? getCardCentreServices() : [],
      needs.card ? getCardCentreReplacements() : [],
      needs.news ? getNews() : [],
    ]);

  const data: AppData = { heroSlides, missionText, applyTitle, applyDescription, departments, cardServices, cardReplacements, news };

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

      currentList.items.push(renderBlock(block, data));
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

      renderedBlocks.push(
        <React.Fragment key={block.id || `block-${i}`}>
          {renderBlock(block, data)}
        </React.Fragment>,
      );
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
