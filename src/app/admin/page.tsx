import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { pages } from "@/db/schema";
import { DeletePageButton } from "./DeletePageButton";

export default async function AdminPage() {
  const allPages = await db.select().from(pages).orderBy(pages.createdAt);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
        <Link href="/admin/new" className={buttonVariants()}>
          New Page
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
          <CardDescription>Manage your public website content.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No pages found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                allPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>/{page.slug}</TableCell>
                    <TableCell>
                      {new Date(page.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/${page.slug}`}
                          target="_blank"
                          className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                          })}
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/${page.id}`}
                          className={buttonVariants({
                            variant: "default",
                            size: "sm",
                          })}
                        >
                          Edit
                        </Link>
                        <DeletePageButton id={page.id} title={page.title} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
