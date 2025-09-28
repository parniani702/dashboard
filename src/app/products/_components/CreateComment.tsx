"use client";


import { CreateCommentS } from "@/actions/comments-action";
import { CreateProductS } from "@/actions/products-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateComment = ({productId}: {productId: number}) => {

    const [isLoading, setIsLoading] = useState(false)
    const session = authClient.useSession()
    
    return ( 
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button variant="outline">
                        کامنت جدید
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form className="flex flex-col mt-9 gap-4" action={
                        async (FormData) => {
                            const res = await CreateCommentS(FormData)
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
                        <input type="hidden" name="productId" value={productId} />
                        <input type="hidden" name="userId" value={session.data?.user.id} />

                        <div className="space-y-3">
                            <Label>محتوا کامنت</Label>
                            <Textarea placeholder="متن خودت رو بنویس" name="content" />
                        </div>
                        <Button onClick={() => setIsLoading(true)} type="submit">
                            {
                                isLoading ? <LoaderCircle className="animate-spin" /> : 'کامنت کردن'
                            }
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
     );
}
 
export default CreateComment;