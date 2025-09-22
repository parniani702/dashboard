"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import UserActions from "./_components/UserActions";
import { User } from "@/generated/prisma";


export const columns: ColumnDef<User>[] = [
  // users table for showing users list columns
  {
    accessorKey: "id",
    header: "ایدی",
    cell: ({ row }) => <span className="capitalize">{row.getValue("id")}</span>,
  },
  
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ایمیل
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="lowercase">{row.getValue("email")}</span>
    ),
  },

  {
    accessorKey: "name",
    header: "نام نام خانوادگی",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("name")}</span>
    ),
  },

  {
    accessorKey: "role",
    header: "نقش",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("role")}</span>
    ),
  },

  // user actions for edit delete
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => {
      const users = row.original;
      return <UserActions users={users} />;
    },
  },
];
