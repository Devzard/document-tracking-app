import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DocCard({ data }) {
  return (
    <div>
      <Card key={data.id} className="w-96">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.createdAt.toDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="h-4 text-xs">
            <Badge
              className={`h-4 ${data.status == "IN PROGRESS" ? "bg-orange-600" : "bg-primary"}`}
            >
              {data.status}
            </Badge>
          </Button>
          <div className="flex items-end justify-between space-x-2">
            <Button variant="link">
              <a href={data.location} className="underline">
                See doc
              </a>
            </Button>
          </div>

          {/* Buttons */}
          <div className="flex w-full justify-evenly space-x-2">
            <Button className="w-full">Approve</Button>
            <Button className="w-full" variant="outline">
              Reject
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
