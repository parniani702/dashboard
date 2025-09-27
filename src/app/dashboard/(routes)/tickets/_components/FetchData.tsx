"use client";

import { Tickets } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [ticketsData, setTicketsData] = useState<Tickets[]>([]);
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(    async () => {
      const res = await fetch("/api/tickets");
      const data: Tickets[] = await res.json();
      setTicketsData(data);
    })
  });
  const data: Tickets[] = ticketsData.map((ticket) => ({
    id: ticket.id,
    title: ticket.title,
    message: ticket.message,
    reply: ticket.reply,
    status: ticket.status,
    userId: ticket.userId,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  }));

  return (
    <div className="p-4">
      {isPending ? (
        <Skeleton className="w-full h-40" />
      ) : (
        <DataTable columns={columns} data={data} filterKey="email" />
      )}
    </div>
  );
};

export default FetchData;
