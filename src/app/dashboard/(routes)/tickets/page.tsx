import { db } from "../../../../db";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Tickets } from "@/types";
import { tickets } from "../../../../db/schema";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DataTableDemo() {
  const ticketsData = await db.select().from(tickets);

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
      <DataTable columns={columns} data={data} filterKey="title" />
    </div>
  );
}
