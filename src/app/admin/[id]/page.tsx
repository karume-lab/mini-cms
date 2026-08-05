import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditForm from "@/app/admin/[id]/EditForm";
import { db } from "@/db";
import { pages } from "@/db/schema";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = Number.parseInt(resolvedParams.id, 10);
  if (Number.isNaN(id)) {
    notFound();
  }

  const pageRecords = await db.select().from(pages).where(eq(pages.id, id));
  if (pageRecords.length === 0) {
    notFound();
  }

  const page = pageRecords[0];

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Edit Page: {page.title}
        </h1>
      </div>
      <EditForm page={page} />
    </div>
  );
}
