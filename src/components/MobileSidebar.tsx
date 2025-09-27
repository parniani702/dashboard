"use client";

import { Gauge } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardSideBar from "@/app/dashboard/_components/DashboardSidebar";

const MobileSideBar = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="xl:hidden">
          <Gauge className="text-blue-500" strokeWidth={3} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-80 p-0">
        <ScrollArea className="h-[calc(100vh-2rem)] p-4 sm:my-10">
          <DashboardSideBar />
        </ScrollArea>
        <DrawerClose asChild>
          <Button variant="destructive" size="icon" className="absolute top-1 right-1">
            ✕
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSideBar;
