"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useCallback, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface ShareDialogProps {
  url: string;
  title: string;
  description?: string;
  showLabel?: boolean;
}

const SOCIAL_LINKS = (url: string, title: string, description?: string) => [
  {
    network: "x",
    name: "X (Twitter)",
    href: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    network: "linkedin",
    name: "LinkedIn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    network: "facebook",
    name: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    network: "whatsapp",
    name: "WhatsApp",
    href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    network: "email",
    name: "Email",
    href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || url)}`,
  },
];

export const ShareDialog = ({
  url,
  title,
  description,
  showLabel,
}: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const fullUrl =
    typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  }, [fullUrl]);

  const handleNativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, text: description, url: fullUrl });
      setOpen(false);
    } catch {
      // user cancelled or API unavailable
    }
  }, [fullUrl, title, description]);

  const canNativeShare = typeof window !== "undefined" && !!navigator.share;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={showLabel ? "default" : "icon"}
          aria-label="Share"
        >
          <Share2 className={showLabel ? "mr-2 h-4 w-4" : "h-4 w-4"} />
          {showLabel && "Share"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share this page with your network.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <Input
            readOnly
            value={fullUrl}
            className="flex-1"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator />

        <div className="flex flex-wrap items-center gap-2">
          {SOCIAL_LINKS(fullUrl, title, description).map((s) => (
            <SocialIcon
              key={s.name}
              network={s.network}
              url={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: 40, width: 40 }}
            />
          ))}
        </div>

        {canNativeShare && (
          <>
            <Separator />
            <Button
              variant="secondary"
              onClick={handleNativeShare}
              className="w-full"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share via OS
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
