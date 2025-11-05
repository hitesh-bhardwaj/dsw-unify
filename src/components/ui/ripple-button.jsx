'use client';
import * as React from 'react'

import { motion } from 'motion/react';

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

function RippleButton({
  ref,
  circColor,
  children,
  onClick,
  className,
  variant,
  size,
  scale = 10,
  transition = { duration: 0.6, ease: 'easeOut' },
  ...props
}) {
  const [ripples, setRipples] = React.useState([])
  const buttonRef = React.useRef(null)

  React.useImperativeHandle(ref, () => buttonRef.current)

  const createRipple = React.useCallback((event) => {
    const button = buttonRef.current

    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
  }, [])

  const handleClick = React.useCallback((event) => {
    createRipple(event)

    if (onClick) {
      onClick(event)
    }
  }, [createRipple, onClick])

  return (
    <motion.div
      ref={buttonRef}
      whileTap={{ scale: 0.85 }}
      data-slot='ripple-button'
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size }), 'relative overflow-hidden p-0 bg-transparent hover:bg-transparent w-fit h-fit', className)}
      {...props}>
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale, opacity: 0 }}
          transition={transition}
          className={`pointer-events-none absolute size-5 bg-black/20 rounded-full ${circColor}`}
          style={{
            top: ripple.y - 10,
            left: ripple.x - 10
          }} />
      ))}
    </motion.div>
  );
}

export { RippleButton };
