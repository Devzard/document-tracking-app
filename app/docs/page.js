"use client";

import { useState, useEffect } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import PipelineDocViewer from "@/components/PipelineDocViewer";
import DocCard from "@/components/DocCard";

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/providers/sessionProvider";

import { getDocumentsCreatedByUser } from "@/actions/docs.action";
import { getPipelinesForUser } from "@/actions/pipeline.action";
import { getUser } from "@/actions/user.action";

export default function Docs() {
  const { toast } = useToast();
  const { user } = useSession();
  const [userDocs, setUserDocs] = useState([]);
  const [userPipelines, setUserPipelines] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const setUpdateDoc = (id, data) => {
    // Lets update of a single item in doc list
    setUserDocs((p) => {
      let newP = [...p];
      let oldObj = newP.find((item) => item.id === id);
      let index = newP.indexOf(oldObj);
      newP[index] = data;
      return newP;
    });
  };

  const loadUser = async () => {
    try {
      const res = await getUser(user.id);
      if (res.success) {
        setUserDetails(res.data);
      } else if (res.error) {
        toast({
          variant: "destructive",
          description: error,
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Couldn't fetch user details",
      });
    }
  };

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
    loadUser();
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* User Created Docs */}
      <div className="w-full space-y-2">
        <div>User Created Docs</div>
        <ScrollArea>
          <div className="flex space-x-2">
            {userDocs.map((item) => {
              return (
                <DocCard
                  key={item.id}
                  data={item}
                  updateData={setUpdateDoc}
                  user={userDetails}
                />
              );
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
