'use client';;
import * as React from 'react';
import { motion } from 'motion/react';

import { Slot } from '@/components/animate-ui/primitives/animate/slot';

/**
 * Button component with scaling animation on hover and tap.
 *
 * @param {Object} props - The component props.
 * @param {number} [props.hoverScale=1.05] - Scale factor on hover.
 * @param {number} [props.tapScale=0.95] - Scale factor on tap/click.
 * @param {boolean} [props.asChild=false] - Whether to render as a child component.
 * @returns {React.JSX.Element} The rendered Button component.
 */
function Button({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}) {
  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...props} />
  );
}

export { Button };
