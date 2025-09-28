"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { getDiscount } from "@/actions/discount-action";

const FetchData = () => {

  const {data: discountsData, isPending, error} = useQuery({
    queryKey: ['getDiscount'],
    queryFn: getDiscount,
  })


  if (isPending) {
    return <Skeleton className="w-full h-40" />;
  }

  if (error) {
    return <span>{error.message}</span>
  }

  if (discountsData.length === 0) {
      return <DataTable columns={columns} data={discountsData} filterKey="code" />
  }

  return (
    <div className="p-4">
      {discountsData && <DataTable columns={columns} data={discountsData} filterKey="code" />}
    </div>
  );
};

export default FetchData;
