import { Providers } from "@/app/providers";
import { ApolloProvider } from "@/lib/apolloClient";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: '%s | Leonardo.ai Web Challenge 2024',
    default: 'Leonardo.ai Web Challenge 2024',
  },
    description: "A GraphQL and Chakra-based prototype for evaluation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider>
          <Providers>
            {children}
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  );
}
