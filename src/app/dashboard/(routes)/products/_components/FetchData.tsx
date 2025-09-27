"use client";

import { Products } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [productsData, setProductsData] = useState<Products[]>([]);
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    startTransition(async () => {
      const res = await fetch("/api/products");
      const data: Products[] = await res.json();
      setProductsData(data); 
    });
  }, []);
  

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
      {isPending ? (
        <Skeleton className="w-full h-40" />
      ) : (
        <DataTable columns={columns} data={data} filterKey="email" />
      )}
    </div>
  );
};

export default FetchData;
