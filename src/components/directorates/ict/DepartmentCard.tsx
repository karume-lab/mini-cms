import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  department: {
    name: string;
    excerpt: string;
    slug: string;
  };
}

function DepartmentCard({ department }: Props) {
  return (
    <Card className="group overflow-hidden pt-0">
      <CardContent className="space-y-4 p-6">
        <h3 className="text-2xl font-semibold">{department.name}</h3>

        <p className="line-clamp-3 text-muted-foreground">
          {department.excerpt}
        </p>

        <Button
          nativeButton={false}
          render={<Link href="/departments" />}
        >
          View More
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
export default DepartmentCard;
