import { RouteGuardProvider } from "@/providers";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteGuardProvider>{children}</RouteGuardProvider>;
}
