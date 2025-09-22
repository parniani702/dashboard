"use client";

import { UpdateUserS } from "@/actions/users-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/generated/prisma";
;
import { LoaderCircle, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";


const UpdateUserForm = ({users}: {users: User}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ role, setRole ] = useState("user")


  return (
    <div>
      <form
        className="flex flex-col gap-4"
        action={async (FormData) => {
          const res = await UpdateUserS(FormData);
          if (res?.success) {
            toast.success("کاربر با موفقیت اپدیت شد");
            setIsLoading(false);
            location.reload();
          } else {
            toast.error(res?.message);
            setIsLoading(false);
          }
        }}
      >
        <div className="space-y-2">
          <Label>نام و نام خانوادگی</Label>
          <Input defaultValue={users.name} name="name" placeholder="نام و نام خانوادگی را وارد کنید" />
          {/* hiden inputs */}
          <input type="hidden" value={role} name="role" />
          <input type="hidden" value={users.id} name="id" />
        </div>
        <div className="space-y-2">
          <Label>نقش کاربر</Label>
          <Select onValueChange={(value) => setRole(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="برای انتخواب کلیک کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="admin">ادمین</SelectItem>
                <SelectItem value="user">کاربر</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsLoading(true)} variant="outline" type="submit" className="w-full">
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              {" "}
              ذخیره
              <Save />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
