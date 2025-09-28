# 🧑‍💻 Fullstack Admin Dashboard

A modern **admin dashboard** built with **Next.js 14, React, TailwindCSS, shadcn/ui**, and powered by **Better-Auth, Drizzle ORM, PostgreSQL** on the backend.  
Includes **user management, products, discount codes, comments, tickets, and analytics** — built for real-world use.

---

## 🚀 Tech Stack
- **Frontend:** Next.js, React, TailwindCSS, shadcn/ui 
- **Backend:** Better-Auth, Drizzle ORM,
- **Validation & UX:** Zod, React Toastify  

---

## ✨ Features
- 🔑 Secure authentication & authorization  
- 👥 Manage users, products, discounts, comments, and tickets  
- 📊 Dashboard with charts and analytics  
- 📢 Realtime error & success notifications  

---

DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
BETTER_AUTH_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"


## 🛠️ Setup
```bash
git clone https://github.com/username/project-name.git
cd project-name
pnpm install
cp .env.example .env
pnpm drizzle:push
pnpm dev

