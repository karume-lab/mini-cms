"use client";
import {
  ArrowLeft,
  Building2,
  FileText,
  FolderOpen,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ShareDialog } from "@/components/ShareDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Page = {
  id: string | number;
  title: string;
  slug: string;
  type: string;
};

type DirectorateWithPages = {
  id: string;
  name: string;
  slug: string;
  description: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  leadershipName?: string | null;
  leadershipTitle?: string | null;
  pages: Page[];
};

const PAGE_TYPE_ICONS: Record<string, typeof FileText> = {
  about: LayoutGrid,
  staff: UserCheck,
  downloads: FolderOpen,
  "notice-board": FileText,
  contact: Mail,
  projects: LayoutGrid,
  custom: FileText,
};

interface DirectorateDetailLayoutProps {
  directorate: DirectorateWithPages;
  activePageSlug?: string;
  children: ReactNode;
}

export const DirectorateDetailLayout = ({
  directorate,
  activePageSlug,
  children,
}: DirectorateDetailLayoutProps) => {
  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="bg-muted/40 border-b py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <Link
            href="/about/directorates"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Directorates
          </Link>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {directorate.name}
            </h1>
            <ShareDialog
              url={`https://www.jkuat.ac.ke/about/directorates/${directorate.slug}`}
              title={directorate.name}
              description={directorate.description}
            />
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {directorate.description}
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          {/* Navigation */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary" />
                Navigation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="divide-y">
                {directorate.pages.map((page) => {
                  const Icon = PAGE_TYPE_ICONS[page.type] || FileText;
                  const isActive = activePageSlug === page.slug;
                  return (
                    <Link
                      key={page.id}
                      href={`/about/directorates/${directorate.slug}/${page.slug}`}
                      className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors hover:bg-muted/50 ${
                        isActive
                          ? "bg-primary/5 text-primary font-medium border-r-2 border-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {page.title}
                    </Link>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Contact Info */}
          {(directorate.email || directorate.phone || directorate.location) && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {directorate.leadershipName && (
                  <div className="flex items-start gap-3">
                    <UserCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">
                        {directorate.leadershipName}
                      </p>
                      <p className="text-muted-foreground">
                        {directorate.leadershipTitle}
                      </p>
                    </div>
                  </div>
                )}
                {directorate.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{directorate.location}</span>
                  </div>
                )}
                {directorate.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <a
                      href={`mailto:${directorate.email}`}
                      className="hover:underline text-primary"
                    >
                      {directorate.email}
                    </a>
                  </div>
                )}
                {directorate.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <span>{directorate.phone}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="space-y-2 pt-2">
            <Separator />
            <ShareDialog
              url={`https://www.jkuat.ac.ke/about/directorates/${directorate.slug}`}
              title={directorate.name}
              description={directorate.description}
              showLabel
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">{children}</div>
      </div>
    </div>
  );
};
