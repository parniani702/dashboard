import { db } from "@/db";
import { tickets } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.select().from(tickets)
        return NextResponse.json(data)

    } catch(err) {
        return NextResponse.json(err)
    }
}