"use server";

import { ReactNode } from "react";
import AuthClientProvider from "@/modules/auth/auth-provider";
import getUser from "@/modules/auth/actions/get-user";

export default async function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthClientProvider>{children}</AuthClientProvider>;
}
