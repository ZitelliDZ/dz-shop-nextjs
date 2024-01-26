import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Provider } from "@/components";

export const metadata:Metadata = {
  title: {
    template: "%s | DZ Shop",
    default: "Home | DZ Shop",
  },
  description: "Una tienda virtual para todos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
