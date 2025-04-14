import { theme } from "@/theme/theme";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import {
  Coffee,
  Drumstick,
  Pencil,
  Soup,
  Trash2,
  Utensils,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "../routes/paths/paths";

interface MealCardProps {
  id: string;
  name: string;
  type: string;
  feedingAt: Date;
  calories: number;
  onDelete?: () => void;
}

export default function MealCard({
  id,
  name,
  type,
  feedingAt,
  calories,
  onDelete,
}: MealCardProps) {
  const router = useRouter();

  const getMealIcon = (type: string) => {
    const iconProps = {
      size: 20,
      color: theme.palette.primary.main,
    };

    switch (type.toLowerCase()) {
      case "café da manhã":
        return <Coffee {...iconProps} />;
      case "almoço":
        return <Utensils {...iconProps} />;
      case "lanche da tarde":
        return <Soup {...iconProps} />;
      case "janta":
        return <Drumstick {...iconProps} />;
      default:
        return <Utensils {...iconProps} />;
    }
  };

  const icon = getMealIcon(type);

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderRadius: 1,
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            backgroundColor: "primary.light",
            borderRadius: "50%",
            padding: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography fontWeight={600}>{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {type} • {new Date(feedingAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Typography fontWeight={500} color="text.primary">
          {calories} <span style={{ fontWeight: 300 }}>kcal</span>
        </Typography>

        <IconButton
          onClick={() => router.push(paths.dashboard.edit(id))}
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          <Pencil size={18} />
        </IconButton>
        <IconButton
          onClick={onDelete}
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          <Trash2 size={18} color={theme.palette.primary.main} />
        </IconButton>
      </Box>
    </Paper>
  );
}
