"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  پرداختی‌ها: {
    label: "مجموع پرداختی‌ها",
    color: "#4CAF50",
  },
} satisfies ChartConfig;


const mockPayments = [
  { month: "فروردین", total: 1200000 },
  { month: "اردیبهشت", total: 950000 },
  { month: "خرداد", total: 1600000 },
  { month: "تیر", total: 800000 },
  { month: "مرداد", total: 2100000 },
  { month: "شهریور", total: 1300000 },
  { month: "مهر", total: 1750000 },
  { month: "آبان", total: 2000000 },
  { month: "آذر", total: 1500000 },
  { month: "دی", total: 2200000 },
  { month: "بهمن", total: 1850000 },
  { month: "اسفند", total: 2500000 },
];

export default function LineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>مجموع پرداختی‌ها</CardTitle>
        <CardDescription>پرداختی‌های هر ماه در سال</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64 w-full" config={chartConfig}>
          <AreaChart data={mockPayments} margin={{ right: 0, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <Area
              dataKey="total"
              type="monotone"
              fill={chartConfig.پرداختی‌ها.color}
              fillOpacity={0.2}
              stroke={chartConfig.پرداختی‌ها.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
