"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { updatePage } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

interface EditFormProps {
  page: {
    id: number;
    title: string;
    slug: string;
    content: string;
  };
}

export default function EditForm({ page }: EditFormProps) {
  const [content, setContent] = useState(page.content);
  const [title, setTitle] = useState(page.title);
  const [isPending, setIsPending] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    import("@/components/admin/block-builder/actions").then(({ getTemplates }) => {
      getTemplates().then(setTemplates);
    });
  }, []);

  const handleSave = async () => {
    if (!title) return;
    setIsPending(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    try {
      await updatePage(page.id, formData);
    } catch (e) {
      console.error(e);
      setIsPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Details</CardTitle>
        <CardDescription>
          Update the title and content for your page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Editing the title will update the URL slug. Current slug: /
              {page.slug}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Editor initialContent={page.content} onChange={setContent} templates={templates} />
          </div>

          <Button onClick={handleSave} disabled={isPending || !title}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
