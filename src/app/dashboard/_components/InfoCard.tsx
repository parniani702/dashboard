"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Users, Ticket, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

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
    { title: "محصولات", icon: <ShoppingBag className="text-blue-500" />, key: "productsData", label: "کل محصولات" },
    { title: "کاربران", icon: <Users className="text-green-500" />, key: "usersData", label: "کل کاربران" },
    { title: "تیکت‌ها", icon: <Ticket className="text-yellow-500" />, key: "ticketsData", label: "کل تیکت‌ها" },
    { title: "کامنت‌ها", icon: <MessageCircle className="text-purple-500" />, key: "commentsData", label: "کل کامنت‌ها" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-4">
      {cards.map((card, index) => (
        <Card className="text-xs md:text-lg hover:shadow-lg transition-shadow duration-300" key={index}>
          <CardTitle className="flex justify-between items-center mb-2 mx-4">
            {card.icon}
            <span className="font-semibold">{card.title}</span>
          </CardTitle>
          <CardContent className="flex justify-between items-center">
            <span className="text-gray-500">{card.label}</span>
            <span className="font-bold text-lg">
              {data ? data[card.key]?.length : <Skeleton className="w-10 h-4 rounded" />}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InfoCards;
