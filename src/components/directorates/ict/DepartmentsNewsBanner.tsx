import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DepartmentNewsBannerProps {
  image: string;
  title: string;
  description: string;
  href: string;
}

function DepartmentNewsBanner({
  image,
  title,
  description,
  href,
}: DepartmentNewsBannerProps) {
  return (
    <section className="rounded-2xl border bg-muted/20 mt-20">
      <div className="max-w-7xl mx-auto grid overflow-hidden lg:grid-cols-2">
        <div className="relative min-h-70">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div className="flex items-center p-8 lg:p-12">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              News & Events
            </p>

            <h2 className="mt-3 text-3xl font-bold">{title}</h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              {description}
            </p>

            <Button nativeButton={false} render={<Link href={href} />} className="mt-8">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DepartmentNewsBanner;
