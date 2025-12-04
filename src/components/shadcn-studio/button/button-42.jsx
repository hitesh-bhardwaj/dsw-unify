import * as motion from 'motion/react-client'

import { Button } from '@/components/ui/button'

/**
 * A demo component for a button with a tap animation using framer-motion.
 *
 * @returns {React.JSX.Element} The rendered ButtonTapAnimationDemo component.
 */
const ButtonTapAnimationDemo = () => {
  return (
    <Button className='transition-none' asChild>
      <motion.button whileTap={{ scale: 0.85 }}>Tap Animation</motion.button>
    </Button>
  );
}

export default ButtonTapAnimationDemo
