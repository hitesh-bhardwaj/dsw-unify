"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RelationalVectorDataIcon } from "@/components/Icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function Lineage() {
  return (
    <div className="border border-border-color-1 rounded-2xl space-y-8 py-6 pb-8 px-8">
      <div className="space-y-3">
        <h2 className="text-xl font-medium">Data Lineage</h2>
        <p className="text-sm text-foreground/80">
          Complete traceability from source data to deployed model
        </p>
      </div>
      <CustomerPipelineDiagram />
    </div>
  );
}

const PipelineNode = ({ title, subtitle, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Card 
          className="w-72 cursor-pointer transition-all !py-6"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <CardHeader className="gap-4">
            <div className="flex items-end gap-3 mb-2">
              <div className="w-15 h-15 rounded-lg bg-sidebar-accent p-3 flex items-center justify-center border">
                <RelationalVectorDataIcon className="w-7 h-7" />
              </div>
              <span className="text-xs border px-3 py-1 rounded-full text-gray-700">
                {subtitle}
              </span>
            </div>

            <h3 className="text-xl font-medium">{title}</h3>
          </CardHeader>

          {children && <CardContent>{children}</CardContent>}
        </Card>
      </PopoverTrigger>


      <PopoverContent
        align="center"
        side="right"
        sideOffset={16}
        className="w-88 rounded-3xl p-6 shadow-md border border-border-color-1"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{title}</h2>

          <div className="space-y-4 text-[15px]">
            <div>
              <p className="text-foreground/80 text-xs">Source Type</p>
              <p className="font-medium">PostgreSQL</p>
            </div>

            <div>
              <p className="text-foreground/80 text-xs">Database</p>
              <p className="font-medium">Customer_analytics</p>
            </div>

            <div>
              <p className="text-foreground/80 text-xs">Host</p>
              <p className="font-medium">prod-db.company.com</p>
            </div>

            <div>
              <p className="text-foreground/80 text-xs">Tables</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1  rounded-full border text-xs">
                  customers
                </span>
                <span className="px-3 py-1  rounded-full border text-xs">
                  transactions
                </span>
                <span className="px-3 py-1  rounded-full border text-xs">
                  demographics
                </span>
              </div>
            </div>

            <div>
              <p className="text-foreground/80 text-xs">Last Sync</p>
              <p className="font-medium">2025-01-15 14:30:00</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};


const ConnectorLine = () => (
  <svg className="w-full h-18" width="15" height="91" viewBox="0 0 15 91" fill="none">
    <path
      d="M6.65617 90.7071C7.0467 91.0976 7.67986 91.0976 8.07039 90.7071L14.4343 84.3431C14.8249 83.9526 14.8249 83.3195 14.4343 82.9289C14.0438 82.5384 13.4107 82.5384 13.0201 82.9289L7.36328 88.5858L1.70643 82.9289C1.3159 82.5384 0.682738 82.5384 0.292213 82.9289C-0.0983109 83.3195 -0.0983109 83.9526 0.292213 84.3431L6.65617 90.7071ZM7.36328 0H6.36328V90H7.36328H8.36328V0H7.36328Z"
      fill="black"
    />
  </svg>
);

const SplitConnector = () => (
 <svg className='w-full h-18' width="465" height="91" viewBox="0 0 465 91" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.65617 90.7071C7.0467 91.0976 7.67986 91.0976 8.07039 90.7071L14.4343 84.3431C14.8249 83.9526 14.8249 83.3195 14.4343 82.9289C14.0438 82.5384 13.4107 82.5384 13.0201 82.9289L7.36328 88.5858L1.70643 82.9289C1.3159 82.5384 0.682738 82.5384 0.292213 82.9289C-0.0983109 83.3195 -0.0983109 83.9526 0.292213 84.3431L6.65617 90.7071ZM232.363 0H231.363V25H232.363H233.363V0H232.363ZM212.363 45V44H27.3633V45V46H212.363V45ZM7.36328 65H6.36328V90H7.36328H8.36328V65H7.36328ZM27.3633 45V44C15.7653 44 6.36328 53.402 6.36328 65H7.36328H8.36328C8.36328 54.5066 16.8699 46 27.3633 46V45ZM232.363 25H231.363C231.363 35.4934 222.857 44 212.363 44V45V46C223.961 46 233.363 36.598 233.363 25H232.363Z" fill="black"/>
<path d="M456.656 90.7071C457.047 91.0976 457.68 91.0976 458.07 90.7071L464.434 84.3431C464.825 83.9526 464.825 83.3195 464.434 82.9289C464.044 82.5384 463.411 82.5384 463.02 82.9289L457.363 88.5858L451.706 82.9289C451.316 82.5384 450.683 82.5384 450.292 82.9289C449.902 83.3195 449.902 83.9526 450.292 84.3431L456.656 90.7071ZM232.363 0H231.363V25H232.363H233.363V0H232.363ZM252.363 45V46H437.363V45V44H252.363V45ZM457.363 65H456.363V90H457.363H458.363V65H457.363ZM437.363 45V46C447.857 46 456.363 54.5066 456.363 65H457.363H458.363C458.363 53.402 448.961 44 437.363 44V45ZM232.363 25H231.363C231.363 36.598 240.765 46 252.363 46V45V44C241.87 44 233.363 35.4934 233.363 25H232.363Z" fill="black"/>
</svg>
);

const MergeConnector = () => (
 <svg className='w-full h-18' width="452" height="91" viewBox="0 0 452 91" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M225.293 90.7071C225.683 91.0976 226.317 91.0976 226.707 90.7071L233.071 84.3431C233.462 83.9526 233.462 83.3195 233.071 82.9289C232.681 82.5384 232.047 82.5384 231.657 82.9289L226 88.5858L220.343 82.9289C219.953 82.5384 219.319 82.5384 218.929 82.9289C218.538 83.3195 218.538 83.9526 218.929 84.3431L225.293 90.7071ZM1 0H0V25H1H2V0H1ZM21 45V46H206V45V44H21V45ZM226 65H225V90H226H227V65H226ZM206 45V46C216.493 46 225 54.5066 225 65H226H227C227 53.402 217.598 44 206 44V45ZM1 25H0C0 36.598 9.40202 46 21 46V45V44C10.5066 44 2 35.4934 2 25H1Z" fill="black"/>
<path d="M225.293 90.7071C225.683 91.0976 226.317 91.0976 226.707 90.7071L233.071 84.3431C233.462 83.9526 233.462 83.3195 233.071 82.9289C232.681 82.5384 232.047 82.5384 231.657 82.9289L226 88.5858L220.343 82.9289C219.953 82.5384 219.319 82.5384 218.929 82.9289C218.538 83.3195 218.538 83.9526 218.929 84.3431L225.293 90.7071ZM451 0H450V25H451H452V0H451ZM431 45V44H246V45V46H431V45ZM226 65H225V90H226H227V65H226ZM246 45V44C234.402 44 225 53.402 225 65H226H227C227 54.5066 235.507 46 246 46V45ZM451 25H450C450 35.4934 441.493 44 431 44V45V46C442.598 46 452 36.598 452 25H451Z" fill="black"/>
</svg>

);


function CustomerPipelineDiagram() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center">

          <PipelineNode
            title="Customer Database"
            subtitle="External Sources"
          />

          <ConnectorLine />

          <PipelineNode
            title="Customer Data Pipeline"
            subtitle="Data Ingestion"
            detailsContent={
              <>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Pipeline Type</p>
                    <p className="font-semibold">Batch Ingestion</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Schedule</p>
                    <p className="font-semibold">Every 6 hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Status</p>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Active</span>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Records Processed</p>
                    <p className="font-semibold">2,456,789</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Last Run</p>
                    <p className="font-semibold">2025-01-15 14:30:00</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Next Run</p>
                    <p className="font-semibold">2025-01-15 20:30:00</p>
                  </div>
                </div>
              </>
            }
          />

          <SplitConnector />
          

          <div className="flex gap-24 ">
            <PipelineNode
              title="Aggregate Customer Metrics"
              subtitle="Transformations"
              detailsContent={
                <>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-foreground/80 mb-1">Transformation Type</p>
                      <p className="font-semibold">SQL Aggregation</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/80 mb-1">Output Features</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">total_spend</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">avg_order_value</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">order_count</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">days_since_last_order</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/80 mb-1">Refresh Rate</p>
                      <p className="font-semibold">Daily</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/80 mb-1">Data Range</p>
                      <p className="font-semibold">Last 365 days</p>
                    </div>
                  </div>
                </>
              }
            />
            <PipelineNode
              title="Behavioral Feature Engineering"
              subtitle="Transformations"
              detailsContent={
                <>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-foreground/80 mb-1">Transformation Type</p>
                      <p className="font-semibold">Python Feature Engineering</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/80 mb-1">Output Features</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">engagement_score</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">category_preference</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">purchase_frequency</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">loyalty_tier</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/80 mb-1">Refresh Rate</p>
                      <p className="font-semibold">Real-time</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/80 mb-1">ML Framework</p>
                      <p className="font-semibold">Scikit-learn</p>
                    </div>
                  </div>
                </>
              }
            />
          </div>

          <MergeConnector />

          {/* Customer Analytics Features */}
          <PipelineNode
            title="Customer Analytics Features"
            subtitle="Feature Views"
            detailsContent={
              <>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Feature Store</p>
                    <p className="font-semibold">Feast Feature Store</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Total Features</p>
                    <p className="font-semibold">28 features</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Entity</p>
                    <p className="font-semibold">customer_id</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Online Store</p>
                    <p className="font-semibold">Redis</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Offline Store</p>
                    <p className="font-semibold">BigQuery</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">TTL</p>
                    <p className="font-semibold">30 days</p>
                  </div>
                </div>
              </>
            }
          />

          <ConnectorLine />

          {/* Churn Prediction Features */}
          <PipelineNode
            title="Churn Prediction Features"
            subtitle="Feature Services"
            detailsContent={
              <>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Service Type</p>
                    <p className="font-semibold">Feature Service</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Selected Features</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">total_spend</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">engagement_score</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">days_since_last_order</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">purchase_frequency</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">loyalty_tier</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Latency</p>
                    <p className="font-semibold">~50ms (p95)</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Requests/day</p>
                    <p className="font-semibold">1.2M</p>
                  </div>
                </div>
              </>
            }
          />

          <ConnectorLine />

          {/* Customer Churn Predictor */}
          <PipelineNode
            title="Customer Churn Predictor v2.1"
            subtitle="ML Models"
            detailsContent={
              <>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Model Type</p>
                    <p className="font-semibold">XGBoost Classifier</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Accuracy</p>
                    <p className="font-semibold">94.3%</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Precision</p>
                    <p className="font-semibold">91.7%</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Recall</p>
                    <p className="font-semibold">89.2%</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Last Trained</p>
                    <p className="font-semibold">2025-01-10 09:00:00</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Training Data Size</p>
                    <p className="font-semibold">850,000 samples</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/80 mb-1">Deployment</p>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Production</span>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}