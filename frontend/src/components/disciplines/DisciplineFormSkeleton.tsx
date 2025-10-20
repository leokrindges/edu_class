import DetailSkeleton from "../common/DetailSkeleton";

interface DisciplineFormSkeletonProps {
  title?: string;
  subtitle?: string;
}

export default function DisciplineFormSkeleton({
  title = "Carregando...",
  subtitle = "Aguarde um momento",
}: DisciplineFormSkeletonProps) {
  return (
    <DetailSkeleton
      title={title}
      subtitle={subtitle}
      showAvatar={false}
      infoFields={2}
      showNotes={false}
      showSidebar={false}
    />
  );
}
