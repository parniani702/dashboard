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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mx-5 sm:mx-1">
      {/* users */}
      <Card>
        <h1 className="text-center font-medium text-lg text-muted-foreground">
          لیست 10 کاربر اخیر
        </h1>
        <div className="overflow-x-auto" dir="rtl">
          <Table>
            <TableHeader className="">
              <TableRow className="">
                <TableHead>نام</TableHead>
                <TableHead>ایمیل</TableHead>
                <TableHead>نقش</TableHead>
              </TableRow>
            </TableHeader>
            {isPending ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableBody>
                {userData?.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </Card>
      {/* products */}
      <Card>
        <h1 className="text-center font-medium text-lg text-muted-foreground">
          لیست 10 محصول اخیر
        </h1>
        <div className="overflow-x-auto" dir="rtl">
          <Table>
            <TableHeader className="">
              <TableRow className="">
                <TableHead>اسم</TableHead>
                <TableHead>موجودی</TableHead>
                <TableHead>فروش رفته</TableHead>
              </TableRow>
            </TableHeader>
            {isPending ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableBody>
                {productsData?.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.sold}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </Card>
      {/* users */}
      <Card>
        <h1 className="text-center font-medium text-lg text-muted-foreground">
          لیست 10 تیکت اخیر
        </h1>
        <div className="overflow-x-auto" dir="rtl">
          <Table>
            <TableHeader className="">
              <TableRow className="">
                <TableHead>موضوع</TableHead>
                <TableHead>پیغام</TableHead>
                <TableHead>وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            {isPending ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableBody>
                {ticketsData?.map((ticket, index) => (
                  <TableRow key={index}>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.message}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
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
