"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CommentActions from "./_components/CommentActions";
import { Comments } from "@/types";


export const columns: ColumnDef<Comments>[] = [
  // users table for showing users list columns
  {
    accessorKey: "id",
    header: "ایدی",
    cell: ({ row }) => <span className="capitalize">{row.getValue("id")}</span>,
  },
  
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
      >
        ایدی کاربر
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableColumnFilter: true,
    cell: ({ row }) => (
      <span className="lowercase">{row.getValue("userId")}</span>
    ),
  },

  {
    accessorKey: "content",
    header: "محتوای کامنت",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("content")}</span>
    ),
  },

  {
    accessorKey: "productId",
    header: "ایدی محصول",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("productId")}</span>
    ),
  },

  // user actions for edit delete
  {
    id: "action",
    header: "عملیات",
    cell: ({ row }) => {
      const comments  = row.original;
      return <CommentActions comments={comments} />;
    },
  },
];
