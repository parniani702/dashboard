"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import UserActions from "./_components/UserActions";
import { Discounts } from "@/types";




export const columns: ColumnDef<Discounts>[] = [
  // users table for showing users list columns
  {
    accessorKey: "precentage",
    header: "درصد تخفیف",
    cell: ({ row }) => <span className="capitalize">{row.getValue("precentage")}</span>,
  },
  
  {
    accessorKey: "code",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        کد تخفیف
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="lowercase">{row.getValue("code")}</span>
    ),
  },

  {
    accessorKey: "usageLimit",
    header: "محدودیت تعداد استفاده",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("usageLimit")}</span>
    ),
  },

  {
    accessorKey: "usedCount",
    header: "تعداد استفاده شده",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("usedCount")}</span>
    ),
  },

  {
    accessorKey: "validForm",
    header: "از تاریخ",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("validForm")}</span>
    ),
  },
  {
    accessorKey: "validTo",
    header: "تا تاریخ",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("validTo")}</span>
    ),
  },

  // user actions for edit delete
  {
    id: "action",
    header: "عملیات",
    cell: ({ row }) => {
      const discounts = row.original;
      return <UserActions discounts={discounts} />;
    },
  },
];
