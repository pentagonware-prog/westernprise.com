import type { Metadata } from "next";
import { StagingBadge } from "@/components/ui/staging-badge";
import "./globals.css";

export const metadata: Metadata = {
  title: "Westernprise — Business Operations, Connected",
  description: "Manage customers, inventory, documents, money, staff and confidential operations in one connected workspace.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><StagingBadge />{children}</body></html>;
}
