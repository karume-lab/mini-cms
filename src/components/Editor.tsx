"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

interface EditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export default function Editor({ initialContent, onChange }: EditorProps) {
  // Parse initial content if available
  const initialBlocks = initialContent ? JSON.parse(initialContent) : undefined;

  const editor = useCreateBlockNote({
    initialContent: initialBlocks,
  });

  return (
    <div className="border rounded-md bg-background">
      <BlockNoteView
        editor={editor}
        onChange={() => {
          onChange(JSON.stringify(editor.document));
        }}
        className="min-h-100 p-4"
      />
    </div>
  );
}
