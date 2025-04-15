"use client";

import MealNewEditForm from "@/components/form/meal/meal-new-edit-form";
import Container from "@mui/material/Container";

export default function MealCreateView() {
  return (
    <Container sx={{ pb: 2, flexGrow: 1 }}>
      <MealNewEditForm />
    </Container>
  );
}
