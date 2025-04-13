import { Box, IconButton, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { CircleUser } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <AppBar
      sx={{
        scrollBehavior: "smooth",
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
          <Image
            src="/logo.png"
            alt="MealTracker Logo"
            width={36}
            height={36}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            MealTracker
          </Typography>
        </Box>

        <IconButton sx={{ color: "primary.main" }} edge="end">
          <CircleUser />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
