"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { UpdateComment } from "@/actions/comments-action";
import { Comments } from "@/types";


const UpdateProductForm = ({ comments }: { comments: Comments }) => {
  
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        action={async (FormData) => {
          const res = await UpdateComment(FormData);
          if (res?.success) {
            toast.success("کامنت ویرایش شد");
            setIsLoading(false);
            location.reload();
          } else {
            toast.error(res?.message);
            setIsLoading(false);
          }
        }}
      >
        {/* hiden inputs */}
        <input type="hidden" value={comments.id} name="id" />
        <div className="space-y-2">
          <Label>محتوای کامنت</Label>
          <Textarea
            defaultValue={comments.content}
            name="content"
            placeholder="خب محتوای کامنت رو بنویس"
          />
        </div>
        <Button
          onClick={() => setIsLoading(true)}
          variant="outline"
          type="submit"
          className="w-full"
        >
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

export default UpdateProductForm;
