import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-chat-elements/dist/main.css'

const inter = Inter({ subsets: ["latin"] });

import { ParticleAuthkit } from "./components/shared/AuthKit";

export const metadata: Metadata = {
  title: "Chain Messenger",
  description: "Chain Messenger is a decentralized communication platform designed to facilitate secure, private, and efficient messaging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleAuthkit>{children}</ParticleAuthkit>
      </body>
    </html>
  );
}
