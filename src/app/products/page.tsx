"use client";

import { getProducts } from "@/actions/products-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Products } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const page = () => {
  const { data: products } = useQuery<Products[]>({
    queryKey: ["showProducts"],
    queryFn: getProducts,
  });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {products?.map((product, index) => (
          <Link href={`/products/${product.id}`}>
            <Card
              className="flex items-center  gap-3"
              key={index}
            >
              <CardTitle>{product.title}</CardTitle>
              <CardContent>
                <img
                  src="/gradient.webp"
                  className="rounded-md mx-auto w-full h-20"
                  alt={product.title}
                />
                <CardDescription>
                  <Button variant="dim" className="mx-2 my-2">
                    <span>قیمت محصول به تومان</span>
                    <span>{product.price}</span>
                  </Button>
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
