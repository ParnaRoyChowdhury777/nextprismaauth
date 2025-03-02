"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col space-y-5 items-center justify-center hc w-full">
      <h4 className="text-center text-lg font-medium">
        It seems you&apos;ve hit a page that doesn&apos;t exist. Please check
        the URL and try again.
      </h4>
      <Link href="/">
        <Button>Go Back to Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
