"use client";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid,
  Button,
  Stack,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  Edit,
  Delete,
  Person,
  Email,
  Phone,
  CalendarToday,
  Notes,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import {
  useStudent,
  useDeleteStudent,
} from "@/hooks/student/useStudentMutations";
import { formatPhone } from "@/utils/formatters";
import { useConfirm } from "@/hooks/useConfirm";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import StatusChip from "@/components/common/StatusChip";
import StudentSkeleton from "@/components/student/StudentSkeleton";

export default function StudentViewPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;

  const { data: student, isLoading, error } = useStudent(studentId);
  const deleteStudentMutation = useDeleteStudent();
  const { confirm, confirmProps } = useConfirm();

  const handleBack = () => {
    router.push("/students");
  };

  const handleEdit = () => {
    router.push(`/students/${studentId}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "Excluir Estudante",
      message: `Tem certeza que deseja excluir o estudante "${student?.name}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "danger",
    });

    if (confirmed) {
      deleteStudentMutation.mutate(studentId, {
        onSuccess: () => {
          router.push("/students");
        },
      });
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StudentSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Erro ao carregar estudante: {error.message}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBack}
        >
          Voltar para lista
        </Button>
      </Container>
    );
  }

  if (!student) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Estudante não encontrado.
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBack}
        >
          Voltar para lista
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Detalhes do Estudante
          </Typography>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Card Principal - Informações do Estudante */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              {/* Cabeçalho do Card */}
              <Stack direction="row" alignItems="center" spacing={3} mb={3}>
                <Avatar
                  src={student.avatar || undefined}
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "primary.main",
                    fontSize: "2rem",
                  }}
                >
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {student.name}
                  </Typography>
                  <StatusChip status={student.status} size="medium" />
                </Box>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              {/* Informações de Contato */}
              <Typography variant="h6" gutterBottom>
                Informações de Contato
              </Typography>
              <Grid container spacing={2} mb={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Email sx={{ mr: 2, color: "text.secondary" }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {student.email || "Não informado"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Phone sx={{ mr: 2, color: "text.secondary" }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Telefone
                      </Typography>
                      <Typography variant="body1">
                        {student.phone
                          ? formatPhone(student.phone)
                          : "Não informado"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Data de Nascimento */}
              {student.birthDate && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Informações Pessoais
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <CalendarToday sx={{ mr: 2, color: "text.secondary" }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Data de Nascimento
                      </Typography>
                      <Typography variant="body1">
                        {new Date(student.birthDate).toLocaleDateString(
                          "pt-BR"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}

              {/* Observações */}
              {student.notes && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Observações
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}
                  >
                    <Notes sx={{ mr: 2, color: "text.secondary", mt: 0.5 }} />
                    <Box>
                      <Typography variant="body1">{student.notes}</Typography>
                    </Box>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar - Informações Adicionais */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Card de Informações do Sistema */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Informações do Sistema
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      ID do Estudante
                    </Typography>
                    <Typography variant="body1" fontFamily="monospace">
                      {student.id}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Cadastrado em
                    </Typography>
                    <Typography variant="body1">
                      {new Date(student.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Última atualização
                    </Typography>
                    <Typography variant="body1">
                      {new Date(student.updatedAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Card de Ações Rápidas */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ações Rápidas
                </Typography>
                <Stack spacing={1}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEdit}
                  >
                    Editar Informações
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleDelete}
                  >
                    Excluir Estudante
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Diálogo de confirmação */}
      <ConfirmDialog
        {...confirmProps}
        loading={deleteStudentMutation.isPending}
      />
    </Container>
  );
}
