import ExerciseContent from "@/components/organisms/exerciseContent";

export default function ExercisePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <ExerciseContent id={id} />;
}
