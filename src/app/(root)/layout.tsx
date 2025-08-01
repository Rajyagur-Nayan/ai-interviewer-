import React, { ReactNode } from "react";

import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";

const rootLayout = async ({ children }: { children: ReactNode }) => {
  const isAuthExist = await isAuthenticated();

  if (!isAuthExist) redirect("/signin");
  return <div>{children}</div>;
};

export default rootLayout;
