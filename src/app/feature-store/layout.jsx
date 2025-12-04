import { AppLayout } from "@/components/app-layout";

/**
 * Layout component for the Feature Store section.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {React.JSX.Element} The rendered AgentsLayout component.
 */
export default function AgentsLayout({ children }) {
  return <AppLayout title="Feature Store">{children}</AppLayout>;
}
