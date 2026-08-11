import { getNews } from "@/actions/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NewsAdminPage() {
  const articles = await getNews();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">News & Announcements</h1>
        <Button asChild>
          <Link href="/admin/news/new">Add Article</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-background">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Published At</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-muted/50">
                <td className="p-4 font-medium">{article.title}</td>
                <td className="p-4 text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString()}</td>
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
