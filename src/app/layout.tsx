// Styles & Theme:
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
import { cn } from "@/utils/cn";

// Global Sidebar:
import Sidebar from "@/components/mainSidebar/sidebar";

// Fonts:
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// Metadata:
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-neutral-200 dark:bg-neutral-900",
          "text-slate-900 dark:text-slate-100",
          "min-h-screen antialiased",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Sidebar>{children}</Sidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}
