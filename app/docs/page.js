"use client";

import { useState, useEffect } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import PipelineDocViewer from "@/components/PipelineDocViewer";
import DocCard from "@/components/DocCard";

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/providers/sessionProvider";

import { getDocumentsCreatedByUser } from "@/actions/docs.action";
import { getPipelinesForUser } from "@/actions/pipeline.action";

export default function Docs() {
  const { toast } = useToast();
  const { user } = useSession();
  const [userDocs, setUserDocs] = useState([]);
  const [userPipelines, setUserPipelines] = useState([]);

  const loadMyDocs = async () => {
    try {
      const res = await getDocumentsCreatedByUser(user.id);
      if (res.success) {
        setUserDocs(res.data);
      } else if (res.error) {
        toast({
          variant: "destructive",
          description: error,
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Failed to fetch documents",
      });
    }
  };

  const loadPipelines = async () => {
    try {
      const res = await getPipelinesForUser(user.id);
      if (res.success) {
        setUserPipelines(res.data);
      } else if (res.error) {
        toast({
          variant: "destructive",
          description: error,
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Failed to fetch pipelines",
      });
    }
  };

  useEffect(() => {
    loadMyDocs();
    loadPipelines();
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* User Created Docs */}
      <div className="w-full space-y-2">
        <div>User Created Docs</div>
        <ScrollArea>
          <div className="flex space-x-2">
            {userDocs.map((item) => {
              return <DocCard key={item.id} data={item} />;
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Pipelines */}
      <div className="w-full space-y-2">
        {userPipelines.map((item) => {
          return <PipelineDocViewer key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
}
