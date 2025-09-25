"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CommentActions from "./_components/CommentActions";
import { Comments } from "@/types";


export const columns: ColumnDef<Comments>[] = [
  // users table for showing users list columns
  {
    accessorKey: "ایدی",
    header: "ایدی",
    cell: ({ row }) => <span className="capitalize">{row.getValue("id")}</span>,
  },
  
  {
    accessorKey: "کامنت",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
      >
        کامنت
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableColumnFilter: true,
    cell: ({ row }) => (
      <span className="lowercase">{row.getValue("content")}</span>
    ),
  },

  {
    accessorKey: "ایدی کاربر",
    header: "ایدی کاربر",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("userId")}</span>
    ),
  },

  {
    accessorKey: "ایدی محصول",
    header: "ایدی محصول",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("productId")}</span>
    ),
  },

  // user actions for edit delete
  {
    id: "عملیات",
    header: "عملیات",
    cell: ({ row }) => {
      const comments  = row.original;
      return <CommentActions comments={comments} />;
    },
  },
];
