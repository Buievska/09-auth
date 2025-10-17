// app/layout.tsx
import "modern-normalize";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub | Your Notes in One Place",
  description: "Create, edit, and organize your notes easily with NoteHub.",
  openGraph: {
    title: "NoteHub | Your Notes in One Place",
    description: "Create, edit, and organize your notes easily with NoteHub.",
    url: "https://08-zustand-jet.vercel.app",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />

          {children}
          {modal}

          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </TanStackProvider>
      </body>
    </html>
  );
}
