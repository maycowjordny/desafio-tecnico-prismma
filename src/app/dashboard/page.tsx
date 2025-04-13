"use client";
import AddMealButton from "@/components/add-meal-button/add-meal-button";
import DailySummaryCard from "@/components/daily-summary-card/daily-summary-card";
import MealCard from "@/components/meal-card/meal-card";
import MealTypeFilter from "@/components/meal-type-filter/meal-type-filter";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("Todas");

  return (
    <main>
      <Box
        gap={1}
        sx={{ mt: 4, mb: 3 }}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Stack gap={1}>
          <Typography variant="h2" color="text.primary">
            Minhas Refeições
          </Typography>
          <Typography variant="h3" color="text.secondary">
            Controle sua alimentação diária com o MealTracker
          </Typography>
        </Stack>
        <AddMealButton onClick={() => router.push("/dashboard/add")} />
      </Box>
      <DailySummaryCard currentKcal={1570} kcalGoal={2000} />
      <Stack gap={1} sx={{ mb: 3 }}>
        <MealTypeFilter selected={selectedType} onSelect={setSelectedType} />
      </Stack>
      <MealCard
        title="Ovos mexidos e torrada"
        type="Café da manhã"
        time="07:30"
        calories={350}
      />
    </main>
  );
}
