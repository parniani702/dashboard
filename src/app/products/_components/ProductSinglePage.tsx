"use client"

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Comments, Products } from "@/types";
import CreateComment from "./CreateComment";

const ProductSinglePage = ({prodductSingleData, productComments}: {prodductSingleData: Products, productComments: Comments[]}) => {

    return ( 
        <div className="container mx-auto">
            <img src="/gradient.webp" className="w-full h-50 rounded-lg" alt={prodductSingleData.title} />
            <div className="flex flex-col gap-3 mx-7 my-5">
                <h1 className="font-bold text-2xl">{prodductSingleData.title}</h1>
                <span>{prodductSingleData.stock === 0 ? "ناموجود" : "موجود در سبد خرید"}</span>
                <Card>
                    <CardDescription className="mx-5">
                        {prodductSingleData.description}
                    </CardDescription>
                </Card>
            </div>
            <Card>
                <CardTitle className="mx-5">
                    <div className="flex justify-between">
                        <span>کامنت ها :</span>
                        <CreateComment productId={prodductSingleData.id} />
                    </div>
                </CardTitle>
                <CardDescription className="flex flex-col gap-3">
                    {productComments.map((comment, index) => (
                        <Card className="" key={index}>
                            <CardDescription className="mx-7">{comment.content}</CardDescription>
                        </Card>
                    ))}
                </CardDescription>
            </Card>
        </div>
     );
}
 
export default ProductSinglePage;