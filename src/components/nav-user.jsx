"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Popover,
  PopoverTrigger,
  PopoverPanel,
} from '@/components/animate-ui/components/base/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ChevronDownIcon } from './Icons';
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from 'lucide-react';
import { Separator } from './ui/separator';

/**
 * Navigation user profile component with a dropdown menu.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing details like avatar, name, and email.
 * @param {string} props.user.name - The user's name.
 * @param {string} props.user.email - The user's email.
 * @param {string} props.user.avatar - The URL of the user's avatar image.
 * @param {string} [props.side] - The side to render the popover.
 * @param {number} [props.sideOffset] - The offset from the trigger.
 * @param {string} [props.align] - The alignment of the popover.
 * @param {number} [props.alignOffset] - The offset for alignment.
 * @returns {React.JSX.Element} The rendered NavUser component.
 */
export const NavUser = ({
  user,
  side,
  sideOffset,
  align,
  alignOffset,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.07,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const separatorVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: (i) => ({
      scaleX: 1,
      originX: 0,
      transition: {
        delay: i * 0.07,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <Popover onOpenChange={setIsOpen}>
      <PopoverTrigger
        render={<button className="flex items-center gap-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 ease-in-out p-2 !cursor-pointer">
          <Avatar className="h-10 w-10 rounded-full border-[3px] border-sidebar-primary">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDownIcon className="!h-1.5 !w-auto dark:text-white" />
          </motion.div>
        </button>}
      />
      <PopoverPanel
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="w-50 text-gray-600 text-sm dark:text-white"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <motion.div
              className="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </motion.div>
          </div>

          <div className="space-y-1">
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={separatorVariants}
            >
              <Separator className={"bg-black/10 dark:bg-white/10"} />
            </motion.div>

            <motion.div
              className="flex items-center gap-2 p-2 rounded-lg !cursor-pointer hover:!bg-sidebar-accent transition-colors duration-200 ease-in-out"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <Sparkles className='h-5 w-5' />
              Upgrade to Pro
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={separatorVariants}
            >
              <Separator className={"bg-black/10 dark:bg-white/10"} />
            </motion.div>

            <motion.div
              className="flex items-center gap-2 !cursor-pointer !p-2 rounded-lg hover:!bg-sidebar-accent transition-colors duration-200 ease-in-out"
              custom={4}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <BadgeCheck className='h-5 w-5' />
              Account
            </motion.div>

            <motion.div
              className="flex items-center gap-2 !cursor-pointer !p-2 rounded-lg hover:!bg-sidebar-accent transition-colors duration-200 ease-in-out"
              custom={5}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <CreditCard className='h-5 w-5' />
              Billing
            </motion.div>

            <motion.div
              className="flex items-center gap-2 !cursor-pointer !p-2 rounded-lg hover:!bg-sidebar-accent transition-colors duration-200 ease-in-out"
              custom={6}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <Bell className='h-5 w-5' />
              Notifications
            </motion.div>

            <motion.div
              custom={7}
              initial="hidden"
              animate="visible"
              variants={separatorVariants}
            >
              <Separator className={"bg-black/10"} />
            </motion.div>

            <motion.div
              className="flex items-center gap-2 p-2 rounded-lg !cursor-pointer hover:!bg-sidebar-accent transition-colors duration-200 ease-in-out"
              custom={8}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <LogOut className='h-5 w-5' />
              Log out
            </motion.div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}