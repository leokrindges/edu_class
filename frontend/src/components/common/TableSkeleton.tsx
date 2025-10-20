import {
  Card,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Column {
  label: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  skeletonVariant?: "text" | "rectangular" | "circular";
  skeletonHeight?: number;
}

interface TableSkeletonProps {
  columns: Column[];
  rows?: number;
}

export default function TableSkeleton({
  columns,
  rows = 3,
}: TableSkeletonProps) {
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} align={col.align || "left"}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} align={col.align || "left"}>
                    <Skeleton
                      variant={col.skeletonVariant || "text"}
                      width={
                        col.skeletonVariant === "circular"
                          ? 24
                          : col.width || "100%"
                      }
                      height={
                        col.skeletonVariant === "circular"
                          ? 24
                          : col.skeletonHeight
                      }
                      sx={
                        col.skeletonVariant === "rectangular"
                          ? { borderRadius: 3 }
                          : undefined
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
