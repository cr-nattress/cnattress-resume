"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, ReactElement } from "react";

export function Providers({ children }: { children: ReactNode }): ReactElement {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
