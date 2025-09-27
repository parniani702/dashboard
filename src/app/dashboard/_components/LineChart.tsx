"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";



export default function LineChart() {
  const [solds, setSolds] = useState()

  useEffect(() => {
    const fetchSolds = async () => {
      const res = await fetch("/api/getallsolds")
      const data = await res.json()
      setSolds(data)
    }
    fetchSolds()
  }, [])

  console.log(solds)

  const chartData = [
    { month: "فروردین", count: 186, sold: solds },
    { month: "اردیبهشت", count: 305, sold: 110 },
    { month: "خرداد", count: 237, sold: solds },
    { month: "تیر", count: 73, sold: 80 },
    { month: "مرداد", count: 209, sold: 180 },
    { month: "شهریور", count: 214, sold: solds },
  ];
  const chartConfig = {
    count: {
      label: "مقدار محصول",
      color: "orange",
    },
    sold: {
      label: "مقدار فروش",
      color: "green",
    },
  } satisfies ChartConfig;

  return (
    <Card className="mx-5 sm:mx-1">
      <CardTitle className="flex flex-col  gap-2 text-center">
        <span>نمودار فروش محصولات</span>
        <span className="text-xs text-muted-foreground">دقت داشته باشید که مقدار فروش رفته محصولات با رنگ سبز و مقدار کل موجودی سبد به رنگ نارجی است</span>
      </CardTitle>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          <Bar dataKey="sold" fill="var(--color-sold)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
