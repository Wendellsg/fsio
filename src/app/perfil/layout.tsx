import { AppContainer, PageContent } from "@/components/ui/layouts";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContainer>
      <PageContent>{children}</PageContent>
    </AppContainer>
  );
}
