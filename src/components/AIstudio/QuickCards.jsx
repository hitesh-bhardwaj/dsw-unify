

import { Card, CardHeader } from "@/components/ui/card";
import { Bounce } from "@/components/animations/Animations";
import { cn } from "@/lib/utils";

/**
 * QuickCards component for displaying quick access cards with an icon, title, and description.
 *
 * @param {Object} props - The component props.
 * @param {React.ElementType} props.icon - The icon component to display.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card.
 * @param {string} [props.href] - The URL to link to (optional).
 * @param {string} [props.className] - Additional class names for the card.
 * @returns {React.JSX.Element} The rendered QuickCards component.
 */
export function QuickCards({ icon: Icon, title, description, href, className, index }) {
  const CardWrapper = href
    ? ({ children }) => (
        <Bounce>
          <div className="block h-full">
            {children}
          </div>
        </Bounce>
      )
    : ({ children }) => <Bounce>{children}</Bounce>;

  return (
    <CardWrapper>
      <Card
        className={cn(
          " flex  h-full transition-all duration-300 group !pb-0 !pt-0 !py-8",
          className
        )}
      >
        <CardHeader className="flex gap-6 items-center">
          <div className="">
            <div
              className="flex h-15 w-15 items-center justify-center rounded-lg  transition-all  p-3.5 bg-icon-color-1/10 text-icon-color-1"
            >
              {Icon && <Icon className="h-9 w-9" />}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium leading-none tracking-tight ">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </CardHeader>
      </Card>
    </CardWrapper>
  );
}
