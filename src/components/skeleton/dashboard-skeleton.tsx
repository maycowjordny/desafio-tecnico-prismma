"use client";
import { Box, Skeleton, Stack } from "@mui/material";

export default function DashboardSkeleton() {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Skeleton variant="text" width={300} height={60} />
            <Skeleton variant="text" width={400} height={40} />
          </Box>
          <Box display="flex" gap={2}>
            <Skeleton variant="rounded" width={180} height={40} />
            <Skeleton variant="rounded" width={180} height={40} />
          </Box>
        </Box>

        <Skeleton variant="rounded" width="100%" height={120} />

        <Skeleton variant="rounded" width={200} height={40} />

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
