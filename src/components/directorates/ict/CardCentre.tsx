"use client";

import { CreditCard, BadgeCheck, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getCardCentreServices, getCardCentreReplacements } from "@/actions/content";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, React.ReactNode> = {
  CreditCard: <CreditCard className="size-6" />,
  BadgeCheck: <BadgeCheck className="size-6" />,
  RefreshCw: <RefreshCw className="size-6" />,
};

type Service = Awaited<ReturnType<typeof getCardCentreServices>>[number];
type Replacement = Awaited<ReturnType<typeof getCardCentreReplacements>>[number];

export default function CardCentre({
  initialServices,
  initialReplacements,
}: {
  initialServices?: Service[];
  initialReplacements?: Replacement[];
}) {
  const [services, setServices] = useState<Service[]>(initialServices ?? []);
  const [replacements, setReplacements] = useState<Replacement[]>(initialReplacements ?? []);

  useEffect(() => {
    if (initialServices !== undefined && initialReplacements !== undefined) return;
    Promise.all([getCardCentreServices(), getCardCentreReplacements()]).then(
      ([s, r]) => {
        setServices(s);
        setReplacements(r);
      },
    );
  }, [initialServices, initialReplacements]);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            ICT Directorate
          </p>
          <h2 className="mt-2 text-3xl font-bold">Card Centre</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="text-center">
              <CardContent className="space-y-3 p-6">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {iconMap[service.iconName] || <CreditCard className="size-6" />}
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {replacements.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">ID Replacement Steps</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {replacements.map((replacement) => {
                const steps = JSON.parse(replacement.steps) as string[];
                return (
                  <Card key={replacement.id}>
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3">{replacement.title}</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        {steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
