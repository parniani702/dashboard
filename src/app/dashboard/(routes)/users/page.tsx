import { getUsers } from "@/actions/users-action";
import { columns, Users } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DataTableDemo() {
  // get users from actions
  const users = await getUsers();

  // todo : make users list 
  const data: Users[] = users.map((user) => ({
    id: user.id,
    email: user.email,
    fullname: user.name,
    role: user.role,
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
