"use client";

import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { paths } from "./routes/paths/paths";

export default function Header() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "primary.contrastText",
          height: 72,
          borderRadius: 0,
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image src="/logo.png" alt="Logo" width={36} height={36} priority />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 600, color: "primary.main", ml: 1 }}
            >
              MealTracker
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {status === "authenticated" && session?.user && (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "primary.main",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {session.user.name || session.user.email?.split("@")[0]}
                </Typography>
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                  <Avatar
                    src={session.user.image || undefined}
                    sx={{ width: 40, height: 40, bgcolor: "primary.main" }}
                    alt={session.user.name || "User Avatar"}
                  />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography fontWeight={600}>
            {session?.user?.name || "Usuário"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {session?.user?.email}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem
          onClick={() => {
            signOut({ callbackUrl: paths.auth });
            handleClose();
          }}
        >
          Sair
        </MenuItem>
      </Menu>
    </>
  );
}
