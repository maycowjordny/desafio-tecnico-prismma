import {
  Box,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "white",
        borderTop: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Box sx={{ maxWidth: "lg", mx: "auto", px: 4, py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "primary.main",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                M
              </Box>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                MealTracker
              </Typography>
            </Box>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 400 }}
            >
              O MealTracker é a ferramenta ideal para quem deseja controlar sua
              alimentação e alcançar seus objetivos de saúde de forma simples e
              eficiente.
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <IconButton
                  key={index}
                  href="#"
                  sx={{
                    backgroundColor: "grey.100",
                    color: "text.secondary",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                    width: 40,
                    height: 40,
                  }}
                >
                  <Icon size={20} />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 3, lg: 2 }}>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{ fontWeight: "600", mb: 2, color: "text.primary" }}
            >
              Produto
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {[
                "Funcionalidades",
                "Download App",
                "Preços",
                "Integrações",
                "API",
              ].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link
                    href="#"
                    color="text.secondary"
                    sx={{
                      "&:hover": { color: "primary.main" },
                      textDecoration: "none",
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 3, lg: 2 }}>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{ fontWeight: "600", mb: 2, color: "text.primary" }}
            >
              Empresa
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {["Sobre Nós", "Blog", "Carreiras", "Imprensa", "Parceiros"].map(
                (item) => (
                  <Box component="li" key={item} sx={{ mb: 1 }}>
                    <Link
                      href="#"
                      color="text.secondary"
                      sx={{
                        "&:hover": { color: "primary.main" },
                        textDecoration: "none",
                      }}
                    >
                      {item}
                    </Link>
                  </Box>
                )
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 3, lg: 2 }}>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{ fontWeight: "600", mb: 2, color: "text.primary" }}
            >
              Suporte
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {[
                "Central de Ajuda",
                "Contato",
                "Comunidade",
                "Termos de Uso",
                "Privacidade",
              ].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link
                    href="#"
                    color="text.secondary"
                    sx={{
                      "&:hover": { color: "primary.main" },
                      textDecoration: "none",
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} MealTracker. Todos os direitos
            reservados.
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            {["Termos de Uso", "Privacidade", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                variant="body2"
                color="text.secondary"
                sx={{
                  "&:hover": { color: "primary.main" },
                  textDecoration: "none",
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
