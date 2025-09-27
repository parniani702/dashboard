"use server";


import { eq } from "drizzle-orm";
import { z } from "zod";
import { user } from "../db/schema";
import { db } from "../db";


// ? -----------------------------------------> UPDATE USER
export const UpdateUserS = async (formdata: FormData) => {
  try {
    const userchema = z.object({
      id: z.string(),
      name: z
        .string()
        .min(1, "فیلد نام و نام خانوادگی خالی است")
        .max(60, "نام شما خیلی بلند است لطفا یک نام کوتاه تر انتخاب کنید"),
      role: z.enum(["user", "admin"]),
    });

    const data = {
      id: formdata.get("id"),
      name: formdata.get("name"),
      role: formdata.get("role"),
    };

    const parsed = userchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues.map((iss) => iss.message).join(" ,"),
      };
    }

    await db
      .update(user)
      .set({
        name: parsed.data.name,
        role: parsed.data.role,
      })
      .where(eq(user.id, parsed.data.id));

    return {
      success: true,
      message: "اطلاعات با موفقیت ویرایش شد",
    };
  } catch {
    return {
      success: false,
      message: "مشکلی در بروزرسانی کاربر پیش امده",
    };
  }
};

// ? -----------------------------------------> DELETE USER
export const DeleteUserS = async (userId: string) => {
  try {
  
    await db.delete(user).where(eq(user.id, userId));
    return {
      success: true,
      message: "کاربر با موفقیت حذف شد",
    };
  } catch {
    return {
      success: false,
    };
  }
};
