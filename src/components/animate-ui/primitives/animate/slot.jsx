'use client';;
import * as React from 'react';
import { motion, isMotionComponent } from 'motion/react';
import { cn } from '@/lib/utils';

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref).current = node;
      }
    });
  };
}

function mergeProps(childProps, slotProps) {
  const merged = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className, slotProps.className);
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style),
      ...(slotProps.style),
    };
  }

  return merged;
}

/**
 * Slot component that merges props and refs onto its child,
 * converting it to a motion component if it isn't already.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactElement} props.children - The child component to render.
 * @param {React.Ref<any>} ref - Ref to be forwarded to the child.
 * @returns {React.JSX.Element|null} The rendered component with merged props and ref.
 */
function Slot(
  {
    children,
    ref,
    ...props
  }
) {
  const isAlreadyMotion =
    typeof children.type === 'object' &&
    children.type !== null &&
    isMotionComponent(children.type);

  const Base = React.useMemo(() =>
    isAlreadyMotion
      ? (children.type)
      : motion.create(children.type), [isAlreadyMotion, children.type]);

  if (!React.isValidElement(children)) return null;

  const { ref: childRef, ...childProps } = children.props;

  const mergedProps = mergeProps(childProps, props);

  return (<Base {...mergedProps} ref={mergeRefs(childRef, ref)} />);
}

export { Slot };
