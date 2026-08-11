"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { createPage } from "@/app/admin/actions";
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

export default function NewPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSave = async () => {
    if (!title) return;
    setIsPending(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    try {
      await createPage(formData);
    } catch (e) {
      console.error(e);
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Create New Page</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
          <CardDescription>
            Enter the title and content for your new page.
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
                placeholder="e.g. Company History"
                required
              />
              <p className="text-sm text-muted-foreground">
                The URL slug will be automatically generated from the title.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Editor onChange={setContent} />
            </div>

            <Button onClick={handleSave} disabled={isPending || !title}>
              {isPending ? "Publishing..." : "Publish Page"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
