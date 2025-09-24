"use client";

import { RegisterS } from "@/actions/better-auth";
import { CreateProductS } from "@/actions/products-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCreateForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    
    return ( 
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button variant="outline">
                        افزودن محصول
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form className="flex flex-col mt-9 gap-4" action={
                        async (FormData) => {
                            const res = await CreateProductS(FormData)
                            if(res?.success) {
                                toast.success(res.message)
                                setIsLoading(false)
                                location.reload()
                            } else {
                                toast.error(res?.message)
                                setIsLoading(false)
                            }
                        }
                    }>
                        <input type="hidden" name="sold" value={0} />
                        <div className="space-y-3">
                            <Label>نام محصول</Label>
                            <Input placeholder="نام محصول رو وارد کنید" type="text" name="title" />
                        </div>
                        <div className="space-y-3">
                            <Label>توضیحات محصول</Label>
                            <Textarea placeholder="توضیحات محصول"  name="description" />
                        </div>
                        <div className="space-y-3">
                            <Label>قیمت محصول</Label>
                            <Input placeholder="قیمت محصول" type="number" name="price" />
                        </div>
                        <div className="space-y-3">
                            <Label>تعداد محصول</Label>
                            <Input placeholder="تعداد محصول رو وارد کنید" type="number" name="stock" />
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
 
export default ProductCreateForm;