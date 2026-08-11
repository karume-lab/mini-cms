"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { pages } from "@/db/schema";

export async function createPage(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    await db.insert(pages).values({
      title,
      slug,
      content,
    });
  } catch (error) {
    console.error("Failed to insert page:", error);
    throw new Error("Failed to create page");
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePage(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    await db
      .update(pages)
      .set({
        title,
        slug,
        content,
        updatedAt: new Date(),
      })
      .where(eq(pages.id, id));
  } catch (error) {
    console.error("Failed to update page:", error);
    throw new Error("Failed to update page");
  }

  revalidatePath("/admin");
  revalidatePath(`/${slug}`);
  redirect("/admin");
}

export async function deletePage(id: number) {
  try {
    await db.delete(pages).where(eq(pages.id, id));
  } catch (error) {
    console.error("Failed to delete page:", error);
    throw new Error("Failed to delete page");
  }

  revalidatePath("/admin");
  revalidatePath("/");
}
