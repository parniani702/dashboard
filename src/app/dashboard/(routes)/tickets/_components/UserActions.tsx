"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Copy, LoaderCircle, MoreHorizontal, Send, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { useState } from "react";
import { Tickets } from "@/types";
import { DeleteTicketS } from "@/actions/tickets-action";
import AnswerTicket from "./AnswerTicket";


const UserActions = ({ tickets }: { tickets: Tickets  }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(tickets.message)}>
          <Button variant="ghost" className="w-full">
            کپی کردن پیغام
            <Copy />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-full">
                حذف کردن <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>حذف تیکت</AlertDialogTitle>
              <AlertDialogDescription>آیا مطمئن هستید؟</AlertDialogDescription>
              <div className="flex justify-end gap-2 mt-4">
                <AlertDialogCancel>بستن</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    onClick={async () => {
                      setIsLoading(true)
                      const res = await DeleteTicketS( tickets.id)
                      if (res?.message) {
                        toast.success(res.message)
                        setIsLoading(false)
                        location.reload()
                      } else {
                        toast.error(res?.message)
                        setIsLoading(false)
                      }
                    }}
                    variant="destructive"
                  >
                    {isLoading ? <LoaderCircle className="animate-spin" /> : "حذف تیکت"}
                  </Button>
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-full">
                پاسخ به تیکت 
                <Send />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>پاسخ به تیکت</AlertDialogTitle>
              <AlertDialogDescription>
                لطفا متن را با دقت وارد کنید که امکان بازگشت وجود ندارد
              </AlertDialogDescription>
              <AnswerTicket tickets={tickets} />
              <div className="flex justify-end mt-4">
                <AlertDialogAction asChild>
                  <Button className="w-full">بستن</Button>
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserActions;
