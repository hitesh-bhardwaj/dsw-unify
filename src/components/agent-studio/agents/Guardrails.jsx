import CountUp from '@/components/animations/CountUp'
import { GuardrailsIcon, SettingIcon } from '@/components/Icons';
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
      { type: "success", event: "Toxic Language",detail:"Input Check",triggers:"12"},
      { type: "success", event: "Jailbreak Attempt",detail:"Input Check",triggers:"8"},
      { type: "success", event: "Sensitive Info",detail:"Output Check",triggers:"5"},
      { type: "success", event: "Hallucination",detail:"Output Check",triggers:"3"},
      
    ],
  };
const Guardrails = () => {
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
          <div className=" mx-auto space-y-6">
            {/* Top Cards Row */}
            <div className="grid grid-cols-2 gap-6">
                <>
                  <Card>
                    <CardHeader>
                      <h2 className="text-md font-medium">Total Triggers</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      
                        <div className='space-y-5'>
                          <h3 className="text-3xl font-medium text-gray-900 dark:text-foreground">
                            <CountUp className='font-medium' value={199} />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            Last 24 hours
                          </p>
                        
                        </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h2 className="text-md font-medium">Prevention Rate</h2>
                    </CardHeader>
                    <CardContent className="">
                      
                        <div className='space-y-3'>
                          <h3 className="text-3xl font-medium text-gray-900 dark:text-foreground">
                            <CountUp value={72} /> %                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            All threats blocked
                          </p>
                        </div>
                        
                    </CardContent>
                  </Card>
                </>
            </div>
              <Card className={"border-none bg-background space-y-2 gap-1  mx-auto dark:bg-background"}>
                <CardHeader className='px-0 py-0'>
                  <h2 className="text-2xl font-medium">Guardrail Triggers Breakdown</h2>
                </CardHeader>
                <CardContent className='px-0 py-0'>
                  <div className="space-y-2">
                    {agent.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="w-full flex flex-col gap-2 items-end group border border-border-color-0 px-5 py-0.5 rounded-xl dark:bg-card"
                      >
                        <div className="flex items-center justify-between py-4 w-full">
                          <div className="flex items-center gap-5">
                            <div className='text-foreground'>
                                <GuardrailsIcon className="h-5 w-5"/>

                            </div>

                            <div className='space-y-1'>
                            <span className="text-sm font-medium text-gray-900 dark:text-foreground block">
                              {activity.event}
                            </span>
                             <span className="text-sm text-gray-900 dark:text-foreground block">
                              {activity.detail}
                            </span>
                            </div>
                          </div>
                          <div className='flex items-center gap-3'>
                            <span className="text-sm text-gray-500 dark:text-foreground/80">
                            {activity.triggers} triggers
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

export default Guardrails;