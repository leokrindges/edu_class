import DetailSkeleton from "../common/DetailSkeleton";

interface StudentSkeletonDetailsProps {
  title?: string;
  subtitle?: string;
}

export default function StudentSkeletonDetails({
  title = "Carregando detalhes do estudante...",
  subtitle = "Aguarde enquanto buscamos as informações",
}: StudentSkeletonDetailsProps) {
  return (
    <DetailSkeleton
      title={title}
      subtitle={subtitle}
      showAvatar={true}
      infoFields={4}
      showNotes={true}
      showSidebar={true}
      sidebarCards={3}
    />
  );
}
