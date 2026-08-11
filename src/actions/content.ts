"use server";

import { db } from "@/db";
import {
  heroSlides,
  cmsDepartments,
  cmsNews,
  cardCentreServices,
  cardCentreReplacements,
  siteSettings,
} from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// --- Hero Slides ---
export async function getHeroSlides() {
  return await db.select().from(heroSlides).orderBy(heroSlides.id);
}

// --- Departments ---
export async function getDepartments() {
  return await db.select().from(cmsDepartments).orderBy(cmsDepartments.name);
}

export async function getDepartmentBySlug(slug: string) {
  const depts = await db.select().from(cmsDepartments).where(eq(cmsDepartments.slug, slug));
  return depts[0] || null;
}

// --- News ---
export async function getNews() {
  return await db.select().from(cmsNews).orderBy(desc(cmsNews.publishedAt));
}

export async function getNewsArticleBySlug(slug: string) {
  const articles = await db.select().from(cmsNews).where(eq(cmsNews.slug, slug));
  return articles[0] || null;
}

// --- Card Centre Services ---
export async function getCardCentreServices() {
  return await db.select().from(cardCentreServices).orderBy(cardCentreServices.id);
}

// --- Card Centre Replacements ---
export async function getCardCentreReplacements() {
  return await db.select().from(cardCentreReplacements).orderBy(cardCentreReplacements.id);
}

// --- Site Settings ---
export async function getSiteSetting(key: string) {
  const setting = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
  return setting[0]?.value || null;
}

export async function updateSiteSetting(key: string, value: string) {
  // Try to update, if no rows updated, insert
  const existing = await getSiteSetting(key);
  if (existing !== null) {
    await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value });
  }
  revalidatePath("/", "layout");
}
