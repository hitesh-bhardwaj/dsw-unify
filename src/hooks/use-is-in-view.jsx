import * as React from 'react';
import { useInView } from 'motion/react';

/**
 * Hook to detect if an element is in view.
 *
 * @param {React.RefObject} ref - The ref forwarded from the parent component.
 * @param {Object} [options={}] - Options for the intersection observer.
 * @param {boolean} [options.inView=true] - Whether the element should be considered initially in view.
 * @param {boolean} [options.inViewOnce=false] - Whether to trigger only once.
 * @param {string} [options.inViewMargin='0px'] - Margin around the root.
 * @returns {{ref: React.RefObject, isInView: boolean}} An object containing the local ref to attach to the element and a boolean indicating if it is in view.
 */
function useIsInView(ref, options = {}) {
  const { inView, inViewOnce = false, inViewMargin = '0px' } = options;
  const localRef = React.useRef(null);
  React.useImperativeHandle(ref, () => localRef.current);
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;
  return { ref: localRef, isInView };
}

export { useIsInView };
