import { db } from "@/db";
import { products } from "@/db/schema";
import { sum } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await db.select({ value: sum(products.sold) }).from(products)
        const total = result[0]?.value ?? 0;
        return NextResponse.json(total)
    } catch(err) {
       return NextResponse.json(err)
    }
}