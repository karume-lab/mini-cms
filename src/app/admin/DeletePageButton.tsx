"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deletePage } from "./actions";

export function DeletePageButton({ id, title }: { id: number; title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete the page "${title}"? This cannot be undone.`,
      )
    ) {
      startTransition(() => {
        deletePage(id);
      });
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
