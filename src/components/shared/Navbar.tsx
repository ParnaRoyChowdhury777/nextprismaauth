"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function Navbar() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  return (
    <header className="sticky top-0 inset-x-0 bg-background backdrop-blur-md h-14 border-b border-border w-full px-4 md:px-10">
      <div className="flex items-center justify-between mx-auto max-w-screen-xl h-full">
        <Link href="/" className="font-semibold">
          Next.js + Clerk + Prisma
        </Link>
        <div className="flex items-center justify-end">
          {isLoaded ? (
            <>
              {isSignedIn ? (
                <div className="flex items-center gap-x-4">
                  <Button size="sm" variant="ghost" asChild>
                    <Link href="/">Home</Link>
                  </Button>
                  <Button size="sm" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <Button size="sm" variant="ghost" asChild>
                    <Link href="/sign-in">Log in</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-x-4">
              <Skeleton className="w-20 h-8" />
              <Skeleton className="w-20 h-8" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
