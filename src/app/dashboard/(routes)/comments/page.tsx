import { db } from "../../../../../db";
import { products } from "../../../../../db/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { InferSelectModel } from "drizzle-orm";

type Product = InferSelectModel<typeof products>;

export default async function DataTableDemo() {
  const productsData = await db.select().from(products);

  const data: Product[] = productsData.map((product) => ({
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
      <DataTable columns={columns} data={data} filterKey="title" />
    </div>
  );
}
