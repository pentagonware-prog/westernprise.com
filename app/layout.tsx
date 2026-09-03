import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Westernprise — Business Operations, Connected",
  description: "Manage customers, inventory, documents, money, staff and confidential operations in one connected workspace.",
  icons: { icon: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
