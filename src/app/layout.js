import { Inter } from "next/font/google";
import "./globals.css";
import LayoutTransition from "@/components/LayoutTransition";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Unify Agentic AI",
  description: "An AI agent framework to build and deploy autonomous AI agents with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
       <script
       strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      try {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
        // Always disable transitions briefly during boot
        document.documentElement.classList.add('disable-transitions');
        setTimeout(() => {
          document.documentElement.classList.remove('disable-transitions');
        }, 5000); // keep transitions disabled for first 50ms only
      } catch (e) {}
    `,
  }}
/>


      </head>

      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <LayoutTransition>{children}</LayoutTransition>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
