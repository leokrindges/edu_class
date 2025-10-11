import {
  Card,
  CardContent,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { ReactNode } from "react";

interface FormContainerProps {
  title: string;
  subtitle?: string;
  error?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  children: ReactNode;
}

export default function FormContainer({
  title,
  subtitle,
  error,
  maxWidth = "lg",
  children,
}: FormContainerProps) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              color="primary"
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="subtitle1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {children}
        </CardContent>
      </Card>
    </Container>
  );
}
