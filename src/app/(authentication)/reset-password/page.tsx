import { ResetPasswordForm } from "@/components/organisms/resetPasswordForm";
export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  return (
    <section>
      <ResetPasswordForm token={searchParams.token} />
    </section>
  );
}
