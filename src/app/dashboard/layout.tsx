import Header from "@/components/header";
import { Box, Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession();

  if (!session) {
    redirect("/register");
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container sx={{ pt: "88px", flexGrow: 1 }}>{children}</Container>
    </Box>
  );
}
