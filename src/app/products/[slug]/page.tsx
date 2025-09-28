import { db } from "@/db";
import ProductSinglePage from "../_components/ProductSinglePage";
import { comments, products } from "@/db/schema";
import { eq } from "drizzle-orm";

const page = async ({params}: {params: Promise<{slug: string}>}) => {
    const { slug } = await params
    const productSingleData = await db.select().from(products).where(eq(products.id, Number(slug)))
    const productComments = await db.select().from(comments).where(eq(comments.productId, slug))
    return ( 
        <ProductSinglePage prodductSingleData={productSingleData[0]} productComments={productComments} />
     );
}
 
export default page;