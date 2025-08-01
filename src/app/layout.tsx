import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const monaSans = Mona_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview Iq",
  description: "Created by Nayan ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthExist = await isAuthenticated();

  if (!isAuthExist) redirect("/");

  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased flex flex-col  min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
