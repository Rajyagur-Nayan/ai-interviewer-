// Adjust path
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
