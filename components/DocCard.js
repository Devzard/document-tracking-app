import { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useToast } from "@/components/ui/use-toast";

import { getPipeLineWithNodeDetails } from "@/actions/pipeline.action";
import {
  updateDocumentStage,
  updateDocumentStatus,
} from "@/actions/docs.action";

export default function DocCard({ user, data, updateData }) {
  const { toast } = useToast();

  const [pipelineNodes, setPipelineNodes] = useState([]);
  const [pipelineTitle, setPipelineTitle] = useState("");
  const [open, setOpen] = useState(false);

  const getPipelineNodes = async () => {
    try {
      const res = await getPipeLineWithNodeDetails(data.pipelineId);
      if (res.success) {
        setPipelineNodes(
          res.data.PipelineNode.sort((a, b) => a.orderNo - b.orderNo),
        );
        setPipelineTitle(res.data.title);
      } else if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Couldn't fetch Pipeline Nodes",
      });
    }
  };

  const approveHandler = async () => {
    try {
      const res = await updateDocumentStage(data.pipelineId, data.id);
      if (res.success) {
        updateData(data.id, res.data);
      } else if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Couldn't update doc",
      });
    }
  };

  const rejectHandler = async () => {
    try {
      const res = await updateDocumentStatus(data.pipelineId, data.id);
      if (res.success) {
        updateData(data.id, res.data);
      } else if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Couldn't update doc",
      });
    }
  };

  useEffect(() => {
    if (open) getPipelineNodes();
  }, [open]);

  return (
    <div className="">
      <Card key={data.id} className="w-96">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.createdAt.toDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* drawer */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>
              <Badge
                className={`h-4 ${data.status == "IN PROGRESS" ? "bg-orange-600" : "bg-primary"}`}
              >
                {data.status}
              </Badge>
            </DrawerTrigger>
            <DrawerContent className="">
              <DrawerHeader>
                <DrawerTitle>Pipeline : {pipelineTitle}</DrawerTitle>
                <DrawerDescription>Status : {data.status}</DrawerDescription>
              </DrawerHeader>

              <div className="w-full flex flex-col items-center">
                {/* progress line */}
                <div className="flex flex-col w-full max-h-[70%] items-center space-y-2 p-4 divide-y-2">
                  {pipelineNodes.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex rounded-sm  flex-co p-4 ${data.stage === item.orderNo ? "bg-red-500 text-primary-foreground" : ""}`}
                      >
                        <span className="pr-2">{item.orderNo + 1}</span>
                        <span className="">{item.userEmail}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Buttons */}
                {user?.email === pipelineNodes[data.stage]?.userEmail &&
                  data.status !== "REJECTED" && (
                    <div className="flex p-4 w-full justify-evenly space-x-2 max-w-80">
                      <Button className="w-full" onClick={approveHandler}>
                        Approve
                      </Button>
                      <Button
                        className="w-full"
                        onClick={rejectHandler}
                        variant="outline"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* // */}
          <div className="flex items-end justify-between space-x-2">
            <Button variant="link">
              <a href={data.location} className="underline">
                See doc
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
