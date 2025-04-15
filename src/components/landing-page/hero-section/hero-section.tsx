"use client";

import { paths } from "@/components/routes/paths/paths";
import { Avatar, Box, Button, Link, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import previewCard from "../../../../public/preview.png";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 16, md: 20 },
        pb: { xs: 10, md: 16 },
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom right, white, #f9fafb, #f3f4f6)",
          zIndex: -10,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "lg",
          margin: "0 auto",
          px: 4,
        }}
      >
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 3, lg: 5 }}
          alignItems="center"
        >
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", lg: 600 },
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                mb: 3,
                color: "text.contrastText",
                "& span": {
                  color: "primary.main",
                },
                fontSize: { xl: "3.5rem", md: "2.8rem" },
                fontWeight: 700,
                lineHeight: { xl: "3.5rem", md: "2.5rem", sm: "2rem" },
              }}
            >
              Controle sua alimentação diária com o <span>MealTracker</span>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: "1.125rem",
                mb: 4,
                color: "text.secondary",
              }}
            >
              Acompanhe suas refeições, controle suas calorias e alcance seus
              objetivos nutricionais de forma simples e intuitiva. O MealTracker
              torna o controle alimentar fácil e eficiente.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 6 }}
            >
              <Link href={paths.auth}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: "1rem",
                  }}
                >
                  Comece Agora
                </Button>
              </Link>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={3}>
              <Stack direction="row" spacing={-1}>
                {["JB", "ML", "TS", "AG"].map((initials, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: [
                        "primary.main",
                        "success.main",
                        "secondary.main",
                        "warning.main",
                      ][index],
                      border: "2px solid white",
                      fontSize: "0.75rem",
                    }}
                  >
                    {initials}
                  </Avatar>
                ))}
              </Stack>
              <Typography variant="body2" color="text.secondary">
                <Box component="span" fontWeight="bold">
                  +10.000
                </Box>{" "}
                pessoas já utilizam o MealTracker
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              flex: 1,
              width: "100%",
              maxWidth: { xs: "100%", lg: 500 },
            }}
          >
            <Image src={previewCard} alt="Preview da imagem dashboard" />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
