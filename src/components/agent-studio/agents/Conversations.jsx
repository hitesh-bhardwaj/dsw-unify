import CountUp from '@/components/animations/CountUp'
import CardDetails from '@/components/CardDetails';
import { SettingIcon } from '@/components/Icons';
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils';
import React from 'react'


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
      { type: "success", event: "conv-001",mail:"user@example.com",turns:"12", time: "5m 20s" },
      { type: "success", event: "conv-002",mail:"another@example.com",turns:"6", time: "2m 45s" },
      { type: "success", event: "conv-003",mail:"test@example.com",turns:"9", time: "4m 10s" },
      { type: "success", event: "conv-004",mail:"demo@example.com",turns:"15", time: "7m 30s" },
    ],
  };

  const stats = [
    {
      title: "Total Conversations",
      value: "1,247",
    },
    {
      title: "Avg Turns/Conv",
      value: "8.3",
    },
    {
      title: "Avg Duration",
      value: "4m 32s",
    },
    {
      title: "User Satisfaction",
      value: "94%",
    }
  ];

const Conversations = () => {

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

  return (
    <>
    <div className="flex-1 overflow-auto bg-background">
          <div className="m mx-auto space-y-6">
            {/* Top Cards Row */}
            
                <CardDetails data={stats} textSize="text-4xl"/>

              <Card className={"border-none bg-background gap-2 mx-auto dark:bg-background"}>
                <CardHeader className='px-0'>
                  <h2 className="text-2xl font-medium">Recent Conversations</h2>
                </CardHeader>
                <CardContent className='px-0'>
                  <div className="space-y-2">
                    {agent.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="w-full flex flex-col gap-2 items-end group border border-border-color-0 px-5 py-0.5 rounded-xl dark:bg-card"
                      >
                        <div className="flex items-center justify-between py-4 w-full">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full group-hover:animate-pulse",
                                getActivityColor(activity.type)
                              )}
                            />
                            <div className='space-y-1'>
                            <span className="text-sm text-gray-900 dark:text-foreground block">
                              {activity.event}
                            </span>
                             <span className="text-sm text-gray-900 dark:text-foreground block">
                              {activity.mail}
                            </span>
                            </div>
                          </div>
                          <div className='flex items-center gap-3'>
                            <span className="text-sm text-gray-500 dark:text-foreground/80">
                            {activity.turns} turns
                          </span>
                          <span className="text-sm text-gray-500 dark:text-foreground/80">
                            {activity.time}
                          </span>
                          </div>
                        </div>
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

export default Conversations