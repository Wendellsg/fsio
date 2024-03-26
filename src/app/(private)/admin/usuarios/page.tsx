import { UsersTable } from "@/components/organisms/users/table";

export default function AdminPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-16">Usuários</h1>

      <UsersTable />
    </>
  );
}
