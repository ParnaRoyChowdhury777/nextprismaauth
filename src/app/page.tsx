import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "@/actions/auth.actions";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await createUser(user);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto hc h-full">
      <h1 className="text-center w-full text-2xl font-semibold">
        Welcome to the Next.js + Clerk + Prisma Starter Auth Kit
      </h1>
      <p className="text-muted-foreground text-balance text-center mt-4">
        {user
          ? `Great to see you again, ${dbUser.email}!`
          : "Please sign in to continue."}
      </p>
      {user ? (
        <Button asChild size="sm" className="mt-6">
          <Link href={`/dashboard/${user.id}`}>Dashboard</Link>
        </Button>
      ) : (
        <Button asChild size="sm" className="mt-6">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </div>
  );
}
