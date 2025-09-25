"use client";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Protected from "@/components/Protected";

export default function NotFound() {
  return (
    <Protected>
      <Container
        sx={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          py: 6,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            maxWidth: 560,
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 6 },
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              mx: "auto",
              width: 84,
              height: 84,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              mb: 2.5,
              bgcolor: "error.light",
              color: "error.contrastText",
            }}
          >
            <SearchOffRoundedIcon sx={{ fontSize: 44 }} />
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 28, sm: 34 },
              fontWeight: 700,
              mb: 1,
            }}
          >
            Página não encontrada
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            O recurso que você procura não existe, foi movido ou está
            temporariamente indisponível.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="center"
          >
            <Button
              component={Link}
              href="/dashboard"
              variant="contained"
              startIcon={<HomeRoundedIcon />}
              sx={{ px: 2.5 }}
            >
              Ir para a Home
            </Button>
            <Button
              onClick={() => history.back()}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ px: 2.5 }}
            >
              Voltar
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Protected>
  );
}
