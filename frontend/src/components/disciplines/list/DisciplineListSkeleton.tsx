import TableSkeleton from "@/components/common/TableSkeleton";

export function DisciplineListSkeleton() {
  return (
    <TableSkeleton
      rows={2}
      columns={[
        { label: "Nome" },
        { label: "Descrição" },
        { label: "Preço por Aula", align: "right" },
        { label: "Duração (min)", align: "right" },
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
