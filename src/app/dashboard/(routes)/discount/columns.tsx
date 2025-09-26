"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Discounts } from "@/types";
import DiscountActions from "./_components/DiscountAction";
import moment from "moment-jalaali";

moment.loadPersian({ usePersianDigits: true });




export const columns: ColumnDef<Discounts>[] = [

  {
    accessorKey: "id",
    header: "ایدی",
    cell: ({ row }) => <span className="capitalize">{row.getValue("id")}</span>,
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
    accessorKey: "precentage",
    header: "٪ تخفیف",
    cell: ({ row }) => (
      <span className="capitalize bg-yellow-600 font-semibold px-1">{`${row.getValue("precentage")} %`}</span>
    ),
  },
  {
    accessorKey: "usageLimit",
    header: "تعداد دفعات",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("usageLimit")}</span>
    ),
  },
  {
    accessorKey: "validForm",
    header: "تاریخ شروع",
    cell: ({ row }) => {
      const date = row.getValue("validForm") as string;
      const formatted = moment(date).format("jYYYY/jMM/jDD");
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "validTo",
    header: "تاریخ انقضا",
    cell: ({ row }) => {
      const date = row.getValue("validTo") as string;
      const formatted = moment(date).format("jYYYY/jMM/jDD");
      return <span>{formatted}</span>;
    },
  },


  {
    id: "action",
    header: "عملیات",
    cell: ({ row }) => {
      const discounts = row.original;
      return <DiscountActions discounts={discounts} />;
    },
  },
];
