import {
  Card,
  CardContent,
  Skeleton,
  Box,
  Stack,
  Grid,
  Divider,
  Typography,
} from "@mui/material";

interface DetailSkeletonProps {
  /** Título customizado (texto ou skeleton) */
  title?: string;
  /** Subtítulo customizado (texto ou skeleton) */
  subtitle?: string;
  /** Exibir avatar no topo */
  showAvatar?: boolean;
  /** Número de campos na seção de informações */
  infoFields?: number;
  /** Exibir seção de observações */
  showNotes?: boolean;
  /** Exibir sidebar com cards */
  showSidebar?: boolean;
  /** Número de cards na sidebar */
  sidebarCards?: number;
  /** Largura do skeleton do título (quando title não é fornecido) */
  titleWidth?: number;
}

export default function DetailSkeleton({
  title,
  subtitle,
  showAvatar = true,
  infoFields = 4,
  showNotes = true,
  showSidebar = false,
  sidebarCards = 3,
  titleWidth = 200,
}: DetailSkeletonProps) {
  return (
    <Box>
      {/* Cabeçalho com título e botões */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: subtitle ? 1 : 0,
            }}
          >
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ mr: 2 }}
            />
            {title ? (
              <Typography variant="h5" component="h1">
                {title}
              </Typography>
            ) : (
              <Skeleton variant="text" width={titleWidth} height={40} />
            )}
          </Box>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>
              {subtitle}
            </Typography>
          )}
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
        <Grid size={{ xs: 12, md: showSidebar ? 8 : 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              {/* Avatar e título (opcional) */}
              {showAvatar && (
                <>
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
                </>
              )}

              {/* Seção de informações */}
              <Skeleton variant="text" width={180} height={28} sx={{ mb: 2 }} />
              <Grid container spacing={2} mb={showNotes ? 3 : 0}>
                {Array.from({ length: infoFields }).map((_, index) => (
                  <Grid key={index} size={{ xs: 12, sm: 6 }}>
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
                ))}
              </Grid>

              {/* Observações (opcional) */}
              {showNotes && (
                <>
                  <Skeleton
                    variant="text"
                    width={140}
                    height={28}
                    sx={{ mb: 2 }}
                  />
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
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar (opcional) */}
        {showSidebar && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              {Array.from({ length: sidebarCards }).map((_, index) => (
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
        )}
      </Grid>
    </Box>
  );
}
