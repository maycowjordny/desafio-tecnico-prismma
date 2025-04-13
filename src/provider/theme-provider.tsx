"use client";

import { theme } from "@/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

export function MealTrackerThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
