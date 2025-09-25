"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import UserActions from "./_components/UserActions";
import { Tickets } from "@/types";

export const columns: ColumnDef<Tickets>[] = [
  // users table for showing users list columns
  {
    accessorKey: "ایدی",
    header: "ایدی",
    cell: ({ row }) => <span className="capitalize">{row.getValue("id")}</span>,
  },
  
  {
    accessorKey: "موضوع",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        موضوع
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="lowercase">{row.getValue("title")}</span>
    ),
  },

  {
    accessorKey: "پیغام",
    header: "پیغام",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("message")}</span>
    ),
  },

  {
    accessorKey: "ایدی فرستنده",
    header: "ایدی فرستنده",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("userId")}</span>
    ),
  },
  {
    accessorKey: "وضعیت",
    header: "وضعیت",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("status")}</span>
    ),
  },

  // user actions for edit delete
  {
    id: "عملیات",
    header: "عملیات",
    cell: ({ row }) => {
      const tickets = row.original;
      return <UserActions tickets={tickets} />;
    },
  },
];
