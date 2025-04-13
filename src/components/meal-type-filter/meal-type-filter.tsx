import { Box, Button } from "@mui/material";

const mealTypes = [
  "Todas",
  "Café da manhã",
  "Almoço",
  "Lanche da tarde",
  "Janta",
];

interface MealTypeFilterProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function MealTypeFilter({
  selected,
  onSelect,
}: MealTypeFilterProps) {
  return (
    <Box display="flex" gap={1} flexWrap="wrap">
      {mealTypes.map((type) => {
        const isSelected = selected === type;

        return (
          <Button
            key={type}
            onClick={() => onSelect(type)}
            variant="contained"
            disableElevation
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: isSelected ? 700 : 500,
              px: 2.5,
              py: 1,
              backgroundColor: isSelected
                ? "primary.main"
                : "primary.contrastText",
              color: isSelected ? "primary.contrastText" : "text.primary",
              border: isSelected ? "none" : "1px solid #e0e0e0",
              "&:hover": {
                backgroundColor: isSelected ? "primary.dark" : "#f5f5f5",
              },
            }}
          >
            {type}
          </Button>
        );
      })}
    </Box>
  );
}
