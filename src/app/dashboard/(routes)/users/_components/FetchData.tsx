"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { Skeleton } from "@/components/ui/skeleton";
import { getUsers } from "@/actions/users-action";

export default function UsersTable() {
  const { data: usersData, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <Skeleton className="w-full h-40" />;
  }

  if (error) {
    return <p className="p-4 text-red-500">خطا در گرفتن داده‌ها</p>;
  }

  if (usersData.length === 0) {
    return (
      <DataTable columns={columns} data={usersData} filterKey="email" />
    );
  }

  return (
    <div className="p-4">
      <DataTable columns={columns} data={usersData} filterKey="email" />
    </div>
  );
}
