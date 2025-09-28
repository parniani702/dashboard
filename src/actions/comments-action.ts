"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { comments } from "../db/schema";
import { z } from 'zod'


// ? ==========================> CREATE COMMENT
export const CreateCommentS = async (formData: FormData) => {
    try {
        const dataSchema = z.object({
            productId: z.string(),
            userId: z.string(),
            content: z.string().min(1, "متن کانت نمیتونه خالی باشه").max(255, "کامنت نباید بیشتر از 255 کاراکتر باشه")
        })

        const data = {
            productId: formData.get("productId"),
            userId: formData.get("userId"),
            content: formData.get("content")
        }

        const parsed = dataSchema.safeParse(data)
        if(!parsed.success) {
            return {
                success: false,
                message: parsed.error.issues.map(iss => iss.message).join(" ,")
            }
        }
        await db.insert(comments).values({productId: parsed.data.productId, userId: parsed.data.userId, content: parsed.data.content})

        return {
            success: true,
            message: 'کامنت شما با موفقیت ثبت شد'
        }
        
    } catch (err) {
        return {
            success: false,
            message: 'مشکلی پیش آمده است'
        }
    }
}

// ? ===========================> GET COMMENTS
export const getComments = async () => {
    const data = await db.select().from(comments)
    return JSON.parse(JSON.stringify(data))
}

// ? -----------------------------------------> update comment
export const UpdateComment = async (formdata: FormData) => {
    try {
        const dataSchema = z.object({
            id: z.string().max(255),
            content: z.string().min(1, "مختوای کامنت نباید خالی باشد").max(255, "محتوای کامنت بیشت از حد مجاز است حد مجاز 255")
        })
        const data = {
            id: formdata.get("id"),
            content: formdata.get("content")
        }
        const parsed = dataSchema.safeParse(data)

        if(!parsed.success) {
            return {
                success: false,
                message: parsed.error.issues.map(iss => iss.message).join(" ,")
            }
        }

        await db.update(comments).set({content: parsed.data.content}).where(eq(comments.id, Number(parsed.data.id)))

        return {
            success: true,
            message: 'کامنت با موفقیت اپدیت شد'
        }
        
    } catch (err) {
        return {
            success: false,
            message: 'مشکلی در بروزرسانی کامنت پیش آمده'
        }
    }
}


// ? -----------------------------------------> delete comment
export const DeleteComment =  async (commentId: number) => {
    try {

        await db.delete(comments).where(eq(comments.id, commentId))

        return {
            success: true,
            message: "کامنت با موفقیت حذف شد"
        }

    } catch(err) {
        if(err instanceof Error) {
            return {
                success: false,
                message: 'مشکلی در حذف کاربر پیش آمده'
            }
        }
    }
}