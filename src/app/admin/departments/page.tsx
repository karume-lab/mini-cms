import { getDepartments } from "@/actions/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DepartmentsAdminPage() {
  const departments = await getDepartments();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Departments</h1>
        <Button render={<Link href="/admin/departments/new" />}>
          Add Department
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-background">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Head</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-muted/50">
                <td className="p-4 font-medium">{dept.name}</td>
                <td className="p-4 text-muted-foreground">{dept.headLabel}: {dept.head}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" disabled>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
