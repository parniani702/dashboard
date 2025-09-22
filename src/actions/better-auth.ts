"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";


//  register
export const RegisterS = async (formdata: FormData) => {
    try {
        const name = formdata.get("name")?.toString()
        const email = formdata.get("email")?.toString()
        const password = formdata.get("password")?.toString()

        if(!name || !email || !password) {
            return {
                success: false,
                message: 'لطفا تمامی مقادیر رو پر کنید'
            }
        }

        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        })

        return {
            success: true,
            message: 'ثبت نام با موفقیت انجام شد'
        }

    } catch (err) {
        if(err instanceof Error) {
            return {
                success: false,
                message: err.message
            }
        }
    }
}

// login
export const LoginS = async (formdata: FormData) => {
    try {
        const email = formdata.get("email")?.toString()
        const password = formdata.get("password")?.toString()

        if(!email || !password) {
            return {
                success: false,
                message: 'لطفا تمامی مقادیر رو پر کنید'
            }
        }
        await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })

        return {
            success: true,
            message: 'ورود با موفقیت انجام شد'
        }
    } catch (err) {
        if(err instanceof Error) {
            return {
                success: false,
                message: err.message
            }
        }
    }
}

// update 
export const ChangePassword = async (formdata: FormData) => {
    const newPassword = formdata.get("newpassword")?.toString() 
    const currentPassword = formdata.get("oldpassword")?.toString() 

    if(!newPassword || !currentPassword) {
        return {
            success: false,
            message: 'مقادیر نمیتواند خالی باشد'
        }
    }

    try {
        await auth.api.changePassword({
            body: {
                newPassword,
                currentPassword,
                revokeOtherSessions: true
            },
            headers: await headers()
        })

        return {
            success: true,
            message: 'پسورد با موفقیت عوض شد'
        }
    } catch (err) {
        if(err instanceof Error) {
            return {
                success: false,
                message: err.message
            }
        }
    }
}

export const ChangeName = async (formdata: FormData) => {
    const name = formdata.get("name")?.toString()

    if(name == "") {
        return {
            success: false,
            message: 'مقادیر نمیتواند خالی باشد'
        }
    }

    try {
        await auth.api.updateUser({
            body: {
                name
            },
            headers: await headers()
        })

        return {
            success: true,
            message: 'با موفقیت اپدیت شد'
        }
    } catch (err) {
        if(err instanceof Error) {
            return {
                success: false,
                message: err.message
            }
        }
    }
}