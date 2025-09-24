import {
    pgTable,
    varchar,
    boolean,
    timestamp,
    integer,
    text,
    primaryKey,
    uniqueIndex,
  } from "drizzle-orm/pg-core";
  import { sql } from "drizzle-orm";
  
  // ------------------ User ------------------
  export const user = pgTable(
    "user",
    {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: varchar("name").notNull(),
      email: varchar("email").notNull(),
      emailVerified: boolean("email_verified").default(false).notNull(),
      image: varchar("image"),
      role: varchar("role").default("admin").notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => ({
      emailIdx: uniqueIndex("user_email_unique").on(table.email),
    })
  );
  
  // ------------------ Session ------------------
  export const sessions = pgTable(
    "session",
    {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      expiresAt: timestamp("expires_at").notNull(),
      token: varchar("token").notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
      ipAddress: varchar("ip_address"),
      userAgent: varchar("user_agent"),
      userId: varchar("user_id").notNull(),
    },
    (table) => ({
      tokenIdx: uniqueIndex("session_token_unique").on(table.token),
    })
  );
  
  // ------------------ Account ------------------
  export const accounts = pgTable("account", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    accountId: varchar("account_id").notNull(),
    providerId: varchar("provider_id").notNull(),
    userId: varchar("user_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // ------------------ Verification ------------------
  export const verifications = pgTable("verification", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    identifier: varchar("identifier").notNull(),
    value: varchar("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // ------------------ Product ------------------
  export const products = pgTable("product", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    title: varchar("title").notNull(),
    description: text("description"),
    price: integer("price").notNull(),
    stock: integer("stock").notNull(),
    sold: integer("sold").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // ------------------ Comment ------------------
  export const comments = pgTable("comment", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    content: text("content").notNull(),
    userId: varchar("user_id").notNull(),
    productId: varchar("product_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  // ------------------ Ticket ------------------
  export const tickets = pgTable("ticket", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    title: varchar("title").notNull(),
    message: text("message").notNull(),
    status: varchar("status").default("open").notNull(),
    userId: varchar("user_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // ------------------ Discount ------------------
  export const discounts = pgTable("discount", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    code: varchar("code").notNull().unique(),
    precentage: integer("precentage").notNull(),
    usageLimit: integer("usage_limit"),
    usedCount: integer("used_count").default(0).notNull(),
    validForm: timestamp("valid_form").notNull(),
    validTo: timestamp("valid_to"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  


export const schemaAuth = {
    user,
    session: sessions,
    account: accounts
}