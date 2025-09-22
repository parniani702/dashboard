import RegisterForm from "@/app/(auth)/_components/LoginForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const UserCreateForm = () => {
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
                    <form action="">
                        
                    </form>
                </DialogContent>
            </Dialog>
        </div>
     );
}
 
export default UserCreateForm;