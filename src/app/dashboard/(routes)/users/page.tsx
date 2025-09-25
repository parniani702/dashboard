import { db } from "../../../../db";
import { user } from "../../../../db/schema";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { User } from "@/types";


export default async function DataTableDemo() {

  const usersData = await db.select().from(user);

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
        <DataTable columns={columns} data={data} filterKey="email" />
    </div>
  );
}
