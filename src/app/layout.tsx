import { MealTrackerThemeProvider } from "@/provider/theme-provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meal Tracker",
  description:
    "Gerencie suas refeições diárias de forma simples com o Meal Tracker.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} antialiased`}>
        <MealTrackerThemeProvider>{children}</MealTrackerThemeProvider>
      </body>
    </html>
  );
}
