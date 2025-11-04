'use client';;
import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui-components/react/popover';
import { AnimatePresence, motion } from 'motion/react';

import { getStrictContext } from '@/lib/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';

const [PopoverProvider, usePopover] =
  getStrictContext('PopoverContext');

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

function PopoverTrigger(props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

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

function PopoverPositioner(props) {
  return (<PopoverPrimitive.Positioner data-slot="popover-positioner" {...props} />);
}

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

function PopoverBackdrop(props) {
  return <PopoverPrimitive.Backdrop data-slot="popover-backdrop" {...props} />;
}

function PopoverArrow(props) {
  return <PopoverPrimitive.Arrow data-slot="popover-arrow" {...props} />;
}

function PopoverTitle(props) {
  return <PopoverPrimitive.Title data-slot="popover-title" {...props} />;
}

function PopoverDescription(props) {
  return (<PopoverPrimitive.Description data-slot="popover-description" {...props} />);
}

function PopoverClose(props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

export { Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverPopup, PopoverBackdrop, PopoverArrow, PopoverTitle, PopoverDescription, PopoverClose, usePopover };
