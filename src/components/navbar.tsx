"use client";

import { Bell, Gauge } from "lucide-react";
import MobileSideBar from "./MobileSidebar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "./ModeToggle";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session, isPending } = useQuery({
    queryKey: ["getSession"],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session.data;
    },
  });

  // get stocks
  const { data: stockQuantity } = useQuery({
    queryKey: ["getStockQuantity"],
    queryFn: async () => {
      const res = await fetch("/api/getStock");
      if (!res.ok) throw new Error("Failed to fetch stock data");
      return res.json() as Promise<
        {
          id: number;
          title: string;
          description: string;
          price: number;
          stock: number;
          sold: number;
          createdAt: string;
          updatedAt: string;
        }[]
      >;
    },
    staleTime: 5 * 1000
  });

  return (
    <div className="container mx-auto my-6">
      <Card className="w-full shadow-lg border">
        <CardContent className="flex justify-between items-center">
          {/* Logo  Title */}
          <Link
            href="/dashboard"
            className="hidden xl:flex items-center gap-3 text-sm sm:text-lg font-semibold"
          >
            <Gauge className="text-blue-500" strokeWidth={3} />
            داشبورد کاربری
          </Link>
          {isPending ? (
            ""
          ) : (
            <div className="xl:hidden">
              <MobileSideBar />
              {stockQuantity && stockQuantity.length > 0 && <span className="bg-gray-300 absolute">{stockQuantity.length}</span>}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                  {stockQuantity && stockQuantity.length > 0 && (
                    <span className="ml-1 text-red-500 font-bold">
                      {stockQuantity.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>اطلاعات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {stockQuantity && stockQuantity.length > 0 ? (
                  stockQuantity.map((s) => (
                    <DropdownMenuItem
                      key={s.id}
                      className="flex flex-col items-start"
                    >
                      <span className="font-medium">{s.title}</span>
                      <span className="text-xs text-gray-500">
                        موجودی: {s.stock}
                      </span>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>
                    هیچ محصولی موجود نیست
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* Separator */}
            <div className="w-px h-8 bg-gray-300 hidden sm:flex sm:mx-5" />

            {/* User Info */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              {isPending ? (
                <Skeleton className="h-8 w-22 rounded-md" />
              ) : session ? (
                <span className="bg-blue-600 text-white px-3 py-1 rounded">
                  <span className="mx-2">خوش آمدید</span>
                  {session.user.name}
                </span>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Navbar;
