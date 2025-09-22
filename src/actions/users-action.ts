"use server";

import { prisma } from '@/lib/prisma'
import { string, User } from 'better-auth';
import { z } from 'zod'

// todo get all user
export const getUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}


// todo update user
export const UpdateUserS = async (formdata: FormData) => {
    try {
        const userSchema = z.object({
            id: z.string(),
            name: z.string().min(1, "فیلد نام و نام خانوادگی خالی است").max(60, 'نام شما خیلی بلند است لطفا یک نام کوتاه تر انتخاب کنید'),
            role: z.enum(["user", "admin"])
        })
        const data = {
            id: formdata.get("id"),
            name: formdata.get("name"),
            role: formdata.get("role")
        }
        const parsed = userSchema.safeParse(data)

        if(!parsed.success) {
            return {
                success: false,
                message: parsed.error.issues.map(iss => iss.message).join(" ,")
            }
        }

        await prisma.user.update({
            where: {
                id: parsed.data?.id
            },
            data: {
                name: parsed.data?.name,
                role: parsed.data?.role
            }
        })

        return {
            success: true,
            message: 'اطلاعات با موفقیت ویرایش شد'
        }

    } catch(err) {
        return {
            success: false,
            message: 'مشکلی در بروزرسانی کاربر پیش امده'
        }
    }
}

// ! delete user
export const DeleteUserS = async (user: User) => {
    try {
        await prisma.user.delete({
            where: {
                id: user.id
            }
        })
        return {
            success: true,
            message: "کاربر با موفقیت حذف شد"
        }

    } catch (err) {
        return {
            success: false
        }
    }
}