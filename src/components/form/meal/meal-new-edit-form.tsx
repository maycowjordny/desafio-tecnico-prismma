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
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ArrowLeft, Brain, Upload } from "lucide-react";
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
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isEstimating, setIsEstimating] = useState(false);

  const defaultValues: MealValidationSchema = {
    name: "",
    type: MealTypeEnum.BREAKFAST,
    description: "",
    feedingAt: dayjs().toDate(),
    calories: 0,
    imageBase64: "",
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
      imageBase64: meal?.imageBase64 ?? defaultValues.imageBase64,
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
    clearErrors,
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

        setImagePreview(fetchedMeal.imageBase64);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue("imageBase64", base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleEstimate = async () => {
    try {
      setIsEstimating(true);
      clearErrors("description");

      const description = watch("description");

      if (!description) {
        enqueueSnackbar("Adicione uma descrição para estimar", {
          variant: "warning",
        });
        return;
      }

      const res = await fetch(endpoints.meal.estimateCalories, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealDescription: description,
        }),
      });

      const { calories } = await res.json();

      if (calories) setValue("calories", calories);
    } catch (err) {
      enqueueSnackbar("Erro ao estimar calorias", { variant: "error" });
    } finally {
      setIsEstimating(false);
    }
  };

  const handleImageAnalyze = async () => {
    try {
      setIsEstimating(true);
      clearErrors();

      const image = watch("imageBase64");

      if (!image) {
        enqueueSnackbar("Adicione uma imagem para análise", {
          variant: "warning",
        });
        return;
      }

      const res = await fetch(endpoints.meal.analyzeMealImage, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: image }),
      });

      const { mealName, description, calories } = await res.json();

      if (mealName) setValue("name", mealName);
      if (description) setValue("description", description);
      if (calories) setValue("calories", calories);
    } catch (err) {
      enqueueSnackbar("Erro ao analisar a imagem", { variant: "error" });
    } finally {
      setIsEstimating(false);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid
        container
        spacing={3}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "flex-start", md: "space-between" },
        }}
      >
        <Grid size={{ xs: 12, md: 4 }}>
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
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h2" mb={3}>
            Preencha os dados ou envie uma foto
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              mb: 3,
              p: 3,
              border: `2px dashed ${theme.palette.primary.main}`,
              backgroundColor: theme.palette.background.default,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: 500,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload" style={{ width: "100%" }}>
              <Button
                component="span"
                variant="outlined"
                startIcon={<Upload size={18} />}
                sx={{
                  width: "100%",
                  py: 1.5,
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    borderColor: "primary.dark",
                  },
                }}
              >
                Adicionar Imagem
              </Button>
            </label>
            <Button
              component="span"
              variant="contained"
              onClick={handleImageAnalyze}
              disabled={!watch("imageBase64") || isEstimating}
              startIcon={<Brain />}
              sx={{
                width: "100%",
                py: 1.5,
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                "&.Mui-disabled": {
                  backgroundColor: "grey.300",
                  color: "grey.500",
                },
              }}
            >
              {isEstimating ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Descobrir Alimentos"
              )}
            </Button>
          </Card>
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

              <Input name="description" label="alimentos" size="small" />
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Input
                    name="calories"
                    label="Calorias (kcal)"
                    type="number"
                    size="small"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    variant="contained"
                    onClick={handleEstimate}
                    disabled={!watch("description") || isEstimating}
                    startIcon={<Brain />}
                    sx={{
                      width: "100%",
                      py: 1.5,
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "grey.300",
                        color: "grey.500",
                      },
                    }}
                  >
                    {isEstimating ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Calcular calorias com IA"
                    )}
                  </Button>
                </Grid>
              </Box>
            </Stack>

            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              sx={{ mt: 3 }}
            >
              <Button
                type="submit"
                variant="contained"
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
