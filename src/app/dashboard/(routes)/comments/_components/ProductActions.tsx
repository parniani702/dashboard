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
import UpdateProductForm from "./UpdateProductForm";
import { DeleteProductS } from "@/actions/products-action";
import { Product } from "@/generated/prisma";



const ProductActions = ({ products }: { products: Product  }) => {

  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(products.title)}>
          <Button variant="ghost" className="w-full">
            کپی کردن نام محصول
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
              <AlertDialogTitle>حذف محصول</AlertDialogTitle>
              <AlertDialogDescription>آیا مطمئن هستید؟</AlertDialogDescription>
              <div className="flex justify-end gap-2 mt-4">
                <AlertDialogCancel>بستن</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    onClick={async () => {
                      setIsLoading(true)
                      const res = await DeleteProductS(products.id)
                      if (res.success) {
                        toast.success(res.message)
                        setIsLoading(false)
                        location.reload()
                      } else {
                        toast.error(res.message)
                        setIsLoading(false)
                      }
                    }}
                    variant="destructive"
                  >
                    {isLoading ? <LoaderCircle className="animate-spin" /> : "حذف محصول"}
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
                ویرایش <Edit />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>ویرایش محصول</AlertDialogTitle>
              <AlertDialogDescription>
                لطفا تمامی اطلاعات را با دقت وارد کنید
              </AlertDialogDescription>
              <UpdateProductForm products={products} />
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

export default ProductActions;
