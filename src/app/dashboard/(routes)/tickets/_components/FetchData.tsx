"use client";

import { Tickets } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [ticketsData, setTicketsData] = useState<Tickets[] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/tickets");
        const data: Tickets[] = await res.json();
        setTicketsData(data);
      } catch (err) {
        console.error(err);
        setTicketsData([]);
      }
    });
  }, []);

  if (isPending && ticketsData === null) {
    return <Skeleton className="w-full h-40" />;
  }

  if (ticketsData && ticketsData.length === 0) {
    return <DataTable columns={columns} data={ticketsData} filterKey="title" />
  }

  return (
    <div className="p-4">
      {ticketsData && <DataTable columns={columns} data={ticketsData} filterKey="title" />}
    </div>
  );
};

export default FetchData;
