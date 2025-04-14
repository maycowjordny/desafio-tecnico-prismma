import { AuthGuard } from "@/components/guard/auth-guard";
import Header from "@/components/header";
import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container sx={{ pt: "88px", flexGrow: 1 }}>
        <AuthGuard>{children}</AuthGuard>
      </Container>
    </Box>
  );
}
