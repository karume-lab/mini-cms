"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getSiteSetting } from "@/actions/content";
import { Button } from "@/components/ui/button";

function ApplyCTA() {
  const [title, setTitle] = useState("Ready to Join JKUAT?");
  const [description, setDescription] = useState(
    "Explore available programmes, admission opportunities and begin your journey with Jomo Kenyatta University of Agriculture and Technology."
  );

  useEffect(() => {
    getSiteSetting("apply_cta_title").then((t) => { if (t) setTitle(t) });
    getSiteSetting("apply_cta_description").then((d) => { if (d) setDescription(d) });
  }, []);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl bg-primary px-8 py-12 text-center text-white lg:px-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            {description}
          </p>

          <Button
            nativeButton={false}
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
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
export default ApplyCTA;
