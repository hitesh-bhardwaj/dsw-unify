'use client';;
import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui-components/react/popover';
import { AnimatePresence, motion } from 'motion/react';

import { getStrictContext } from '@/lib/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';

const [PopoverProvider, usePopover] =
  getStrictContext('PopoverContext');

/**
 * Popover component based on @base-ui-components/react/popover.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.open] - Whether the popover is open.
 * @param {boolean} [props.defaultOpen] - Whether the popover is initially open.
 * @param {function} [props.onOpenChange] - Callback when open state changes.
 * @returns {React.JSX.Element} The rendered Popover component.
 */
function Popover(props) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });

  return (
    <PopoverProvider value={{ isOpen, setIsOpen }}>
      <PopoverPrimitive.Root data-slot="popover" {...props} onOpenChange={setIsOpen} />
    </PopoverProvider>
  );
}

/**
 * Trigger component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverTrigger component.
 */
function PopoverTrigger(props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/**
 * Portal component for rendering the Popover content outside the DOM hierarchy.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverPortal component.
 */
function PopoverPortal(props) {
  const { isOpen } = usePopover();

  return (
    <AnimatePresence>
      {isOpen && (
        <PopoverPrimitive.Portal keepMounted data-slot="popover-portal" {...props} />
      )}
    </AnimatePresence>
  );
}

/**
 * Positioner component for the Popover content.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverPositioner component.
 */
function PopoverPositioner(props) {
  return (<PopoverPrimitive.Positioner data-slot="popover-positioner" {...props} />);
}

/**
 * Popup component for the Popover content with animation.
 *
 * @param {Object} props - The component props.
 * @param {any} [props.initialFocus] - Element to focus on open.
 * @param {any} [props.finalFocus] - Element to focus on close.
 * @param {Object} [props.transition] - Transition settings.
 * @returns {React.JSX.Element} The rendered PopoverPopup component.
 */
function PopoverPopup({
  initialFocus,
  finalFocus,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  ...props
}) {
  return (
    <PopoverPrimitive.Popup
      initialFocus={initialFocus}
      finalFocus={finalFocus}
      render={
        <motion.div
          key="popover-popup"
          data-slot="popover-popup"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={transition}
          {...props} />
      } />
  );
}

/**
 * Backdrop component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverBackdrop component.
 */
function PopoverBackdrop(props) {
  return <PopoverPrimitive.Backdrop data-slot="popover-backdrop" {...props} />;
}

/**
 * Arrow component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverArrow component.
 */
function PopoverArrow(props) {
  return <PopoverPrimitive.Arrow data-slot="popover-arrow" {...props} />;
}

/**
 * Title component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverTitle component.
 */
function PopoverTitle(props) {
  return <PopoverPrimitive.Title data-slot="popover-title" {...props} />;
}

/**
 * Description component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverDescription component.
 */
function PopoverDescription(props) {
  return (<PopoverPrimitive.Description data-slot="popover-description" {...props} />);
}

/**
 * Close button component for the Popover.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered PopoverClose component.
 */
function PopoverClose(props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

export { Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverPopup, PopoverBackdrop, PopoverArrow, PopoverTitle, PopoverDescription, PopoverClose, usePopover };
