"use client";
import { useEffect, useState } from "react";

import { getCardCentreReplacements } from "@/actions/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Replacement = Awaited<ReturnType<typeof getCardCentreReplacements>>[number];

function StudentReplacementSteps() {
  const [replacements, setReplacements] = useState<Replacement[]>([]);

  useEffect(() => {
    getCardCentreReplacements().then((data) => {
      // Data might have steps as JSON string, so we parse it
      const parsedData = data.map((item) => ({
        ...item,
        steps: typeof item.steps === "string" ? JSON.parse(item.steps) : item.steps,
      }));
      setReplacements(parsedData);
    });
  }, []);

  return (
    <div className="mt-12">
      <h3 className="mb-6 text-2xl font-bold">
        Student ID Replacement Procedures
      </h3>

      <Accordion className="space-y-4">
        {replacements.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id.toString()}
            className="rounded-xl border px-6"
          >
            <AccordionTrigger className="text-left font-semibold">
              {item.title}
            </AccordionTrigger>

            <AccordionContent>
              <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
                {(item.steps as unknown as string[]).map((step: string) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
export default StudentReplacementSteps;
