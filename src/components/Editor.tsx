"use client";

import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { customBlockSpecs } from "./blocks/customBlocks";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    ...customBlockSpecs,
  },
});

interface EditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
  templates?: any[]; // Array of customBlockTemplates
}

export default function Editor({ initialContent, onChange, templates = [] }: EditorProps) {
  // Parse initial content if available
  const initialBlocks = initialContent ? JSON.parse(initialContent) : undefined;

  const editor = useCreateBlockNote({
    schema,
    initialContent: initialBlocks,
  });

  const templateMenuItems = templates.map((template) => ({
    title: template.name,
    onItemClick: () => {
      editor.insertBlocks(
        [{
          type: "dynamicTemplate",
          props: {
            templateJson: template.templateJson,
            overrides: "{}"
          }
        }],
        editor.getTextCursorPosition().block,
        "after",
      );
    },
    group: "Custom Blocks",
    icon: <span>🧩</span>,
  }));

  return (
    <div className="border rounded-md bg-background">
      <BlockNoteView
        editor={editor}
        slashMenu={false}
        theme="light"
        onChange={() => {
          onChange(JSON.stringify(editor.document));
        }}
        className="min-h-100 p-4"
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(
              [
                ...getDefaultReactSlashMenuItems(editor),
                ...templateMenuItems,
                {
                  title: "Hero Banner",
                  onItemClick: () => {
                    editor.insertBlocks(
                      [{ type: "hero" }],
                      editor.getTextCursorPosition().block,
                      "after",
                    );
                  },
                  group: "ICT Components",
                  icon: <span>🦸</span>,
                },
                {
                  title: "News Section",
                  onItemClick: () => {
                    editor.insertBlocks(
                      [{ type: "newsSection" }],
                      editor.getTextCursorPosition().block,
                      "after",
                    );
                  },
                  group: "ICT Components",
                  icon: <span>📰</span>,
                },
                {
                  title: "Mission Statement",
                  onItemClick: () => {
                    editor.insertBlocks(
                      [{ type: "missionSection" }],
                      editor.getTextCursorPosition().block,
                      "after",
                    );
                  },
                  group: "ICT Components",
                  icon: <span>🎯</span>,
                },
                {
                  title: "Departments Grid",
                  onItemClick: () => {
                    editor.insertBlocks(
                      [{ type: "departmentsSection" }],
                      editor.getTextCursorPosition().block,
                      "after",
                    );
                  },
                  group: "ICT Components",
                  icon: <span>🏢</span>,
                },
                {
                  title: "Card Centre Services",
                  onItemClick: () => {
                    editor.insertBlocks(
                      [{ type: "cardCentre" }],
                      editor.getTextCursorPosition().block,
                      "after",
                    );
                  },
                  group: "ICT Components",
                  icon: <span>💳</span>,
                },
                {
                  title: "Apply CTA",
                  onItemClick: () => {
                    editor.insertBlocks(
                      [{ type: "applyCTA" }],
                      editor.getTextCursorPosition().block,
                      "after",
                    );
                  },
                  group: "ICT Components",
                  icon: <span>🚀</span>,
                },
              ],
              query,
            )
          }
        />
      </BlockNoteView>
    </div>
  );
}
