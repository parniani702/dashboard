"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Copy, Edit, LoaderCircle, MoreHorizontal, Trash } from "lucide-react";
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
import { Discounts } from "@/types";
import UpdateDiscount from "./UpdateDiscount";
import { DeleteComment } from "@/actions/comments-action";
import { DeleteDiscount } from "@/actions/discount-action";



const DiscountAction = ({ discounts }: { discounts: Discounts  }) => {

  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(discounts.code)}>
          <Button variant="ghost" className="w-full">
            کپی کردن ایدی کد تخفیف
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
              <AlertDialogTitle>حذف کد تخفیف</AlertDialogTitle>
              <AlertDialogDescription>آیا مطمئن هستید؟</AlertDialogDescription>
              <div className="flex justify-end gap-2 mt-4">
                <AlertDialogCancel>بستن</AlertDialogCancel>
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={async () => {
                      setIsLoading(true)
                      const res = await DeleteDiscount(discounts.id)
                      if (res?.success) {
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
                    {isLoading ? <LoaderCircle className="animate-spin" /> : "حذف کد تخفیف"}
                  </Button>
                </AlertDialogTrigger>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-full">
                ویرایش <Edit />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>ویرایش کد تخفیف</AlertDialogTitle>
              <AlertDialogDescription>
                لطفا تمامی اطلاعات رو با دقت پر کنید مقادیر پیشفرض دارند 
              </AlertDialogDescription>
              <UpdateDiscount discounts={discounts} />
              <div className="flex justify-end">
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

export default DiscountAction;
