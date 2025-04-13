import {
  Box,
  LinearProgress,
  Paper,
  Typography,
  linearProgressClasses,
} from "@mui/material";

interface DailySummaryCardProps {
  currentKcal: number;
  kcalGoal: number;
}

export default function DailySummaryCard({
  currentKcal,
  kcalGoal,
}: DailySummaryCardProps) {
  const percentage = Math.min((currentKcal / kcalGoal) * 100, 100);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 1,
        backgroundColor: "background.paper",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontWeight={600}>Total do dia</Typography>
        <Typography fontWeight={700} fontSize="1.25rem">
          {currentKcal}
          <Typography component="span" fontWeight={300}>
            kcal
          </Typography>
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: "primary.main",
          },
          backgroundColor: "primary.light",
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        mt={1}
        fontSize="0.875rem"
        color="text.secondary"
      >
        <Typography>0 kcal</Typography>
        <Typography>{Math.round(percentage)}% da meta diária</Typography>
        <Typography>{kcalGoal} kcal</Typography>
      </Box>
    </Paper>
  );
}
