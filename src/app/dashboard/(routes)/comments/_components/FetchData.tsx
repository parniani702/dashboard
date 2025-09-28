"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { getComments } from "@/actions/comments-action";

const FetchData = () => {

  const {data: commentData, isPending, error} = useQuery({
    queryKey: [''],
    queryFn: getComments,
  })


  if (isPending) {
    return <Skeleton className="w-full h-40" />;
  }

  if (error) {
    return <span>{error.message}</span>
  }

  if (commentData.length === 0) {
    return <DataTable columns={columns} data={commentData} filterKey="content" />
  }

  return (
    <div className="p-4">
      <DataTable columns={columns} data={commentData} filterKey="content" />
    </div>
  );
};

export default FetchData;
