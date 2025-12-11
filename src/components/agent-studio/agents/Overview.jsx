import CountUp from '@/components/animations/CountUp'
import { SettingIcon } from '@/components/Icons';
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils';
import React from 'react'
import { motion } from "framer-motion";


const agent = {
    id: 0,
    name: "Auto Claims Processing Agent",
    description: "Automates auto insurance claims intake, validation, and processing",
    status: "active",
    tags: ["support", "customer-service"],
    lastModified: "2 Hours Ago",
    usage: "1.2K Request",
    metrics: {
      totalRequests: "12,847",
      avgResponse: "245ms",
      successRate: "99.2%",
      activeUsers: "156",
    },
    health: {
      lastActivity: "2 minutes ago",
      errorRate: "0.8%",
      systemStatus: "operational",
    },
    recentActivity: [
      { type: "success", event: "API call completed", time: "2 minutes ago" },
      { type: "success", event: "User interaction", time: "5 minutes ago" },
      { type: "success", event: "Knowledge base query", time: "12 minutes ago" },
      { type: "error", event: "Guardrail triggered", time: "18 minutes ago" },
      { type: "success", event: "Model inference", time: "25 minutes ago" },
    ],
  };
const Overview = () => {

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
    <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Cards Row */}
            <div className="grid grid-cols-3 gap-6">
                <>
                  {/* Agent Information */}
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-medium">Agent Information</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-foreground">
                          Status
                        </h3>
                        <Badge className="bg-transparent border border-badge-green text-black dark:text-white">
                          {agent.status.charAt(0).toUpperCase() +
                            agent.status.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-foreground">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {agent.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-transparent border border-border-color-0 font-light"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-1 dark:text-foreground">
                          Last Modified
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-foreground">
                          {agent.lastModified}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-1 dark:text-foreground">
                          Usage
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-foreground">
                          {agent.usage}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-medium">Performance Metrics</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-3xl font-medium text-gray-900 dark:text-foreground">
                            <CountUp value={agent.metrics.totalRequests} />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            Total Requests
                          </p>
                        </div>
                        <div>
                          <h3 className="text-3xl font-medium text-gray-900 dark:text-foreground">
                            <CountUp value={agent.metrics.avgResponse} />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            Avg. Response
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-3xl font-medium">
                            <CountUp value={agent.metrics.successRate} />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            Success Rate
                          </p>
                        </div>
                        <div>
                          <h3 className="text-3xl font-medium text-gray-900 dark:text-foreground">
                            <CountUp value={agent.metrics.activeUsers} />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            Active Users
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Health */}
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-medium">System Health</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-foreground">
                          Last Activity
                        </h3>
                        <p className="text-sm text-forground font-medium">
                          {agent.health.lastActivity}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-foreground">
                          Error Rate
                        </h3>
                        <p className="text-sm font-medium">
                          {agent.health.errorRate}
                        </p>
                      </div>
                      <span className="w-full h-[1px] bg-foreground/40 block mt-8" />
                      <div className="pt-4">
                        <div className="flex items-center gap-2 ">
                          <div className="w-4.5 h-4.5 ">
                            <SettingIcon />
                          </div>
                          <span className="text-sm">System Operational</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
            </div>
              <Card className={"border-none"}>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agent.recentActivity.map((activity, index) => (
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
                            <span className="text-sm text-gray-900 dark:text-foreground">
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
                          className="w-full h-[1px] bg-foreground/40"
                        >
                          <div className="w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 duration-500 ease-in-out origin-left" />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
          </div>
        </div>
    </>
  )
}

export default Overview