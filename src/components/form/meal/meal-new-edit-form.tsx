"use client";
import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";
import {
  mealSchema,
  MealValidationSchema,
} from "@/app/api/infra/zod/schema/create-meal-schema";
import DateFieldInput from "@/components/date-time-input/date-time-input";
import FormProvider from "@/components/form/form-provider";
import { Input } from "@/components/Input/input";
import { paths } from "@/components/routes/paths/paths";
import { Meal } from "@/interface/meal";
import { theme } from "@/theme/theme";
import { endpoints } from "@/utils/endpoints";
import { mealIcons } from "@/utils/meal-icons";
import { mealTypeOptions } from "@/utils/meal-type-options";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  mealId?: string;
};

export default function MealNewEditForm({ mealId }: Props) {
  const router = useRouter();
  const [meal, setMeal] = useState<Meal>({} as Meal);

  const defaultValues: MealValidationSchema = {
    name: "",
    type: MealTypeEnum.BREAKFAST,
    description: "",
    feedingAt: dayjs().toDate(),
    calories: 0,
  };

  const formValue = useMemo<MealValidationSchema>(
    () => ({
      name: meal?.name ?? defaultValues.name,
      type: meal?.type ?? defaultValues.type,
      description: meal?.description ?? defaultValues.description,
      feedingAt: meal?.feedingAt
        ? new Date(meal.feedingAt)
        : defaultValues.feedingAt,
      calories: meal?.calories ?? defaultValues.calories,
    }),
    [meal]
  );

  const methods = useForm<MealValidationSchema>({
    resolver: zodResolver(mealSchema),
    values: formValue,
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const selectedType = watch("type");

  useEffect(() => {
    if (!mealId) return;

    const fetchMeal = async () => {
      try {
        const res = await fetch(endpoints.meal.findById(mealId));
        const data = await res.json();

        const labelToEnum = Object.entries(mealTypeOptions).reduce(
          (acc, [key, label]) => {
            acc[label] = key;
            return acc;
          },
          {} as Record<string, string>
        );

        const fetchedMeal = {
          ...data.meal,
          type: labelToEnum[data.meal.type] ?? MealTypeEnum.BREAKFAST,
          feedingAt: data.meal.feedingAt,
        };

        setMeal(fetchedMeal);
        reset({
          ...fetchedMeal,
          feedingAt: new Date(fetchedMeal.feedingAt),
        });
      } catch (error) {
        console.error("Erro ao carregar refeição:", error);
      }
    };

    fetchMeal();
  }, [mealId]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        feedingAt: data.feedingAt,
      };

      await fetch(mealId ? endpoints.meal.update(mealId) : endpoints.meal.add, {
        method: mealId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const successMessage = mealId
        ? "Refeição atualizada com sucesso!"
        : "Refeição criada com sucesso!";

      enqueueSnackbar(successMessage, { variant: "success" });
      reset();
      router.push(paths.dashboard.root);
    } catch (err) {
      enqueueSnackbar("Erro ao salvar refeição", { variant: "error" });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <IconButton
        onClick={() => router.back()}
        sx={{
          mb: 2,
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        }}
      >
        <ArrowLeft />
      </IconButton>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 6, pb: 5, px: 3 }}>
            <Stack alignItems="center" justifyContent="center" gap={2}>
              {selectedType ? (
                <>
                  {mealIcons[selectedType]}
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    {mealTypeOptions[selectedType]}
                  </Typography>
                </>
              ) : (
                <Typography color="text.secondary">
                  Selecione o tipo de refeição
                </Typography>
              )}
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3, height: "fit-content" }}>
            <Stack spacing={3}>
              <Input
                name="name"
                label="Nome da refeição"
                placeholder="Ex: Salada com frango"
                size="small"
              />

              <Input
                name="type"
                label="Tipo"
                size="small"
                select
                onChange={(e) => {
                  const newType = e.target.value as MealTypeEnum;
                  setValue("type", newType);
                }}
              >
                {Object.entries(mealTypeOptions).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Input>
              <DateFieldInput
                name="feedingAt"
                label="Data e hora da refeição"
              />
              <Input name="description" label="Descrição" size="small" />
              <Input
                name="calories"
                label="Calorias (kcal)"
                type="number"
                size="small"
              />
            </Stack>

            <Stack
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              sx={{ mt: 3 }}
            >
              <Button
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={isSubmitting}
                sx={{
                  display: "flex",
                  height: "44px",
                  px: "32px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                {!mealId ? "Adicionar Refeição" : "Salvar alterações"}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
