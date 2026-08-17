import { getHeroSlides } from "@/actions/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function HeroAdminPage() {
  const slides = await getHeroSlides();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Hero Slides</h1>
        <Button nativeButton={false} render={<Link href="/admin/hero/new" />}>
          Add Slide
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {slides.map((slide) => (
          <div key={slide.id} className="flex gap-4 rounded-lg border p-4">
            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded bg-muted">
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-primary">
                  {slide.tagline}
                </p>
                <h3 className="line-clamp-2 font-medium">{slide.title}</h3>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Edit (Coming Soon)
                </Button>
                <Button variant="destructive" size="sm" disabled>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
