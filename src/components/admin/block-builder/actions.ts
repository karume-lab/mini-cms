"use server";

import { db } from "@/db";
import { customBlockTemplates } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function saveTemplate(name: string, templateJson: string) {
  await db.insert(customBlockTemplates).values({
    name,
    templateJson,
  });
  revalidatePath("/admin/block-builder");
}

export async function getTemplates() {
  return await db.select().from(customBlockTemplates).orderBy(customBlockTemplates.createdAt);
}
