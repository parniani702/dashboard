// app/dashboard/users/DataTableDemo.tsx
import { db } from "../../../../../db";
import { user } from "../../../../../db/schema";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { InferSelectModel } from "drizzle-orm";

type User = InferSelectModel<typeof user>;

export default async function DataTableDemo() {

  const usersData = await db.select().from(user);

  const data: User[] = usersData.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    image: user.image,
    emailVerified: user.emailVerified,
  }));

  return (
    <div className="p-4">
      {usersData.length ? (
        <DataTable columns={columns} data={data} filterKey="email" />
      ) : (
        <Skeleton className="h-6 w-[200px]" />
      )}
    </div>
  );
}
