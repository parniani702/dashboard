"use client";

import { useState } from "react";
import { Edit, LoaderCircle, User, Trash2 } from "lucide-react";
import { ChangeName, ChangePassword } from "@/actions/better-auth";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfileForm = () => {
  const [openModal, setOpenModal] = useState<
    null | "password" | "username" | "delete"
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex gap-3 flex-wrap mx-3 sm:mx-0">
      <Button variant="outline" onClick={() => setOpenModal("password")}>
        <Edit className="w-4 h-4 mr-1" /> ویرایش پسورد
      </Button>
      <Button variant="outline" onClick={() => setOpenModal("username")}>
        <User className="w-4 h-4 mr-1" /> تغییر نام و نام خانوادگی
      </Button>
      <Button variant="outline" onClick={() => setOpenModal("delete")}>
        <Trash2 className="w-4 h-4 mr-1" /> حذف حساب
      </Button>

      {/* Password Modal */}
      <Dialog
        open={openModal === "password"}
        onOpenChange={() => setOpenModal(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="my-3">ویرایش پسورد</DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col gap-4 mt-2"
            action={async (formData: FormData) => {
              setIsLoading(true);
              const res = await ChangePassword(formData);
              setIsLoading(false);
              if (res?.success) {
                toast.success(res.message);
                setOpenModal(null);
              } else {
                toast.error(res?.message);
              }
            }}
          >
            <div className="flex flex-col gap-3">
              <Label>پسورد فعلی</Label>
              <Input type="password" name="oldpassword" pattern="^.{8,}$" />
              <p className="text-xs text-gray-500 mt-1">
                پسورد باید حداقل 8 کاراکتر باشد
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>پسورد جدید</Label>
              <Input type="password" name="newpassword" pattern="^.{8,}$" />
              <p className="text-xs text-gray-500 mt-1">
                پسورد باید حداقل 8 کاراکتر باشد
              </p>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                {isLoading ? (
                  <LoaderCircle className="animate-spin w-5 h-5 mx-auto" />
                ) : (
                  "ذخیره"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Name Modal */}
      <Dialog
        open={openModal === "username"}
        onOpenChange={() => setOpenModal(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="my-3">تغییر نام و نام خانوادگی</DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col gap-4 mt-2"
            action={async (formData: FormData) => {
              setIsLoading(true);
              const res = await ChangeName(formData);
              setIsLoading(false);
              location.reload()
              if (res?.success) {
                toast.success(res.message);
                setOpenModal(null);
              } else {
                toast.error(res?.message);
              }
            }}
          >
            <div className="flex flex-col gap-3">
              <Label>نام و نام خانوادگی</Label>
              <Input type="text" name="name" pattern="^.{1,}$" />
              <p className="text-xs text-gray-500 mt-1">فیلد نباید خالی باشد</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsLoading(true)} type="submit" className="w-full">
                {isLoading ? (
                  <LoaderCircle className="animate-spin w-5 h-5 mx-auto" />
                ) : (
                  "ذخیره"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Account Modal */}
      <Dialog
        open={openModal === "delete"}
        onOpenChange={() => setOpenModal(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-error">حذف حساب کاربری</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 mt-2">
            آیا مطمئن هستید که می‌خواهید حساب خود را حذف کنید؟ این عملیات
            غیرقابل بازگشت است.
          </p>
          <DialogFooter className="flex gap-2">
            <Button className="flex-1" onClick={() => setOpenModal(null)}>
              انصراف
            </Button>
            <Button
              className="flex-1"
              variant="destructive"
              onClick={async () => {
                setIsLoading(true);
                await authClient.deleteUser({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/");
                      setIsLoading(false);
                    },
                  },
                });
              }}
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin w-5 h-5 mx-auto" />
              ) : (
                "حذف"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileForm;
