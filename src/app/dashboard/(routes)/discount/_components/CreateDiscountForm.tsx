"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { DateRange } from "react-day-picker";
import Calendar from "@/components/ui/calendar";
import { CreateDiscountS } from "@/actions/discount-action";

const CreateDiscountForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">
            ساخت کد تخفیف
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form
            className="flex flex-col mt-9 gap-4"
            action={async (formData) => {
              const res = await CreateDiscountS(formData);
              if (res?.success) {
                toast.success(res.message);
                setIsLoading(false);
                location.reload();
              } else {
                toast.error(res?.message);
                setIsLoading(false);
              }
            }}
          >
            {/* hidden inputs */}
            <input
              type="hidden"
              name="fromDate"
              value={dateRange?.from ? dateRange.from.toISOString() : ""}
            />
            <input
              type="hidden"
              name="toDate"
              value={dateRange?.to ? dateRange.to.toISOString() : ""}
            />

            <div className="space-y-3">
              <Label>کد تخفیف</Label>
              <Input placeholder="" type="text" name="code" />
            </div>

            <div className="space-y-3">
              <Label>درصد تخفیف</Label>
              <Input
                placeholder="یک عدد بین 1 تا 100"
                type="number"
                name="percentage"
              />
            </div>

            <div className="space-y-3">
              <Label>مقدار موجودی تخفیف</Label>
              <Input
                placeholder="مقدار موجودی کد تخفیف"
                type="number"
                name="usageLimit"
              />
            </div>

            <div className="space-y-3 mx-auto">
              <Label>تاریخ شروع و پایان تخفیف</Label>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                className="rounded-lg border shadow-sm"
              />
            </div>

            <Button onClick={() => setIsLoading(true)} type="submit">
              {isLoading ? <LoaderCircle className="animate-spin" /> : "افزودن"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateDiscountForm;
