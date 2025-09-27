"use client";

import { Products } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [productsData, setProductsData] = useState<Products[] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/products");
        const data: Products[] = await res.json();
        setProductsData(data);
      } catch (err) {
        console.error(err);
        setProductsData([]);
      }
    });
  }, []);

  if (isPending && productsData === null) {
    return <Skeleton className="w-full h-40" />;
  }

  if (productsData && productsData.length === 0) {
    return <DataTable columns={columns} data={productsData} filterKey="title" />
  }

  return (
    <div className="p-4">
      {productsData && <DataTable columns={columns} data={productsData} filterKey="title" />}
    </div>
  );
};

export default FetchData;
