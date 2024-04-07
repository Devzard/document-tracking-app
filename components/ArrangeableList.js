import {
  Check,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function ArrangeableList({
  values,
  nodes,
  onNodesChangeHandler,
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const onSelectHandler = (currentValue) => {
    // add node to nodelist

    if (nodes.filter((item) => item === currentValue).length > 0) {
      toast({
        variant: "destructive",
        description: "Already exists!",
      });
    } else
      onNodesChangeHandler((p) => {
        let newP = [...p];
        newP.push(currentValue);
        return newP;
      });
    setOpen(false);
  };

  const onDeleteNodeHandler = (idx) => {
    onNodesChangeHandler((p) => {
      let newP = [...p];
      newP.splice(idx, 1);
      return newP;
    });
  };

  const swap = (i1, i2, arr) => {
    let temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
    return arr;
  };

  const onClickMoveHandler = (direction, idx) => {
    // control element order

    if (direction === "up") {
      if (idx === 0) return;
      onNodesChangeHandler((p) => {
        let newP = [...p];
        newP = swap(idx - 1, idx, newP);
        return newP;
      });
    } else if (direction === "down") {
      if (idx === nodes.length - 1) return;
      onNodesChangeHandler((p) => {
        let newP = [...p];
        newP = swap(idx + 1, idx, newP);
        return newP;
      });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* ComboBox Section */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select Node
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search user..." />
            <CommandEmpty>No User found.</CommandEmpty>
            <CommandGroup>
              {values.map((item) => {
                return (
                  <CommandItem
                    key={item.id}
                    value={item.email}
                    onSelect={(currentValue) => {
                      onSelectHandler(currentValue);
                    }}
                    className="data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.name ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {item.name} {item.email}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* View Nodes Section */}
      <div className="text-md">Nodes</div>
      <div className="space-y-2 divide-y-2">
        {nodes.length > 0 ? (
          nodes.map((item, idx) => {
            return (
              <div key={item} className="flex h-full justify-between px-2">
                <div className="h-full">
                  <div className="flex items-center space-x-2 text-primary">
                    <div className="text-sm text-primary opacity-50">
                      {idx + 1}
                    </div>
                    <div>
                      {values.filter((value) => value.email === item)[0]?.name}
                    </div>
                  </div>
                  <div className="pl-4 text-sm text-primary opacity-50">
                    {item}
                  </div>
                </div>
                <div className="flex min-h-full items-center space-x-2">
                  <button onClick={() => onClickMoveHandler("up", idx)}>
                    <ChevronUp strokeWidth={2} />
                  </button>
                  <button onClick={() => onClickMoveHandler("down", idx)}>
                    <ChevronDown strokeWidth={2} />
                  </button>
                  <button onClick={() => onDeleteNodeHandler(idx)}>
                    <Trash2
                      strokeWidth={1}
                      size={20}
                      className="text-red-600"
                    />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm">No nodes added</p>
        )}
      </div>
    </div>
  );
}
