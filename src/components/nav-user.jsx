// "use client"

// import {
//   BadgeCheck,
//   Bell,
//   ChevronsUpDown,
//   CreditCard,
//   LogOut,
//   Sparkles,
// } from "lucide-react"

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ChevronDownIcon } from "./Icons"

// export function NavUser({ user }) {

//   return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="flex items-center gap-2 rounded-lg hover:bg-sidebar-accent duration-300 p-2 transition-colors !cursor-pointer">
//               <Avatar className="h-10 w-10 rounded-full border-[3px] border-sidebar-primary">
//                 <AvatarImage src={user.avatar} alt={user.name} />
//                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//               </Avatar>
//               <ChevronDownIcon className="!h-1.5 !w-auto"/>
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
//             side={"bottom"}
//             align="end"
//             sideOffset={4}
//           >
//             <DropdownMenuLabel className="p-0 font-normal">
//               <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                 <Avatar className="h-8 w-8 rounded-lg">
//                   <AvatarImage src={user.avatar} alt={user.name} />
//                   <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                 </Avatar>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-medium">{user.name}</span>
//                   <span className="truncate text-xs">{user.email}</span>
//                 </div>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem>
//                 <Sparkles />
//                 Upgrade to Pro
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem>
//                 <BadgeCheck />
//                 Account
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <CreditCard />
//                 Billing
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Bell />
//                 Notifications
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <LogOut />
//               Log out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//   )
// }


import {
  Popover,
  PopoverTrigger,
  PopoverPanel,
} from '@/components/animate-ui/components/base/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ChevronDownIcon, SparklesIcon } from './Icons';
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from 'lucide-react';
import { Separator } from './ui/separator';

export const NavUser = ({
  user,
  side,
  sideOffset,
  align,
  alignOffset,
}) => {
  return (
    <Popover>
      <PopoverTrigger
        render={<button className="flex items-center gap-2 rounded-lg hover:bg-sidebar-accent duration-300 p-2 transition-colors !cursor-pointer">
          <Avatar className="h-10 w-10 rounded-full border-[3px] border-sidebar-primary">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <ChevronDownIcon className="!h-1.5 !w-auto" />
        </button>}
      />
      <PopoverPanel
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="w-50 text-gray-600 text-sm"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
           <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                 <Avatar className="h-8 w-8 rounded-lg">
                   <AvatarImage src={user.avatar} alt={user.name} />
                   <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                 <div className="grid flex-1 text-left text-sm leading-tight">
                   <span className="truncate font-medium">{user.name}</span>
                   <span className="truncate text-xs">{user.email}</span>
                 </div>
               </div>
          </div>
          <div className="space-y-3">
             <Separator className={"bg-black/10"}/>

            <div className="flex items-center gap-2">
               <Sparkles className='h-5 w-5'/>
                Upgrade to Pro

            </div>
            <Separator className={"bg-black/10"}/>
            
            <div className="flex items-center gap-2">
               <BadgeCheck className='h-5 w-5'/>
               Account

            </div>
            <div className="flex items-center gap-2">
              <CreditCard className='h-5 w-5' />
                 Billing

            </div>
            <div className="flex items-center gap-2">
               <Bell className='h-5 w-5'/>
         Notifications

            </div>
            <Separator className={"bg-black/10"}/>
            <div className="flex items-center gap-2">
              <LogOut className='h-5 w-5'/>
          Log out
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};





