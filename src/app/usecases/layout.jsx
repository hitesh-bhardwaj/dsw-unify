import { AppLayout } from "@/components/app-layout";

/**
 * Layout component for the Use Cases section.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {React.JSX.Element} The rendered UseCasesLayout component.
 */
export default function UseCasesLayout({ children }) {
  return <AppLayout title="UseCases">{children}</AppLayout>;
}
