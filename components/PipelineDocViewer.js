import { useEffect, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/providers/sessionProvider";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import DocCard from "@/components/DocCard";

import { getDocumentsFromPipeline } from "@/actions/docs.action";
import { getUser } from "@/actions/user.action";

export default function PipelineDocViewer({ data }) {
  const { toast } = useToast();
  const { user } = useSession();
  const [docs, setDocs] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const setUpdateDoc = (id, data) => {
    // Lets update of a single item in doc list
    setDocs((p) => {
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

  async function getDocs() {
    try {
      const res = await getDocumentsFromPipeline(data.id);
      if (res.success) {
        setDocs(res.data);
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
  }

  useEffect(() => {
    getDocs();
    loadUser();
  }, []);

  return (
    <div className="px-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{data.title}</AccordionTrigger>
          <AccordionContent>
            <div>
              <div>
                Pipeline created by: <strong>{data.createdByUser.name}</strong>{" "}
                on <em>{data.createdAt.toDateString()}</em>
              </div>

              {/* Docs */}
              <ScrollArea>
                <div className="flex space-x-2">
                  {docs.map((item) => {
                    return (
                      <DocCard
                        key={item.id}
                        data={item}
                        user={userDetails}
                        updateData={setUpdateDoc}
                      />
                    );
                  })}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
