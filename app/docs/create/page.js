"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function CreateDoc() {
  const [pipelines, setPipelines] = useState(["pipeline1", "pipeline2"]);
  const [selectedPipeline, setSelectedPipeline] = useState(pipelines[0]);

  return (
    <div className="h-full w-auto min-w-96 space-y-4 px-4 py-2 text-foreground">
      <Card className="">
        <CardHeader>
          <CardTitle>Create a New Document</CardTitle>
          <CardDescription>
            Fill in following details to create a new document...{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="">
            <Label htmlFor="title">Document Title</Label>
            <Input type="text" id="title" placeholder="Type here ..." />
          </div>

          <div className="">
            <Label htmlFor="location">Document Location</Label>
            <Input type="text" id="location" placeholder="Type here ..." />
          </div>

          {/* Select Pipeline Section */}
          {/* TODO: Change to combobox compoenent */}
          <div className="flex space-x-4">
            <Select
              id="pipeline"
              value={selectedPipeline}
              onValueChange={setSelectedPipeline}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a pipeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pipelines</SelectLabel>
                  {pipelines.map((item, idx) => {
                    return (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Create new pipeline section */}
            <Sheet>
              <SheetTrigger>Create new Pipeline</SheetTrigger>
              <SheetContent>
                {/* TODO: Create Add Pipeline Form */}
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button className="w-full bg-primary text-primary-foreground">
              Submit
            </Button>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
