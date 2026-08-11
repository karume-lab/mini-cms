import { BadgeCheck, CreditCard, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardCentre } from "../data/card-centre";
import StudentReplacementSteps from "./StudentReplacementSteps";

const icons = [CreditCard, BadgeCheck, RefreshCw];

function CardCentre() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl border bg-muted/30 p-8 text-center">
          <p className="font-semibold uppercase tracking-widest text-primary">
            ICT Directorate
          </p>

          <h2 className="mt-2 text-4xl font-bold">Card Centre</h2>

          <p className="mt-6 text-lg text-muted-foreground">
            {cardCentre.intro}
          </p>

          <h3 className="mt-10 text-2xl font-semibold">
            Introduction to the Card Centre
          </h3>

          <p className="mt-4 text-muted-foreground">{cardCentre.description}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cardCentre.services.map((service, index) => {
            const Icon = icons[index];

            return (
              <Card key={service.title}>
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
