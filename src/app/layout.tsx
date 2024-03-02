import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import "./globals.css";

import { Metadata } from "next";
import { Providers } from "../providers";

import { cn, fontSans } from "@/lib/utils";

setDefaultOptions({ locale: ptBR });

export const metadata: Metadata = {
  title: "FSIO",
  description: "De fisioterapeuta para fisioterapeuta",
  icons: "/assets/exercicios.png",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
