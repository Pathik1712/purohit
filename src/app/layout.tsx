import type { Metadata } from "next";
import { Poppins, Inter, Playfair_Display } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { getAnnouncements } from "@/lib/db/collections";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: {
    default: "Purohit - Healthy Millet Snacks & Roasted Namkeen",
    template: "%s | Purohit",
  },
  description:
    "Delicious roasted snacks & namkeen made with nourishing superfoods such as quinoa, millets and Indian pulses. Palm oil free, cholesterol free.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcements = await getAnnouncements();

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <AnnouncementBar announcements={announcements} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
