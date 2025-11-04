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

function Popover(props) {
  return <PopoverPrimitive {...props} />;
}

function PopoverTrigger(props) {
  return <PopoverTriggerPrimitive {...props} />;
}

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

function PopoverClose(props) {
  return <PopoverClosePrimitive {...props} />;
}

function PopoverBackdrop(props) {
  return <PopoverBackdropPrimitive {...props} />;
}

function PopoverTitle(props) {
  return <PopoverTitlePrimitive {...props} />;
}

function PopoverDescription(props) {
  return <PopoverDescriptionPrimitive {...props} />;
}

export { Popover, PopoverTrigger, PopoverPanel, PopoverClose, PopoverBackdrop, PopoverTitle, PopoverDescription };
