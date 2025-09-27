"use client";

import { User } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { Skeleton } from "@/components/ui/skeleton";

const FetchData = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/users");
        const data: User[] = await res.json();
        setUsersData(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    });
  }, []);

  const data: User[] = usersData.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    banned: user.banned,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    image: user.image,
    emailVerified: user.emailVerified,
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
