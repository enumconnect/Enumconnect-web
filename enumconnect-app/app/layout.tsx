import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enumconnect — Good things are connecting",
  description:
    "Enumconnect is under development. Come back a little later, and play Mario Run or Ninja Jump while we get things ready.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
