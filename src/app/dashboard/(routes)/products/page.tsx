
import { Product } from "@/generated/prisma";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/prisma";



export default async function DataTableDemo() {
  // get products from actions
  const productsData = await prisma?.product.findMany()

  // todo : make products list 
  const data: Product[] = productsData.map(products => ({
    id: products.id,
    title: products.title,
    description: products.description,
    price: products.price,
    stock: products.stock,
    sold: products.sold,
    createdAt: products.createdAt,
    updatedAt: products.updatedAt
  }));

  return (
    <div className="p-4">
        <DataTable columns={columns} data={data} filterKey="title" />
    </div>
  );
}
