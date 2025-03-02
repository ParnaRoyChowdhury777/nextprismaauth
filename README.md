# Starter Authentication Kit with Next.js, Tailwind CSS, Clerk and MongoDB using Prisma ORM

This is a complete starter template for building authentication-powered applications using **Next.js**, **Tailwind CSS**, **Clerk** and **MongoDB** with **Prisma ORM** for database management. It comes pre-configured with user authentication, database integration, and a customizable UI to help you get started quickly.

<br>

## Features

- **Next.js** for fast and modern React-based web applications.
- **Tailwind CSS** for easy and customizable styling.
- **Clerk** for user authentication (sign-in, sign-up, and user management).
- **MongoDB** as the database.
- **Prisma ORM** for schema-based object modeling.
- Pre-configured routes and middleware for authentication.
- Custom sign-in and sign-up pages.
- Scalable project structure.

<br>

## Prerequisites

- **Node.js** (v18+ recommended)
- **Bun** (package manager)
- **MongoDB** (running instance or cloud database, e.g., MongoDB Atlas)
- **Clerk Account** ([Sign up for Clerk](https://clerk.dev))

<br>

## How to use the template

1. Clone the repository `git clone https://github.com/ParnaRoyChowdhury777/next-tailwind-clerk-mongoose-mongodb.git` or download the zip file.
2. Open the project in your favorite code editor.
3. Navigate to the project directory cd next-tailwind-clerk-mongoose-mongodb.
4. Install the dependencies `bun install`.
5. Create a .env file in the root directory which contains the following:

   ```bash
    DATABASE_URL="mongodb+srv://roychowdhuryparna7719:fTz5ymv3xBojrFpP@cluster0.c6x4v.mongodb.net/testDB"


NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<your CLERK_SECRET_KEY>


NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/dashboard"
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL="/dashboard"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/dashboard"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/dashboard"

   ```
6. Start the development server `bun run dev`
7. Open http://localhost:3000 in your browser

<br>
