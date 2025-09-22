import { getUsers } from "@/actions/users-action";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/generated/prisma";

export default async function DataTableDemo() {
  // get users from actions
  const users = await getUsers();

  // todo : make users list 
  const data: User[] = users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    image: user.image,
    emailVerified: user.emailVerified
  }));

  return (
    <div className="p-4">
      {users ? (
        <DataTable columns={columns} data={data} filterKey="email" />
      ) : (
        <Skeleton className="h-6 w-[200px]" />
      )}
    </div>
  );
}
