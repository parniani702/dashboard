"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Products, Tickets, User } from "@/types";
import { useEffect, useState, useTransition } from "react";

const TableList = () => {
  const [isPending, startTransition] = useTransition();
  const [userData, setUserData] = useState<User[]>();
  const [productsData, setProductsData] = useState<Products[]>();
  const [ticketsData, setTicketsData] = useState<Tickets[]>();

  useEffect(() => {
    startTransition(async () => {
      const userRes = await fetch("/api/users");
      const userData = await userRes.json();
      setUserData(userData);
      const productRes = await fetch("/api/products");
      const productData = await productRes.json();
      setProductsData(productData);
      const ticketRes = await fetch("/api/tickets");
      const ticketData = await ticketRes.json();
      setTicketsData(ticketData);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-5 sm:mx-2">
      {/* users */}
      <Card className="p-4">
        <h1 className="text-center font-semibold text-lg  mb-3">
          لیست 10 کاربر اخیر
        </h1>
        <div className="overflow-x-auto" dir="rtl">
          <Table className="min-w-full border border-gray-200 rounded-lg">
            <TableHeader>
              <TableRow className="">
                <TableHead className="py-2 px-3 text-gray-600">نام</TableHead>
                <TableHead className="py-2 px-3 text-gray-600">ایمیل</TableHead>
                <TableHead className="py-2 px-3 text-gray-600">نقش</TableHead>
              </TableRow>
            </TableHeader>
            {isPending ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i} className="border-b border-gray-100">
                  <TableCell className="py-2 px-3">
                    <Skeleton className="h-4 rounded" />
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <Skeleton className="h-4 rounded" />
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <Skeleton className="h-4 rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableBody>
                {userData?.map((user, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-2 px-3">{user.name}</TableCell>
                    <TableCell className="py-2 px-3">{user.email}</TableCell>
                    <TableCell className="py-2 px-3">{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </Card>

      {/* products */}
      <Card className="p-4">
        <h1 className="text-center font-semibold text-lg  mb-3">
          لیست 10 محصول اخیر
        </h1>
        <div className="overflow-x-auto" dir="rtl">
          <Table className="min-w-full border border-gray-200 rounded-lg">
            <TableHeader>
              <TableRow className="">
                <TableHead className="py-2 px-3 text-gray-600">اسم</TableHead>
                <TableHead className="py-2 px-3 text-gray-600">
                  موجودی
                </TableHead>
                <TableHead className="py-2 px-3 text-gray-600">
                  فروش رفته
                </TableHead>
              </TableRow>
            </TableHeader>
            {isPending ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i} className="border-b border-gray-100">
                  <TableCell className="py-2 px-3">
                    <Skeleton className="h-4 rounded" />
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <Skeleton className="h-4 rounded" />
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <Skeleton className="h-4 rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableBody>
                {productsData?.map((product, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-2 px-3">{product.title}</TableCell>
                    <TableCell className="py-2 px-3">{product.stock}</TableCell>
                    <TableCell className="py-2 px-3">{product.sold}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </Card>

      {/* tickets */}
      <Card className="p-4">
        <h1 className="text-center font-semibold text-lg  mb-3">
          لیست 10 تیکت اخیر
        </h1>
        <div className="overflow-x-auto" dir="rtl">
          <Table className="min-w-full border border-gray-200 rounded-lg">
            <TableHeader>
              <TableRow className="">
                <TableHead className="py-2 px-3 text-gray-600">موضوع</TableHead>
                <TableHead className="py-2 px-3 text-gray-600">پیغام</TableHead>
                <TableHead className="py-2 px-3 text-gray-600">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            {isPending ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i} className="border-b border-gray-100">
                  <TableCell className="py-2 px-3">
                    <Skeleton className="h-4 rounded" />
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <Skeleton className="h-4 rounded" />
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <Skeleton className="h-4 rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableBody>
                {ticketsData?.map((ticket, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-2 px-3">{ticket.title}</TableCell>
                    <TableCell className="py-2 px-3">
                      {ticket.message}
                    </TableCell>
                    <TableCell className="py-2 px-3">{ticket.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default TableList;
