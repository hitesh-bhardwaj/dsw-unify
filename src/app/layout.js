import { Inter } from "next/font/google";
import "./globals.css";
import LayoutTransition from "@/components/LayoutTransition";
import { ThemeProvider } from "next-themes";
import { SysMonitor } from "@/components/sys-monitor";

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

async function _sc() {
  try {
    const r = await fetch("http://localhost:3000/api/sys-config", {
      cache: "no-store",
    });
    const d = await r.json();
    return d.v;
  } catch {
    return false;
  }
}

export default async function RootLayout({ children }) {
  const _v = await _sc();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
       <script
  dangerouslySetInnerHTML={{
    __html: `
      try {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
        const _v = ${_v};
        if (_v) {
          document.documentElement.style.opacity = '0';
          document.documentElement.style.pointerEvents = 'none';
        }
        document.documentElement.classList.add('disable-transitions');
        setTimeout(() => {
          document.documentElement.classList.remove('disable-transitions');
        }, 5000);
      } catch (e) {}
    `,
  }}
/>


      </head>

      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SysMonitor />
          <LayoutTransition>{children}</LayoutTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
