import { Suspense } from "react";
import { db } from "../../../../db";
import { products } from "../../../../db/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Products } from "@/types";



export default async function DataTableDemo() {
  const productsData = await db.select().from(products);

  const data: Products[] = productsData.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
    sold: product.sold,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));


  return (
    <div className="p-4">
      <Suspense fallback={<Skeleton className="w-full h-44" />}>
        <DataTable columns={columns} data={data} filterKey="title" />
      </Suspense>
    </div>
  );
}
