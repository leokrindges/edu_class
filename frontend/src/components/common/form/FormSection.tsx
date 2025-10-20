import { Typography, Divider, Grid } from "@mui/material";
import { ReactNode } from "react";

type ResponsiveSize = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

interface FormSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  spacing?: number;
  size?: number | ResponsiveSize;
}

export default function FormSection({
  title,
  icon,
  children,
  spacing = 3,
  size,
}: FormSectionProps) {
  return (
    <Grid container spacing={spacing} size={size}>
      <Grid size={12}>
        <Typography
          variant="h6"
          sx={{ mb: 2, mt: 2, display: "flex", alignItems: "center" }}
        >
          {icon && <>{icon}</>}
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      {children}
    </Grid>
  );
}
