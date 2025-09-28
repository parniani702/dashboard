"use client";

import { authClient } from "@/lib/auth-client";
import {
  DiscAlbumIcon,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  ShoppingBag,
  Ticket,
  Users,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSideBar = () => {
  const { data: session, isPending } = authClient.useSession();
  const pathName = usePathname();
  const router = useRouter();

  const items = [
    { title: "صفحه اصلی", icon: <Home size={20} />, href: "/dashboard" },
    { title: "کاربران", icon: <Users size={20} />, href: "/dashboard/users" },
    {
      title: "محصولات",
      icon: <ShoppingBag size={20} />,
      href: "/dashboard/products",
    },
    {
      title: "کامنت ها",
      icon: <MessageSquare size={20} />,
      href: "/dashboard/comments",
    },
    {
      title: "تیکت ها",
      icon: <Ticket size={20} />,
      href: "/dashboard/tickets",
    },
    {
      title: "تخفیف ها",
      icon: <DiscAlbumIcon size={20} />,
      href: "/dashboard/discount",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-3 rtl">
      {/* Profile */}
      <div className="flex items-center justify-between rounded-xl p-3">
        <div className="flex items-center gap-3 flex-row-reverse">
          <div className="flex flex-col text-right">
            {isPending ? (
              <Skeleton className="h-3 w-16 rounded-md" />
            ) : (
              <span className="text-xs font-medium">{session?.user.name}</span>
            )}
          </div>
          {isPending ? (
            <Skeleton className="h-9 w-9 rounded-full" />
          ) : (
            <Avatar>
              <AvatarImage
                src={session?.user.image || "/profile.jpg"}
                alt="پروفایل"
              />
              <AvatarFallback>{session?.user.name?.[0]}</AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/profile">
            <span>
              <Settings className="hover:text-gray-400 transition" size={15} />
            </span>
          </Link>
          <span
            onClick={async () =>
              await authClient.signOut({
                fetchOptions: {
                  onRequest: () => {
                    toast.error("خروج انجام شد");
                  },
                  onSuccess: () => {
                    router.push("/login")
                  }
                },
              })
            }
          >
            <LogOut
              size={15}
              strokeWidth={2.5}
              className="hover:text-red-500 transition"
            />
          </span>
        </div>
      </div>

      <Separator />

      {/* Menu Items */}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 text-right">
          <span className="text-xs px-2">دسترسی سریع</span>
          {items.map((item, index) => {
            const active = pathName === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 flex-row-reverse rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default DashboardSideBar;
