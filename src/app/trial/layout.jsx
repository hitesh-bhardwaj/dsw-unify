import { AppLayout } from "@/components/app-layout";

/**
 * Layout component for the Testing/Trial section.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {React.JSX.Element} The rendered TestingLayout component.
 */
export default function TestingLayout({ children }) {
  return <AppLayout title="Testing">{children}</AppLayout>;
}
