// // components/animations/FadeUp.jsx
"use client";

import { motion } from "motion/react";

// /**
//  * Reusable FadeUp animation component
//  * @param {React.ReactNode} children - Content to animate
//  * @param {number} delay - Delay before animation starts (in seconds)
//  * @param {number} duration - Duration of animation (in seconds)
//  * @param {number} yOffset - Distance to move from (in pixels)
//  * @param {string} className - Additional CSS classes
//  */
/**
 * FadeUp animation component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Content to animate.
 * @param {number} [props.delay=0] - Delay before animation starts (in seconds).
 * @param {number} [props.duration=1] - Duration of animation (in seconds).
 * @param {number} [props.yOffset=50] - Distance to move from (in pixels).
 * @param {string} [props.className="w-full"] - Additional CSS classes.
 * @returns {React.JSX.Element} The rendered FadeUp component.
 */
export const FadeUp = ({
  children,
  delay = 0,
  duration = 1,
  yOffset = 50,
  className = "w-full",
}) => {
  return (
    <motion.div
      
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.335, -0.006, 0.014, 0.995],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScaleDown animation component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Content to animate.
 * @param {number} [props.delay=0] - Delay before animation starts (in seconds).
 * @param {number} [props.duration=0.2] - Duration of animation (in seconds).
 * @param {string} [props.className="w-full"] - Additional CSS classes.
 * @returns {React.JSX.Element} The rendered ScaleDown component.
 */
export const ScaleDown = ({
  children,
  delay = 0,
  duration = 0.2,
  className = "w-full",
}) => {
  return (
    <motion.div
      initial={{ opacity:0,scale:1.03 }}
      animate={{ opacity: 1, scale:1 }}
      exit={{opacity:0,scale:0.97}}
      style={{ originY: 0, originX: 0.5 }}
      transition={{
        duration,
        delay,
        ease: [0.335, -0.006, 0.014, 0.995],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// /**
//  * Container for staggered children animations
//  * @param {React.ReactNode} children - Child components to animate
//  * @param {number} staggerDelay - Delay between each child animation
//  * @param {number} delay - Initial delay before animations start
//  * @param {string} className - Additional CSS classes
//  */
/**
 * Container for staggered children animations.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Child components to animate.
 * @param {number} [props.staggerDelay=0.1] - Delay between each child animation.
 * @param {number} [props.delay=0.5] - Initial delay before animations start.
 * @param {number} [props.duration=0.8] - Duration of animation.
 * @param {string} [props.className=""] - Additional CSS classes.
 * @returns {React.JSX.Element} The rendered FadeUpStagger component.
 */
export const FadeUpStagger = ({
  children,
  staggerDelay = 0.1,
  delay = 0.5,
  duration = 0.8,
  className = "",
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

// /**
//  * Child item for FadeUpStagger container
//  * @param {React.ReactNode} children - Content to animate
//  * @param {number} duration - Duration of animation
//  * @param {number} yOffset - Distance to move from
//  * @param {string} className - Additional CSS classes
//  */
// export const FadeUpItem = ({
//   children,
//   duration = 0.5,
//   yOffset = 20,
//   delay=0,
//   className = ""
// }) => {
//   return (
//     <motion.div
//       variants={{
//         hidden: { opacity: 0, y: yOffset },
//         visible: {
//           opacity: 1,
//           y: 0,
//           transition: {
//             duration,
//             delay,
//             ease: [0.25, 0.4, 0.25, 1],
//           },
//         },
//       }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

/**
 * Bounce animation component for tap interactions.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Content to animate.
 * @returns {React.JSX.Element} The rendered Bounce component.
 */
export const Bounce = ({ children }) => {
  return (
    <>
      <motion.div whileTap={{ scale: 0.95 }} transition={{ease:[0.25, 0.4, 0.25, 1]}}>{children}</motion.div>
    </>
  );
};
