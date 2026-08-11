import { getCardCentreServices, getCardCentreReplacements } from "@/actions/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ServicesAdminPage() {
  const services = await getCardCentreServices();
  const replacements = await getCardCentreReplacements();

  return (
    <div className="space-y-12">
      {/* Services Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Services</h2>
          <Button asChild>
            <Link href="/admin/services/new-service">Add Service</Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border bg-background">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-muted/50">
                  <td className="p-4 font-medium">{service.title}</td>
                  <td className="p-4 text-muted-foreground line-clamp-2">{service.description}</td>
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

      {/* Replacements Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Replacement Steps</h2>
          <Button asChild>
            <Link href="/admin/services/new-replacement">Add Replacement Step</Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border bg-background">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {replacements.map((replacement) => (
                <tr key={replacement.id} className="hover:bg-muted/50">
                  <td className="p-4 font-medium">{replacement.title}</td>
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
    </div>
  );
}
