"use client";

import MealNewEditForm from "@/components/form/meal/meal-new-edit-form";
import Container from "@mui/material/Container";
import { useParams } from "next/navigation";

export default function MealEditView() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <Container>
      <MealNewEditForm mealId={id} />
    </Container>
  );
}
