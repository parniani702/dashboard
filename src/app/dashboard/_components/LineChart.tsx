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
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useSpring, useMotionValueEvent } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  محصولات: {
    label: "تعداد محصولات",
    color: "#FFA500",
  },
} satisfies ChartConfig;

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export default function LineChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [axis, setAxis] = useState(0);
  const [chartData, setChartData] = useState<{ month: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const springX = useSpring(0, { damping: 30, stiffness: 100 });
  const springY = useSpring(0, { damping: 30, stiffness: 100 });

  useMotionValueEvent(springX, "change", (latest) => setAxis(latest));

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/products");
        const products = await res.json();

        const dataByMonth = persianMonths.map((month, index) => {
          const productsInMonth = products.filter((p: any) => {
            const date = new Date(p.createdAt);
            const monthIndex = (date.getMonth() + 9) % 12; // تقریبی میلادی → شمسی
            return monthIndex === index;
          });

          return { month, count: productsInMonth.length };
        });

        setChartData(dataByMonth);
        springY.set(dataByMonth[dataByMonth.length - 1].count);
      } catch (err) {
        console.error("خطا در دریافت داده‌ها:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {loading ? <Skeleton className="h-6 w-24" /> : `${springY.get()} محصول`}
        </CardTitle>
        <CardDescription>تعداد محصولات ایجادشده در هر ماه</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-54 w-full flex flex-col gap-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        ) : (
          <ChartContainer ref={chartRef} className="h-54 w-full" config={chartConfig}>
            <AreaChart
              className="overflow-visible"
              data={chartData}
              onMouseMove={(state) => {
                const x = state.activeCoordinate?.x;
                const dataValue = state.activePayload?.[0]?.value;
                if (x && dataValue !== undefined) {
                  springX.set(x);
                  springY.set(dataValue);
                }
              }}
              onMouseLeave={() => {
                springX.set(chartRef.current?.getBoundingClientRect().width || 0);
                springY.set(chartData[chartData.length - 1]?.count || 0);
              }}
              margin={{ right: 0, left: 0 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                horizontalCoordinatesGenerator={({ height }) => [0, height - 30]}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Area
                dataKey="count"
                type="monotone"
                fill="url(#gradient-cliped-area-products)"
                fillOpacity={0.4}
                stroke={chartConfig.محصولات.color}
                clipPath={`inset(0 ${
                  Number(chartRef.current?.getBoundingClientRect().width) - axis
                } 0 0)`}
              />
              <defs>
                <linearGradient id="gradient-cliped-area-products" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.محصولات.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={chartConfig.محصولات.color} stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
