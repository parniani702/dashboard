"use client";

import { columns } from "../columns";
import { DataTable } from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/actions/products-action";

const FetchData = () => {

  const {data: productsData, isPending, error} = useQuery({
    queryKey: ['getProducts'],
    queryFn: getProducts,
  })

  if (isPending) {
    return <Skeleton className="w-full h-40" />;
  }

  if (error) {
    return (
      <div className="">
        {error.message}
      </div>
    )
  }

  if (productsData.length === 0) {
    return <DataTable columns={columns} data={productsData} filterKey="title" />
  }

  return (
    <div className="p-4">
      <DataTable columns={columns} data={productsData} filterKey="title" />
    </div>
  );
};

export default FetchData;
