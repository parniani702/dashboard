"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { tickets } from "../db/schema";
import { z } from 'zod'

export const DeleteTicketS = async (ticketId: string) => {
    try {
        await db.delete(tickets).where(eq(tickets.id, ticketId))
        return {
            success: true,
            message: 'تیکت با موفقیت حذف شد'
        }
    } catch(err) {
        if(err instanceof Error) {
            return {
                success: true,
                message: 'مشکلی در حذف تیکت پیش آمده است'
            }
        }
    }
}


export const AnswerTicketS = async (formdata: FormData) => {
    try {
        const answerSchema = z.object({
            id: z.string().max(255),
            reply: z.string().min(1, "پیغام نمیتواند خالی باشد")
        })
        const data = {
            id: formdata.get("id"),
            reply: formdata.get("reply")
        }

        const parsed = answerSchema.safeParse(data)

        if(parsed.error) {
            return {
                success: false,
                message: parsed.error.issues.map(iss => iss.message).join(" ,")
            }
        }

        await db.update(tickets).set({
            reply: parsed.data.reply,
            status: 'close'
        }).where(eq(tickets.id, parsed.data.id))

        return {
            success: true,
            messaeg: 'تیکت با موفقیت پاسخ داده شد'
        }
        
    } catch (err) {
     return {
        success: false,
        message: 'مشکلی در پاسخ به تیکت پیش آمده است'
     }   
    }
}