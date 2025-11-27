import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import CountUp from './animations/CountUp'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

const PromptUsageGrid = () => {
  return (
    <>
    <div className="grid grid-cols-3 gap-6">
                  <Card className={"!pb-0 !py-6  !rounded-lg"}>
                    <CardHeader>
                      <h2 className="text-sm text-gray-600">Total Uses</h2>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                          <h3 className="text-4xl font-medium text-gray-900 dark:text-foreground">
                            <CountUp value={1250} />
                          </h3>
                        </div>
                      
                    </CardContent>
                  </Card>
                  <Card className={"!pb-0 !py-6 !rounded-lg"}>
                    <CardHeader>
                      <h2 className="text-sm text-gray-600">Rating</h2>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                          <h3 className="text-4xl font-medium text-gray-900 dark:text-foreground flex items-center gap-2">
                            <Star color='#FFC71F' fill='#FFC71F'/>
                            <CountUp value={4.8} />
                          </h3>
                        </div>
                      
                    </CardContent>
                  </Card>
                  <Card className={"!pb-0 !py-6  !rounded-lg"}>
                    <CardHeader>
                      <h2 className="text-sm text-gray-600">Version</h2>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                          <h3 className="text-4xl font-medium text-gray-900 dark:text-foreground">
                            v3
                          </h3>
                        </div>
                      
                    </CardContent>
                  </Card>

            </div>
    </>
        
 )
}

export default PromptUsageGrid