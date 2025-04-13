"use client";
import {
  mealSchema,
  MealValidationSchema,
} from "@/app/api/infra/zod/schema/create-meal-schema";
import FormProvider from "@/components/form/form-provider";
import { Input } from "@/components/Input/input";
import { theme } from "@/theme/theme";
import { JSX } from "@emotion/react/jsx-runtime";
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
import { Apple, ArrowLeft, Coffee, Soup, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const mealIcons: Record<string, JSX.Element> = {
  "Café da manhã": <Coffee size={64} color={theme.palette.primary.main} />,
  Almoço: <Utensils size={64} color={theme.palette.primary.main} />,
  "Lanche da tarde": <Apple size={64} color={theme.palette.primary.main} />,
  Janta: <Soup size={64} color={theme.palette.primary.main} />,
};

type Props = {
  mealId?: string;
};

export default function MealNewEditForm({ mealId }: Props) {
  const router = useRouter();
  const [type, setType] = useState("");

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const methods = useForm<MealValidationSchema>({
    resolver: zodResolver(mealSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {});

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
              {type ? (
                <>
                  {mealIcons[type]}
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    {type}
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
                name="title"
                label="Título da refeição"
                placeholder="Ex: Salada com frango"
                size="small"
              />

              <Input
                name="type"
                label="Tipo"
                size="small"
                select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {Object.keys(mealIcons).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Input>

              <Input name="time" label="Horário (ex: 12:30)" size="small" />
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
