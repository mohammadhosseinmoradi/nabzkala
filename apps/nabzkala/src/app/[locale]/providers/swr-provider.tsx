"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";
import { api } from "@/services/api/api";

const fetcher = async (key: string) => {
  const res = await api(key);
  return res.data;
};

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        dedupingInterval: 5000,
        onError: (error) => {},
      }}
    >
      {children}
    </SWRConfig>
  );
};
