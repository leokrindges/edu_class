import DetailSkeleton from "@/components/common/DetailSkeleton";

interface StudentSkeletonProps {
  title?: string;
  subtitle?: string;
}
export default function StudentSkeleton({
  title = "Carregando estudante...",
  subtitle = "Aguarde enquanto buscamos os dados",
}: StudentSkeletonProps) {
  return (
    <DetailSkeleton
      title={title}
      subtitle={subtitle}
      showAvatar={true}
      infoFields={4}
      showNotes={false}
      showSidebar={false}
    />
  );
}
