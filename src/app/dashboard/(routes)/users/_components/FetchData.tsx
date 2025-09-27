"use client";

import { User } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [usersData, setUsersData] = useState<User[] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/users");
        const data: User[] = await res.json();
        setUsersData(data);
      } catch (err) {
        console.error(err);
        setUsersData([]);
      }
    });
  }, []);

  if (isPending && usersData === null) {

    return <Skeleton className="w-full h-40" />;
  }

  if (usersData && usersData.length === 0) {
    return <DataTable columns={columns} data={usersData} filterKey="email" />
  }

  return (
    <div className="p-4">
      {usersData && <DataTable columns={columns} data={usersData} filterKey="email" />}
    </div>
  );
};

export default FetchData;
