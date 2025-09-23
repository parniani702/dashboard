"use client";

import { RegisterS } from "@/actions/better-auth";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await RegisterS(formData);
    setIsLoading(false);

    if (res?.success) {
      toast.success(res.message);
      router.push("/dashboard");
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Card className="w-full max-w-md shadow-xl bg-base-100">
        <CardContent className="gap-6">
          <h1 className="text-3xl font-bold text-center my-6">ثبت نام حساب کاربری</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="نام"
                required
              />
              <p className="text-sm text-error mt-1 hidden peer-invalid:block">
                فرمت نام صحیح نیست
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                required
              />
              <p className="text-sm text-error mt-1 hidden peer-invalid:block">
                فرمت ایمیل صحیح نیست
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">پسورد</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                required
                pattern="^.{8,}$"
              />
              <p className="text-sm text-error mt-1 hidden peer-invalid:block">
                پسورد باید حداقل ۸ کاراکتر باشد
              </p>
            </div>

            <Button type="submit" className="w-full mt-4">
              {isLoading ? <LoaderCircle className="animate-spin w-5 h-5 mx-auto" /> : "ثبت نام"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
