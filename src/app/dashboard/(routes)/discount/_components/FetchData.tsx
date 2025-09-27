"use client";

import { Discounts } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [discountsData, setDiscountsData] = useState<Discounts[] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/discounts");
        const data: Discounts[] = await res.json();
        setDiscountsData(data);
      } catch (err) {
        console.error(err);
        setDiscountsData([]);
      }
    });
  }, []);

  if (isPending && discountsData === null) {
    return <Skeleton className="w-full h-40" />;
  }

  if (discountsData && discountsData.length === 0) {
      return <DataTable columns={columns} data={discountsData} filterKey="code" />
  }

  return (
    <div className="p-4">
      {discountsData && <DataTable columns={columns} data={discountsData} filterKey="code" />}
    </div>
  );
};

export default FetchData;
