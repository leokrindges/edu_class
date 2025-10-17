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

export function DisciplineListSkeleton() {
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estudante</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Cadastro</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton variant="text" width={160} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={180} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="rectangular"
                    width={60}
                    height={24}
                    sx={{ borderRadius: 3 }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="circular" width={24} height={24} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
