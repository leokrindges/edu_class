import TableSkeleton from "@/components/common/TableSkeleton";
export function StudentListSkeleton() {
  return (
    <TableSkeleton
      rows={2}
      columns={[
        { label: "Estudante" },
        { label: "Email" },
        { label: "Telefone", align: "right" },
        { label: "Status", align: "right" },
        { label: "Data de Cadastro" },
        {
          label: "Ações",
          align: "left",
          skeletonVariant: "circular",
        },
      ]}
    />
  );
}
