"use server";

import { prisma } from "@/lib/db";
import { User } from "@clerk/nextjs/server";

export async function createUser(user: User) {
    const dbUser = await prisma.user.create({
        data: {
            clerkId: user.id,
            email: user.primaryEmailAddress!.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    });
    return dbUser;
}