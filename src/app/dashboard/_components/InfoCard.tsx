"use client";

import { getComments } from "@/actions/comments-action";
import { getProducts } from "@/actions/products-action";
import { getTickets } from "@/actions/tickets-action";
import { getUsers } from "@/actions/users-action";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Users, Ticket, MessageCircle } from "lucide-react";

const InfoCards = () => {
  const {data: productsData} = useQuery({
    queryKey: ['productsData'],
    queryFn: getProducts,
  })
  const {data: usersData} = useQuery({
    queryKey: ['usersData'],
    queryFn: getUsers,
  })
  const {data: ticketsData} = useQuery({
    queryKey: ['ticketsData'],
    queryFn: getTickets,
  })
  const {data: commentsData} = useQuery({
    queryKey: ['commentsData'],
    queryFn: getComments,
  })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-4">
      <Card className="p-4 text-xs md:text-lg">
        <CardTitle className="flex justify-between items-center mb-2">
          <ShoppingBag className="text-blue-500" /> محصولات
        </CardTitle>
        <CardContent className="flex justify-between items-center">
          <span>کل محصولات</span>
          <span>{productsData?.length ?? <Skeleton className="w-10 h-4 rounded" />}</span>
        </CardContent>
      </Card>

      <Card className="p-4 text-xs md:text-lg">
        <CardTitle className="flex justify-between items-center mb-2">
          <Users className="text-green-500" /> کاربران
        </CardTitle>
        <CardContent className="flex justify-between items-center">
          <span>کل کاربران</span>
          <span>{usersData?.length ?? <Skeleton className="w-10 h-4 rounded" />}</span>
        </CardContent>
      </Card>

      <Card className="p-4 text-xs md:text-lg">
        <CardTitle className="flex justify-between items-center mb-2">
          <Ticket className="text-yellow-500" /> تیکت‌ها
        </CardTitle>
        <CardContent className="flex justify-between items-center">
          <span>کل تیکت‌ها</span>
          <span>{ticketsData?.length ?? <Skeleton className="w-10 h-4 rounded" />}</span>
        </CardContent>
      </Card>

      <Card className="p-4 text-xs md:text-lg">
        <CardTitle className="flex justify-between items-center mb-2">
          <MessageCircle className="text-purple-500" /> کامنت‌ها
        </CardTitle>
        <CardContent className="flex justify-between items-center">
          <span>کل کامنت‌ها</span>
          <span>{commentsData?.length ?? <Skeleton className="w-10 h-4 rounded" />}</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCards;
