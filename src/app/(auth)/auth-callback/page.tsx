import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

async function AuthCallback() {
  const user = await currentUser();

  if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
    return redirect("/sign-in");
  }

  const dbUser = null;

  // try {
  //   dbUser = await prisma.user.findUnique({
  //     where: {
  //       id: user.id,
  //     },
  //   });
  // } catch (error) {
  //   console.error(error);
  // }

  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    //this is the path where user will redirect after successful sign up
    return redirect("/dashboard");
  } else {
    return redirect("/");
  }
}

export default AuthCallback;
