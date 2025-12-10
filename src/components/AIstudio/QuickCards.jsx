"use client";

import Link from "next/link";
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
export function QuickCards({ icon: Icon, title, description, href, className }) {
  const CardWrapper = href
    ? ({ children }) => (
        <Bounce>
          <Link href={href} className="block h-full">
            {children}
          </Link>
        </Bounce>
      )
    : ({ children }) => <Bounce>{children}</Bounce>;

  return (
    <CardWrapper>
      <Card
        className={cn(
          "feature-card-hover-container h-full transition-all duration-300 group py-5 pb-10 hover:border-white/20",
          href && "cursor-pointer",
          className
        )}
      >
        <CardHeader className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-sidebar-accent border text-foreground transition-all group-hover:bg-white group-hover:text-black group-hover:border-white duration-300 p-3">
              {Icon && <Icon className="h-8 w-8" />}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium leading-none tracking-tight group-hover:text-white transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
              {description}
            </p>
          </div>
        </CardHeader>
      </Card>
    </CardWrapper>
  );
}
