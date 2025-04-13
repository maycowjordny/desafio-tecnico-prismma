import { Button } from "@mui/material";
import { Plus } from "lucide-react";

interface AddMealButtonProps {
  onClick: () => void;
}

export default function AddMealButton({ onClick }: AddMealButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Plus size={18} />}
      onClick={onClick}
      sx={{
        display: "flex",
        height: "44px",
        padding: "0px 32px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 500,
        boxShadow: "none",
      }}
    >
      Nova refeição
    </Button>
  );
}
