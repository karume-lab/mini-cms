"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getNews } from "@/actions/content";
import { Button } from "@/components/ui/button";

type NewsArticle = Awaited<ReturnType<typeof getNews>>[number];

export default function NewsSection({ initialNews }: { initialNews?: NewsArticle[] }) {
  const [news, setNews] = useState<NewsArticle[]>(initialNews || []);

  useEffect(() => {
    if (!initialNews) {
      getNews().then((data) => setNews(data));
    }
  }, [initialNews]);

  const featuredNews = news.slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              ICT Directorate
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Latest News & Announcements
            </h2>
          </div>

          <Button
           
            render={<Link href="/news" />}
            variant="outline"
          >
            View All News
                  <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredNews.map((article) => (
            <article
              key={article.slug}
              className="group overflow-hidden rounded-xl border bg-background transition-shadow hover:shadow-lg"
            >
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-4 p-5">
                <span className="text-sm font-medium text-primary">
                  ICT Directorate
                </span>

                <h3 className="line-clamp-2 text-xl font-semibold">
                  {article.title}
                </h3>

                <p className="line-clamp-3 text-muted-foreground">
                  {article.excerpt}
                </p>

                <Button
                 
                  render={<Link href="/news" />}
                  className="gap-2"
                >
                  Read More
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
