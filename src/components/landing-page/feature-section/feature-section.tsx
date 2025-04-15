import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  BarChart2,
  Calendar,
  Clock,
  Leaf,
  Users,
  Utensils,
} from "lucide-react";
import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.100",
        height: "100%",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          backgroundColor: "primary.light",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        {React.cloneElement(icon as React.ReactElement<any>, {
          color: "#EF4444",
          size: 24,
        })}
      </Box>
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 600,
          mb: 2,
          color: "text.primary",
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Utensils />,
      title: "Registro de Refeições",
      description:
        "Registre facilmente todas as suas refeições diárias com nosso sistema intuitivo de adição de alimentos.",
    },
    {
      icon: <BarChart2 />,
      title: "Análise Nutricional",
      description:
        "Acompanhe calorias, proteínas, carboidratos e gorduras de forma visual e compreensível.",
    },
    {
      icon: <Calendar />,
      title: "Planejamento Semanal",
      description:
        "Crie planos alimentares semanais e economize tempo no seu dia a dia com refeições pré-programadas.",
    },
    {
      icon: <Leaf />,
      title: "Sugestões Personalizadas",
      description:
        "Receba sugestões de refeições baseadas em seus objetivos e preferências alimentares.",
    },
    {
      icon: <Clock />,
      title: "Lembretes Inteligentes",
      description:
        "Configure lembretes para não esquecer suas refeições e manter uma rotina alimentar saudável.",
    },
    {
      icon: <Users />,
      title: "Compartilhamento Social",
      description:
        "Compartilhe seus progressos e receitas com amigos, aumentando sua motivação e engajamento.",
    },
  ];

  return (
    <Box
      id="features"
      component="section"
      sx={{
        py: 10,
        background: "linear-gradient(to bottom, white, #F3F4F6)",
      }}
    >
      <Box
        sx={{
          maxWidth: "lg",
          mx: "auto",
          px: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            mb: 8,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "text.primary",
            }}
          >
            Funcionalidades Poderosas para seu Bem-estar
          </Typography>
          <Typography variant="body1" color="text.secondary">
            O MealTracker oferece tudo o que você precisa para manter uma
            alimentação equilibrada e alcançar seus objetivos de saúde.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default FeaturesSection;
