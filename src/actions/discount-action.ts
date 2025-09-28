"use server";

import { db } from "@/db";
import { discounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// ? =============================> GET DISCOUNTS
export const getDiscount = async () => {
  const data = await db.select().from(discounts)
  return JSON.parse(JSON.stringify(data))
}

// ? -----------------------------------------> create discount
export const CreateDiscountS = async (formdata: FormData) => {
  try {
    const data = {
      code: (formdata.get("code")),
      percentage: Number(formdata.get("percentage")),
      usageLimit: Number(formdata.get("usageLimit")),
      validFrom: (formdata.get("fromDate")),
      validTo: (formdata.get("toDate")),
    };

    const dataSchema = z.object({
      code: z
        .string()
        .min(1, "کد تخفیف رو وارد کنید")
        .max(255, "کد تخفیف نباید بیشتر از 255 کاراکتر باشد"),
      percentage: z
        .number()
        .min(1, "مقدار درصد تخفیف باید چیزی بین 1 تا 100 باشد")
        .max(100, "مقدار درصد تخفیف باید چیزی بین 1 تا 100 باشد"),
      usageLimit: z
        .number()
        .min(1, "مقدار محدودیت استفاده کد تخفیف باید از یک شروع شود")
        .max(1_000_000_000, "مقدار کد تخفیف خیلی زیاد است"),
      validFrom: z.string().min(1, "تاریخ شروع خالی است"),
      validTo: z.string().min(1, "تاریخ پایان خالی است"),
    });

    const parsed = dataSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues.map((iss) => iss.message).join(" , "),
      };
    }

    await db.insert(discounts).values({
      code: parsed.data.code,
      precentage: parsed.data.percentage,
      usageLimit: parsed.data.usageLimit,
      usedCount: 0,
      validForm: parsed.data.validFrom,
      validTo: parsed.data.validTo
    })

    return {
      success: true,
      message: "کد تخفیف با موفقیت ایجاد شد",
    };
  } catch (err) {
    return {
      success: false,
      message: "خطایی در ساخت کد تخفیف پیش آمده",
    };
  }
};

// ? -----------------------------------------> update discount
export const UpdateDiscountS = async (formdata: FormData) => {
  try {
    const data = {
      id: Number(formdata.get("id")),
      code: (formdata.get("code")),
      percentage: Number(formdata.get("percentage")),
      usageLimit: Number(formdata.get("usageLimit")),
      validFrom: (formdata.get("fromDate")),
      validTo: (formdata.get("toDate")),
    };

    const dataSchema = z.object({
      id: z.number(),
      code: z
        .string()
        .min(1, "کد تخفیف رو وارد کنید")
        .max(255, "کد تخفیف نباید بیشتر از 255 کاراکتر باشد"),
      percentage: z
        .number()
        .min(1, "مقدار درصد تخفیف باید چیزی بین 1 تا 100 باشد")
        .max(100, "مقدار درصد تخفیف باید چیزی بین 1 تا 100 باشد"),
      usageLimit: z
        .number()
        .min(1, "مقدار محدودیت استفاده کد تخفیف باید از یک شروع شود")
        .max(1_000_000_000, "مقدار کد تخفیف خیلی زیاد است"),
      validFrom: z.string().min(1, "تاریخ شروع خالی است"),
      validTo: z.string().min(1, "تاریخ پایان خالی است"),
    });

    const parsed = dataSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues.map((iss) => iss.message).join(" , "),
      };
    }
    await db.update(discounts).set({
      code: parsed.data.code,
      precentage: parsed.data.percentage,
      usageLimit: parsed.data.usageLimit,
      usedCount: 0,
      validForm: parsed.data.validFrom,
      validTo: parsed.data.validTo
    }).where(eq(discounts.id, parsed.data.id))
    return {
      success: true,
      message: "کد تخفیف با موفقیت ایجاد شد",
    };
  } catch (err) {
    return {
      success: false,
      message: "خطایی در ساخت کد تخفیف پیش آمده",
    };
  }
}

// ? -----------------------------------------> delete discount
export const DeleteDiscount = async (discountId: number) => {
  try {
    await db.delete(discounts).where(eq(discounts.id, discountId))
    return {
      success: true,
      message: "کد تخفیف با موفقیت حذف شد",
    };
  } catch {
    return {
      success: false,
    };
  }
}