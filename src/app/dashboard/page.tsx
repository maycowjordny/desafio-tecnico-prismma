import Header from "@/components/header";
import { Box, Container, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container sx={{ pt: "88px", flexGrow: 1 }}>
        <Typography variant="h2" color="text.primary">
          Minhas Refeições
        </Typography>
        <Typography variant="h3" color="text.secondary">
          Minhas Refeições
        </Typography>
      </Container>
    </Box>
  );
}
