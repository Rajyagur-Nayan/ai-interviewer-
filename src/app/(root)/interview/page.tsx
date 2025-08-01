import Agent from "@/app/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();

  if (!user?.userName || !user?.id) {
    return <div>User not found</div>; // Or redirect or show a loading/error state
  }
  return (
    <div>
      <Agent userName={user?.userName} userId={user?.id} type="generate" />
    </div>
  );
};

export default page;
