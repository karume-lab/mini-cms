import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { departments } from "../data/departments";
import DepartmentCard from "./DepartmentCard";

export default function DepartmentsSection() {
  const featuredDepartments = departments.slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-widest text-primary">
              ICT Directorate
            </p>

            <h2 className="mt-2 text-4xl font-bold">Departments</h2>

            <p className="mt-4 text-muted-foreground">
              The ICT Directorate comprises specialized departments that work
              together to provide innovative, secure and reliable technology
              services across the University.
            </p>
          </div>

          <Button
            render={<Link href="/directorates/ict/departments" />}
            variant="outline"
          >
            View All Departments
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredDepartments.map((department) => (
            <DepartmentCard key={department.slug} department={department} />
          ))}
        </div>
      </div>
    </section>
  );
}
