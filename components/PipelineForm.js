"use client";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import ArrangeableList from "@/components/ArrangeableList";

import { getUsers } from "@/actions/user.action";
import { addPipeline } from "@/actions/pipeline.action";
import { useSession } from "@/providers/sessionProvider";

export default function PipelineForm({ setOpen }) {
  const { user } = useSession();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [nodes, setNodes] = useState([]);

  const onSubmitHandler = async () => {
    try {
      const res = await addPipeline(title, nodes, user.id);
      if (res.success) {
        setTitle("");
        setNodes([]);
        toast({
          description: "Pipeline added successfully!",
        });
        setOpen(false);
      } else if (res.error)
        toast({
          variant: "destructive",
          description: res.error,
        });
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Failed in adding pipeline.",
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setUsers(await getUsers());
      } catch (e) {
        toast({
          variant: "destructive",
          description: "Failed in fetching users.",
        });
      }
    })();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4">
      <div className="w-full space-y-2">
        <Label htmlFor="pipeline-title">Pipeline Title</Label>
        <Input
          type="text"
          id="pipeline-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type here..."
        />
      </div>
      <div className="w-full">
        <ArrangeableList
          values={users}
          nodes={nodes}
          onNodesChangeHandler={setNodes}
        />
      </div>
      <div className="w-full border-t-2 pt-4">
        <Button
          className="w-full"
          onClick={onSubmitHandler}
          disabled={title.length === 0}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
