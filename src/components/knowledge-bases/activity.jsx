import React from 'react'
import { ScaleDown } from '../animations/Animations'
import { Card, CardContent, CardHeader } from '../ui/card'
import { cn } from '@/lib/utils'
import { motion } from "framer-motion";

const recentActivity= [
      { type: "success", event: "Synced 45 documents", time: "2 hours ago" },
      { type: "success", event: "Added new document", time: "5 hours ago" },
      { type: "success", event: "Updated 12 documents", time: "1 day ago" },
      { type: "success", event: "Sync completed", time: "2 days ago" },
    ]

/**
 * Component to display a list of recent activities.
 *
 * @returns {React.JSX.Element} The rendered Activity component.
 */
const Activity = () => {

    const getActivityColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const separatorVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: (i) => ({
      scaleX: 1,
      originX: 0,
      transition: {
        delay: i * 0.07,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };
  return (
   <>
   <ScaleDown>
   <Card className={"border-none bg-background"}>
                <CardHeader>
                  <h2 className="text-xl font-medium">Recent Activity</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="w-full flex flex-col gap-2 items-end group"
                      >
                        <div className="flex items-center justify-between py-4 w-full">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full group-hover:animate-pulse",
                                getActivityColor(activity.type)
                              )}
                            />
                            <span className="text-md text-gray-900 dark:text-foreground">
                              {activity.event}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-foreground/80">
                            {activity.time}
                          </span>
                        </div>
                        <motion.div
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={separatorVariants}
                          className="w-full h-[1px] bg-border-color-0"
                        >
                          <div className="w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 duration-500 ease-in-out origin-left" />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              </ScaleDown>
   </>
  )
}

export default Activity
