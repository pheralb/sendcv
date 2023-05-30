import type { Metadata } from "next";

// Styles & Theme:
import "@/styles/globals.css";
import { cn } from "@/utils/cn";

// Global Sidebar:
import Sidebar from "@/components/mainSidebar/sidebar";

// Fonts:
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
const figtreeFont = Figtree({
  variable: "--satoshiFont-font",
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
  preload: true,
});
const calSans = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  variable: "--calSans-font",
  weight: "600",
  display: "swap",
  preload: true,
});

// Client Providers:
import { ThemeProvider } from "@/providers/themeProvider";
import SonnerProvider from "@/providers/sonnerProvider";
import SessionProvider from "@/providers/sessionProvider";

// Metadata:
export const metadata: Metadata = {
  // General:
  title: "Sendcv",
  description: "Create a beautiful profile and explore job offers.",
  keywords: ["CV", "Profile", "Social", "Jobs"],
  colorScheme: "dark",
  themeColor: "black",
  publisher: "@pheralb_",
  // Favicon:
  icons: {
    icon: "/images/logo_svg.svg",
    shortcut: "/images/logo_svg.svg",
    apple: "/images/logo_png.png",
  },
  // Open Graph:
  openGraph: {
    title: "Next.js",
    description: "The React Framework for the Web",
    url: "https://nextjs.org",
    siteName: "Next.js",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://sendcv.vercel.app/og_image.png",
        width: 1920,
        height: 1080,
        alt: "Create a beautiful profile and explore job offers.",
      },
    ],
  },
  // Twitter:
  twitter: {
    card: "summary_large_image",
    title: "Sendcv",
    description: "Create a beautiful profile and explore job offers.",
    creator: "@pheralb_",
    images: ["https://sendcv.vercel.app/og_image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    item: string;
  };
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-neutral-200 dark:bg-neutral-900",
          "text-slate-900 dark:text-slate-100",
          "min-h-screen antialiased",
          figtreeFont.className,
          calSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <SonnerProvider>
              <Sidebar>{children}</Sidebar>
            </SonnerProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
