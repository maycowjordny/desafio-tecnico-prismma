"use client";
import LoginButton from "@/components/login-button/login-button";
import { paths } from "@/components/routes/paths/paths";
import { Box, Link as MuiLink, Paper, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          p: 6,
          mb: 4,
          animation: "fadeIn 0.5s ease-in-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(50px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Image
              src="/logo.png"
              alt="MealTracker Logo"
              width={36}
              height={36}
            />
            <Typography
              variant="h5"
              component="span"
              sx={{ fontWeight: "bold", color: "text.secondary" }}
            >
              MealTracker
            </Typography>
          </Box>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Comece a controlar sua alimentação
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.disabled", textAlign: "center", mt: 1 }}
          >
            Entre com sua conta do Google para acessar o MealTracker
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <LoginButton
            onClick={() =>
              signIn("google", { callbackUrl: paths.dashboard.root })
            }
          />
          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              textAlign: "center",
              display: "block",
            }}
          >
            Ao continuar, você concorda com nossos{" "}
            <MuiLink color="error" underline="hover" component="span">
              Termos de Serviço
            </MuiLink>{" "}
            e{" "}
            <MuiLink color="error" underline="hover" component="span">
              Política de Privacidade
            </MuiLink>
            .
          </Typography>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <MuiLink
            href="/"
            color="error"
            underline="hover"
            sx={{ fontSize: "0.875rem" }}
            component={Link}
          >
            Voltar para a página inicial
          </MuiLink>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
            position: "relative",
            aspectRatio: "1/1",
          }}
        >
          <Image
            src="/placeholder.svg"
            alt="MealTracker App Preview"
            layout="fill"
            objectFit="cover"
          />
        </Box>
      </Box>
    </Box>
  );
}
