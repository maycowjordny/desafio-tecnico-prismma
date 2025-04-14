import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

interface CalorieGoalModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newGoal: number) => void;
  currentGoal: number;
}

export default function SetKcalGoalModal({
  open,
  onClose,
  onSave,
  currentGoal,
}: CalorieGoalModalProps) {
  const [value, setValue] = useState(currentGoal.toString());

  const handleSave = () => {
    const numberValue = Number(value);
    if (!isNaN(numberValue) && numberValue > 0) {
      onSave(numberValue);
      enqueueSnackbar("Meta calórica atualizada!", { variant: "success" });
      onClose();
    } else {
      enqueueSnackbar("Insira um valor válido!", { variant: "warning" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Definir Meta Calórica Diária</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Meta (kcal)"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
