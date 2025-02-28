import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "../styles/prism.css";
import React, { Suspense } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import ThemeProvider from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotest = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A community driven platform for developers asking and answering questions.Get help and answers to your questions about anything related to programming and software development from the best developers on the internet.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotest.variable}`}>
        <Suspense>
          <ClerkProvider
            appearance={{
              elements: {
                formButtonPrimary: "primary-gradient",
                footerActionLink:
                  "primary-text-gradient hover:text-primary-500",
              },
            }}
          >
            <ThemeProvider>{children}</ThemeProvider>
          </ClerkProvider>
        </Suspense>
      </body>
    </html>
  );
}
