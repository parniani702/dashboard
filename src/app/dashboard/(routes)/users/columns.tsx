"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import UserActions from "./_components/UserActions";

export type Users = {
  id: string;
  email: string;
  fullname: string;
  role: string;
};

export const columns: ColumnDef<Users>[] = [
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
    accessorKey: "fullname",
    header: "نام نام خانوادگی",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("fullname")}</span>
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
