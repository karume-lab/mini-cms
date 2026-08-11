"use client";
import { BadgeCheck, CreditCard, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentReplacementSteps from "./StudentReplacementSteps";
import { getCardCentreServices, getSiteSetting } from "@/actions/content";

const iconMap: Record<string, any> = {
  CreditCard,
  BadgeCheck,
  RefreshCw,
};

function CardCentre() {
  const [services, setServices] = useState<any[]>([]);
  const [intro, setIntro] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");

  useEffect(() => {
    getCardCentreServices().then((data) => setServices(data));
    getSiteSetting("card_centre_intro").then((val) => { if (val) setIntro(val); });
    getSiteSetting("card_centre_description").then((val) => { if (val) setDescription(val); });
  }, []);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl border bg-muted/30 p-8 text-center">
          <p className="font-semibold uppercase tracking-widest text-primary">
            ICT Directorate
          </p>

          <h2 className="mt-2 text-4xl font-bold">Card Centre</h2>

          <p className="mt-6 text-lg text-muted-foreground">
            {intro}
          </p>

          <h3 className="mt-10 text-2xl font-semibold">
            Introduction to the Card Centre
          </h3>

          <p className="mt-4 text-muted-foreground">{description}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.iconName] || CreditCard;

            return (
              <Card key={service.id}>
                <CardHeader>
                  <div className="mb-4 w-fit rounded-full bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <StudentReplacementSteps />
      </div>
    </section>
  );
}
export default CardCentre;
