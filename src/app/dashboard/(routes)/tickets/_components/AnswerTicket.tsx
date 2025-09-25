"use client";


import { AnswerTicketS } from "@/actions/tickets-action";
import { UpdateUserS } from "@/actions/users-action";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tickets } from "@/types";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";


const AnswerTicket = ({tickets}: {tickets: Tickets}) => {
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div>
      <form
        className="flex flex-col gap-4"
        action={async (FormData) => {
          const res = await AnswerTicketS(FormData);
          if (res?.success) {
            toast.success("پیغام با موفقیت ارسال شد");
            setIsLoading(false);
            location.reload();
          } else {
            toast.error(res?.message);
            setIsLoading(false);
          }
        }}
      >
        <div className="space-y-2">
          <Label>پیغام پاسخ</Label>
          <Textarea name="reply" placeholder="پیغام خودتون رو وارد کنید" />
          {/* hiden inputs */}
          <input type="hidden" value={tickets.id} name="id" />
        </div>
        <Button onClick={() => setIsLoading(true)} variant="outline" type="submit" className="w-full">
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              {" "}
              ارسال
              <Send />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AnswerTicket;
