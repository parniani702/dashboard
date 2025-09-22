"use client";

import { RegisterS } from "@/actions/better-auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const UserCreateForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    return ( 
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button variant="outline">
                        ساخت کاربر
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form className="flex flex-col mt-9 gap-4" action={
                        async (FormData) => {
                            const res = await RegisterS(FormData)
                            if(res?.success) {
                                toast.success(res.message)
                                setIsLoading(false)
                            } else {
                                toast.error(res?.message)
                                setIsLoading(false)
                            }
                        }
                    }>
                        <div className="space-y-3">
                            <Label>نام و نام خانوادگی</Label>
                            <Input placeholder="" type="text" name="name" />
                        </div>
                        <div className="space-y-3">
                            <Label>ایمیل</Label>
                            <Input placeholder="" type="email" name="email" />
                        </div>
                        <div className="space-y-3">
                            <Label>پسورد</Label>
                            <Input placeholder="" type="password" name="password" />
                        </div>
                        <Button onClick={() => setIsLoading(true)} type="submit">
                            {
                                isLoading ? <LoaderCircle className="animate-spin" /> : 'افزودن'
                            }
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
     );
}
 
export default UserCreateForm;