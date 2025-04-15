import { paths } from "@/components/routes/paths/paths";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function CTASection() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        background: "linear-gradient(to right, #EF4444, #F43F5E)",
        color: "white",
      }}
    >
      <Box
        sx={{
          maxWidth: "lg",
          mx: "auto",
          px: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "2rem", md: "2.5rem" },
              lineHeight: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Pronto para transformar sua alimentação?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1.125rem", md: "1.25rem" },
              opacity: 0.9,
              mb: 5,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Junte-se a milhares de pessoas que já melhoraram seus hábitos
            alimentares e alcançaram seus objetivos com o MealTracker.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Link href={paths.auth} passHref>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "#EF4444",
                  "&:hover": {
                    backgroundColor: "grey.100",
                  },
                  fontSize: "1rem",
                }}
              >
                Começar Gratuitamente
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
