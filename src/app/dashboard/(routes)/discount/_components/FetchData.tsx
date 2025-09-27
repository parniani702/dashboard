"use client";

import { Discounts } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [discountsData, setDiscountData] = useState<Discounts[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const res = await fetch("/api/discounts");
      const data: Discounts[] = await res.json();
      setDiscountData(data);
    });
  }, []);

  const data: Discounts[] = discountsData.map((discount) => ({
    id: discount.id,
    code: discount.code,
    precentage: discount.precentage,
    usageLimit: discount.usageLimit,
    usedCount: discount.usedCount,
    validForm: discount.validForm,
    validTo: discount.validTo,
    createdAt: discount.createdAt,
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
