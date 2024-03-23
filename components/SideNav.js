"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ListItem from "@/components/ListItem";

export default function SideNav({ items, footer }) {
  const pathname = usePathname();

  return (
    <div className="bg-background flex h-full flex-col justify-between space-y-2 p-2">
      <div>
        {items.map((item, idx) => {
          return (
            <div key={idx} className="w-full">
              <Link href={item.path}>
                <ListItem
                  name={item.name}
                  icon={item.icon}
                  isActive={pathname == item.path}
                />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="text-foreground flex justify-center border-t-2 p-2 text-sm">
        {footer}
      </div>
    </div>
  );
}
