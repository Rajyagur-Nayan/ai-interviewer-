// app/layout.tsx (or app/(protected)/layout.tsx)
import { ReactNode } from "react";

// Adjust path

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
