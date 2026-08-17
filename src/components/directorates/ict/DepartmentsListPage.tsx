"use client";
import { useEffect, useState } from "react";
import DepartmentCard from "./DepartmentCard";
import { getDepartments } from "@/actions/content";

type Department = Awaited<ReturnType<typeof getDepartments>>[number];

export default function DepartmentsListPage({ initialDepartments }: { initialDepartments?: Department[] }) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments || []);

  useEffect(() => {
    if (!initialDepartments) {
      getDepartments().then((data) => setDepartments(data));
    }
  }, [initialDepartments]);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
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

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((department) => (
            <DepartmentCard key={department.slug} department={department} />
          ))}
        </div>
      </div>
    </section>
  );
}
