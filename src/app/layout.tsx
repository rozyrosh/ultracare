import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Poppins, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ultracare | FY2025/26 Review and Budget Review",
  description:
    "Ultracare IT Service Center — FY2025/26 annual review and budget presentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${poppins.variable} ${manrope.variable} ${jetbrains.variable} h-full`}
    >
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
