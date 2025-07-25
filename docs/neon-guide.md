# 📘 NEON Database Integration

## 🧩 Overview

Neon is a fully managed, serverless PostgreSQL database built for the cloud. It combines the power and familiarity of PostgreSQL with modern developer workflows, such as branching, autoscaling, and instant provisioning.

## 🔑 Key Features

#### ⚡ Serverless architecture – Scales automatically with demand, no manual infrastructure needed.

#### 🌱 Branching – Create isolated database environments instantly (ideal for testing & staging).

#### 🔐 Secure & Cloud-native – Encrypted connections, access control, and modern deployment practices.

#### 💸 Free Tier – Great for small apps, prototypes, and development without upfront cost.

#### 🧰 Compatible with PostgreSQL tools & ORMs – Works with Prisma, Drizzle, pg, TypeORM, etc.

---

## 🛠️ Neon DB – Setup Guide

### 🔹 Step 1: Create a Neon Account & Project

1. Visit https://neon.tech.
2. Sign up using GitHub or your email.
3. Click "Create organization".
   - Choose a organization name
   - Choose a plan (Free or Paid)
4. Click “New Project”.
   - Choose a project name (e.g., my-app-db).
   - Select a region close to your users.
5. Wait a few seconds while Neon provisions your PostgreSQL database.

### 🔹 Step 2: Get Your Connection String

1. After your project is created, go to the Connection Details tab.
2. Switch to “Connection string” view.
3. Copy the DATABASE_URL, which looks like:

```
postgres://username:password@your-db-host.eu-west-1.aws.neon.tech/dbname
```

### 🔹 Step 3: Add It to Your `.env`

- Open or create a .env file in your project and paste the connection string:

```
DATABASE_URL=postgres://username:password@your-db-host.eu-west-1.aws.neon.tech/dbname
```

> ⚠️ Note: Make sure .env is listed in your .gitignore to keep credentials safe.

### 🔹 Step 4: Connect to Neon (with Prisma)

If you're using Prisma:

1. Install Prisma:

```
npm install prisma --save-dev
npx prisma init
```

2. Update prisma/schema.prisma:

```
datasource db {
provider = "postgresql"
url = env("DATABASE_URL") // your db connection
}

generator client {
provider = "prisma-client-js"
}

model User {
id String @id @default(uuid())
email String @unique
name String?
createdAt DateTime @default(now())
}
```

3. Run migration and generate client:

```
npx prisma migrate dev --name init
```

### 🔹 Step 5: Use Neon DB in Your Code

- Example: app/api/users/route.ts

```
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}
```

## 📚 References

- [Getting started](https://neon.com/docs/get-started-with-neon/signing-up)
