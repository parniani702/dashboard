"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import UserActions from "./_components/UserActions";
import { User } from "@/types";



export const columns: ColumnDef<User>[] = [
  // users table for showing users list columns
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ایدی
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="capitalize">{row.getValue("id")}</span>,
    meta: {title: 'ایدی'},
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
    meta: {title: 'ایمیل'},
  },

  {
    accessorKey: "name",
    header: "نام نام خانوادگی",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("name")}</span>
    ),
    meta: {title: 'نام نام خانودگی'},

  },

  {
    accessorKey: "role",
    header: "نقش",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("role")}</span>
    ),
    meta: {title: 'نقش'},
  },

  // user actions for edit delete
  {
    id: "action",
    header: "عملیات",
    cell: ({ row }) => {
      const users = row.original;
      return <UserActions users={users} />;
    },
    meta: {title: 'عملیات'},
  },
];
