import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import { DirectorateDetailLayout } from "@/components/directorates/DirectorateDetailLayout";
import { db } from "@/db";
import { directorates, pages } from "@/db/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const pageRecords = await db
    .select()
    .from(pages)
    .where(eq(pages.slug, resolvedParams.slug));

  if (pageRecords.length === 0) return {};

  const page = pageRecords[0];
  return {
    title: `${page.title} | JKUAT ICT`,
    description: page.title,
  };
}

export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const pageRecords = await db
    .select()
    .from(pages)
    .where(eq(pages.slug, resolvedParams.slug));

  if (pageRecords.length === 0) {
    notFound();
  }

  const page = pageRecords[0];

  let directorateData = null;
  if (page.directorateId) {
    const [dirRecords, dirPages] = await Promise.all([
      db.select().from(directorates).where(eq(directorates.id, page.directorateId)),
      db.select().from(pages).where(eq(pages.directorateId, page.directorateId)),
    ]);
    if (dirRecords.length > 0) {
      directorateData = {
        ...dirRecords[0],
        pages: dirPages,
      };
    }
  }

  if (directorateData) {
    return (
      <DirectorateDetailLayout
        directorate={directorateData}
        activePageSlug={page.slug}
      >
        <article className="max-w-none prose-links:text-primary">
          <BlockRenderer content={page.content} />
        </article>
      </DirectorateDetailLayout>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
          {page.title}
        </h1>
        <article className="max-w-none prose-links:text-primary">
          <BlockRenderer content={page.content} />
        </article>
      </main>
    </div>
  );
}
