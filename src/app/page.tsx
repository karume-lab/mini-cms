import Link from "next/link";

import { db } from "@/db";
import { directorates, pages } from "@/db/schema";

export default async function Home() {
  const allPages = await db.select().from(pages);
  const allDirectorates = await db.select().from(directorates);

  // Map directorate ID to directorate object for easy lookup
  const directorateMap = new Map(allDirectorates.map((d) => [d.id, d]));

  return (
    <div className="flex min-h-screen flex-col items-center p-12 lg:p-24 bg-background">
      <h1 className="text-4xl font-bold mb-12">All Pages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {allPages.map((page) => {
          const directorate = page.directorateId
            ? directorateMap.get(page.directorateId)
            : null;

          return (
            <Link
              key={page.id}
              href={`/${page.slug}`}
              className="block p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span className="capitalize bg-muted px-2 py-0.5 rounded-full text-xs">
                  {page.type}
                </span>
                {directorate && (
                  <span className="truncate">Dir: {directorate.name}</span>
                )}
              </div>
              <p className="text-primary text-sm font-medium">
                View Page &rarr;
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
