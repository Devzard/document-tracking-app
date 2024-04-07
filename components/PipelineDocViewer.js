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

export default function PipelineDocViewer({ data }) {
  const { toast } = useToast();
  const { user } = useSession();
  const [docs, setDocs] = useState([]);

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
                    return <DocCard key={item.id} data={item} />;
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
