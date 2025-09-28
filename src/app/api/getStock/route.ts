import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export function GET() {
    const res = db.select().from(products).where(eq(products.stock, 0))
    NextResponse.json(res)
}