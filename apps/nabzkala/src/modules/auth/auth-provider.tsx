"use client";

import { ReactNode } from "react";
import AuthContext from "@/modules/auth/context";
import getUser from "@/modules/auth/actions/get-user";
import useSWR from "swr";
import { AuthUser } from "@/modules/auth/types";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { data, error, isLoading } = useSWR<AuthUser | null>(
    "auth-user",
    getUser,
  );

  return (
    <AuthContext.Provider
      value={{
        user: data!,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
