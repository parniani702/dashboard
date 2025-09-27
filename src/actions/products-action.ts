"use server";


import { eq } from "drizzle-orm";
import { z } from "zod";
import { products } from "../db/schema";
import { db } from "../db";


// ? -----------------------------------------> UPDATE PRODUCT
export const UpdateProductS = async (formdata: FormData) => {
  try {
    const ProductSchema = z.object({
      id: z.number().max(255),
      title: z.string().min(1, "نام محصول نباید خالی باشه").max(60, "نام محصول خیلی بلند است"),
      description: z
        .string()
        .min(1, "توضیحات نباید خالی باشه")
        .max(255, "توضیحات محصول نباید بیشتر از 255 کاراکتر باشه"),
      price: z.number().min(0, "قیمت محصول رو درست وارد کنید").max(1_000_000_000, "بیشتر از یک میلیارد تومان!"),
      stock: z.number().min(0, "موجودی محصول رو درست وارد کنید").max(1_000_000_000, "بیشتر از یک میلیارد محصول!"),
      sold: z.number(),
    });

    const data = {
      id: Number(formdata.get("id")),
      title: formdata.get("title"),
      description: formdata.get("description"),
      price: Number(formdata.get("price")),
      stock: Number(formdata.get("stock")),
      sold: Number(formdata.get("sold")),
    };

    const parsed = ProductSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues.map((iss) => iss.message).join(" ,"),
      };
    }

    await db.update(products)
      .set({
        title: parsed.data.title,
        description: parsed.data.description,
        price: parsed.data.price,
        stock: parsed.data.stock,
        sold: parsed.data.sold,
      })
      .where(eq(products.id, parsed.data.id));

    return {
      success: true,
      message: "محصول با موفقیت بروزرسانی شد",
    };
  } catch {
    return {
      success: false,
      message: "مشکلی در بروز رسانی محصول پیش آمد",
    };
  }
};

// ? -----------------------------------------> DELETE PRODUCT
export const DeleteProductS = async (productId: number) => {
  try {
    await db.delete(products).where(eq(products.id, productId));
    return {
      success: true,
      message: "محصول با موفقیت حذف شد",
    };
  } catch {
    return {
      success: false,
      message: "مشکلی در حذف محصول پیش آمد",
    };
  }
};

// ? -----------------------------------------> CREATE PRODUCT
export const CreateProductS = async (formdata: FormData) => {
  try {
    const ProductSchema = z.object({
      title: z.string().min(1, "اسم محصول نباید خالی باشه").max(60, "اسم محصول خیلی بلند است"),
      description: z.string().min(1, "توضیحات محصول رو خالی نزار").max(300, "توضیحات محصول خیلی زیاده"),
      price: z.number().nonnegative("قیمت محصول رو بصورت صحیح وارد کن").max(1_000_000_000, "قیمت محصول فضایی است"),
      stock: z.number().nonnegative("موجودی محصول رو بصورت صحیح وارد کن").max(1_000_000_000, "ماشالا به این تولیدی"),
      sold: z.number().max(11).optional(),
    });

    const data = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
      price: Number(formdata.get("price")),
      stock: Number(formdata.get("stock")),
      sold: 0,
    };

    const parsed = ProductSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues.map((iss) => iss.message).join(" ,"),
      };
    }

    await db.insert(products).values({
      title: parsed.data.title,
      description: parsed.data.description,
      price: parsed.data.price,
      stock: parsed.data.stock,
      sold: 0,
    });

    return {
      success: true,
      message: "محصول با موفقیت ساخته شد",
    };
  } catch {
    return {
      success: false,
      message: "مشکلی در ساخت محصول پیش آمد",
    };
  }
};