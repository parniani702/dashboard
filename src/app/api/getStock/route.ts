import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {
    const res = await db.select().from(products).where(eq(products.stock, 0))
    return NextResponse.json(res)
}