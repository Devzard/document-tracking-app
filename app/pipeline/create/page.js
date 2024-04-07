"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PipelineForm from "@/components/PipelineForm";

export default function CreatePipeline() {
  return (
    <div className="w-auto min-w-96 p-2">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <PipelineForm setOpen={() => {}} />
        </CardContent>
      </Card>
    </div>
  );
}
