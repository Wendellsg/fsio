import { AdminNavigation } from "@/components/organisms/navigation";

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen">
      <AdminNavigation />
      <section className="p-4 w-full">{children}</section>
    </main>
  );
}
