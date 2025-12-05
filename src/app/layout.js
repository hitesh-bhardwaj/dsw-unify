import { Inter } from "next/font/google";
import "./globals.css";
import LayoutTransition from "@/components/LayoutTransition";

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

/**
 * Root layout component for the application.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @returns {React.JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <LayoutTransition>
          {children}
        </LayoutTransition>
      </body>
    </html>
  );
}
