"use server";

import { prisma } from "@/lib/db";
import { User } from "@clerk/nextjs/server";

export async function createUser(user: User) {

    let dbUser = await prisma.user.findUnique({
        where: {
            clerkId: user.id,
        },
    });
    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.primaryEmailAddress!.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    }
    return dbUser;
}