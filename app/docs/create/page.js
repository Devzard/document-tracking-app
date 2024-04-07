"use client";

import { useState, useEffect } from "react";

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
import { useToast } from "@/components/ui/use-toast";

import PipelineForm from "@/components/PipelineForm";

import { getPipelines } from "@/actions/pipeline.action";
import { addDocument } from "@/actions/docs.action";
import { useSession } from "@/providers/sessionProvider";

export default function CreateDoc() {
  const { toast } = useToast();
  const { user } = useSession();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [pipelines, setPipelines] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState();
  const [pipelineOpen, setPipelineOpen] = useState(false);

  const updatePipelines = async () => {
    try {
      const res = await getPipelines();
      if (res.success) {
        setPipelines(res.data);
      } else if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Failed to fetch pipelines information.",
      });
    }
  };

  const onSubmitHandler = async () => {
    try {
      const res = await addDocument(title, location, selectedPipeline, user.id);
      if (res.success) {
        setTitle("");
        setLocation("");
        toast({
          description: "Document added successfully",
        });
      } else if (res.error) {
        toast({
          variant: "destructive",
          description: "Failed to add document",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Failed to add document!",
      });
    }
  };

  useEffect(() => {
    if (!pipelineOpen) {
      updatePipelines();
    }
  }, [pipelineOpen]);

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
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type here..."
            />
          </div>

          <div className="">
            <Label htmlFor="location">Document Location</Label>
            <Input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Type here..."
            />
          </div>

          {/* Select Pipeline Section */}
          {/* TODO: Change to combobox compoenent */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="pipeline">Pipeline</Label>
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
                    {pipelines.map((item) => {
                      return (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Create new pipeline section */}
              <Sheet open={pipelineOpen} onOpenChange={setPipelineOpen}>
                <SheetTrigger>Create new Pipeline</SheetTrigger>
                <SheetContent>
                  {/* TODO: Create Add Pipeline Form */}
                  <SheetHeader>
                    <SheetTitle>Create a new Pipeline</SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                  <PipelineForm setOpen={setPipelineOpen} />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              className="w-full bg-primary text-primary-foreground"
              onClick={onSubmitHandler}
              disabled={title.length === 0 || location.length === 0}
            >
              Submit
            </Button>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
