"use client";

import { paths } from "@/components/routes/paths/paths";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const trigger = useScrollTrigger({ threshold: 10 });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          bgcolor: trigger ? "background.paper" : "transparent",
          transition: "all 0.3s ease",
          color: "text.primary",
          px: { xl: 42, sm: 0 },
          backdropFilter: trigger ? "blur(8px)" : "none",
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Image
              src="/logo.png"
              alt="MealTracker Logo"
              width={36}
              height={36}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              MealTracker
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Link href={paths.auth} passHref>
              <Button
                variant="contained"
                color="primary"
                component="span"
                sx={{ px: 4, py: 1 }}
              >
                Entrar
              </Button>
            </Link>
          </Box>

          <IconButton color="inherit" sx={{ display: { md: "none" } }}>
            <Link href={paths.auth} passHref>
              <Button variant="outlined" color="primary" component="span">
                Entrar
              </Button>
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
