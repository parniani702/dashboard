import { db } from "@/db";
import { comments, discounts, products, tickets, user } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [usersData, productsData, commentsData, ticketsData, discountsData] =
      await Promise.all([
        db.select().from(user),
        db.select().from(products),
        db.select().from(comments),
        db.select().from(tickets),
        db.select().from(discounts),
      ]);

    return NextResponse.json({
      usersData,
      productsData,
      commentsData,
      ticketsData,
      discountsData,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
