"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Collapsible component for expandable content.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered Collapsible component.
 */
function Collapsible({
  ...props
}) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

/**
 * CollapsibleTrigger component for toggling the collapsible content.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered CollapsibleTrigger component.
 */
function CollapsibleTrigger({
  ...props
}) {
  return (<CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />);
}

/**
 * CollapsibleContent component for the content to be expanded/collapsed.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered CollapsibleContent component.
 */
function CollapsibleContent({
  ...props
}) {
  return (<CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />);
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
