"use client";

import { Bell, Gauge } from "lucide-react";
import MobileSideBar from "./mobile-sidebar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="container mx-auto my-6">
      <Card className="w-full shadow-lg border">
        <CardContent className="flex justify-between items-center">
          {/* Logo  Title */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-sm sm:text-lg font-semibold"
          >
            <Gauge className="text-blue-500" strokeWidth={3} />
            داشبورد کاربری
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isPending ? (
              ""
            ) : (
              <div className="xl:hidden">
                <MobileSideBar />
              </div>
            )}
            {/* Notifications */}
            <Button variant="outline" size="icon">
              <Bell />
            </Button>

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
                  خوش آمدید
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
