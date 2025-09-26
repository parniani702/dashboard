import { InferSelectModel } from "drizzle-orm";
import { user, comments, discounts } from '../db/schema'

export type User = InferSelectModel<typeof user>
export type Comments = InferSelectModel<typeof comments>
export type Discounts = InferSelectModel<typeof discounts>

export type Products = {
    id: number;
    title: string;
    description: string | null;
    price: number;
    stock: number;
    sold: number;
    createdAt: Date;
    updatedAt: Date;
}

export type Tickets = {
    id: number;
    title: string;
    message: string;
    reply: string | null;
    status: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}