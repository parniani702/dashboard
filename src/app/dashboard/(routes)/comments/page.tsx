import { Comments } from "@/types";
import { db } from "../../../../db";
import { comments } from "../../../../db/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";



export default async function DataTableDemo() {
  const commentData = await db.select().from(comments);

  const data: Comments[] = commentData.map((comment) => ({
    id: comment.id,
    content: comment.content,
    userId: comment.userId,
    productId: comment.productId,
    createdAt: comment.createdAt
  }));


  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} filterKey="title" />
    </div>
  );
}
