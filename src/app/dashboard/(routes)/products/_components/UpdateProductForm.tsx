"use client";

import { UpdateProductS } from "@/actions/products-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Products } from "@/types";


const UpdateProductForm = ({ products }: { products: Products }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        action={async (FormData) => {
          const res = await UpdateProductS(FormData);
          if (res?.success) {
            toast.success("کاربر با موفقیت اپدیت شد");
            setIsLoading(false);
            location.reload();
          } else {
            toast.error(res?.message);
            setIsLoading(false);
          }
        }}
      >
        {/* hiden inputs */}
        <input type="hidden" value={products.id} name="id" />
        <input type="hidden" value={products.sold} name="sold" />
        <div className="space-y-2">
          <Label>نام محصول</Label>
          <Input
            defaultValue={products.title}
            name="title"
            placeholder="نام محصول رو وارد کن"
          />
        </div>
        <div className="space-y-2">
          <Label>توضیحات محصول</Label>
          <Input name="description" placeholder="توضیحات محصول رو وارد کن" />
        </div>
        <div className="space-y-2">
          <Label>قیمت محصول به تومان</Label>
          <Input
            defaultValue={0}
            type="number"
            name="price"
            placeholder="قیمت محصول رو وارد کن"
          />
        </div>
        <div className="space-y-2">
          <Label>مقدار محصول</Label>
          <Input
            defaultValue={products.stock}
            name="stock"
            type="number"
            placeholder="مقدار محصول رو وارد کن"
          />
        </div>
        <Button
          onClick={() => setIsLoading(true)}
          variant="outline"
          type="submit"
          className="w-full"
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              {" "}
              ذخیره
              <Save />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
