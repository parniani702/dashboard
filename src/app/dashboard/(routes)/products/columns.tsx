"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import ProductActions from "./_components/ProductActions";
import { Products } from "@/types";


export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "id",
    header: "ایدی",
    cell: ({ row }) => <span className="capitalize">{row.getValue("id")}</span>,
  },
  
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
      >
        اسم محصول
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableColumnFilter: true,
    cell: ({ row }) => (
      <span className="lowercase">{row.getValue("title")}</span>
    ),
  },

  {
    accessorKey: "description",
    header: "توضیحات",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("description")}</span>
    ),
  },

  {
    accessorKey: "price",
    header: "قیمت",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("price")}</span>
    ),
  },
  {
    accessorKey: "stock",
    header: "موجودی",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("stock")}</span>
    ),
  },
  {
    accessorKey: "sold",
    header: "فروخته شده",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("sold")}</span>
    ),
  },


  // user actions for edit delete
  {
    id: "action",
    header: "عملیات",
    cell: ({ row }) => {
      const products = row.original;
      return <ProductActions products={products} />;
    },
  },
];
