"use client";

import { Comments } from "@/types";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { useEffect, useState, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [commentData, setCommentData] = useState<Comments[] | null>(null); // 
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/comments");
        const data: Comments[] = await res.json();
        setCommentData(data);
      } catch (err) {
        console.error(err);
        setCommentData([]);
      }
    });
  }, []);

  if (isPending && commentData === null) {
    return <Skeleton className="w-full h-40" />;
  }

  if (commentData && commentData.length === 0) {
    return <DataTable columns={columns} data={commentData} filterKey="content" />
  }

  return (
    <div className="p-4">
      {commentData && <DataTable columns={columns} data={commentData} filterKey="content" />}
    </div>
  );
};

export default FetchData;
