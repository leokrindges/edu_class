import {
  Card,
  CardContent,
  Skeleton,
  Box,
  Stack,
  Grid,
  Divider,
} from "@mui/material";

export default function StudentSkeleton() {
  return (
    <Box>
      {/* Cabeçalho */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Skeleton variant="text" width={200} height={40} />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton
            variant="rectangular"
            width={80}
            height={36}
            sx={{ borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width={80}
            height={36}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {/* Card Principal */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              {/* Avatar e nome */}
              <Stack direction="row" alignItems="center" spacing={3} mb={3}>
                <Skeleton variant="circular" width={80} height={80} />
                <Box>
                  <Skeleton variant="text" width={200} height={32} />
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={24}
                    sx={{ borderRadius: 3, mt: 1 }}
                  />
                </Box>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              {/* Seções de informações */}
              <Skeleton variant="text" width={180} height={28} sx={{ mb: 2 }} />
              <Grid container spacing={2} mb={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Skeleton
                      variant="circular"
                      width={24}
                      height={24}
                      sx={{ mr: 2 }}
                    />
                    <Box>
                      <Skeleton variant="text" width={60} height={16} />
                      <Skeleton variant="text" width={150} height={20} />
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Skeleton
                      variant="circular"
                      width={24}
                      height={24}
                      sx={{ mr: 2 }}
                    />
                    <Box>
                      <Skeleton variant="text" width={60} height={16} />
                      <Skeleton variant="text" width={120} height={20} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Observações */}
              <Skeleton variant="text" width={140} height={28} sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Skeleton
                  variant="circular"
                  width={24}
                  height={24}
                  sx={{ mr: 2, mt: 0.5 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {[1, 2, 3].map((index) => (
              <Card key={index}>
                <CardContent>
                  <Skeleton
                    variant="text"
                    width={120}
                    height={28}
                    sx={{ mb: 2 }}
                  />
                  <Stack spacing={2}>
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="text" width="90%" height={20} />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
