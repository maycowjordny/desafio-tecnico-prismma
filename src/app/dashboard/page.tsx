"use client";
import SetKcalGoalModal from "@/components/calorie-goal-modal/calorie-goal-modal";
import CustomButton from "@/components/custom-button/custom-button";
import DailySummaryCard from "@/components/daily-summary-card/daily-summary-card";
import MealCard from "@/components/meal-card/meal-card";
import MealTypeFilter from "@/components/meal-type-filter/meal-type-filter";
import { paths } from "@/components/routes/paths/paths";
import DashboardSkeleton from "@/components/skeleton/dashboard-skeleton";
import { Meal } from "@/interface/meal";
import { theme } from "@/theme/theme";
import { endpoints } from "@/utils/endpoints";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedType, setSelectedType] = useState("Todas");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [kcalGoal, setKcalGoal] = useState<number>(2000);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getStoredKcalGoal() {
    const storedGoal = localStorage.getItem("kcalGoal");
    if (storedGoal) {
      setKcalGoal(Number(storedGoal));
    }
  }

  const handleSaveGoal = (newGoal: number) => {
    setKcalGoal(newGoal);
    localStorage.setItem("kcalGoal", newGoal.toString());
  };

  const fetchMeals = async () => {
    try {
      const res = await fetch(endpoints.meal.list);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setMeals(data.meals);
    } catch {
      enqueueSnackbar("Erro ao buscar refeições", { variant: "error" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await fetch(endpoints.meal.delete(deleteId), {
        method: "DELETE",
      });

      setMeals((prev) => prev.filter((meal) => meal.id !== deleteId));

      enqueueSnackbar("Refeição deletada com sucesso", { variant: "success" });

      fetchTotalCalories();
    } catch {
      enqueueSnackbar("Erro ao deletar refeição", { variant: "error" });
    } finally {
      setDeleteId(null);
    }
  };

  const fetchTotalCalories = async () => {
    try {
      const res = await fetch(endpoints.meal.totalCalories);
      const data = await res.json();
      setTotalCalories(data.totalCalories);
    } catch {
      enqueueSnackbar("Erro ao carregar total de calorias", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        getStoredKcalGoal();
        await fetchMeals();
        await fetchTotalCalories();
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredMeals = meals.filter((meal) =>
    selectedType === "Todas" ? true : meal.type === selectedType
  );

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <main>
      <Box
        gap={1}
        sx={{ mt: 4, mb: 3 }}
        display="flex"
        justifyContent="space-between"
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={isSmallScreen ? "center" : "flex-start"}
      >
        <Stack gap={1}>
          <Typography variant="h2" color="text.primary">
            Minhas Refeições
          </Typography>
          <Typography variant="h3" color="text.secondary">
            Controle sua alimentação diária com o MealTracker
          </Typography>
        </Stack>
        <Box display="flex" gap={1}>
          <CustomButton
            title="Adicionar refeição"
            variant="contained"
            icon={<PlusIcon />}
            onClick={() => router.push(paths.dashboard.add)}
          />
          <CustomButton
            title="Definir meta diária"
            variant="outlined"
            onClick={() => setGoalModalOpen(true)}
          />
        </Box>
      </Box>

      <DailySummaryCard currentKcal={totalCalories} kcalGoal={kcalGoal} />

      <Stack gap={1} sx={{ mb: 3 }}>
        <MealTypeFilter selected={selectedType} onSelect={setSelectedType} />
      </Stack>

      {filteredMeals.map((meal) => (
        <MealCard
          key={meal.id}
          id={meal.id}
          name={meal.name}
          type={meal.type}
          feedingAt={meal.feedingAt}
          calories={meal.calories}
          onDelete={() => setDeleteId(meal.id)}
        />
      ))}

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Tem certeza que deseja deletar essa refeição?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      <SetKcalGoalModal
        open={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        onSave={handleSaveGoal}
        currentGoal={kcalGoal}
      />
    </main>
  );
}
