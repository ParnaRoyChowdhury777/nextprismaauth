import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "@/actions/auth.actions";

async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await createUser(user);

  return (
    <div className="flex items-center justify-center hc text-center">
      <h2 className="text-lg font-medium">
        Welcome to Dashboard, {dbUser?.firstName} {dbUser?.lastName}!
      </h2>
    </div>
  );
}

export default Dashboard;
