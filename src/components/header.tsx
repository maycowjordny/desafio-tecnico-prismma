import { Avatar, Box, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Header() {
  const session = await getServerSession();

  return (
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
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            MealTracker
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {session?.user && (
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
              <Avatar
                src={session.user.image || ""}
                sx={{ width: 40, height: 40, bgcolor: "primary.main" }}
                alt={session.user.name || ""}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
