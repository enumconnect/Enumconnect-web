import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Enumconnect — Research powered by people",
  description:
    "Connect with verified field professionals, coordinate research projects across Nigeria, and manage fieldwork through one trusted platform.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
