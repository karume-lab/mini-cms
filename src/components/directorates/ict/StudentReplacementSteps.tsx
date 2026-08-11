"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cardCentre } from "../data/card-centre";

function StudentReplacementSteps() {
  return (
    <div className="mt-12">
      <h3 className="mb-6 text-2xl font-bold">
        Student ID Replacement Procedures
      </h3>

      <Accordion className="space-y-4">
        {cardCentre.replacements.map((item) => (
          <AccordionItem
            key={item.title}
            value={item.title}
            className="rounded-xl border px-6"
          >
            <AccordionTrigger className="text-left font-semibold">
              {item.title}
            </AccordionTrigger>

            <AccordionContent>
              <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
                {item.steps.map((step) => (
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
