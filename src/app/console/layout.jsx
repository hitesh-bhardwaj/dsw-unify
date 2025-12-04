import { AppLayout } from "@/components/app-layout";

/**
 * Layout component for the Console section.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {React.JSX.Element} The rendered ConsoleLayout component.
 */
export default function ConsoleLayout({ children }) {
  return <AppLayout title="Console">{children}</AppLayout>;
}
