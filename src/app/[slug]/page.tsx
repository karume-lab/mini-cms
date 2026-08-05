import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import { db } from "@/db";
import { pages } from "@/db/schema";

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

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
          {page.title}
        </h1>
        <article className="prose prose-neutral dark:prose-invert lg:prose-lg max-w-none">
          <BlockRenderer content={page.content} />
        </article>
      </main>
    </div>
  );
}
