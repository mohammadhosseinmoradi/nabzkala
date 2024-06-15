"use client";

import { ThemeProvider as _ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <_ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="system"
      forcedTheme="light"
    >
      {children}
    </_ThemeProvider>
  );
}
