import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

import SessionProvider from "@/providers/SessionProvider";
import AccountProvider from "@/providers/AccountProvider";

import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "BookStore",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="ru">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AccountProvider>
            <div className="container">
              <div className="wrapper">
                {children}
              </div>
            </div>
          </AccountProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
