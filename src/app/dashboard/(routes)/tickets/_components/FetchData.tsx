"use client";

import { DataTable } from "../data-table";
import { columns } from "../columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/actions/tickets-action";

const FetchData = () => {
  const {data: ticketsData, isPending, error} = useQuery({
    queryKey: ['fetchTickets'],
    queryFn: getTickets
  })

  if (isPending) {
    return <Skeleton className="w-full h-40" />;
  }
  if (error) {
    return <DataTable columns={columns} data={ticketsData} filterKey="title" />
  }



  if(ticketsData.length === 0) {
    return <DataTable columns={columns} data={ticketsData} filterKey="title" />
  }

  return (
    <div className="p-4">
      <DataTable columns={columns} data={ticketsData} filterKey="title" />
    </div>
  );
};

export default FetchData;
