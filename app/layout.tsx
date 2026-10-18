import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remote platforms that hire from India, by entry test",
  description:
    "Freelancer portals, direct job boards, test-and-match marketplaces and build-first portals, ranked by how hard the entry test is.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
