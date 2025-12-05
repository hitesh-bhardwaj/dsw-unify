import * as React from 'react';

import {
  Popover as PopoverPrimitive,
  PopoverTrigger as PopoverTriggerPrimitive,
  PopoverPositioner as PopoverPositionerPrimitive,
  PopoverPopup as PopoverPopupPrimitive,
  PopoverPortal as PopoverPortalPrimitive,
  PopoverClose as PopoverClosePrimitive,
  PopoverBackdrop as PopoverBackdropPrimitive,
  PopoverTitle as PopoverTitlePrimitive,
  PopoverDescription as PopoverDescriptionPrimitive,
} from '@/components/animate-ui/primitives/base/popover';
import { cn } from '@/lib/utils';

/**
 * Root component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered Popover component.
 */
function Popover(props) {
  return <PopoverPrimitive {...props} />;
}

/**
 * Trigger component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverTrigger component.
 */
function PopoverTrigger(props) {
  return <PopoverTriggerPrimitive {...props} />;
}

/**
 * Panel component for the Popover content.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.align='center'] - Alignment of the popover.
 * @param {number} [props.sideOffset=4] - Offset from the trigger.
 * @param {boolean} [props.initialFocus] - Whether to focus on open.
 * @param {boolean} [props.finalFocus] - Whether to return focus on close.
 * @param {Object} [props.style] - Inline styles.
 * @param {React.ReactNode} props.children - Content of the popover.
 * @returns {React.JSX.Element} The rendered PopoverPanel component.
 */
function PopoverPanel({
  className,
  align = 'center',
  sideOffset = 4,
  initialFocus,
  finalFocus,
  style,
  children,
  ...props
}) {
  return (
    <PopoverPortalPrimitive>
      <PopoverPositionerPrimitive align={align} sideOffset={sideOffset} className="z-50" {...props}>
        <PopoverPopupPrimitive
          initialFocus={initialFocus}
          finalFocus={finalFocus}
          className={cn(
            'bg-popover text-popover-foreground w-72 rounded-md border p-4 shadow-md outline-hidden origin-(--transform-origin)',
            className
          )}
          style={style}>
          {children}
        </PopoverPopupPrimitive>
      </PopoverPositionerPrimitive>
    </PopoverPortalPrimitive>
  );
}

/**
 * Close button component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverClose component.
 */
function PopoverClose(props) {
  return <PopoverClosePrimitive {...props} />;
}

/**
 * Backdrop component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverBackdrop component.
 */
function PopoverBackdrop(props) {
  return <PopoverBackdropPrimitive {...props} />;
}

/**
 * Title component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverTitle component.
 */
function PopoverTitle(props) {
  return <PopoverTitlePrimitive {...props} />;
}

/**
 * Description component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverDescription component.
 */
function PopoverDescription(props) {
  return <PopoverDescriptionPrimitive {...props} />;
}

export { Popover, PopoverTrigger, PopoverPanel, PopoverClose, PopoverBackdrop, PopoverTitle, PopoverDescription };
