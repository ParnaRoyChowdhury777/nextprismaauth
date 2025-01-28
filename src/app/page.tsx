import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const user = true;
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto hc h-full">
      <h1 className="text-center w-full text-2xl font-semibold">
        Welcome to the Next.js + Clerk + Prisma Starter Auth Kit
      </h1>
      <p className="text-muted-foreground text-balance text-center mt-4">
        Please sign in to continue
      </p>
      {user ? (
        <Button asChild size="sm" className="mt-6">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button asChild size="sm" className="mt-6">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </div>
  );
}
