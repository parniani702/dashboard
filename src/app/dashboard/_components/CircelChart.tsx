"use client";

import { useEffect, useState } from "react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "نمودار دایره‌ای با تعداد کاربران، محصولات، تخفیف‌ها و نظرات";

const chartConfig = {
  کاربران: { label: "کاربران", color: "var(--chart-1)" },
  محصولات: { label: "محصولات", color: "var(--chart-2)" },
  تخفیف‌ها: { label: "تخفیف‌ها", color: "var(--chart-3)" },
  نظرات: { label: "نظرات", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function PieChartComponent() {
  const [chartData, setChartData] = useState<
    { category: string; value: number; fill: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {

        const usersRes = await fetch("/api/users");
        const users = await usersRes.json();

        const productsRes = await fetch("/api/products");
        const products = await productsRes.json();

        const discountsRes = await fetch("/api/discounts");
        const discounts = await discountsRes.json();

        const commentsRes = await fetch("/api/comments");
        const comments = await commentsRes.json();


        setChartData([
          { category: "کاربران", value: users.length, fill: chartConfig.کاربران.color },
          { category: "محصولات", value: products.length, fill: chartConfig.محصولات.color },
          { category: "تخفیف‌ها", value: discounts.length, fill: chartConfig.تخفیف‌ها.color },
          { category: "نظرات", value: comments.length, fill: chartConfig.نظرات.color },
        ]);
      } catch (err) {
        console.error("خطا در دریافت داده‌ها:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          {loading ? <Skeleton className="h-6 w-24" /> : "نمودار دایره‌ای"}
          {!loading && (
            <Badge
              variant="outline"
              className="text-green-500 bg-green-500/10 border-none ml-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>5.2%</span>
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <div className="mx-auto aspect-square max-h-[250px] flex flex-col gap-2 justify-center items-center">
            <Skeleton className="h-48 w-48 rounded-full" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="category" hideLabel={false} />}
              />
              <Pie
                data={chartData}
                innerRadius={30}
                dataKey="value"
                radius={10}
                cornerRadius={8}
                paddingAngle={4}
              >
                <LabelList
                  dataKey="value"
                  stroke="none"
                  fontSize={12}
                  fontWeight={500}
                  fill="currentColor"
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
