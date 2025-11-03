// components/animations/FadeUp.jsx
"use client";

import { motion } from "motion/react";

/**
 * Reusable FadeUp animation component
 * @param {React.ReactNode} children - Content to animate
 * @param {number} delay - Delay before animation starts (in seconds)
 * @param {number} duration - Duration of animation (in seconds)
 * @param {number} yOffset - Distance to move from (in pixels)
 * @param {string} className - Additional CSS classes
 */
export const FadeUp = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  yOffset = 20,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Container for staggered children animations
 * @param {React.ReactNode} children - Child components to animate
 * @param {number} staggerDelay - Delay between each child animation
 * @param {number} delay - Initial delay before animations start
 * @param {string} className - Additional CSS classes
 */
export const FadeUpStagger = ({ 
  children, 
  staggerDelay = 0.1,
  delay = 0.5,
  duration=0.8,
  className = "" 
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            delay,
            duration,
        ease: [0.25, 0.4, 0.25, 1],
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Child item for FadeUpStagger container
 * @param {React.ReactNode} children - Content to animate
 * @param {number} duration - Duration of animation
 * @param {number} yOffset - Distance to move from
 * @param {string} className - Additional CSS classes
 */
export const FadeUpItem = ({ 
  children, 
  duration = 0.5,
  yOffset = 20,
  delay=0,
  className = "" 
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};