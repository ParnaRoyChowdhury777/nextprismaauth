import React from "react";
import { currentUser } from "@clerk/nextjs/server";

async function Dashboard() {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-center hc text-center">
      <h2 className="text-lg font-medium">
        Welcome to Dashboard, {user?.firstName} {user?.lastName}!
      </h2>
    </div>
  );
}

export default Dashboard;
