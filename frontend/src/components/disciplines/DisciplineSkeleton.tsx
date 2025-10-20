import DetailSkeleton from "@/components/common/DetailSkeleton";

export default function DisciplineSkeleton() {
  return (
    <DetailSkeleton
      showAvatar={false}
      infoFields={2}
      showNotes={false}
      showSidebar={false}
      titleWidth={450}
    />
  );
}
