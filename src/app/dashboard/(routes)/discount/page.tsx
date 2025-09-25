import { Discounts } from "@/types";
import { db } from "../../../../db";
import { discounts, user } from "../../../../db/schema";

import { columns } from "./columns";
import { DataTable } from "./data-table";



export default async function DataTableDemo() {

  const discountsData = await db.select().from(discounts);

  const data: Discounts[] = discountsData.map((discount) => ({
    id: discount.id,
    code: discount.code,
    precentage: discount.precentage,
    usageLimit: discount.usageLimit,
    usedCount: discount.usedCount,
    validForm: discount.validForm,
    validTo: discount.validTo,
    createdAt: discount.createdAt
  }));


  return (
    <div className="p-4">
        <DataTable columns={columns} data={data} filterKey="email" />
    </div>
  );
}
