"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Users, Ticket, Percent, MessageCircle } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

const InfoCards = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getdata");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const cards = [
    {
      title: "محصولات",
      icon: <ShoppingBag />,
      key: "productsData",
      label: "کل محصولات",
    },
    {
      title: "کاربران",
      icon: <Users />,
      key: "usersData",
      label: "کل کاربران",
    },
    {
      title: "تیکت‌ها",
      icon: <Ticket />,
      key: "ticketsData",
      label: "کل تیکت‌ها",
    },
    {
      title: "کامنت‌ها",
      icon: <MessageCircle />,
      key: "commentsData",
      label: "کل کامنت‌ها",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-5 sm:mx-1">
              {cards.map((card, index) => (
        <Card className="text-xs md:text-lg" key={index}>
          <CardTitle className="flex justify-between mx-5 my-3 items-center">
            {card.icon}
            <span>{card.title}</span>
          </CardTitle>
          <CardContent className="flex justify-between mx-5 my-3 items-center">
            <span>{card.label}</span>
            <span className="font-bold">
              {data ? data[card.key]?.length : <Skeleton className="w-10 h-3" />}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InfoCards;
