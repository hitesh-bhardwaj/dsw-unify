import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Login - UnifyAI",
  description: "Sign in to UnifyAI platform",
};

export default function AuthLayout({ children }) {
  return children;
}
