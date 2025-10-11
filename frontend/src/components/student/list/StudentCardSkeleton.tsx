import { Card, Box, Stack, Skeleton, Divider } from "@mui/material";
export function StudentCardSkeleton() {
  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
          <Skeleton
            variant="rectangular"
            width={60}
            height={24}
            sx={{ borderRadius: 3 }}
          />
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1} mb={2}>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Stack>
      </Box>
    </Card>
  );
}
