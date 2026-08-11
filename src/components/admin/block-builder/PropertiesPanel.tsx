"use client";

import { BuilderElement } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function PropertiesPanel({ node, onChange }: { node: BuilderElement; onChange: (props: Record<string, any>) => void }) {
  const { props, type } = node;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{type} Properties</h3>
        <p className="text-xs text-muted-foreground">ID: {node.id}</p>
      </div>

      <div className="space-y-4">
        {type === "Grid" && (
          <>
            <div className="space-y-2">
              <Label>Columns</Label>
              <Input type="number" min={1} max={12} value={props.columns || 2} onChange={(e) => onChange({ columns: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Gap (rem units / 4)</Label>
              <Input type="number" min={0} value={props.gap || 4} onChange={(e) => onChange({ gap: Number(e.target.value) })} />
            </div>
          </>
        )}

        {type === "Flex" && (
          <>
            <div className="space-y-2">
              <Label>Direction</Label>
              <Select value={props.direction || "col"} onValueChange={(v) => onChange({ direction: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="col">Column</SelectItem>
                  <SelectItem value="row">Row</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Align Items</Label>
              <Select value={props.align || "start"} onValueChange={(v) => onChange({ align: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                  <SelectItem value="stretch">Stretch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Gap</Label>
              <Input type="number" min={0} value={props.gap || 4} onChange={(e) => onChange({ gap: Number(e.target.value) })} />
            </div>
          </>
        )}

        {type === "Text" && (
          <>
            <div className="space-y-2">
              <Label>Identifier (ID)</Label>
              <Input value={props.id || ""} onChange={(e) => onChange({ id: e.target.value })} placeholder="hero-title" />
              <p className="text-xs text-muted-foreground">Used for storing overrides.</p>
            </div>
            <div className="space-y-2">
              <Label>HTML Tag</Label>
              <Select value={props.variant || "p"} onValueChange={(v) => onChange({ variant: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">Heading 1</SelectItem>
                  <SelectItem value="h2">Heading 2</SelectItem>
                  <SelectItem value="h3">Heading 3</SelectItem>
                  <SelectItem value="p">Paragraph</SelectItem>
                  <SelectItem value="span">Span</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Default Text</Label>
              <Textarea value={props.content || ""} onChange={(e) => onChange({ content: e.target.value })} />
            </div>
          </>
        )}

        {type === "Button" && (
          <>
            <div className="space-y-2">
              <Label>Label</Label>
              <Input value={props.label || ""} onChange={(e) => onChange({ label: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Link (href)</Label>
              <Input value={props.href || ""} onChange={(e) => onChange({ href: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Variant</Label>
              <Select value={props.variant || "default"} onValueChange={(v) => onChange({ variant: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Size</Label>
              <Select value={props.size || "default"} onValueChange={(v) => onChange({ size: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {type === "Anchor" && (
          <>
            <div className="space-y-2">
              <Label>Label</Label>
              <Input value={props.label || ""} onChange={(e) => onChange({ label: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Link (href)</Label>
              <Input value={props.href || ""} onChange={(e) => onChange({ href: e.target.value })} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
