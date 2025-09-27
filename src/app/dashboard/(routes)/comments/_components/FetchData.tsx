"use client";

import { Comments } from "@/types";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { useEffect, useState, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [commentData, setCommentData] = useState<Comments[]>([]);
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(    async () => {
      const res = await fetch("/api/comments");
      const data: Comments[] = await res.json();
      setCommentData(data);
    })
  }, []);

  const data: Comments[] = commentData.map((comment) => ({
    id: comment.id,
    content: comment.content,
    userId: comment.userId,
    productId: comment.productId,
    createdAt: comment.createdAt,
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
