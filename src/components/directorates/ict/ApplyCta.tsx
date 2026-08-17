import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getSiteSetting } from "@/actions/content";
import { Button } from "@/components/ui/button";

export default async function ApplyCTA() {
  const [title, description] = await Promise.all([
    getSiteSetting("apply_cta_title"),
    getSiteSetting("apply_cta_description"),
  ]);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl bg-primary px-8 py-12 text-center text-white lg:px-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            {title || "Ready to Join JKUAT?"}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            {description || "Explore available programmes and begin your journey with JKUAT."}
          </p>

          <Button
           
            render={
              <Link
                href="https://admission.jkuat.ac.ke/"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="lg"
            variant="secondary"
            className="mt-8 gap-2"
          >
            Apply Now
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
