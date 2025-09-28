# 🧑‍💻 Fullstack Admin Dashboard

A modern **admin dashboard** built with **Next.js 14, React, TailwindCSS, shadcn/ui**, and powered by **Better-Auth, Drizzle ORM, PostgreSQL** on the backend.  
Includes **user management, products, discount codes, comments, tickets, and analytics** — built for real-world use.



--- 
<img width="1680" height="860" alt="Screen Shot 2025-09-28 at 11 24 25 AM" src="https://github.com/user-attachments/assets/8deb6a04-8033-4fe7-9d10-bf5cff5c7537" />
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



## 🛠️ Setup
```bash
git clone https://github.com/username/project-name.git
cd project-name
pnpm install
cp .env.example .env
pnpm drizzle:push
pnpm dev
```
## ENV 🔑
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000" # Base URL of your app
```

