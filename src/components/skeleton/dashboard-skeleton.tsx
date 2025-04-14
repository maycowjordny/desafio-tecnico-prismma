import { Skeleton } from "@mui/material";
import { Box, Stack } from "@mui/system";

export default function DashboardSkeleton() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Box>
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={300} height={30} />
          </Box>
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rounded" width={180} height={40} />
            <Skeleton variant="rounded" width={180} height={40} />
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Skeleton variant="rounded" width="100%" height={120} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Skeleton variant="rounded" width="100%" height={50} />
      </Box>

      <Stack spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width="100%"
            height={100}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Stack>
    </Box>
  );
}
